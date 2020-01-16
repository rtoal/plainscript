"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ListExpression {
    constructor(members) {
        this.members = members;
    }
    analyze(context) {
        this.members.forEach((member) => member.analyze(context));
    }
    optimize() {
        this.members = this.members.map((member) => member.optimize());
        return this;
    }
    // Depends on the target language, thus gets filled in
    // by the necessary generator at runtime.
    gen() { }
}
exports.default = ListExpression;
