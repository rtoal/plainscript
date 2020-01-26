def fib(n):
    let a, b = 0, 1
    while n > 0:
        a, b = b, a + b
        n = n - 1
    return a

print(fib(5))
