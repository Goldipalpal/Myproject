menu = {"Tea": 10, "Coffee": 20}
cart = ["Tea", "Coffee"]

total = 0
for item in cart:
    total += menu[item]

print("Total:", total)