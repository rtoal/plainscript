
import Context from '../semantics/context';
import { AstNode, Expression, Literal } from '../type-definitions/plainscript-types';
import BooleanLiteral from './boolean-literal';
import NumericLiteral from './numeric-literal';

export default class UnaryExpression extends AstNode<UnaryExpression> {
  constructor(public op: string, public operand: Expression) { super(); }

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
}
