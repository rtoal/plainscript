"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Call {
    constructor(callee, args) {
        this.callee = callee;
        this.args = args;
    }
    analyze(context) {
        this.callee.analyze(context);
        context.assertIsFunction(this.callee.referent);
        this.checkArgumentMatching(this.callee.referent);
        this.args.forEach((arg) => arg.analyze(context));
    }
    optimize() {
        this.callee = this.callee.optimize();
        this.args.forEach((arg) => arg.optimize());
        return this;
    }
    checkArgumentMatching(callee) {
        const matchedParameterNames = new Set([]);
        let keywordArgumentSeen = false;
        this.args.forEach((arg, index) => {
            if (index >= callee.params.length) {
                throw new Error('Too many arguments in call');
            }
            if (arg.isKeywordArgument) {
                keywordArgumentSeen = true;
            }
            else if (keywordArgumentSeen) {
                throw new Error('Positional argument in call after keyword argument');
            }
            const parameterName = arg.id ? arg.id : callee.params[index].id;
            if (!callee.allParameterNames.has(parameterName)) {
                throw new Error(`Function does not have a parameter called ${parameterName}`);
            }
            if (matchedParameterNames.has(parameterName)) {
                throw new Error(`Multiple arguments for parameter ${parameterName}`);
            }
            matchedParameterNames.add(parameterName);
        });
        // Look for and report a required parameter that is not matched.
        const miss = [...callee.requiredParameterNames].find((name) => !matchedParameterNames.has(name));
        if (miss) {
            throw new Error(`Required parameter ${miss}  is not matched in call`);
        }
    }
    // Depends on the target language, thus gets filled in
    // by the necessary generator at runtime.
    gen() { }
}
exports.default = Call;
