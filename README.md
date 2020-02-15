<img src="https://raw.githubusercontent.com/rtoal/plainscript/master/docs/plainscript-logo.png" width=100 height=100>

# PlainScript

PlainScript is a very plain scripting language. Its only purpose is to serve as a starting point for student language design and implementation projects.

```python
def sum_of_digits(n):
    if n < 0:
        return sum_of_digits(-n)
    elif n < 10:
        return n
    else:
        return sum_of_digits(n / 10) + (n % 10)

print(sum_of_digits(n: 8835299))
```

## The Language

The language is described in some detail at the <a href="https://rtoal.github.io/plainscript/">language home page</a>.</p>

## Using PlainScript

The PlainScript compiler is now written in <a href="https://rtoal.https://www.typescriptlang.org/.io/plainscript/">TypeScript</a>! This means running PlainScript requires building the source code before being able to run PlainScript. Clone the repository, and in its root directory run one of the following commands depending on your preferred package manager:

# Yarn
`yarn && tsc`

# npm
`npm i && tsc`

The compiled JavaScript is output to the `built` folder. You can now run `built/PlainScript.js` or `node built/PlainScript.js` run the compiler!

## A PlainScript Compiler

This project hosts a simple compiler that reads a PlainScript program from a file, translates it to JavaScript, and outputs the JavaScript code to standard output. It supports three options, <tt>-a</tt> (to display the abstract syntax tree then stop), <tt>-i</tt> (to display the analyzed semantic graph then stop), and <tt>-o</tt> (to turn optimizations on). Given the PlainScript program:

```javascript
let x = 5 + 8
if true:
  print(-x)
```

invoking the compiler with the <tt>-a</tt> option outputs the abstract syntax tree for the program to standard output:
```
$ ./built/plainscript.js -a example.pls
```
produces
```
Program {
  statements:
   [ VariableDeclaration {
       ids: [ 'x' ],
       initializers:
        [ BinaryExpression {
            op: '+',
            left: NumericLiteral { value: 5 },
            right: NumericLiteral { value: 8 } } ] },
     IfStatement {
       cases:
        [ Case {
            test: BooleanLiteral { value: true },
            body:
             [ CallStatement {
                 call:
                  Call {
                    callee: IdentifierExpression { id: 'print' },
                    args:
                     [ Argument {
                         id: null,
                         expression: UnaryExpression { op: '-', operand: IdentifierExpression { id: 'x' } } } ] } } ] } ],
       alternate: null } ] }
```
The <tt>-i</tt> flag does semantic analysis, and writes out the decorated abstract syntax tree. So

```
$ ./built/plainscript.js example.pls -i
```

produces

```
Program {
  statements:
   [ VariableDeclaration {
       ids: [ 'x' ],
       initializers:
        [ BinaryExpression {
            op: '+',
            left: NumericLiteral { value: 5 },
            right: NumericLiteral { value: 8 } } ],
       variables: [ Variable { id: 'x' } ] },
     IfStatement {
       cases:
        [ Case {
            test: BooleanLiteral { value: true },
            body:
             [ CallStatement {
                 call:
                  Call {
                    callee:
                     IdentifierExpression {
                       id: 'print',
                       referent:
                        FunctionObject {
                          id: 'print',
                          params: [ Parameter { id: '_', defaultExpression: null } ],
                          body: null,
                          requiredParameterNames: Set { '_' },
                          allParameterNames: Set { '_' } } },
                    args:
                     [ Argument {
                         id: null,
                         expression:
                          UnaryExpression {
                            op: '-',
                            operand: IdentifierExpression { id: 'x', referent: Variable { id: 'x' } } } } ] } } ] } ],
       alternate: null } ] }
```

Finally, here’s an example performing a full translation to JavaScript:

```
$ ./built/plainscript.js example.pls
function print_1(_) {console.log(_);}
function sqrt_2(_) {return Math.sqrt(_);}
let x_3 = (5 + 8);
if (true) {
  print_1((- x_3));
}
```

You can use the optimization flag <code>-o</code> with our without the <code>-i</code> flag. In our little example, the optimizer will detect a constant folding opportunity and a conditional case that is always executed. The resulting JavaScript will be:


```
$ ./plainscript.js example.pls
function print_1(_) {console.log(_);}
function sqrt_2(_) {return Math.sqrt(_);}
let x_3 = 13;
print_1((- x_3));
```

The compiler does not (yet?) perform copy propagation and dead code elimination. That would be nice.
