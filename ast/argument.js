module.exports = class Argument {
  constructor(id, expression) {
    this.id = id;
    this.expression = expression;
  }

  analyze(context) {
    this.expression.analyze(context);
  }
};
