module.exports = class BinaryExpression {
  constructor(op, left, right) {
    this.op = op;
    this.left = left;
    this.right = right;
  }
  analyze(context) {
    this.left.analyze(context);
    this.operand.right(context);
  }
};
