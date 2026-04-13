#Name -Goldi pal
#Rollno. 25
#List Assignment no.10
#A teacher stored attendance of students in a list (1 = present, 0 = absent).Example: [1,1,0,1,0,1,1]
#Write a program to:
#Count total present
#Count total absent
#Print attendance percentage
attendance = [1, 1, 0, 1, 0, 1, 1]

present = attendance.count(1)
absent = attendance.count(0)

total_students = len(attendance)
percentage = (present / total_students) * 100

print("Total Present:", present)
print("Total Absent:", absent)
print("Attendance Percentage:", percentage, "%")



