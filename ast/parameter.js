module.exports = class Parameter {
  constructor(id, defaultExpression) {
    this.id = id;
    this.defaultExpression = defaultExpression;
  }

  analyze(context) {
    if (this.defaultExpression) {
      this.defaultExpression.analyze();
    }
    context.addVariable(this.id, this);
  }
};
