/*
 * Semantic Analysis Context
 *
 * const Context = require('./semantics/context');
 *
 * A context object holds state for the semantic analysis phase, such as the
 * enclosing function (if any), whether or not we are in a loop, a map of
 * variables defined in this scope, and the parent context.
 */

const FunctionDeclaration = require('../ast/function-declaration');
const Parameter = require('../ast/parameter');

class Context {
  constructor({ parent = null, currentFunction = null, inLoop = false } = {}) {
    this.parent = parent;
    this.variables = Object.create(null);
    this.currentFunction = currentFunction;
    this.inLoop = inLoop;
  }

  createChildContextForFunctionBody(currentFunction) {
    // When entering a new function, we're not in a loop anymore
    return new Context({ parent: this, currentFunction, inLoop: false });
  }

  createChildContextForLoop() {
    // When entering a loop body, just set the inLoop field, retain others
    return new Context({ parent: this, currentFunction: this.currentFunction, inLoop: true });
  }

  createChildContextForBlock() {
    // Retain function and loop setting
    return new Context({
      parent: this,
      currentFunction: this.currentFunction,
      inLoop: this.inLoop,
    });
  }

  addVariable(id, entity) {
    if (id in this.variables) {
      throw new Error(`Identitier ${id} already declared in this scope`);
    }
    this.variables[id] = entity;
  }

  lookup(id) {
    if (id in this.variables) {
      return this.variables[id];
    } else if (this.parent === null) {
      throw new Error(`Identifier ${id} has not been declared`);
    } else {
      return this.parent.lookup(id);
    }
  }

  assertInFunction(message) {
    if (!this.currentFunction) {
      throw new Error(message);
    }
  }

  assertIsFunction(entity) { // eslint-disable-line class-methods-use-this
    if (entity.constructor !== FunctionDeclaration) {
      throw new Error(`${entity.id} is not a function`);
    }
  }
}

Context.INITIAL = new Context();
new FunctionDeclaration('print', [new Parameter('_', null)], null).analyze(Context.INITIAL);
new FunctionDeclaration('sqrt', [new Parameter('_', null)], null).analyze(Context.INITIAL);

module.exports = Context;
