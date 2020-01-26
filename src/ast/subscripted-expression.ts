import Context from '../semantics/context';
import { Expression, IAstNode } from '../type-definitions/plainscript-types';
import Variable from './variable';

export default class SubscriptedExpression implements IAstNode<SubscriptedExpression> {
  constructor(public variable: Variable, public subscript: Expression) { }

  public analyze(context: Context): void {
    this.variable.analyze(context);
    this.subscript.analyze(context);
  }

  public optimize(): SubscriptedExpression {
    this.variable = this.variable.optimize();
    this.subscript = this.subscript.optimize();
    return this;
  }

  // Depends on the target language, thus gets filled in
  // by the necessary generator at runtime.
  public gen() { }
}
