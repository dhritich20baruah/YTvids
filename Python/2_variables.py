# Variables contain data. Unlike Javascript where we use Const or let to declare variables python does not have a command for that.
# A variable is created just by assigning a value to it
x = 5
y = "Hello"
print("x =", x)
print("y =", y) 

# We do not have to declare the type of the variable like string or integer and the type can even change after they are set
x = "String"
print("x =", x)

#Casting can specify the data type of a variable
x = str(3)
y = int(3)
z = float(3)
print(x, y, z)

# We can get variable type by using type() function
print(type(x))
print(type(y))

# Variables names are case sensitive
a = 4
A = "Four"
# Here a is not equal to A

# Variable name must start with a letter or underscore. Cannot start with number. Name can contain only alpha numeric characters and undescores
# Names are case sensitive and cannot be a pyhton key word

abc = "variable"
a_bc = "vari"
_abc = "ava"
ABC = "var"
abc2 = "var"

# 2abc = "var" wrong
# a bc = "var" also wrong

# For multiple worded variable names
variableName = 2 #Camel case
VariableName = 2 #Pascal case
variable_name = 2 #Snake case

# Multiple variables Assign multiple variables in one line
x, y, z = "pen", "paper", "pencil"
print(x)
print(y)
print(z)

# One value to multiple variables
q = w = e = "eraser"
print(q)
print(w)
print(e)

# Output multiple variables
print(x , y, z)
# Also
print(x + y + z)

c = 5
v = 7
print(c + v)

# If we combine string and number it will give an error
# print(x + c)

# variable created outside of a function are called global variables
#we will discuss about functions later on
z = "global"
def myfunc():
    z = "variable"
    print(z)

myfunc()

print(z)

# We can create a global variable inside a function by using the global key word
def myfunc2():
    global v
    v = "global in func"
    print(v)

myfunc2()
