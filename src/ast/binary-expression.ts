import Context from '../semantics/context';
import { AstNode, Expression } from '../type-definitions/plainscript-types';

export default class BinaryExpression extends AstNode<BinaryExpression> {
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
