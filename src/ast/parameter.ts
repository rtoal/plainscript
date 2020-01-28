import Context from '../semantics/context';
import { AstNode, Expression } from '../type-definitions/plainscript-types';

export default class Parameter extends AstNode {
  constructor(public id: string, public defaultExpression: Expression | null) { super(); }

  public analyze(context: Context) {
    if (this.defaultExpression != null) {
      this.defaultExpression.analyze(context);
    }
    context.add(this);
  }

  public optimize(): Parameter {
    if (this.defaultExpression != null) {
      this.defaultExpression = this.defaultExpression.optimize();
    }
    return this;
  }

  get isRequired(): boolean {
    return this.defaultExpression === null;
  }
}
