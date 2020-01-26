import Context from '../semantics/context';
import { IAstNode } from '../type-definitions/plainscript-types';

export default class AssignmentStatement implements IAstNode<AssignmentStatement> {
  constructor(public targets: any[], public sources: any[]) { }

  public analyze(context: Context): void {
    if (this.targets.length !== this.sources.length) {
      throw new Error('Number of variables does not equal number of expressions');
    }
    this.sources.forEach((e) => e.analyze(context));
    this.targets.forEach((v) => v.analyze(context));
  }

  public optimize(): AssignmentStatement {
    return this;
  }

  // Depends on the target language, thus gets filled in
  // by the necessary generator at runtime.
  public gen() { }
}
