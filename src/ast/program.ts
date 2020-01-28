import Context from '../semantics/context';
import { AstNode } from '../type-definitions/plainscript-types';
import Statement from './statement';

export default class Program extends AstNode {
  constructor(public statements: Statement[]) { super(); }

  public analyze(): void {
    const context = new Context({ parent: Context.INITIAL });
    this.statements.forEach((s) => s.analyze(context));
  }

  public optimize(): Program {
    this.statements.map((s: Statement) => s.optimize())
      .filter((s) => s !== null);
    return this;
  }
}
