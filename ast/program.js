const Context = require('../semantics/context');

module.exports = class Program {
  constructor(statements) {
    this.statements = statements;
  }

  analyze() {
    const context = new Context({ parent: Context.INITIAL });
    this.statements.forEach(s => s.analyze(context));
  }

  optimize() {
    this.statements.map(s => s.optimize()).filter(s => s !== null);
    return this;
  }
};
