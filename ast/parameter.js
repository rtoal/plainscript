class Parameter {
  constructor(id, defaultExpression) {
    this.id = id;
    this.defaultExpression = defaultExpression;
  }
  toString() {
    return this.defaultExpression ? `(Param ${this.id} ${this.defaultExpression})` : this.id;
  }
}

module.exports = Parameter;
