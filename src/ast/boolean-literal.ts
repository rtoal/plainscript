import Literal from './abstract/literal';

export default class BooleanLiteral extends Literal<boolean> {
  constructor(value: boolean) { super(value); }
}
