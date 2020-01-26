import Context from '../semantics/context';
import { AstNode, Expression } from '../type-definitions/plainscript-types';

export default class ListExpression extends AstNode<ListExpression> {
  constructor(public members: Expression[]) { super(); }

  public analyze(context: Context): void {
    this.members.forEach((member: Expression) => member.analyze(context));
  }

  public optimize(): ListExpression {
    this.members = this.members.map((member) => member.optimize());
    return this;
  }
}
