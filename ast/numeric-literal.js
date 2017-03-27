module.exports = class NumericLiteral {
  constructor(value) {
    this.value = value;
  }
  analyze() {
    this.type = 'number';
  }
  optimize() {
    return this;
  }
};
