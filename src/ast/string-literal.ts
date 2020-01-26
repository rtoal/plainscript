import { AstNode } from '../type-definitions/plainscript-types';

export default class StringLiteral extends AstNode<StringLiteral> {
  constructor(public value: string) { super(); }
}
