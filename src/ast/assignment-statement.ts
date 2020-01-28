import Context from '../semantics/context';
import Expression from './abstract/expression';
import Statement from './abstract/statement';
import VariableExpression from './abstract/variable-expression';

export default class AssignmentStatement extends Statement {
  constructor(public targets: VariableExpression[], public sources: Expression[]) { super(); }

  public analyze(context: Context): void {
    if (this.targets.length !== this.sources.length) {
      throw new Error('Number of variables does not equal number of expressions');
    }
    this.sources.forEach((e) => e.analyze(context));
    this.targets.forEach((v) => v.analyze(context));
  }
}
