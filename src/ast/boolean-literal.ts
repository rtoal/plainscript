import { AstNode } from '../type-definitions/plainscript-types';

export default class BooleanLiteral extends AstNode<BooleanLiteral> {
  constructor(public value: boolean) { super(); }
}
