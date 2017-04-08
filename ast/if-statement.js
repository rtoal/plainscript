module.exports = class IfStatement {
  constructor(cases, alternate) {
    Object.assign(this, { cases, alternate });
  }

  analyze(context) {
    this.cases.forEach(c => c.analyze(context.createChildContextForBlock()));
    if (this.alternate) {
      this.alternate.forEach(s => s.analyze(context.createChildContextForBlock()));
    }
  }

  optimize() {
    this.cases.forEach(s => s.optimize()).filter(s => s !== null);
    this.alternate = this.alternate.optimize();
    return this;
  }
};
