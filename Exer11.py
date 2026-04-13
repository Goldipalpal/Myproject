#Name -Goldi pal
#Rollno. 25
#List Assignment no.10
#Take a list like [-5, 3, -2, 8]. Create a new list where all negative numbers are converted to positive.

numbers = [-5, 3, -2, 8]
new_list = []
for num in numbers:
 if num < 0:
        num = -num
        new_list.append(num)

print(new_list)