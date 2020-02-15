import Context from '../semantics/context';
import Expression from './abstract/expression';

export default class BinaryExpression extends Expression {
  constructor(public op: string, public left: Expression, public right: Expression) { super(); }

  public analyze(context: Context): void {
    this.left.analyze(context);
    this.right.analyze(context);
  }

  public optimize(): BinaryExpression {
    this.left = this.left.optimize();
    this.right = this.right.optimize();
    // Suggested: Constant folding and strength reductions. There are many.
    return this;
  }
}
