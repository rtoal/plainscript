import Context from '../semantics/context';
import { Body, IAstNode } from '../type-definitions/plainscript';
import FunctionObject from './function-object';
// A function declaration binds a function object to a name.
export default class FunctionDeclaration implements IAstNode<FunctionDeclaration> {
  public function: FunctionObject;

  constructor(public id: string, params: Entity, body: Body) {
    this.id = id;
    this.function = new FunctionObject(this.id, params, body);
  }

  public analyze(context: Context) {
    context.add(this.function);
    this.function.analyze(context.createChildContextForFunctionBody(this));
  }

  // Depends on the target language, thus gets filled in
  // by the necessary generator at runtime.
  public gen() { }
}
