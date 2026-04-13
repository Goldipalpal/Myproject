#Name -Goldi pal
#Rollno. 25
#List Assignment no.14
 
 	
#Store prices of 5 items in a list. Calculate the total bill and the average price per item

prices = [120, 80, 150, 200, 50]

total = 0

for price in prices:
    total = total + price

average = total / len(prices)

print("Total Bill:", total)
print("Average Price:", average)


