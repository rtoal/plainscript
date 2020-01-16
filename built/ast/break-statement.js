"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BreakStatement {
    // no constructor on purpose.
    analyze(context) {
        if (!context.inLoop) {
            throw new Error('Break statement outside loop');
        }
    }
    optimize() {
        return this;
    }
    // Depends on the target language, thus gets filled in
    // by the necessary generator at runtime.
    gen() { }
}
exports.default = BreakStatement;
