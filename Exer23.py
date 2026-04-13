#Name -Goldi pal
#Rollno. 25
#List Assignment no.10
#A cricket player scored runs in 6 matches.Example: [45, 60, 10, 80, 55, 90]
#Write a program to:
#Find total runs
#Find highest score
#Count how many matches player scored more than 50 runs

match=[45,60,10,80,55,90]

count= 0
for i in match:
    if i > 50:
     count= count+1

print("the matches player scored than 50 :",count)

print("totalruns",sum(match))
print("higestscore",max(match))