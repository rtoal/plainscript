import Context from '../semantics/context';
import { AstNode } from '../type-definitions/plainscript-types';
import Expression from './abstract/expression';

export default class Argument extends AstNode {
  constructor(public id: string, public expression: Expression) {
    super();
  }

  public get isPositionalArgument(): boolean {
    return !this.id;
  }

  public get isKeywordArgument(): boolean {
    // !! is a known JS idiom for casting to a boolean
    return !!this.id;
  }

  public analyze(context: Context) {
    this.expression.analyze(context);
  }

  public optimize() {
    this.expression = this.expression.optimize();
    return this;
  }
}
