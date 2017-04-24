<img src="https://raw.githubusercontent.com/rtoal/plainscript/master/docs/plainscript-logo.png" width=100 height=100>
# PlainScript

PlainScript is a very plain scripting language. Its only purpose is to serve as a starting point for student language design and implementation projects.

```
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

## A PlainScript Compiler

This project hosts a simple compiler that reads a PlainScript program from a file, translates it to JavaScript, and outputs the JavaScript code to standard output. It supports three options, <tt>-a</tt> (to display the abstract syntax tree then stop), <tt>-i</tt> (to display the analyzed semantic graph then stop), and <tt>-o</tt> (to turn optimizations on). Given the PlainScript program:

```python
let x = 5 + 8
if true:
  print(-x)
```

invoking the compiler with the <tt>-a</tt> option outputs the abstract syntax tree for the program to standard output:
```
$ ./plainscript.js -a example.pls
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
The <tt>-i</tt> flag does semantic analysis, and writes out the decorated abstract syntax tree.

TODO

Finally, here’s an example performing a full translation to JavaScript:

```
$ ./plainscript.js example.pls
function print_1 (s) {console.log(s);}
function sqrt_2 (x) {return Math.sqrt(x);}
let x_3 = (5 + 8);
if (true) {
  print_1((- x_3));
}
```
