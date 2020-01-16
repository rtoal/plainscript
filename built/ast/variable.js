"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Variable {
    constructor(id) {
        this.id = id;
    }
    // Left empty on purpose
    analyze(_) {
        // Someday we'll have types and we can do something here...
    }
    optimize() {
        return this;
    }
    // Depends on the target language, thus gets filled in
    // by the necessary generator at runtime.
    gen() { }
}
exports.default = Variable;
