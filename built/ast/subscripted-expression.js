"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SubscriptedExpression {
    constructor(variable, subscript) {
        this.variable = variable;
        this.subscript = subscript;
    }
    analyze(context) {
        this.variable.analyze(context);
        this.subscript.analyze(context);
    }
    optimize() {
        this.variable = this.variable.optimize();
        this.subscript = this.subscript.optimize();
        return this;
    }
    // Depends on the target language, thus gets filled in
    // by the necessary generator at runtime.
    gen() { }
}
exports.default = SubscriptedExpression;
