
/**
 * Functions as a namespace for type aliases and interfaces
 * that are used commonly throughout the ast files.
 */

import AssignmentStatement from '../ast/assignment-statement';
import BinaryExpression from '../ast/binary-expression';
import BooleanLiteral from '../ast/boolean-literal';
import BreakStatement from '../ast/break-statement';
import Call from '../ast/call';
import FunctionObject from '../ast/function-object';
import IdentifierExpression from '../ast/identifier-expression';
import ListExpression from '../ast/list-expression';
import NumericLiteral from '../ast/numeric-literal';
import Parameter from '../ast/parameter';
import ReturnStatement from '../ast/return-statement';
import StringLiteral from '../ast/string-literal';
import SubscriptedExpression from '../ast/subscripted-expression';
import UnaryExpression from '../ast/unary-expression';
import Variable from '../ast/variable';
import VariableDeclaration from '../ast/variable-declaration';
import Context from '../semantics/context';

export type Literal = NumericLiteral | StringLiteral | BooleanLiteral;
export type Referent = FunctionObject | Parameter | Variable;

export type Expression = BinaryExpression | UnaryExpression | Literal | ListExpression
    | Call | SubscriptedExpression | IdentifierExpression;

export type Statement = AssignmentStatement | BreakStatement | ReturnStatement | Call
    | BreakStatement | VariableDeclaration;

export type Body = Statement[];

export class AstNode<T> {
    public analyze(_: Context): void {}

    public optimize(): any {
        return this;
    }

    // Depends on the target language, thus gets filled in
    // by the necessary generator at runtime.
    public gen(): any {}
}
