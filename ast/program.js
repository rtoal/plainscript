const Context = require('../semantics/context');

module.exports = class Program {
  constructor(statements) {
    this.statements = statements;
  }

  analyze(context = Context.INITIAL) {
    this.statements.forEach(s => s.analyze(context));
  }
};
