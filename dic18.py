students = {"A": 80, "B": 90, "C": 70}

print(students)

name = input("Search: ")
print(students.get(name, "Not found"))

top = max(students, key=students.get)
print("Topper:", top)

avg = sum(students.values()) / len(students)
print("Average:", avg)