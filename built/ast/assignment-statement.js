"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AssignmentStatement {
    constructor(targets, sources) {
        this.targets = targets;
        this.sources = sources;
    }
    analyze(context) {
        if (this.targets.length !== this.sources.length) {
            throw new Error('Number of variables does not equal number of expressions');
        }
        this.sources.forEach((e) => e.analyze(context));
        this.targets.forEach((v) => v.analyze(context));
    }
    optimize() {
        return this;
    }
    // Depends on the target language, thus gets filled in
    // by the necessary generator at runtime.
    gen() { }
}
exports.default = AssignmentStatement;
