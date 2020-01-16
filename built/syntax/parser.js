"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
const fs = __importStar(require("fs"));
const ohm_js_1 = __importDefault(require("ohm-js"));
const argument_1 = __importDefault(require("../ast/argument"));
const assignment_statement_1 = __importDefault(require("../ast/assignment-statement"));
const binary_expression_1 = __importDefault(require("../ast/binary-expression"));
const boolean_literal_1 = __importDefault(require("../ast/boolean-literal"));
const break_statement_1 = __importDefault(require("../ast/break-statement"));
const call_1 = __importDefault(require("../ast/call"));
const function_declaration_1 = __importDefault(require("../ast/function-declaration"));
const identifier_expression_1 = __importDefault(require("../ast/identifier-expression"));
const if_statement_1 = __importDefault(require("../ast/if-statement"));
const list_expression_1 = __importDefault(require("../ast/list-expression"));
const numeric_literal_1 = __importDefault(require("../ast/numeric-literal"));
const parameter_1 = __importDefault(require("../ast/parameter"));
const program_1 = __importDefault(require("../ast/program"));
const return_statement_1 = __importDefault(require("../ast/return-statement"));
const string_literal_1 = __importDefault(require("../ast/string-literal"));
const subscripted_expression_1 = __importDefault(require("../ast/subscripted-expression"));
const unary_expression_1 = __importDefault(require("../ast/unary-expression"));
const variable_declaration_1 = __importDefault(require("../ast/variable-declaration"));
const while_statement_1 = __importDefault(require("../ast/while-statement"));
const preparser_1 = __importDefault(require("./preparser"));
const grammar = ohm_js_1.default.grammar(fs.readFileSync('src/syntax/plainscript.ohm', 'utf-8'));
// Ohm turns `x?` into either [x] or [], which we should clean up for our AST.
function arrayToNullable(a) {
    return a.length === 0 ? null : a[0];
}
/* eslint-disable no-unused-vars */
const astGenerator = grammar.createSemantics().addOperation('ast', {
    Program(_1, body, _2) {
        return new program_1.default(body.ast());
    },
    Stmt_simple(statement, _) {
        return statement.ast();
    },
    Stmt_while(_, test, suite) {
        return new while_statement_1.default(test.ast(), suite.ast());
    },
    Stmt_if(_1, firstTest, firstSuite, _2, moreTests, moreSuites, _3, lastSuite) {
        const tests = [firstTest.ast()].concat(moreTests.ast());
        const consequents = [firstSuite.ast()].concat(moreSuites.ast());
        const alternate = arrayToNullable(lastSuite.ast());
        return new if_statement_1.default(tests, consequents, alternate);
    },
    Stmt_def(_1, id, _2, params, _3, suite) {
        return new function_declaration_1.default(id.ast(), params.ast(), suite.ast());
    },
    SimpleStmt_vardecl(_1, v, _2, e) {
        return new variable_declaration_1.default(v.ast(), e.ast());
    },
    SimpleStmt_assign(v, _, e) {
        return new assignment_statement_1.default(v.ast(), e.ast());
    },
    SimpleStmt_break(_) {
        return new break_statement_1.default();
    },
    SimpleStmt_return(_, e) {
        return new return_statement_1.default(arrayToNullable(e.ast()));
    },
    Suite_small(_1, statement, _2) {
        return [statement.ast()];
    },
    Suite_large(_1, _2, _3, statements, _4) {
        return statements.ast();
    },
    Exp_or(left, op, right) {
        return new binary_expression_1.default(op.ast(), left.ast(), right.ast());
    },
    Exp_and(left, op, right) {
        return new binary_expression_1.default(op.ast(), left.ast(), right.ast());
    },
    Exp1_binary(left, op, right) {
        return new binary_expression_1.default(op.ast(), left.ast(), right.ast());
    },
    Exp2_binary(left, op, right) {
        return new binary_expression_1.default(op.ast(), left.ast(), right.ast());
    },
    Exp3_binary(left, op, right) {
        return new binary_expression_1.default(op.ast(), left.ast(), right.ast());
    },
    Exp4_unary(op, operand) {
        return new unary_expression_1.default(op.ast(), operand.ast());
    },
    Exp5_list(_1, expressions, _2) {
        return new list_expression_1.default(expressions.ast());
    },
    Exp5_parens(_1, expression, _2) {
        return expression.ast();
    },
    Call(callee, _1, args, _2) {
        return new call_1.default(callee.ast(), args.ast());
    },
    VarExp_subscripted(v, _1, e, _2) {
        return new subscripted_expression_1.default(v.ast(), e.ast());
    },
    VarExp_simple(id) {
        return new identifier_expression_1.default(id.ast());
    },
    Param(id, _, exp) {
        return new parameter_1.default(id.ast(), arrayToNullable(exp.ast()));
    },
    Arg(id, _, exp) {
        return new argument_1.default(arrayToNullable(id.ast()), exp.ast());
    },
    NonemptyListOf(first, _, rest) {
        return [first.ast()].concat(rest.ast());
    },
    EmptyListOf() {
        return [];
    },
    boollit(_) {
        return new boolean_literal_1.default(!!this.sourceString);
    },
    numlit(_1, _2, _3, _4, _5, _6) {
        return new numeric_literal_1.default(+this.sourceString);
    },
    strlit(_1, chars, _6) {
        return new string_literal_1.default(this.sourceString.toString());
    },
    id(_1, _2) {
        return this.sourceString;
    },
    _terminal() {
        return this.sourceString;
    },
});
/* eslint-enable no-unused-vars */
function parse(text) {
    const match = grammar.match(preparser_1.default(text));
    if (!match.succeeded()) {
        throw new Error(`Syntax Error: ${match.message}`);
    }
    return astGenerator(match).ast();
}
exports.default = parse;
