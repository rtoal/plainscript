import Context from '../semantics/context';
import { AstNode } from '../type-definitions/plainscript-types';

export default class NumericLiteral extends AstNode<NumericLiteral> {
  constructor(public value: number) { super(); }
  // Intentionally empty.
  // tslint:disable-next-line:no-empty
  public analyze(_: Context) { }
  public optimize(): NumericLiteral { return this; }
}
