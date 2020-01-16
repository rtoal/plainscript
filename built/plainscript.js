#!/usr/bin/env node
"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const util = __importStar(require("util"));
const yargs = __importStar(require("yargs"));
require("./backend/javascript-generator");
const parser_1 = __importDefault(require("./syntax/parser"));
// If compiling from a string, return the AST, IR, or compiled code as a string.
function compile(sourceCode, { astOnly, frontEndOnly, shouldOptimize }) {
    const program = parser_1.default(sourceCode);
    if (astOnly) {
        return util.inspect(program, { depth: null });
    }
    program.analyze();
    if (frontEndOnly) {
        return util.inspect(program, { depth: null });
    }
    if (shouldOptimize) {
        return program.optimize().gen();
    }
    return program.gen();
}
exports.compile = compile;
// If compiling from a file, write to standard output.
function compileFile(filename, options) {
    fs.readFile(filename, 'utf-8', (error, sourceCode) => {
        if (error) {
            // tslint:disable-next-line: no-console
            console.error(error);
            return;
        }
        console.log(compile(sourceCode, options));
    });
}
exports.compileFile = compileFile;
module.exports = { compile, compileFile };
// If running as a script, we have a lot of command line processing to do. The source
// program will come from the file who name is given as the command line argument.
if (require.main === module) {
    const { argv } = yargs.usage('$0 [-a] [-o] [-i] filename')
        .boolean(['a', 'o', 'i'])
        .describe('a', 'show abstract syntax tree after parsing then stop')
        .describe('o', 'do optimizations')
        .describe('i', 'generate and show the decorated abstract syntax tree then stop')
        .demand(1);
    compileFile(argv._[0], { astOnly: argv.a, frontEndOnly: argv.i, shouldOptimize: argv.o });
}
