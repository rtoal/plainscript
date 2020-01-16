"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ReturnStatement {
    constructor(returnValue) {
        this.returnValue = returnValue;
    }
    analyze(context) {
        if (this.returnValue) {
            this.returnValue.analyze(context);
        }
        context.assertInFunction('Return statement outside function');
    }
    optimize() {
        if (this.returnValue) {
            this.returnValue = this.returnValue.optimize();
        }
        return this;
    }
    // Depends on the target language, thus gets filled in
    // by the necessary generator at runtime.
    gen() { }
}
exports.default = ReturnStatement;
