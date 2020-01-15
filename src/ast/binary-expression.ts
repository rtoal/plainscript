import Context from '../semantics/context';
import { IAstNode } from '../type-definitions/ast';

export default class BinaryExpression implements IAstNode<BinaryExpression> {
  constructor(public op: any, public left: any, public right: any) { }

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

  // Depends on the target language, thus gets filled in
  // by the necessary generator at runtime.
  public gen() { }
}
