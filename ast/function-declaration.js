module.exports = class FunctionDeclaration {
  constructor(id, params, body) {
    this.id = id;
    this.params = params;
    this.body = body;
  }

  analyze(context) {
    const localContext = context.createChildContext({ function: this });
    this.params.forEach(p => p.analyze(localContext));
    context.addVariable(this.id, this);
    this.body.analyze(localContext);
  }
};
