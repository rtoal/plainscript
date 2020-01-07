def f(a, b, n):
    if n == 0:
        return a
    return f(b, a + b, n - 1)

def fib(n):
    return f(0, 1, n)

print(fib(5))
print(fib(10))
