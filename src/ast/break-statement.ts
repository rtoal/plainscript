import Context from '../semantics/context';
import Statement from './abstract/statement';

export default class BreakStatement extends Statement {
  // no constructor on purpose.

  public analyze(context: Context): void {
    if (!context.inLoop) {
      throw new Error('Break statement outside loop');
    }
  }
}
