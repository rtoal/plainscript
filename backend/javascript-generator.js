/*
 * JavaScript Generator Module
 *
 * This module exports a single function that produces a JavaScript script from
 * an AST.
 *
 * const generateJavaScript = require('./backend/javascript-generator');
 *
 * generateJavaScript(program);
 */

const Context = require('../semantics/context');

module.exports = (program) => {
  gen(program);
};

const indentPadding = 2;
let indentLevel = 0;

function emit(line) {
  console.log(`${' '.repeat(indentPadding * indentLevel)}${line}`);
}

function emitStatementList(statements) {
  indentLevel += 1;
  statements.forEach(gen);
  indentLevel -= 1;
}

function makeOp(op) {
  return { not: '!', and: '&&', or: '||', '==': '===', '!=': '!==' }[op] || op;
}

// javaScriptVariable(v) takes a PlainScript object with an id property, such
// as a Variable, Parameter, or FunctionDeclaration, and produces a JavaScript
// variable, something like '_v1' or '_v503'. It uses a cache so it can return
// the same exact string each time it is called with a particular entity.
const javaScriptVariable = (() => {
  let lastId = 0;
  const map = new Map();
  return (v) => {
    if (!(map.has(v))) {
      map.set(v, ++lastId); // eslint-disable-line no-plusplus
    }
    return `_v${map.get(v)}`;
  };
})();

function bracketIfNecessary(a) {
  if (a.length === 1) {
    return `${a}`;
  }
  return `[${a.join(', ')}]`;
}

function gen(e) {
  return generator[e.constructor.name](e);
}

const generator = {

  Argument(arg) {
    return gen(arg.expression);
  },

  AssignmentStatement(s) {
    const targets = s.targets.map(gen);
    const sources = s.sources.map(gen);
    emit(`${bracketIfNecessary(targets)} = ${bracketIfNecessary(sources)};`);
  },

  BinaryExpression(e) {
    return `(${gen(e.left)} ${makeOp(e.op)} ${gen(e.right)})`;
  },

  BooleanLiteral(literal) {
    return `${literal.value}`;
  },

  BreakStatement() {
    emit('break;');
  },

  CallStatement(c) {
    emit(`${gen(c.call)};`);
  },

  Call(c) {
    // TODO: THIS ISN'T DONE YET. DO WE NEED TO PROCESS THE ARGS HERE OR PRIOR TO HERE?
    return `${javaScriptVariable(c.callee.referent)}(${c.args.map(gen).join(', ')})`;
  },

  FunctionDeclaration(f) {
    emit(`function ${javaScriptVariable(this)} (${f.params.map(gen).join(', ')}) {`);
    emitStatementList(f.body);
    emit('}');
  },

  IfStatement(s) {
    s.cases.forEach((c, index) => {
      const prefix = index === 0 ? 'if' : '} else if';
      emit(`${prefix} (${gen(c.test)}) {`);
      emitStatementList(c.body);
    });
    if (s.alternate) {
      emit('} else {');
      emitStatementList(s.alternate);
    }
    emit('}');
  },

  NumericLiteral(literal) {
    return `${literal.value}`;
  },

  Parameter(p) {
    let translation = javaScriptVariable(p);
    if (p.defaultExpression) {
      translation += ` = ${p.defaultExpression}`;
    }
    return translation;
  },

  Program(program) {
    generateLibraryFunctions();
    program.statements.forEach(gen);
  },

  ReturnStatement(s) {
    if (s.returnValue) {
      emit(`return ${gen(s.returnValue)};`);
    } else {
      emit('return;');
    }
  },

  UnaryExpression(e) {
    return `(${makeOp(e.op)} ${gen(e.operand)})`;
  },

  VariableDeclaration(v) {
    const variables = v.variables.map(gen);
    const initializers = v.initializers.map(gen);
    emit(`let ${bracketIfNecessary(variables)} = ${bracketIfNecessary(initializers)};`);
  },

  VariableExpression(v) {
    return gen(v.referent);
  },

  Variable(v) {
    return javaScriptVariable(v);
  },

  WhileStatement(s) {
    emit(`while (${gen(s.test)}) {`);
    emitStatementList(s.body);
    emit('}');
  },
};

function generateLibraryFunctions() {
  function generateLibraryStub(name, params, body) {
    const entity = Context.INITIAL.variables[name];
    emit(`function ${javaScriptVariable(entity)} (${params}) {${body}}`);
  }
  // This is sloppy. There should be a better way to do this.
  generateLibraryStub('print', 's', 'console.log(s);');
  generateLibraryStub('sqrt', 'x', 'return Math.sqrt(x);');
}
