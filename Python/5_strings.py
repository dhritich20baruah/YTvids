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