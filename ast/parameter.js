module.exports = class Parameter {
  constructor(id, defaultExpression) {
    Object.assign(this, { id, defaultExpression });
  }

  get isRequired() {
    return this.defaultExpression === null;
  }

  analyze(context) {
    if (this.defaultExpression) {
      this.defaultExpression.analyze();
    }
    context.add(this);
  }

  optimize() {
    this.defaultExpression = this.defaultExpression.optimize();
    return this;
  }
};
