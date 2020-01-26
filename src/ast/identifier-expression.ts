'use strict';

import Context from '../semantics/context';
import { IAstNode, Referent } from '../type-definitions/plainscript-types';

export default class IdentifierExpression implements IAstNode<IdentifierExpression> {
  public referent!: Referent;
  constructor(public id: string) { }

  // Whenever an expression is a simple identifer, it must refer to something
  // previously declared. Identifier expressions aren't the same things as
  // variables; instead, they refer to variables. That's why each identifier
  // expression keeps a reference to the variable, function, or parameter to
  // which it refers. The referent is found at semantic analysis time (not at
  // parse time).
  public analyze(context: Context): void {
    this.referent = context.lookup(this.id);
  }

  public optimize(): IdentifierExpression {
    return this;
  }

  // Depends on the target language, thus gets filled in
  // by the necessary generator at runtime.
  public gen() { }
}
