"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BinaryExpression {
    constructor(op, left, right) {
        this.op = op;
        this.left = left;
        this.right = right;
    }
    analyze(context) {
        this.left.analyze(context);
        this.right.analyze(context);
    }
    optimize() {
        this.left = this.left.optimize();
        this.right = this.right.optimize();
        // Suggested: Constant folding and strength reductions. There are many.
        return this;
    }
    // Depends on the target language, thus gets filled in
    // by the necessary generator at runtime.
    gen() { }
}
exports.default = BinaryExpression;
