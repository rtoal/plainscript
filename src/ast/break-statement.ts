import Context from '../semantics/context';
import { IAstNode } from '../type-definitions/plainscript-types';

export default class BreakStatement implements IAstNode<BreakStatement> {
  // no constructor on purpose.

  public analyze(context: Context): void {
    if (!context.inLoop) {
      throw new Error('Break statement outside loop');
    }
  }

  public optimize(): BreakStatement {
    return this;
  }

  // Depends on the target language, thus gets filled in
  // by the necessary generator at runtime.
  public gen() { }
}
