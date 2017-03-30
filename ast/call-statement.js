module.exports = class CallStatement {
  constructor(c) {
    this.call = c;
  }

  analyze(context) {
    this.call.analyze(context);
  }
};
