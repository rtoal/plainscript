
/**
 * Functions as a namespace for type aliases and interfaces
 * that are used commonly throughout the ast files.
 */

import AssignmentStatement from '../ast/assignment-statement';
import BooleanLiteral from '../ast/boolean-literal';
import BreakStatement from '../ast/break-statement';
import Call from '../ast/call';
import FunctionObject from '../ast/function-object';
import NumericLiteral from '../ast/numeric-literal';
import Parameter from '../ast/parameter';
import ReturnStatement from '../ast/return-statement';
import StringLiteral from '../ast/string-literal';
import Variable from '../ast/variable';
import VariableDeclaration from '../ast/variable-declaration';
import Context from '../semantics/context';

export type Body = Statement[];
export type Expression = any;
export type Literal = NumericLiteral | StringLiteral | BooleanLiteral;
export type Referent = FunctionObject | Parameter | Variable;
export type Statement = AssignmentStatement | BreakStatement | ReturnStatement | Call
    | BreakStatement | VariableDeclaration;

export interface IAstNode<T> {
    analyze(context?: Context): void;
    optimize?(): T | Literal | void | null;
}
