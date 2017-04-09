module.exports = class ReturnStatement {
  constructor(returnValue) {
    this.returnValue = returnValue;
  }

  analyze(context) {
    if (this.returnValue) {
      this.returnValue.analyze(context);
    }
    context.assertInFunction('Return statement outside function');
  }

  optimize() {
    if (this.returnValue) {
      this.returnValue = this.returnValue.optimize();
    }
    return this;
  }
};
