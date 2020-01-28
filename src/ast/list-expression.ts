import Context from '../semantics/context';
import Expression from './abstract/expression';

export default class ListExpression extends Expression {
  constructor(public members: Expression[]) { super(); }

  public analyze(context: Context): void {
    this.members.forEach((member) => member.analyze(context));
  }

  public optimize(): ListExpression {
    this.members = this.members.map((member) => member.optimize());
    return this;
  }
}
