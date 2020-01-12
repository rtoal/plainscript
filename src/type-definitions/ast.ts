
/**
 * Functions as a namespace for type aliases and interfaces
 * that are used commonly throughout the ast files.
 */

import AssignmentStatement from '../ast/assignment-statement';
import BooleanLiteral from '../ast/boolean-literal';
import BreakStatement from '../ast/break-statement';
import NumericLiteral from '../ast/numeric-literal';
import ReturnStatement from '../ast/return-statement';
import StringLiteral from '../ast/string-literal';
import Context from '../semantics/context';

export type Entity = any;
export type Body = any;
export type Parameter = any;
export type Statement = AssignmentStatement | BreakStatement | ReturnStatement;
export type Expression = any;
export type Literal = NumericLiteral | StringLiteral | BooleanLiteral;

export interface IAstNode<T> {
    analyze(context?: Context): void;
    optimize?(): T | Literal | void | null;
}
