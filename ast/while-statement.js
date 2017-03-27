module.exports = class WhileStatement {
  constructor(test, body) {
    this.test = test;
    this.body = body;
  }
  analyze(context) {
    this.test.analyze();
    const bodyContext = context.newChildContext({ inLoop: true });
    this.body.forEach(s => s.analyze(bodyContext));
  }
};
