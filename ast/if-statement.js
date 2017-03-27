module.exports = class IfStatement {
  constructor(cases, alternate) {
    this.cases = cases;
    this.alternate = alternate;
  }

  analyze(context) {
    this.cases.forEach(c => c.analyze(context.createChildContextForBlock()));
    if (this.alternate) {
      this.alternate.forEach(s => s.analyze(context.createChildContextForBlock()));
    }
  }
};
