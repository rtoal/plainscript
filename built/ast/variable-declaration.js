"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const variable_1 = __importDefault(require("./variable"));
class VariableDeclaration {
    constructor(ids, initializers) {
        this.ids = ids;
        this.initializers = initializers;
    }
    analyze(context) {
        if (this.ids.length !== this.initializers.length) {
            throw new Error('Number of variables does not equal number of initializers');
        }
        // We don't want the declared variables to come into scope until after the
        // declaration line, so we will analyze all the initializing expressions
        // first.
        this.initializers.forEach((e) => e.analyze(context));
        // Now we can create actual variable objects and add to the current context.
        this.variables = this.ids.map((id) => new variable_1.default(id));
        this.variables.forEach((variable) => context.add(variable));
    }
    optimize() {
        return this;
    }
    // Depends on the target language, thus gets filled in
    // by the necessary generator at runtime.
    gen() { }
}
exports.default = VariableDeclaration;
