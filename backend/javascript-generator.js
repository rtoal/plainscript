/*
 * Translation to JavaScript
 *
 * Requiring this module adds a gen() method to each of the AST classes.
 * Nothing is actually exported from this module.
 *
 * Generally, calling e.gen() where e is an expression node will return the
 * JavaScript translation as a string, while calling s.gen() where s is a
 * statement-level node will write its translation to standard output.
 *
 *   require('./backend/javascript-generator');
 *   program.gen();
 */

const Context = require('../semantics/context');
const Program = require('../ast/program');
const VariableDeclaration = require('../ast/variable-declaration');
const AssignmentStatement = require('../ast/assignment-statement');
const BreakStatement = require('../ast/break-statement');
const ReturnStatement = require('../ast/return-statement');
const IfStatement = require('../ast/if-statement');
const WhileStatement = require('../ast/while-statement');
const CallStatement = require('../ast/call-statement');
const FunctionDeclaration = require('../ast/function-declaration');
const FunctionObject = require('../ast/function-object');
const BinaryExpression = require('../ast/binary-expression');
const UnaryExpression = require('../ast/unary-expression');
const IdentifierExpression = require('../ast/identifier-expression');
const SubscriptedExpression = require('../ast/subscripted-expression');
const Variable = require('../ast/variable');
const Call = require('../ast/call');
const Parameter = require('../ast/parameter');
const Argument = require('../ast/argument');
const BooleanLiteral = require('../ast/boolean-literal');
const NumericLiteral = require('../ast/numeric-literal');
const StringLiteral = require('../ast/string-literal');

const indentPadding = 2;
let indentLevel = 0;

function emit(line) {
  console.log(`${' '.repeat(indentPadding * indentLevel)}${line}`);
}

function genStatementList(statements) {
  indentLevel += 1;
  statements.forEach(statement => statement.gen());
  indentLevel -= 1;
}

function makeOp(op) {
  return { not: '!', and: '&&', or: '||', '==': '===', '!=': '!==' }[op] || op;
}

// jsName(e) takes any PlainScript object with an id property, such as a
// Variable, Parameter, or FunctionDeclaration, and produces a JavaScript
// name by appending a unique indentifying suffix, such as '_1' or '_503'.
// It uses a cache so it can return the same exact string each time it is
// called with a particular entity.
const jsName = (() => {
  let lastId = 0;
  const map = new Map();
  return (v) => {
    if (!(map.has(v))) {
      map.set(v, ++lastId); // eslint-disable-line no-plusplus
    }
    return `${v.id}_${map.get(v)}`;
  };
})();

// This is a nice helper for variable declarations and assignment statements.
// The AST represents both of these with lists of sources and lists of targets,
// but when writing out JavaScript it seems silly to write `[x] = [y]` when
// `x = y` suffices.
function bracketIfNecessary(a) {
  if (a.length === 1) {
    return `${a}`;
  }
  return `[${a.join(', ')}]`;
}

function generateLibraryFunctions() {
  function generateLibraryStub(name, params, body) {
    const entity = Context.INITIAL.declarations[name];
    emit(`function ${jsName(entity)}(${params}) {${body}}`);
  }
  // This is sloppy. There should be a better way to do this.
  generateLibraryStub('print', '_', 'console.log(_);');
  generateLibraryStub('sqrt', '_', 'return Math.sqrt(_);');
}

Object.assign(Argument.prototype, {
  gen() { return this.expression.gen(); },
});

Object.assign(AssignmentStatement.prototype, {
  gen() {
    const targets = this.targets.map(t => t.gen());
    const sources = this.sources.map(s => s.gen());
    emit(`${bracketIfNecessary(targets)} = ${bracketIfNecessary(sources)};`);
  },
});

Object.assign(BinaryExpression.prototype, {
  gen() { return `(${this.left.gen()} ${makeOp(this.op)} ${this.right.gen()})`; },
});

Object.assign(BooleanLiteral.prototype, {
  gen() { return `${this.value}`; },
});

Object.assign(BreakStatement.prototype, {
  gen() { return 'break;'; },
});

Object.assign(CallStatement.prototype, {
  gen() { emit(`${this.call.gen()};`); },
});

Object.assign(Call.prototype, {
  gen() {
    const fun = this.callee.referent;
    const params = {};
    const args = Array(this.args.length).fill(undefined);
    fun.params.forEach((p, i) => { params[p.id] = i; });
    this.args.forEach((a, i) => { args[a.isPositionalArgument ? i : params[a.id]] = a; });
    return `${jsName(fun)}(${args.map(a => (a ? a.gen() : 'undefined')).join(', ')})`;
  },
});

Object.assign(FunctionDeclaration.prototype, {
  gen() { return this.function.gen(); },
});

Object.assign(FunctionObject.prototype, {
  gen() {
    emit(`function ${jsName(this)}(${this.params.map(p => p.gen()).join(', ')}) {`);
    genStatementList(this.body);
    emit('}');
  },
});

Object.assign(IdentifierExpression.prototype, {
  gen() { return this.referent.gen(); },
});

Object.assign(IfStatement.prototype, {
  gen() {
    this.cases.forEach((c, index) => {
      const prefix = index === 0 ? 'if' : '} else if';
      emit(`${prefix} (${c.test.gen()}) {`);
      genStatementList(c.body);
    });
    if (this.alternate) {
      emit('} else {');
      genStatementList(this.alternate);
    }
    emit('}');
  },
});

Object.assign(NumericLiteral.prototype, {
  gen() { return `${this.value}`; },
});

Object.assign(Parameter.prototype, {
  gen() {
    let translation = jsName(this);
    if (this.defaultExpression) {
      translation += ` = ${this.defaultExpression.gen()}`;
    }
    return translation;
  },
});

Object.assign(Program.prototype, {
  gen() {
    generateLibraryFunctions();
    this.statements.forEach(statement => statement.gen());
  },
});

Object.assign(ReturnStatement.prototype, {
  gen() {
    if (this.returnValue) {
      emit(`return ${this.returnValue.gen()};`);
    } else {
      emit('return;');
    }
  },
});

Object.assign(StringLiteral.prototype, {
  gen() { return `${this.value}`; },
});

Object.assign(SubscriptedExpression.prototype, {
  gen() {
    const base = this.variable.gen();
    const subscript = this.subscript.gen();
    return `${base}[${subscript}]`;
  },
});

Object.assign(UnaryExpression.prototype, {
  gen() { return `(${makeOp(this.op)} ${this.operand.gen()})`; },
});

Object.assign(VariableDeclaration.prototype, {
  gen() {
    const variables = this.variables.map(v => v.gen());
    const initializers = this.initializers.map(i => i.gen());
    emit(`let ${bracketIfNecessary(variables)} = ${bracketIfNecessary(initializers)};`);
  },
});

Object.assign(Variable.prototype, {
  gen() { return jsName(this); },
});

Object.assign(WhileStatement.prototype, {
  gen() {
    emit(`while (${this.test.gen()}) {`);
    genStatementList(this.body);
    emit('}');
  },
});
