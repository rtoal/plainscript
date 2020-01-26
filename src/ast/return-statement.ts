import Context from '../semantics/context';
import { AstNode, Expression } from '../type-definitions/plainscript-types';

export default class ReturnStatement extends AstNode<ReturnStatement> {
  constructor(public returnValue: Expression | null) { super(); }

  public analyze(context: Context): void {
    if (this.returnValue) {
      this.returnValue.analyze(context);
    }
    context.assertInFunction('Return statement outside function');
  }

  public optimize(): ReturnStatement {
    if (this.returnValue) {
      this.returnValue = this.returnValue.optimize();
    }
    return this;
  }
}
