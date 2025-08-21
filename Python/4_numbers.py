#there are three types of numbers in Python
# int float complex
q = 1 #int
w = 1.2 #float
e = 1j #complex

print(type(q))
print(type(w))
print(type(e))

#integers
x = 1
y = -12334312

#float
c = 1.1
v = 0.002
b = -12.3

#float also contain scientific numbers with an "e" to show power of 10
d = 35e2
f = -87.4E10
print(d, f)

#Complex
t = 3+5j
u = -5j
print(type(t))

#type conversion
t = 89
u = 8.9
v = 8j

#convert from int to float
q = float(t)

#convert from float to int
w = int(u)

#convert from int to complex
e = complex(t)

print(type(q))
print(type(w))
print(type(e))

#Python does not have a random() function to make a random number, but Python has a built-in module called random that can be used to make random numbers:

import random
print(random.randrange(1, 10))

#Casting
c = str(2)
d = int("2")

print(type(c))
print(type(d))
