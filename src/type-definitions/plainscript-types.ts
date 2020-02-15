
/**
 * Functions as a namespace for type aliases and interfaces
 * that are used commonly throughout the ast files.
 */

import Statement from '../ast/abstract/statement';
import Context from '../semantics/context';

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
