module.exports = class Variable {
  constructor(id) {
    this.id = id;
  }

  analyze(/* context */) { // eslint-disable-line class-methods-use-this
    // Someday we'll have types and we can do something here...
  }

  optimize() {
    return this;
  }
};
