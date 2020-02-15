import Expression from './expression';

export default abstract class Literal<T> extends Expression {
  constructor(public value: T) {
    super();
  }
}
