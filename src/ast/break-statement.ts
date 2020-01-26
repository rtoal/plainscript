import Context from '../semantics/context';
import { AstNode } from '../type-definitions/plainscript-types';

export default class BreakStatement extends AstNode<BreakStatement> {
  // no constructor on purpose.

  public analyze(context: Context): void {
    if (!context.inLoop) {
      throw new Error('Break statement outside loop');
    }
  }

  public optimize(): BreakStatement {
    return this;
  }
}
