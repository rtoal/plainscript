module.exports = class StringLiteral {
  constructor(value) {
    this.value = value;
  }

  analyze() { // eslint-disable-line class-methods-use-this
    // Intentionally empty
  }

  optimize() {
    return this;
  }
};
