contacts = {}

while True:
    name = input("Enter name: ")
    if name.lower() == "exit":
        break
    phone = input("Enter phone: ")
    contacts[name] = phone

print(contacts)