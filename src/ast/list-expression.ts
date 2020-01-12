module.exports = class ListExpression {
  constructor(members) {
    this.members = members;
  }

  analyze(context) {
    this.members.forEach(member => member.analyze(context));
  }

  optimize() {
    this.members = this.members.map(member => member.optimize());
    return this;
  }
};
