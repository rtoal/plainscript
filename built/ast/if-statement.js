"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class IfStatement {
    constructor(tests, consequents, alternate) {
        this.tests = tests;
        this.consequents = consequents;
        this.alternate = alternate;
    }
    analyze(context) {
        this.tests.forEach((test) => test.analyze(context));
        this.consequents.forEach((block) => {
            const blockContext = context.createChildContextForBlock();
            block.forEach((statement) => statement.analyze(blockContext));
        });
        if (this.alternate) {
            this.alternate.forEach((s) => s.analyze(context.createChildContextForBlock()));
        }
    }
    optimize() {
        this.tests.map((test) => test.optimize());
        // Suggested: for a false test, remove the corresponding consequent
        this.consequents.forEach((block) => {
            block.map((s) => s.optimize())
                .filter((s) => s != null);
            // Suggested: Look for breaks/returns in the middle of the body
        });
        this.alternate = this.alternate ? this.alternate.map((s) => s.optimize()) : null;
        return this;
    }
    // Depends on the target language, thus gets filled in
    // by the necessary generator at runtime.
    gen() { }
}
exports.default = IfStatement;
