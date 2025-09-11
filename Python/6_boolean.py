p = 23
o = 54
if p > o:
    print("p is greater than o")
else:
    print("p is not greater than o")

print(p > o)
print(p == o)
print(p < o)

#The following are true
print(bool("abc"))
bool(123)
bool(["apple", "cherry", "banana"])

# The following are false
bool(False)
bool(None)
bool(0)
bool("")
bool(())
bool([])
bool({})