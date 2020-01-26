import Parameter from '../ast/parameter';
import Context from '../semantics/context';
import { AstNode, Body } from '../type-definitions/plainscript-types';
import FunctionObject from './function-object';

// A function declaration binds a function object to a name.
export default class FunctionDeclaration extends AstNode<FunctionDeclaration> {
  public function: FunctionObject;

  constructor(public id: string, params: Parameter[], body: Body) {
    super();
    this.id = id;
    this.function = new FunctionObject(this.id, params, body);
  }

  public analyze(context: Context) {
    context.add(this.function);
    this.function.analyze(context.createChildContextForFunctionBody(this));
  }
}
