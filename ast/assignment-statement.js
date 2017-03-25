class AssignmentStatement {
  constructor(targets, sources) {
    this.targets = targets;
    this.sources = sources;
  }
  toString() {
    return `(Assign [${this.targets.join(' ')}] [${this.sources.join(' ')}])`;
  }
}

module.exports = AssignmentStatement;
