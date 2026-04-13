phone = {}

phone["Ram"] = "1234"
phone["Shyam"] = "5678"

print(phone)

name = input("Search: ")
print(phone.get(name, "Not found"))

phone.pop("Ram")
print(phone)