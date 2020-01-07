const FunctionObject = require('./function-object');

// A function declaration binds a function object to a name.
module.exports = class FunctionDeclaration {
  constructor(id, params, body) {
    this.id = id;
    this.function = new FunctionObject(id, params, body);
  }

  analyze(context) {
    // First put the function in the current context, then analyze it in
    // a new child context.
    context.add(this.function);
    this.function.analyze(context.createChildContextForFunctionBody(this));
  }
};
