"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Parameter {
    constructor(id, defaultExpression) {
        this.id = id;
        this.defaultExpression = defaultExpression;
    }
    analyze(context) {
        if (this.defaultExpression) {
            this.defaultExpression.analyze();
        }
        context.add(this);
    }
    optimize() {
        this.defaultExpression = this.defaultExpression.optimize();
        return this;
    }
    get isRequired() {
        return this.defaultExpression === null;
    }
    // Depends on the target language, thus gets filled in
    // by the necessary generator at runtime.
    gen() { }
}
exports.default = Parameter;
