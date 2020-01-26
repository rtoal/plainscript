import Context from '../semantics/context';
import { Expression, IAstNode } from '../type-definitions/plainscript-types';

export default class Parameter implements IAstNode<Parameter> {
  constructor(public id: string, public defaultExpression: Expression | null) { }

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

  // Depends on the target language, thus gets filled in
  // by the necessary generator at runtime.
  public gen() { }
}
