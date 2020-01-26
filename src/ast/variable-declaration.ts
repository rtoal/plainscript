import Context from '../semantics/context';
import { Expression, IAstNode } from '../type-definitions/plainscript-types';
import Variable from './variable';

export default class VariableDeclaration implements IAstNode<VariableDeclaration> {
  // Gets assigned in the analyze method
  // so we put a bang here to calm the
  // compiler down.
  public variables!: Variable[];
  constructor(public ids: string[], public initializers: Expression[]) { }

  public analyze(context: Context): void {
    if (this.ids.length !== this.initializers.length) {
      throw new Error('Number of variables does not equal number of initializers');
    }
    // We don't want the declared variables to come into scope until after the
    // declaration line, so we will analyze all the initializing expressions
    // first.
    this.initializers.forEach((e: Expression) => e.analyze(context));
    // Now we can create actual variable objects and add to the current context.
    this.variables = this.ids.map((id: string) => new Variable(id));
    this.variables.forEach((variable: Variable) => context.add(variable));
  }

  public optimize(): VariableDeclaration {
    return this;
  }

  // Depends on the target language, thus gets filled in
  // by the necessary generator at runtime.
  public gen() { }
}
