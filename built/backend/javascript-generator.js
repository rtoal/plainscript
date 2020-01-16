"use strict";
/*
 * Translation to JavaScript
 *
 * Requiring this module adds a gen() method to each of the AST classes.
 * Nothing is actually exported from this module.
 *
 * Each gen() method returns a fragment of JavaScript. The gen() method on
 * the program class pretty-prints the complete JavaScript code.
 *
 *   require('./backend/javascript-generator');
 *   program.gen();
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsBeautify = require("js-beautify");
const argument_1 = __importDefault(require("../ast/argument"));
const assignment_statement_1 = __importDefault(require("../ast/assignment-statement"));
const binary_expression_1 = __importDefault(require("../ast/binary-expression"));
const boolean_literal_1 = __importDefault(require("../ast/boolean-literal"));
const break_statement_1 = __importDefault(require("../ast/break-statement"));
const call_1 = __importDefault(require("../ast/call"));
const function_declaration_1 = __importDefault(require("../ast/function-declaration"));
const function_object_1 = __importDefault(require("../ast/function-object"));
const identifier_expression_1 = __importDefault(require("../ast/identifier-expression"));
const if_statement_1 = __importDefault(require("../ast/if-statement"));
const list_expression_1 = __importDefault(require("../ast/list-expression"));
const numeric_literal_1 = __importDefault(require("../ast/numeric-literal"));
const parameter_1 = __importDefault(require("../ast/parameter"));
const program_1 = __importDefault(require("../ast/program"));
const return_statement_1 = __importDefault(require("../ast/return-statement"));
const string_literal_1 = __importDefault(require("../ast/string-literal"));
const subscripted_expression_1 = __importDefault(require("../ast/subscripted-expression"));
const unary_expression_1 = __importDefault(require("../ast/unary-expression"));
const variable_1 = __importDefault(require("../ast/variable"));
const variable_declaration_1 = __importDefault(require("../ast/variable-declaration"));
const while_statement_1 = __importDefault(require("../ast/while-statement"));
const context_1 = __importDefault(require("../semantics/context"));
const indentLevel = 2;
const opConversionDictionary = {
    '!=': '!==',
    '==': '===',
    'and': '&&',
    'not': '!',
    'or': '||',
};
function makeOp(op) {
    return opConversionDictionary[op] || op;
}
// jsName(e) takes any PlainScript object with an id property, such as a
// Variable, Parameter, or FunctionDeclaration, and produces a JavaScript
// name by appending a unique identifying suffix, such as '_1' or '_503'.
// It uses a cache so it can return the same exact string each time it is
// called with a particular entity.
const jsName = (() => {
    let lastId = 0;
    const map = new Map();
    return (v) => {
        if (!(map.has(v))) {
            map.set(v, ++lastId); // eslint-disable-line no-plusplus
        }
        return `${v.id}_${map.get(v)}`;
    };
})();
// This is a nice helper for variable declarations and assignment statements.
// The AST represents both of these with lists of sources and lists of targets,
// but when writing out JavaScript it seems silly to write `[x] = [y]` when
// `x = y` suffices.
function bracketIfNecessary(a) {
    return (a.length === 1) ? `${a}` : `[${a.join(',')}]`;
}
function generateLibraryFunctions() {
    function generateLibraryStub(name, params, body) {
        const entity = context_1.default.INITIAL.declarations[name];
        return `function ${jsName(entity)}(${params}) {${body}}`;
    }
    return [
        generateLibraryStub('print', '_', 'console.log(_);'),
        generateLibraryStub('sqrt', '_', 'return Math.sqrt(_);'),
    ].join('');
}
function generateBlock(block) {
    return block.map((s) => `${s.gen()};`).join('');
}
argument_1.default.prototype.gen = function () {
    return this.expression.gen();
};
assignment_statement_1.default.prototype.gen = function () {
    const targets = this.targets.map((t) => t.gen());
    const sources = this.sources.map((s) => s.gen());
    return `${bracketIfNecessary(targets)} = ${bracketIfNecessary(sources)}`;
};
binary_expression_1.default.prototype.gen = function () {
    return `(${this.left.gen()} ${makeOp(this.op)} ${this.right.gen()})`;
};
boolean_literal_1.default.prototype.gen = function () {
    return `${this.value}`;
};
break_statement_1.default.prototype.gen = function () {
    return 'break';
};
call_1.default.prototype.gen = function () {
    const fun = this.callee.referent;
    const params = {};
    const args = Array(this.args.length).fill(undefined);
    fun.params.forEach((p, i) => { params[p.id] = i; });
    this.args.forEach((a, i) => { args[a.isPositionalArgument ? i : params[a.id]] = a; });
    return `${jsName(fun)}(${args.map((a) => (a ? a.gen() : 'undefined')).join(',')})`;
};
function_declaration_1.default.prototype.gen = function () {
    return this.function.gen();
};
function_object_1.default.prototype.gen = function () {
    return `function ${jsName(this)}(${this.params.map((p) => p.gen()).join(',')}) {
      ${generateBlock(this.body)}
    }`;
};
identifier_expression_1.default.prototype.gen = function () {
    return this.referent.gen();
};
if_statement_1.default.prototype.gen = function () {
    const cases = this.tests.map((test, index) => {
        const prefix = index === 0 ? 'if' : '} else if';
        return `${prefix} (${test.gen()}) {${generateBlock(this.consequents[index])}`;
    });
    const alternate = this.alternate ? `}else{${generateBlock(this.alternate)}` : '';
    return `${cases.join('')}${alternate}}`;
};
list_expression_1.default.prototype.gen = function () {
    const jsMembers = this.members.map((member) => member.gen());
    return `[${jsMembers.join(',')}]`;
};
numeric_literal_1.default.prototype.gen = function () {
    return `${this.value}`;
};
parameter_1.default.prototype.gen = function () {
    let translation = jsName(this);
    if (this.defaultExpression) {
        translation += ` = ${this.defaultExpression.gen()}`;
    }
    return translation;
};
program_1.default.prototype.gen = function () {
    const libraryFunctions = generateLibraryFunctions();
    const programStatements = generateBlock(this.statements);
    const target = `${libraryFunctions}${programStatements}`;
    return jsBeautify(target, { indent_size: indentLevel });
};
return_statement_1.default.prototype.gen = function () {
    return `return ${this.returnValue ? this.returnValue.gen() : ''}`;
};
string_literal_1.default.prototype.gen = function () {
    return `${this.value}`;
};
subscripted_expression_1.default.prototype.gen = function () {
    const base = this.variable.gen();
    const subscript = this.subscript.gen();
    return `${base}[${subscript}]`;
};
unary_expression_1.default.prototype.gen = function () {
    return `(${makeOp(this.op)} ${this.operand.gen()})`;
};
variable_declaration_1.default.prototype.gen = function () {
    const variables = this.variables.map((v) => v.gen());
    const initializers = this.initializers.map((i) => i.gen());
    return `let ${bracketIfNecessary(variables)} = ${bracketIfNecessary(initializers)}`;
};
variable_1.default.prototype.gen = function () {
    return jsName(this);
};
while_statement_1.default.prototype.gen = function () {
    return `while (${this.test.gen()}) { ${generateBlock(this.body)} }`;
};
