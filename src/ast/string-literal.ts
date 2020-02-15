import Literal from './abstract/literal';

export default class StringLiteral extends Literal<string> {
  constructor(value: string) {
    super(value);
  }
}
