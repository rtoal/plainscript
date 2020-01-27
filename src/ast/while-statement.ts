import Context from '../semantics/context';
import { AstNode, Statement } from '../type-definitions/plainscript-types';
import BooleanLiteral from './boolean-literal';

export default class WhileStatement extends AstNode<WhileStatement> {
  constructor(public test: BooleanLiteral, public body: Statement[]) { super(); }

  public analyze(context: Context) {
    this.test.analyze(context);
    const bodyContext: Context = context.createChildContextForLoop();
    this.body.forEach((s) => s.analyze(bodyContext));
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
}
