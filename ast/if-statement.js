class IfStatement {
  constructor(cases, alternate) {
    this.cases = cases;
    this.alternate = alternate;
  }
  toString() {
    return `(If ${this.cases} ${this.alternate})`;
  }
}

IfStatement.Case = class {
  constructor(test, body) {
    this.test = test;
    this.body = body;
  }
  toString() {
    return `(Case ${this.test} ${this.body})`;
  }
};

module.exports = IfStatement;
