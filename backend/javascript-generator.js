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

// javaScriptVariable(v) takes a Variable object and produces the text for the
// corresponding variable in JavaScript, which will be something like '_v1' or
// '_v503'. It uses a cache so it can return the same exact string each time
// it is called with a particular variable.
function javaScriptVariable() {
  let lastId = 0;
  const map = Object.create(null);
  return (v) => {
    if (v in map) {
      map[v] = ++lastId; // eslint-disable-line no-plusplus
    }
    return `_v${map[v]}`;
  };
}

function gen(e) {
  return generator[e.constructor.name](e);
}

const generator = {

  Argument(arg) {
    return gen(arg.expression);
  },

  AssignmentStatement(s) {
    const targets = s.targets.forEach(gen);
    const sources = s.sources.forEach(gen);
    emit(`${targets} = ${sources};`);
  },

  BinaryExpression(e) {
    return `(${gen(e.left)} ${makeOp(e.op)} ${gen(e.right)})`;
  },

  BooleanLiteral(literal) {
    return `${literal}`;
  },

  BreakStatement() {
    emit('break;');
  },

  Call(c) {
    // TODO THIS IS NOT DONE IT ONLY CONSIDERS POSITIONAL ARGS
    emit();
  },

  FunctionDeclaration(f) {
    emit(`function ${f.id} (${f.params.map(gen).join(', ')}) {`);
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
    return `${literal}`;
  },

  Parameter(p) {
    if (p.defaultExpression) {
      return `${p.id} = ${p.defaultExpression}`;
    }
    return `${p.id}`;
  },

  Program(program) {
    indentLevel = 0;
    emit('(function () {');
    emitStatementList(program.statements);
    emit('}());');
  },

  ReturnStatement(s) {
    if (s.returnValue) {
      emit(`return ${gen(s.returnValue)}`);
    } else {
      emit('return;');
    }
  },

  UnaryExpression(e) {
    return `(${makeOp(e.op)} ${gen(e.operand)})`;
  },

  VariableDeclaration(v) {
    const variables = v.variables.forEach(gen);
    const initializers = v.initializers.forEach(gen);
    emit(`let ${variables} = ${initializers};`);
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
