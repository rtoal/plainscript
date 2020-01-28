
/**
 * Functions as a namespace for type aliases and interfaces
 * that are used commonly throughout the ast files.
 */

import BinaryExpression from '../ast/binary-expression';
import BooleanLiteral from '../ast/boolean-literal';
import Call from '../ast/call';
import FunctionObject from '../ast/function-object';
import IdentifierExpression from '../ast/identifier-expression';
import ListExpression from '../ast/list-expression';
import NumericLiteral from '../ast/numeric-literal';
import Parameter from '../ast/parameter';
import Statement from '../ast/Statement';
import StringLiteral from '../ast/string-literal';
import SubscriptedExpression from '../ast/subscripted-expression';
import UnaryExpression from '../ast/unary-expression';
import Variable from '../ast/variable';
import Context from '../semantics/context';

export type Literal = NumericLiteral | StringLiteral | BooleanLiteral;
export type Referent = FunctionObject | Parameter | Variable;

export type VariableExpression = IdentifierExpression | SubscriptedExpression;

export type Expression = BinaryExpression | UnaryExpression | Literal | ListExpression
    | Call | VariableExpression;

export type Body = Statement[];

export class AstNode {
    public analyze(_: Context): void {}

    public optimize(): any {
        return this;
    }

    // Depends on the target language, thus gets filled in
    // by the necessary generator at runtime.
    public gen(): any {}
}
