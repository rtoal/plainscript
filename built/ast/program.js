"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const context_1 = __importDefault(require("../semantics/context"));
class Program {
    constructor(statements) {
        this.statements = statements;
    }
    analyze() {
        const context = new context_1.default({ parent: context_1.default.INITIAL });
        this.statements.forEach((s) => s.analyze(context));
    }
    optimize() {
        this.statements.map((s) => s.optimize())
            .filter((s) => s !== null);
        return this;
    }
    // Depends on the target language, thus gets filled in
    // by the necessary generator at runtime.
    gen() { }
}
exports.default = Program;
