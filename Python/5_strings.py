#Strings in python are surrounded by either single quotation marks or double quotation marks
print("hello", 'world')

#We can use quotes inside quotes as long as they don't match the quotes surrounding the string
print("It's alright")

#Assign string to a variable
a = "variable"
print(a)

#Multiline strings
x = """
    This is a
    Multiline
    String
"""
print(x)

#Strings are like arrays. Square brackets can be used to access the elements of the string
print(a[2])

#Looping through the letters in the string
for x in "variable":
    print(x)

#String Length
print(len(a))
x = len(a)
print("length =", x)

#Check string
eg_str = "The code is written in Python."
print("code" in eg_str)
if "code" in eg_str:
    print("Yes, code is present.")

print("javascript" not in eg_str)

if "js" not in eg_str:
    print("Yes, js is not present.")

#Slicing - we can return a range of characters by using the slice syntax
#Syntax str[start_index : end_index]
b = "Object Oriented"
print(b[2:5])

#Slice from the start
print(b[:7])

#Slice to the end
print(b[3:])

#Negative indexing - Negative indexes to start the slice from the end of the string. str[from:to(but not included)]
print(b[-5:-2])

#The upper method returns the string in upper case
x = "python"
print(x.upper())

#The lower method returns the string in lower case
y = "LANGUAGE"
print(y.lower())

#Remove whitespace- removes any whitespace from the beginning or the end:
z = " Hello, World ! "
print(z.strip())

#Replace method replaces a string with another string
v = "javascript"
print(v.replace("s", "t"))

#split() method splits the string into substrings if it finds instances of the separator
print(z.split(","))

#Concatenate and combine two strings
a = "Hello"
b = "World"
c = a + b
print(c)

#Format string f-string
age = 36
txt = f"My name is John, I am {age}"
print(txt)

#Modifier: A modifier is included by adding a colon : followed by a legal formatting type like, .2f which means fixed point number with 2 decimals
price = 59
txt = f"The price is {price: .2f}"
print(txt)

#A place holder can contain python code like math
txt = f"The price is {20 * 59} dollars"
print(txt)