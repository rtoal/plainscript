import Context from '../semantics/context';
import { AstNode, Expression } from '../type-definitions/plainscript-types';
import Variable from './variable';

export default class SubscriptedExpression extends AstNode<SubscriptedExpression> {
  constructor(public variable: Variable, public subscript: Expression) { super(); }

  public analyze(context: Context): void {
    this.variable.analyze(context);
    this.subscript.analyze(context);
  }

  public optimize(): SubscriptedExpression {
    this.variable = this.variable.optimize();
    this.subscript = this.subscript.optimize();
    return this;
  }
}
