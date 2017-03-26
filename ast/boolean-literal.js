module.exports = class BooleanLiteral {
  constructor(value) {
    this.value = value;
  }
  optimize() {
    return this;
  }
};
