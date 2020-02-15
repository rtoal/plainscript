/*
 * Parser module
 *
 *   const parse from'./parser';
 *
 *   parse(text)
 *       Returns the abstract syntax tree for the given program text. This
 *       function will first pre-parse (figure out indents and dedents),
 *       then match against an Ohm grammar, then apply AST generation
 *       rules. If there are any errors, this function will throw an error.
 */
import * as fs from 'fs';
import ohm from 'ohm-js';
import Argument from '../ast/argument';
import AssignmentStatement from '../ast/assignment-statement';
import BinaryExpression from '../ast/binary-expression';
import BooleanLiteral from '../ast/boolean-literal';
import BreakStatement from '../ast/break-statement';
import Call from '../ast/call';
import FunctionDeclaration from '../ast/function-declaration';
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
import VariableDeclaration from '../ast/variable-declaration';
import WhileStatement from '../ast/while-statement';
import withIndentsAndDedents from './preparser';

const grammar = ohm.grammar(fs.readFileSync('src/syntax/plainscript.ohm', 'utf-8'));

// Ohm turns `x?` into either [x] or [], which we should clean up for our AST.
function arrayToNullable(a: any[]): null | any {
  return a.length === 0 ? null : a[0];
}
/* eslint-disable no-unused-vars */
const astGenerator = grammar.createSemantics().addOperation('ast', {
  Program(_1, body, _2) {
    return new Program(body.ast());
  },
  Stmt_simple(statement, _) {
    return statement.ast();
  },
  Stmt_while(_, test, suite) {
    return new WhileStatement(test.ast(), suite.ast());
  },
  Stmt_if(_1, firstTest, firstSuite, _2, moreTests, moreSuites, _3, lastSuite) {
    const tests = [firstTest.ast()].concat(moreTests.ast());
    const consequents = [firstSuite.ast()].concat(moreSuites.ast());
    const alternate = arrayToNullable(lastSuite.ast());
    return new IfStatement(tests, consequents, alternate);
  },
  Stmt_def(_1, id, _2, params, _3, suite) {
    return new FunctionDeclaration(id.ast(), params.ast(), suite.ast());
  },
  SimpleStmt_vardecl(_1, v, _2, e) {
    return new VariableDeclaration(v.ast(), e.ast());
  },
  SimpleStmt_assign(v, _, e) {
    return new AssignmentStatement(v.ast(), e.ast());
  },
  SimpleStmt_break(_) {
    return new BreakStatement();
  },
  SimpleStmt_return(_, e) {
    return new ReturnStatement(arrayToNullable(e.ast()));
  },
  Suite_small(_1, statement, _2) {
    return [statement.ast()];
  },
  Suite_large(_1, _2, _3, statements, _4) {
    return statements.ast();
  },
  Exp_or(left, op, right) {
    return new BinaryExpression(op.ast(), left.ast(), right.ast());
  },
  Exp_and(left, op, right) {
    return new BinaryExpression(op.ast(), left.ast(), right.ast());
  },
  Exp1_binary(left, op, right) {
    return new BinaryExpression(op.ast(), left.ast(), right.ast());
  },
  Exp2_binary(left, op, right) {
    return new BinaryExpression(op.ast(), left.ast(), right.ast());
  },
  Exp3_binary(left, op, right) {
    return new BinaryExpression(op.ast(), left.ast(), right.ast());
  },
  Exp4_unary(op, operand) {
    return new UnaryExpression(op.ast(), operand.ast());
  },
  Exp5_list(_1, expressions, _2) {
    return new ListExpression(expressions.ast());
  },
  Exp5_parens(_1, expression, _2) {
    return expression.ast();
  },
  Call(callee, _1, args, _2) {
    return new Call(callee.ast(), args.ast());
  },
  VarExp_subscripted(v, _1, e, _2) {
    return new SubscriptedExpression(v.ast(), e.ast());
  },
  VarExp_simple(id) {
    return new IdentifierExpression(id.ast());
  },
  Param(id, _, exp) {
    return new Parameter(id.ast(), arrayToNullable(exp.ast()));
  },
  Arg(id, _, exp) {
    return new Argument(arrayToNullable(id.ast()), exp.ast());
  },
  NonemptyListOf(first, _, rest) {
    return [first.ast()].concat(rest.ast());
  },
  EmptyListOf() {
    return [];
  },
  boollit(_) {
    return new BooleanLiteral(!!this.sourceString);
  },
  numlit(_1, _2, _3, _4, _5, _6) {
    return new NumericLiteral(+this.sourceString);
  },
  strlit(_1, chars, _6) {
    return new StringLiteral(this.sourceString.toString());
  },
  id(_1, _2) {
    return this.sourceString;
  },
  _terminal() {
    return this.sourceString;
  },
});

/* eslint-enable no-unused-vars */
export default function parse(text: string) {
  const match = grammar.match(withIndentsAndDedents(text));
  if (!match.succeeded()) {
    throw new Error(`Syntax Error: ${match.message}`);
  }
  return astGenerator(match).ast();
}
