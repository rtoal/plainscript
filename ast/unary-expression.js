class UnaryExpression {
  constructor(op, operand) {
    this.op = op;
    this.operand = operand;
  }
  toString() {
    return `(${this.op} ${this.operand})`;
  }
}

module.exports = UnaryExpression;
