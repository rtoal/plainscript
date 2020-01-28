import { AstNode } from '../type-definitions/plainscript-types';

export default class BooleanLiteral extends AstNode {
  constructor(public value: boolean) { super(); }
}
