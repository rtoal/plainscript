module.exports = class FunctionObject {
  constructor(id, params, body) {
    Object.assign(this, { id, params, body });
  }

  // Functions like print and sqrt which are pre-defined are known as
  // "external" functions because they are not declared in the current
  // module and we therefore don't generate code for them.
  get isExternal() {
    return !this.function.body;
  }

  analyze(context) {
    // Each parameter will be declared in the function's scope, mixed in
    // with the function's local variables. This is by design.
    this.params.forEach(p => p.analyze(context));

    // Make sure all required parameters come before optional ones, and
    // gather the names up into sets for quick lookup.
    this.requiredParameterNames = new Set();
    this.allParameterNames = new Set();
    this.params.forEach((p) => {
      this.allParameterNames.add(p.id);
      if (p.isRequired) {
        this.requiredParameterNames.add(p.id);
        if (this.requiredParameterNames.size < this.allParameterNames.size) {
          throw new Error('Required parameter cannot appear after an optional parameter');
        }
      }
    });

    // Now we analyze the body with the local context. Note that recursion is
    // allowed, because we've already inserted the function itself into the
    // outer context, so recursive calls will be properly resolved during the
    // usual "outward moving" scope search. Of course, if you declare a local
    // variable with the same name as the function inside the function, you'll
    // shadow it, which would probably be not a good idea.
    if (this.body) {
      this.body.forEach(s => s.analyze(context));
    }
  }

  optimize() {
    this.parameters.forEach(p => p.optimize());
    this.body.forEach(s => s.optimize());
    this.body = this.body.filter(s => s !== null);
    // Suggested: Look for returns in the middle of the body
    return this;
  }
};
