import Context from '../semantics/context';
import { AstNode } from '../type-definitions/plainscript-types';

export default class BinaryExpression extends AstNode<BinaryExpression> {
  constructor(public op: any, public left: any, public right: any) { super(); }

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
