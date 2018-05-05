def fib(n):
    let a, b = 0, 1
    while b < n:
        a, b = b, a + b
    return a

print(fib(5))
print(fib(10))
