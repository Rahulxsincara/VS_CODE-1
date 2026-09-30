import turtle

# setup screen
screen = turtle.Screen()
screen.bgcolor("lightblue")
screen.title("My Turtle Drawing")

# create turtle
t = turtle.Turtle()
t.speed(5)
t.pensize(3)
t.color("red")

# draw a colorful square
colors = ["red", "green", "blue", "orange"]
for i in range(4):
    t.color(colors[i])
    t.forward(100)
    t.right(90)

# draw a circle
t.color("purple")
t.circle(50)

turtle.done()
