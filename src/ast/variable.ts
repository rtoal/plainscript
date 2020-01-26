import Context from '../semantics/context';
import { AstNode } from '../type-definitions/plainscript-types';

export default class Variable extends AstNode<Variable> {
  constructor(public id: string) { super(); }

  // Left empty on purpose
  public analyze(_: Context) {
    // Someday we'll have types and we can do something here...
  }

  public optimize(): Variable {
    return this;
  }
}
