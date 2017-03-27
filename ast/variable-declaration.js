const Variable = require('./variable');

module.exports = class VariableDeclaration {
  constructor(targets, sources) {
    this.targets = targets;
    this.sources = sources;
  }

  analyze(context) {
    if (this.targets.length !== this.sources.length) {
      throw new Error('Number of variables does not equal number of initializers');
    }

    // We don't want the declared variables to come into scope until after the
    // declaration line, so we will analyze all the initializing expressions
    // first.
    this.sources.forEach(e => e.analyze(context));

    // Now we can add each new variable to the current context.
    this.targets.forEach(id => context.addVariable(id, new Variable(id)));
  }
};
