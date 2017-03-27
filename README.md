# Carlitos

A small scripting language, not quite a subset of the older Carlos language. Come to think of it, it’s not very much like Carlos at all; it’s more of a subset of Python. Here’s an example script:

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

Yep, that looks a lot like Python. But there are some differences.

See the file [carlitos.ohm](https://github.com/rtoal/carlitos/blob/master/syntax/carlitos.ohm) for the official syntax.

## Features



More documentation on its way.
