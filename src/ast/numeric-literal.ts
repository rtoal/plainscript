import { AstNode } from '../type-definitions/plainscript-types';

export default class NumericLiteral extends AstNode {
  constructor(public value: number) { super(); }
}
