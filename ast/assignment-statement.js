module.exports = class AssignmentStatement {
  constructor(targets, sources) {
    Object.assign(this, { targets, sources });
  }

  analyze(context) {
    if (this.targets.length !== this.sources.length) {
      throw new Error('Number of variables does not equal number of expressions');
    }
    this.sources.forEach(e => e.analyze(context));
    this.targets.forEach(v => v.analyze(context));
  }

  optimize() {
    this.sources.forEach(e => e.optimize());
    this.targets.forEach(v => v.optimize());
    // Suggested: Turn self-assignments without side-effects to null
    return this;
  }
};
