import Context from '../semantics/context';
import { AstNode, Expression } from '../type-definitions/plainscript-types';

export default class Argument extends AstNode {
  constructor(public id: string, public expression: Expression) { super(); }

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
}
