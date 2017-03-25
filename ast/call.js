class Call {
  constructor(fun, args) {
    this.fun = fun;
    this.args = args;
  }
  toString() {
    return `(Call ${this.fun} ${this.args})`;
  }
}

module.exports = Call;
