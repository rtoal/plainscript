module.exports = class UnaryExpression {
  constructor(op, operand) {
    this.op = op;
    this.operand = operand;
  }
  analyze(context) {
    this.operand.analyze(context);
  }
};
