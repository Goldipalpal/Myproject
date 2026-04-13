inventory = {'Pens': 10, 'Erasers': 5}

item = input("Enter item: ")

if item in inventory:
    inventory[item] -= 1

print(inventory)