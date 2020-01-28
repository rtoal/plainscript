import Context from '../semantics/context';
import Expression from './abstract/expression';
import Referent from './abstract/referent';

export default class Parameter extends Referent {
  constructor(id: string, public defaultExpression: Expression | null) { super(id); }

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
