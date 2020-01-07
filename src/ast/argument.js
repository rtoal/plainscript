module.exports = class Argument {
  constructor(id, expression) {
    Object.assign(this, { id, expression });
  }

  get isPositionalArgument() {
    // positional arguments are the ones without ids
    return !this.id;
  }

  get isKeywordArgument() {
    // keyword arguments have ids
    return !!this.id;
  }

  analyze(context) {
    this.expression.analyze(context);
  }

  optimize() {
    this.expression = this.expression.optimize();
    return this;
  }
};
