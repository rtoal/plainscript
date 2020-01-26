import Context from '../semantics/context';
import { Expression, IAstNode } from '../type-definitions/plainscript-types';

export default class ListExpression implements IAstNode<ListExpression> {
  constructor(public members: Expression[]) { }

  public analyze(context: Context): void {
    this.members.forEach((member: Expression) => member.analyze(context));
  }

  public optimize(): ListExpression {
    this.members = this.members.map((member) => member.optimize());
    return this;
  }

  // Depends on the target language, thus gets filled in
  // by the necessary generator at runtime.
  public gen() { }
}
