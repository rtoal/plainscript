import Context from '../semantics/context';
import { AstNode } from '../type-definitions/plainscript-types';

export default class BooleanLiteral extends AstNode<BooleanLiteral> {
  constructor(public value: boolean) { super(); }

  public analyze(_: Context): void {
    // Intentionally empty
  }

  public optimize(): BooleanLiteral {
    return this;
  }
}
