module.exports = class ReturnStatement {
  constructor(returnValue) {
    this.returnValue = returnValue;
  }

  analyze(context) {
    this.returnValue.analyze(context);
    context.assertInFunction('Return statement outside function');
  }
};
