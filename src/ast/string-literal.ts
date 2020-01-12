import Context from '../semantics/context';
import { IAstNode } from '../type-definitions/ast';

export default class StringLiteral implements IAstNode<StringLiteral> {
  constructor(public value: string) { }
  // Intentionally empty.
  // tslint:disable-next-line:no-empty
  public analyze(_: Context) { }
  public optimize(): StringLiteral { return this; }

  // Depends on the target language, thus gets filled in
  // by the necessary generator at runtime.
  public gen() { }
}
