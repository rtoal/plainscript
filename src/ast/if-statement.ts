import Context from '../semantics/context';
import BinaryExpression from './binary-expression';
import Statement from './statement';

export default class IfStatement extends Statement {
  constructor(public tests: BinaryExpression[],
              public consequents: Statement[][],
              public alternate: Statement[] | null) { super(); }

  public analyze(context: Context): void {
    this.tests.forEach((test) => test.analyze(context));
    this.consequents.forEach((block) => {
      const blockContext = context.createChildContextForBlock();
      block.forEach((statement: Statement) => statement.analyze(blockContext));
    });
    if (this.alternate) {
      this.alternate.forEach((s) => s.analyze(context.createChildContextForBlock()));
    }
  }

  public optimize(): IfStatement {
    this.tests.map((test) => test.optimize());
    // Suggested: for a false test, remove the corresponding consequent
    this.consequents.forEach((block) => {
      block.map((s: Statement) => s.optimize())
        .filter((s: Statement) => s != null);
      // Suggested: Look for breaks/returns in the middle of the body
    });
    this.alternate = this.alternate ? this.alternate.map((s) => s.optimize()) : null;
    return this;
  }
}
