import Context from '../semantics/context';
import { Body, IAstNode, Parameter } from '../type-definitions/ast';
import FunctionObject from './function-object';
// A function declaration binds a function object to a name.
export default class FunctionDeclaration implements IAstNode<FunctionDeclaration> {
  public declaredFunction: FunctionObject;

  constructor(
    public id: string,
    public params: Parameter,
    public body: Body,
  ) {
    this.declaredFunction = new FunctionObject(id, params, body);
  }

  public analyze(context: Context) {
    context.add(this.declaredFunction);
    this.declaredFunction.analyze(context.createChildContextForFunctionBody(this));
  }

  // Depends on the target language, thus gets filled in
  // by the necessary generator at runtime.
  public gen() { }
}
