/*
 * Translation to JavaScript
 *
 * Requiring this module adds a gen() method to each of the AST classes.
 * Nothing is actually exported from this module.
 *
 * Each gen() method returns a fragment of JavaScript. The gen() method on
 * the program class pretty-prints the complete JavaScript code.
 *
 *   require('./backend/javascript-generator');
 *   program.gen();
 */

import jsBeautify = require('js-beautify');

import Argument from '../ast/argument';
import AssignmentStatement from '../ast/assignment-statement';
import BinaryExpression from '../ast/binary-expression';
import BooleanLiteral from '../ast/boolean-literal';
import BreakStatement from '../ast/break-statement';
import Call from '../ast/call';
import FunctionDeclaration from '../ast/function-declaration';
import FunctionObject from '../ast/function-object';
import IdentifierExpression from '../ast/identifier-expression';
import IfStatement from '../ast/if-statement';
import ListExpression from '../ast/list-expression';
import NumericLiteral from '../ast/numeric-literal';
import Parameter from '../ast/parameter';
import Program from '../ast/program';
import ReturnStatement from '../ast/return-statement';
import StringLiteral from '../ast/string-literal';
import SubscriptedExpression from '../ast/subscripted-expression';
import UnaryExpression from '../ast/unary-expression';
import Variable from '../ast/variable';
import VariableDeclaration from '../ast/variable-declaration';
import WhileStatement from '../ast/while-statement';
import Context from '../semantics/context';
import { Statement } from '../type-definitions/plainscript-types';

const indentLevel = 2;

const opConversionDictionary: { [key: string]: string } = {
  '!=': '!==',
  '==': '===',
  'and': '&&',
  'not': '!',
  'or': '||',
};

function makeOp(op: string): string {
  return opConversionDictionary[op] || op;
}

// jsName(e) takes any PlainScript object with an id property, such as a
// Variable, Parameter, or FunctionDeclaration, and produces a JavaScript
// name by appending a unique identifying suffix, such as '_1' or '_503'.
// It uses a cache so it can return the same exact string each time it is
// called with a particular entity.
const jsName = (() => {
  let lastId = 0;
  const map = new Map();
  return (v: Variable | FunctionDeclaration | Parameter) => {
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
function bracketIfNecessary(a: string[]) {
  return (a.length === 1) ? `${a}` : `[${a.join(',')}]`;
}

function generateLibraryFunctions() {
  function generateLibraryStub(name: any, params: any, body: any) {
    const entity = Context.INITIAL.declarations[name];
    return `function ${jsName(entity)}(${params}) {${body}}`;
  }
  return [
    generateLibraryStub('print', '_', 'console.log(_);'),
    generateLibraryStub('sqrt', '_', 'return Math.sqrt(_);'),
  ].join('');
}

function generateBlock(block: Statement[]) {
  return block.map((s: Statement) => `${s.gen()};`).join('');
}

Argument.prototype.gen = function(): string | void {
  return this.expression.gen();
};

AssignmentStatement.prototype.gen = function(): string {
  const targets = this.targets.map((t: any) => t.gen());
  const sources = this.sources.map((s: any) => s.gen());
  return `${bracketIfNecessary(targets)} = ${bracketIfNecessary(sources)}`;
};

BinaryExpression.prototype.gen = function(): string {
  return `(${this.left.gen()} ${makeOp(this.op)} ${this.right.gen()})`;
};

BooleanLiteral.prototype.gen = function(): string {
  return `${this.value}`;
};

// tslint:disable-next-line: only-arrow-functions
BreakStatement.prototype.gen = function(): string {
  return 'break';
};

Call.prototype.gen = function(): string {
  const fun = this.callee.referent as FunctionObject;
  const params: {[key: string]: any} = {};
  const args = Array(this.args.length).fill(undefined);
  fun.params.forEach((p: any, i: number) => { params[p.id] = i; });
  this.args.forEach((a: any, i: number) => { args[a.isPositionalArgument ? i : params[a.id]] = a; });
  return `${jsName(fun)}(${args.map((a: any) => (a ? a.gen() : 'undefined')).join(',')})`;
};

FunctionDeclaration.prototype.gen = function(): string {
  return this.function.gen();
};

FunctionObject.prototype.gen = function(): string {
  return `function ${jsName(this)}(${this.params.map((p: any) => p.gen()).join(',')}) {
      ${generateBlock(this.body)}
    }`;
};

IdentifierExpression.prototype.gen = function(): string {
  return this.referent.gen();
};

IfStatement.prototype.gen = function(): string {
  const cases = this.tests.map((test: any, index: number) => {
    const prefix = index === 0 ? 'if' : '} else if';
    return `${prefix} (${test.gen()}) {${generateBlock(this.consequents[index])}`;
  });
  const alternate = this.alternate ? `}else{${generateBlock(this.alternate)}` : '';
  return `${cases.join('')}${alternate}}`;
};

ListExpression.prototype.gen = function(): string {
  const jsMembers = this.members.map((member: any) => member.gen());
  return `[${jsMembers.join(',')}]`;
};

NumericLiteral.prototype.gen = function(): string {
  return `${this.value}`;
};

Parameter.prototype.gen = function(): string {
  let translation = jsName(this);
  if (this.defaultExpression) {
    translation += ` = ${this.defaultExpression.gen()}`;
  }
  return translation;
};

Program.prototype.gen = function(): string {
  const libraryFunctions = generateLibraryFunctions();
  const programStatements = generateBlock(this.statements);
  const target = `${libraryFunctions}${programStatements}`;
  return jsBeautify(target, { indent_size: indentLevel });
};

ReturnStatement.prototype.gen = function(): string {
  return `return ${this.returnValue ? this.returnValue.gen() : ''}`;
};

StringLiteral.prototype.gen = function(): string {
  return `${this.value}`;
};

SubscriptedExpression.prototype.gen = function() {
  const base = this.variable.gen();
  const subscript = this.subscript.gen();
  return `${base}[${subscript}]`;
};

UnaryExpression.prototype.gen = function(): string {
  return `(${makeOp(this.op)} ${this.operand.gen()})`;
};

VariableDeclaration.prototype.gen = function(): string {
    const variables = this.variables.map((v: any) => v.gen());
    const initializers = this.initializers.map((i: any) => i.gen());
    return `let ${bracketIfNecessary(variables)} = ${bracketIfNecessary(initializers)}`;
};

Variable.prototype.gen = function(): string {
  return jsName(this);
};

WhileStatement.prototype.gen = function(): string {
  return `while (${this.test.gen()}) { ${generateBlock(this.body)} }`;
};
