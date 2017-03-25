class Argument {
  constructor(id, expression) {
    this.id = id;
    this.expression = expression;
  }
  toString() {
    return this.id ? `(Arg ${this.id} ${this.expression})` : this.expression;
  }
}

module.exports = Argument;
