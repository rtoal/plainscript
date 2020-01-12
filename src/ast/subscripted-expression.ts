module.exports = class SubscriptedExpression {
  constructor(variable, subscript) {
    Object.assign(this, { variable, subscript });
  }

  analyze(context) {
    this.variable.analyze(context);
    this.subscript.analyze(context);
  }

  optimize() {
    this.variable = this.variable.optimize();
    this.subscript = this.subscript.optimize();
    return this;
  }
};
