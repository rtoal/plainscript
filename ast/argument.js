module.exports = class Argument {
  constructor(id, expression) {
    this.id = id;
    this.expression = expression;
  }

  get isPositionalArgument() {
    // keyword arguments have ids, and positional ones don't
    return !this.id;
  }

  get isKeywordArgument() {
    // keyword arguments have ids
    return !!this.id;
  }

  analyze(context) {
    this.expression.analyze(context);
  }
};
