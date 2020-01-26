import Context from '../semantics/context';
import { Expression, IAstNode } from '../type-definitions/plainscript';

export default class Argument implements IAstNode<Argument> {
  constructor(public id: string, public expression: Expression) { }

  public get isPositionalArgument() {
    return !this.id;
  }

  public get isKeywordArgument() {
    // The !! coerces all values into corresponding
    // truthy or falesy, even some null-like
    // values.
    //
    // Ex:
    // !!null => false
    // !!undefined => false
    //
    // Whereas a single ! would only
    // inverse the property,
    // !null => true
    // etc.
    return !!this.id;
  }

  public analyze(context: Context) {
    this.expression.analyze(context);
  }

  public optimize() {
    this.expression = this.expression.optimize();
    return this;
  }

  // Depends on the target language, thus gets filled in
  // by the necessary generator at runtime.
  public gen() { }
}
