import Context from '../semantics/context';
import Expression from './abstract/expression';
import Variable from './variable';

export default class VariableDeclaration extends Expression {
  // Gets assigned in the analyze method
  // so we put a bang here to calm the
  // compiler down.
  public variables!: Variable[];
  constructor(public ids: string[], public initializers: Expression[]) {
    super();
  }

  public analyze(context: Context): void {
    if (this.ids.length !== this.initializers.length) {
      throw new Error('Number of variables does not equal number of initializers');
    }
    // We don't want the declared variables to come into scope until after the
    // declaration line, so we will analyze all the initializing expressions
    // first.
    this.initializers.forEach(e => e.analyze(context));
    // Now we can create actual variable objects and add to the current context.
    this.variables = this.ids.map(id => new Variable(id));
    this.variables.forEach(variable => context.add(variable));
  }
}
