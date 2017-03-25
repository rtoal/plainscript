class NumericLiteral {
  constructor(value) {
    this.value = value;
  }
  toString() {
    return this.value;
  }
  optimize() {
    return this;
  }
}

module.exports = NumericLiteral;
