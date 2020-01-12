const BooleanLiteral = require('./boolean-literal');
const NumericLiteral = require('./numeric-literal');

module.exports = class UnaryExpression {
  constructor(op, operand) {
    Object.assign(this, { op, operand });
  }

  analyze(context) {
    this.operand.analyze(context);
  }

  optimize() {
    this.operand = this.operand.optimize();
    if (this.op === 'not' && this.operand instanceof BooleanLiteral) {
      return BooleanLiteral(!this.operand.value);
    } else if (this.op === '-' && this.operand instanceof NumericLiteral) {
      return new NumericLiteral(-this.operand.value);
    }
    return this;
  }
};
