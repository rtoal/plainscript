class BinaryExpression {
  constructor(op, left, right) {
    this.op = op;
    this.left = left;
    this.right = right;
  }
  toString() {
    return `(${this.op} ${this.left} ${this.right})`;
  }
}

module.exports = BinaryExpression;
