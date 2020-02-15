import Context from '../semantics/context';
import Expression from './abstract/expression';
import Literal from './abstract/literal';
import BooleanLiteral from './boolean-literal';
import NumericLiteral from './numeric-literal';

export default class UnaryExpression extends Expression {
  constructor(public op: string, public operand: Expression) {
    super();
  }

  public analyze(context: Context): void {
    this.operand.analyze(context);
  }

  public optimize(): Literal<number | string | boolean> | UnaryExpression {
    this.operand = this.operand.optimize();
    if (this.op === 'not' && this.operand instanceof BooleanLiteral) {
      return new BooleanLiteral(!this.operand.value);
    } else if (this.op === '-' && this.operand instanceof NumericLiteral) {
      return new NumericLiteral(-this.operand.value);
    }
    return this;
  }
}
