"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const boolean_literal_1 = __importDefault(require("./boolean-literal"));
class WhileStatement {
    constructor(test, body) {
        this.test = test;
        this.body = body;
    }
    analyze(context) {
        this.test.analyze(context);
        const bodyContext = context.createChildContextForLoop();
        this.body.forEach((s) => s.analyze(bodyContext));
    }
    optimize() {
        this.test = this.test.optimize();
        if (this.test instanceof boolean_literal_1.default && this.test.value === false) {
            return null;
        }
        this.body.map((s) => s.optimize()).filter((s) => s !== null);
        // Suggested: Look for returns/breaks in the middle of the body
        return this;
    }
    // Depends on the target language, thus gets filled in
    // by the necessary generator at runtime.
    gen() { }
}
exports.default = WhileStatement;
