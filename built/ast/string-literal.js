"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class StringLiteral {
    constructor(value) {
        this.value = value;
    }
    // Intentionally empty.
    // tslint:disable-next-line:no-empty
    analyze(_) { }
    optimize() { return this; }
    // Depends on the target language, thus gets filled in
    // by the necessary generator at runtime.
    gen() { }
}
exports.default = StringLiteral;
