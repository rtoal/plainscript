import { AstNode } from '../type-definitions/plainscript-types';

export default class Variable extends AstNode {
  constructor(public id: string) { super(); }
}
