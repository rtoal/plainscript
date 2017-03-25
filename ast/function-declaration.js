class FunctionDeclaration {
  constructor(id, params, body) {
    this.id = id;
    this.params = params;
    this.body = body;
  }
  toString() {
    return `(Function ${this.id} ${this.params} ${this.body})`;
  }
}

module.exports = FunctionDeclaration;
