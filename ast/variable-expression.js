module.exports = class VariableExpression {
  constructor(id) {
    this.id = id;
  }
  analyze(context) {
    if (!context.variableIsVisible(this.id)) {
      throw new Error(`Undeclared variable: ${this.id}`);
    }
  }
};
