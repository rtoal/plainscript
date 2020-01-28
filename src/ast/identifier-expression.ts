'use strict';

import Context from '../semantics/context';
import Referent from './abstract/referent';
import VariableExpression from './abstract/variable-expression';

export default class IdentifierExpression extends VariableExpression {
  public referent!: Referent;
  constructor(public id: string) { super(); }

  // Whenever an expression is a simple identifer, it must refer to something
  // previously declared. Identifier expressions aren't the same things as
  // variables; instead, they refer to variables. That's why each identifier
  // expression keeps a reference to the variable, function, or parameter to
  // which it refers. The referent is found at semantic analysis time (not at
  // parse time).
  public analyze(context: Context): void {
    this.referent = context.lookup(this.id);
  }
}
