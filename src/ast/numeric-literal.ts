import Literal from './abstract/literal';

export default class NumericLiteral extends Literal<number> {
  constructor(value: number) {
    super(value);
  }
}
