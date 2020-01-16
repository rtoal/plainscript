"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const boolean_literal_1 = __importDefault(require("./boolean-literal"));
const numeric_literal_1 = __importDefault(require("./numeric-literal"));
class UnaryExpression {
    constructor(op, operand) {
        this.op = op;
        this.operand = operand;
    }
    analyze(context) {
        this.operand.analyze(context);
    }
    optimize() {
        this.operand = this.operand.optimize();
        if (this.op === 'not' && this.operand instanceof boolean_literal_1.default) {
            return new boolean_literal_1.default(!this.operand.value);
        }
        else if (this.op === '-' && this.operand instanceof numeric_literal_1.default) {
            return new numeric_literal_1.default(-this.operand.value);
        }
        return this;
    }
    // Depends on the target language, thus gets filled in
    // by the necessary generator at runtime.
    gen() { }
}
exports.default = UnaryExpression;
