import Context from '../semantics/context';
import { IAstNode, Statement } from '../type-definitions/ast';
import BooleanLiteral from './boolean-literal';

export default class WhileStatement implements IAstNode<WhileStatement> {
  constructor(public test: BooleanLiteral, public body: Statement[]) { }

  public analyze(context: Context) {
    this.test.analyze(context);
    const bodyContext: Context = context.createChildContextForLoop();
    this.body.forEach((s: Statement) => s.analyze(bodyContext));
  }

  public optimize(): WhileStatement | null {
    this.test = this.test.optimize();
    if (this.test instanceof BooleanLiteral && this.test.value === false) {
      return null;
    }
    this.body.map((s) => s.optimize()).filter((s) => s !== null);
    // Suggested: Look for returns/breaks in the middle of the body
    return this;
  }

  // Depends on the target language, thus gets filled in
  // by the necessary generator at runtime.
  public gen() { }
}
