items = {"Pen": 10, "Book": 50, "Pencil": 5}

cheapest = min(items, key=items.get)
print(cheapest)