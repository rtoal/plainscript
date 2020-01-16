'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
class IdentifierExpression {
    constructor(id) {
        this.id = id;
    }
    // Whenever an expression is a simple identifer, it must refer to something
    // previously declared. Identifier expressions aren't the same things as
    // variables; instead, they refer to variables. That's why each identifier
    // expression keeps a reference to the variable, function, or parameter to
    // which it refers. The referent is found at semantic analysis time (not at
    // parse time).
    analyze(context) {
        this.referent = context.lookup(this.id);
    }
    optimize() {
        return this;
    }
    // Depends on the target language, thus gets filled in
    // by the necessary generator at runtime.
    gen() { }
}
exports.default = IdentifierExpression;
