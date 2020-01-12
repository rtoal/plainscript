import Context from '../semantics/context';
import { IAstNode, Statement } from '../type-definitions/ast';

export default class Program implements IAstNode<Program> {
  constructor(public statements: Statement[]) { }

  public analyze(): void {
    const context = new Context({ parent: Context.INITIAL });
    this.statements.forEach((s: Statement) => s.analyze(context));
  }

  public optimize(): Program {
    this.statements.map((s: Statement) => s.optimize())
      .filter((s) => s !== null);
    return this;
  }

  // Depends on the target language, thus gets filled in
  // by the necessary generator at runtime.
  public gen() { }
}
