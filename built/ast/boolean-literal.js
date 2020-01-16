"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BooleanLiteral {
    constructor(value) {
        this.value = value;
    }
    analyze(_) {
        // Intentionally empty
    }
    optimize() {
        return this;
    }
    // Depends on the target language, thus gets filled in
    // by the necessary generator at runtime.
    gen() { }
}
exports.default = BooleanLiteral;
