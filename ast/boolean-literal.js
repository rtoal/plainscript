module.exports = class BooleanLiteral {
  constructor(value) {
    this.value = value;
  }
  analyze() {
    this.type = 'bool';
  }
  optimize() {
    return this;
  }
};
