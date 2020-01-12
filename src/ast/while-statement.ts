const BooleanLiteral = require('./boolean-literal');

module.exports = class WhileStatement {
  constructor(test, body) {
    Object.assign(this, { test, body });
  }

  analyze(context) {
    this.test.analyze(context);
    const bodyContext = context.createChildContextForLoop();
    this.body.forEach(s => s.analyze(bodyContext));
  }

  optimize() {
    this.test = this.test.optimize();
    if (this.test instanceof BooleanLiteral && this.condition.value === false) {
      return null;
    }
    this.body.map(s => s.optimize()).filter(s => s !== null);
    // Suggested: Look for returns/breaks in the middle of the body
    return this;
  }
};
