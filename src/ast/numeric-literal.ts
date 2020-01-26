import Context from '../semantics/context';
import { IAstNode } from '../type-definitions/plainscript-types';

export default class NumericLiteral implements IAstNode<NumericLiteral> {
  constructor(public value: number) { }
  // Intentionally empty.
  // tslint:disable-next-line:no-empty
  public analyze(_: Context) { }
  public optimize(): NumericLiteral { return this; }

  // Depends on the target language, thus gets filled in
  // by the necessary generator at runtime.
  public gen() { }
}
