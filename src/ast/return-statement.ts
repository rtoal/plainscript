import Context from '../semantics/context';
import { IAstNode } from '../type-definitions/plainscript';

export default class ReturnStatement implements IAstNode<ReturnStatement> {
  constructor(public returnValue: any) { }

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

  // Depends on the target language, thus gets filled in
  // by the necessary generator at runtime.
  public gen() { }
}
