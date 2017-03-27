module.exports = class ReturnStatement {
  constructor(returnValue) {
    this.returnValue = returnValue;
  }

  analyze(context) { // eslint-disable-line class-methods-use-this
    context.assertInFunction('Return statement outside function');
  }
};
