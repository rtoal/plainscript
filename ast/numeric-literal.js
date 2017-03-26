module.exports = class NumericLiteral {
  constructor(value) {
    this.value = value;
  }
  optimize() {
    return this;
  }
};
