"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Argument {
    constructor(id, expression) {
        this.id = id;
        this.expression = expression;
    }
    get isPositionalArgument() {
        return !this.id;
    }
    get isKeywordArgument() {
        // The !! coerces all values into corresponding
        // truthy or falesy, even some null-like
        // values.
        //
        // Ex:
        // !!null => false
        // !!undefined => false
        //
        // Whereas a single ! would only
        // inverse the property,
        // !null => true
        // etc.
        return !!this.id;
    }
    analyze(context) {
        this.expression.analyze(context);
    }
    optimize() {
        this.expression = this.expression.optimize();
        return this;
    }
    // Depends on the target language, thus gets filled in
    // by the necessary generator at runtime.
    gen() { }
}
exports.default = Argument;
