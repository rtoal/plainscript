module.exports = class ReturnStatement {
  constructor(returnValue) {
    this.returnValue = returnValue;
  }
  analyze(context) { // eslint-disable-line class-methods-use-this
    if (!context.inFunction) {
      throw new Error('Return statement outside function');
    }
  }
};
