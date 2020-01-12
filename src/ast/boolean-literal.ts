import Context from '../semantics/context';
import { IAstNode } from '../type-definitions/ast';

export default class BooleanLiteral implements IAstNode<BooleanLiteral> {
  constructor(public value: boolean) { }

  public analyze(_: Context): void {
    // Intentionally empty
  }

  public optimize(): BooleanLiteral {
    return this;
  }

  // Depends on the target language, thus gets filled in
  // by the necessary generator at runtime.
  public gen() { }
}
