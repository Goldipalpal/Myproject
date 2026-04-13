att = {"A": "P", "B": "A", "C": "P", "D": "A", "E": "P"}

present = list(att.values()).count("P")
print("Present:", present)

print("Absent:")
for k, v in att.items():
    if v == "A":
        print(k)