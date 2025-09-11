thisList = ["a", "b", 'c']
print(thisList)

thisList2 = ["a", "b", 'c', "a", "b", 'c']
print(thisList2)
print(len(thisList2))

listTypes = ["a", 34, True, "b", 56]
print(listTypes)
print(type(listTypes))

construct = list(("a", "b", 'c', "a", "b", 'c'))
print(construct)

# List is a collection which is ordered and changeable. Allows duplicate members.
# Tuple is a collection which is ordered and unchangeable. Allows duplicate members.
# Set is a collection which is unordered, unchangeable*, and unindexed. No duplicate members.
# Dictionary is a collection which is ordered** and changeable. No duplicate members.