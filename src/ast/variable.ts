import { AstNode } from '../type-definitions/plainscript-types';

export default class Variable extends AstNode<Variable> {
  constructor(public id: string) { super(); }
}
