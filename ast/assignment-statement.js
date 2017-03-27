module.exports = class AssignmentStatement {
  constructor(targets, sources) {
    this.targets = targets;
    this.sources = sources;
  }

  analyze(context) {
    this.targets.forEach(v => v.analyze(context));
    this.sources.forEach(e => e.analyze(context));
  }
};
