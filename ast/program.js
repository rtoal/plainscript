class Program {
  constructor(statements) {
    this.statements = statements;
  }
  toString() {
    return `(Program ${this.statements.join(' ')})`;
  }
}

module.exports = Program;
