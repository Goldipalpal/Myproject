set1 = {"a": 1, "b": 2}
set2 = {"c": 3, "d": 4}

# Method 1
set1.update(set2)
print(set1)

# Method 2
merged = set1 | set2
print(merged)