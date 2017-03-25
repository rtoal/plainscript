class ReturnStatement {
  constructor(returnValue) {
    this.returnValue = returnValue;
  }
  toString() {
    return this.returnValue ? `(Return ${this.returnValue})` : '(Return)';
  }
}

module.exports = ReturnStatement;
