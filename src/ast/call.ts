import Context from '../semantics/context';
import { AstNode } from '../type-definitions/plainscript-types';
import Argument from './argument';
import IdentifierExpression from './identifier-expression';

export default class Call extends AstNode<Call> {
  constructor(public callee: IdentifierExpression, public args: Argument[]) {
    super();
  }

  public analyze(context: Context): void {
    this.callee.analyze(context);
    context.assertIsFunction(this.callee.referent);
    this.checkArgumentMatching(this.callee.referent);
    this.args.forEach((arg) => arg.analyze(context));
  }

  public optimize(): Call {
    this.callee = this.callee.optimize();
    this.args.forEach((arg) => arg.optimize());
    return this;
  }

  public checkArgumentMatching(callee: any) {
    const matchedParameterNames: Set<string> = new Set([]);
    let keywordArgumentSeen = false;
    this.args.forEach((arg, index: number) => {
      if (index >= callee.params.length) {
        throw new Error('Too many arguments in call');
      }

      if (arg.isKeywordArgument) {
        keywordArgumentSeen = true;
      } else if (keywordArgumentSeen) {
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
}
