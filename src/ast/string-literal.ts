import Context from '../semantics/context';
import { AstNode } from '../type-definitions/plainscript-types';

export default class StringLiteral extends AstNode<StringLiteral> {
  constructor(public value: string) { super(); }
  // Intentionally empty.
  // tslint:disable-next-line:no-empty
  public analyze(_: Context) { }
  public optimize(): StringLiteral { return this; }
}
