import Context from '../semantics/context';
import Expression from './abstract/expression';
import Statement from './abstract/statement';

export default class ReturnStatement extends Statement {
  constructor(public returnValue: Expression | null) { super(); }

  public analyze(context: Context): void {
    if (this.returnValue) {
      this.returnValue.analyze(context);
    }
    context.assertInFunction('Return statement outside function');
  }

  public optimize(): ReturnStatement {
    if (this.returnValue) {
      this.returnValue = this.returnValue.optimize();
    }
    return this;
  }
}
