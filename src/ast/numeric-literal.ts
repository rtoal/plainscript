import { AstNode } from '../type-definitions/plainscript-types';

export default class NumericLiteral extends AstNode<NumericLiteral> {
  constructor(public value: number) { super(); }
}
