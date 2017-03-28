module.exports = class Call {
  constructor(callee, args) {
    this.callee = callee;
    this.args = args;
  }

  analyze(context) {
    this.callee.analyze(context);
    context.assertIsFunction(this.callee.referent);
    this.checkNumberOfArguments(this.callee.referent);
    this.checkArgumentNamesAndPositionalRules(this.callee.referent);
  }

  checkNumberOfArguments(callee) {
    const numArgs = this.args.length;
    const numRequiredParams = callee.requiredParameterNames.size;
    const numParams = callee.allParameterNames.size;
    if (numArgs < numRequiredParams) {
      throw new Error(`Expected at least ${numRequiredParams} arguments but called with ${numArgs}`);
    }
    if (numArgs > numParams) {
      throw new Error(`Expected at most ${numParams} arguments but called with ${numArgs}`);
    }
  }

  checkArgumentNamesAndPositionalRules(callee) {
    let keywordArgumentSeen = false;
    this.args.forEach((arg) => {
      if (arg.id) {
        // This is a keyword argument, record that fact and check that it's okay
        keywordArgumentSeen = true;
        if (!callee.allParameterNames.has(arg.id)) {
          throw new Error(`Function does not have a parameter called ${arg.id}`);
        }
      } else if (keywordArgumentSeen) {
        // This is a positional argument, but a prior one was a keyword one
        throw new Error('Positional argument in call after keyword argument');
      }
    });
  }
};
