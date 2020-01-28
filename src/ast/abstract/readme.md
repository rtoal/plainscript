# Abstract classes
These files *do not* map one to one to the matches in the PlainScript parser class and are instead here to flesh out the class hierarchy.

Abstract classes in TypeScript are never allowed to be instantiated directly and meant for other classes to derive or inherit from. They allow us to group subclasses together and give them some shared properties.

For example, this allows us to group all the statement ast classes such as `AssignmentStatement`,`BreakStatement`, `ReturnStatement`, `WhileStatement`, etc. under the umbrella of a `Statement` class. (If you were to look in the implementation of these classes you would see the listed ones `extend` from the `Statement` class). 

This also allows type checking benefits down the road, where we can specify that we have a function that takes in an input of type `Statement`. Thus we can pass in any of the subclasses the derive from `Statement` differentiating it from other `AstNode` subclasses such as the `Expression` classes.