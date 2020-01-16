"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const function_object_1 = __importDefault(require("./function-object"));
// A function declaration binds a function object to a name.
class FunctionDeclaration {
    constructor(id, params, body) {
        this.id = id;
        this.id = id;
        this.function = new function_object_1.default(this.id, params, body);
    }
    analyze(context) {
        context.add(this.function);
        this.function.analyze(context.createChildContextForFunctionBody(this));
    }
    // Depends on the target language, thus gets filled in
    // by the necessary generator at runtime.
    gen() { }
}
exports.default = FunctionDeclaration;
