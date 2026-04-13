#Name -Goldi pal
#Rollno. 25
#List Assignment no.10
#Create a list of ages. Create two new lists: minors (under 18) and adults (18 and above)

ages = [12, 17, 18, 21, 15, 30, 16]

minors = []
adults = []

for age in ages:
    if age < 18:
        minors.append(age)
    else:
        adults.append(age)

print("Minors:", minors)
print("Adults:", adults)