import Context from '../semantics/context';
import Expression from './abstract/expression';
import VariableExpression from './abstract/variable-expression';
import Variable from './variable';

export default class SubscriptedExpression extends VariableExpression {
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
