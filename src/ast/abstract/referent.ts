import { AstNode } from '../../type-definitions/plainscript-types';

export default abstract class Referent extends AstNode {
    constructor(public id: string) {
        super();
    }
}
