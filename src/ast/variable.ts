import Context from '../semantics/context';
import { IAstNode } from '../type-definitions/plainscript-types';

export default class Variable implements IAstNode<Variable> {
  constructor(public id: string) { }

  // Left empty on purpose
  public analyze(_: Context) {
    // Someday we'll have types and we can do something here...
  }

  public optimize(): Variable {
    return this;
  }

  // Depends on the target language, thus gets filled in
  // by the necessary generator at runtime.
  public gen() { }
}
