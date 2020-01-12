
import Context from '../semantics/context';
import { Expression, IAstNode, Literal } from '../type-definitions/ast';
import BooleanLiteral from './boolean-literal';
import NumericLiteral from './numeric-literal';

export default class UnaryExpression implements IAstNode<UnaryExpression> {
  constructor(public op: string, public operand: Expression) { }

  public analyze(context: Context): void {
    this.operand.analyze(context);
  }

  public optimize(): Literal | UnaryExpression {
    this.operand = this.operand.optimize();
    if (this.op === 'not' && this.operand instanceof BooleanLiteral) {
      return new BooleanLiteral(!this.operand.value);
    } else if (this.op === '-' && this.operand instanceof NumericLiteral) {
      return new NumericLiteral(-this.operand.value);
    }
    return this;
  }

  // Depends on the target language, thus gets filled in
  // by the necessary generator at runtime.
  public gen() { }
}
