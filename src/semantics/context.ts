/*
 * Semantic Analysis Context
 *
 * A context object holds state for the semantic analysis phase, such as the
 * enclosing function (if any), whether or not we are in a loop, a map of
 * declarations introduced in this scope, and the parent context.
 *
 *   import Context from './semantics/context';
 */

import FunctionDeclaration from '../ast/function-declaration';
import FunctionObject from '../ast/function-object';
import Parameter from '../ast/parameter';
import { Referent } from '../type-definitions/plainscript-types';

interface IContextSchema {
    parent?: Context | null;
    currentFunction?: FunctionObject | null;
    inLoop?: boolean;
}

export default class Context {
    public static INITIAL = new Context();
    public declarations: {[key: string]: Referent} = {};
    public inLoop: boolean;

    private parent: Context | null;
    private currentFunction: FunctionObject | null;

    // An interface is needed here to preserve the ability to destructure parameters passed into
    // the constructor. Alternatively, we *could* have tried named parameters, but TS does not
    // have named parameters for constructors.
    constructor({ parent = null, currentFunction = null, inLoop = false }: IContextSchema = {}) {
        this.parent = parent;
        this.currentFunction = currentFunction;
        this.inLoop = inLoop;
    }

    public createChildContextForFunctionBody(currentFunction: FunctionObject | null): Context {
        // When entering a new function, we're not in a loop anymore
        return new Context({ parent: this, currentFunction, inLoop: false });
    }

    public createChildContextForLoop(): Context {
        // When entering a loop body, just set the inLoop field, retain others
        return new Context({ parent: this, currentFunction: this.currentFunction, inLoop: true });
    }

    public createChildContextForBlock(): Context {
        // For a simple block (i.e., in an if-statement), we have to retain both
        // the function and loop settings.
        return new Context({ parent: this, currentFunction: this.currentFunction, inLoop: this.inLoop });
    }

    // Call this to add a new entity (which could be a variable, a function,
    // or a parameter) to this context. It will check to see if the entity's
    // identifier has already been declared in this context. It does not need
    // to check enclosing contexts because in this language, shadowing is always
    // allowed. Note that if we allowed overloading, this method would have to
    // be a bit more sophisticated.
    public add(entity: Referent) {
        if (entity.id in this.declarations) {
            throw new Error(`Identifier ${entity.id} already declared in this scope`);
        }
        this.declarations[entity.id] = entity;
    }

    // Returns the entity bound to the given identifier, starting from this
    // context and searching "outward" through enclosing contexts if necessary.
    public lookup(id: string): Referent {
        if (id in this.declarations) {
            return this.declarations[id];
        } else if (this.parent === null) {
            throw new Error(`Identifier ${id} has not been declared`);
        } else {
            return this.parent.lookup(id);
        }
    }

    public assertInFunction(message: string) {
        if (!this.currentFunction) {
            throw new Error(message);
        }
    }

    public assertIsFunction(entity: any) {
        if (!(entity instanceof FunctionObject)) {
            throw new Error(`${entity.id} is not a function`);
        }
    }
}

// Initialize built-in functions to the initial context.
new FunctionDeclaration('print', [new Parameter('_', null)], []).analyze(Context.INITIAL);
new FunctionDeclaration('sqrt', [new Parameter('_', null)], []).analyze(Context.INITIAL);
