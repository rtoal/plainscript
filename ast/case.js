module.exports = class Case {
  constructor(test, body) {
    this.test = test;
    this.body = body;
  }

  analyze(context) {
    this.test.analyze(context);
    const bodyContext = context.createChildContextForBlock();
    this.body.forEach(s => s.analyze(bodyContext));
  }
};
