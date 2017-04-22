# PlainScript

PlainScript is a primitive scripting language whose only purpose is to serve as a starting point for student language design and implementation projects.

```python
def sum_of_digits(n):
    if n < 0:
        return sum_of_digits(-n)
    elif n < 10:
        return n
    else:
        return sum_of_digits(n / 10) + (n % 10)

print(sum_of_digits(8835299))
```

It looks a lot like Python, but it’s _not_ a Python subset. There are some differences.

See the file [plainscript.ohm](https://github.com/rtoal/plainscript/blob/master/syntax/plainscript.ohm) for the official syntax. The syntax assumes the source code has been preprocessed with indents and dedents inserted according the [Python indentation algorithm](https://docs.python.org/3/reference/lexical_analysis.html).

## Data Types

As of now, PlainScript has only two data types:
  * `number` (IEEE 754 64-bit)
  * `bool` (`true` and `false`).
  * `string` (sequences of unicode characters).

The language is dynamically and weakly typed. Types are compatible with each other as in JavaScript. Sigh.

## Declarations

There are three types of declarations: variable declarations, function declarations, and parameter declarations.

Variables are declared with `let`:
```
let x, y, z = 0, sqrt(3), "dog"
```
The expressions on the right hand side are evaluated in arbitrary order (or even in parallel) and then assigned to the newly created variables on the left hand side. The variables do not come into scope until _after_ the declaration is complete. So the following script prints `15`:
```
let x = 10
if true:
    let x = x + 5    # Right hand side refers to the outer x
    print(x)
```

Function declarations look like this:
```
def f(a, b=a+1, c=5):
    let d = 8
    if b < 0:
        return a * b + c
    f(1, b - 10)
```
Each parameter comes into scope immediately after it is declared, so parameters can use earlier parameters in their default expressions. Parameters and local variables live in the same scope. The function name belongs to the outer scope. Conceptually it is comes into existence after the definition line, so (1) you _can_ call a function recursively, but you _cannot_ call the function in the default expressions of its own parameters.

Parameters without default expressions are _required_ parameters; those with default expressions are _optional_ parameters. You may not place a required parameter after an optional one.

It is illegal to have multiple declarations of the same identifier within a scope. Scopes are:
  * the entire program
  * the parameters plus the body of a function
  * bodies of while-statements and if-statement cases.

Inner scopes make holes in outer scopes, and inner declarations always shadow outer ones.

## Expressions

A PlainScript expression is one of:
  * A boolean literal, either `true` and `false`
  * A numeric literal, e.g., 6.22e+28
  * A string literal, delimited with double quotes, containing any character except a newline, backslash, or double quote, those these can be escaped as `\n`, `\\`, or `\"`, respectively. Arbitrary characters appear with hexidecimal codepoints between `\u{` and `}`, for example `\u{1f451}` (👑).
  * A variable reference, which is either an identifier or a variable reference with a subscript.
  * An expression prefixed with `-` or `!`.
  * An infix expression with operator `+`, `-`, `*`, `/`, `%`, `<`, `<=`, `==`, `!=`, `>=`, `>`, `and`, or `or`.
  * A function call.

It is an error to reference a variable that has not been declared.

A function call has the form:
```python
f(5*3, true, c: "hi", d: 10*g(1,2))
```
The arguments are evaluated in arbitrary order (or even in parallel) and passed to the callee. An argument prefixed with a parameter name is called a _keyword_ argument; arguments not prefixed are called _positional_ arguments. Positional arguments must come before keyword arguments.

All required parameters of a function must be covered in the call. If keyword arguments are present, the identifier must match one of the parameters. It is an error to match a parameter multiple times.

## Statements

The statements are:

  * A variable declaration (defined above).
  * A function declaration (defined above).
  * An assignment statement, e.g. `x, y = y, x+y`, in which the right-hand-sides are first evaluated in arbitrary order (or even in parallel) and then assigned to the corresponding variables on the left-hand-sides, which must be previously declared.
  * A function call (defined above).
  * A `break` statement, which must appear in a loop.
  * A `return` statement, which may or may not have an expression to return. It is an error to have a return statement outside of a function body.
  * An `if` statement
  * A `while` statement

## Predefined Environment

The top-level scope of a PlainScript program extends a global environment defining:
```
def print(_):
    ...

def sqrt(_):
    ...
```

## Future Plans

This language as it stands isn’t good for much. You should extend it to make something cool. Here are things you can add:

  * Constants
  * String interpolation
  * A list type
  * A set type
  * A tuple type
  * A dictionary type
  * Operators for strings, lists, sets, tuples, and dictionaries
  * Static typing
  * Generics
  * Type inference
  * Function overloading
  * Algebraic (Sum) types
  * Pattern Matching
  * Classes
  * Processes
  * (First-class) function types
