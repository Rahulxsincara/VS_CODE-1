a=int(input("Enter the first number:"))
b=int(input("Enetr the second number: "))
c=int(input("Enter the third number: "))

if a>=b and a>=c:
    print(a,"is the largest number")
    
elif b>=c and b>=a:
    print(b,"is the largest number")
    
else:
    print(c,"is the largest number")
