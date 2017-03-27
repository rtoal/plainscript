module.exports = class Case {
  constructor(test, body) {
    this.test = test;
    this.body = body;
  }
  analyze(context) {
    this.test.analyze(context);
    this.body.analyze(context);
  }
};
