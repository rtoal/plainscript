class WhileStatement {
  constructor(test, body) {
    this.test = test;
    this.body = body;
  }
  toString() {
    return `(While ${this.test} ${this.body})`;
  }
}

module.exports = WhileStatement;
