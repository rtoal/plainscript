module.exports = class WhileStatement {
  constructor(test, body) {
    this.test = test;
    this.body = body;
  }

  analyze(context) {
    this.test.analyze(context);
    const bodyContext = context.createChildContextForLoop();
    this.body.forEach(s => s.analyze(bodyContext));
  }
};
