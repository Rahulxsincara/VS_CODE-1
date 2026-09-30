import numpy as np

class Numpystack:
    def __init__(self, size):
        self.size = size
        self.items = np.empty(size, dtype=int)
        self.top = -1
        self.item = None

    def push(self, item):
        self.item = item
        if self.top == self.size - 1:
            print("Stack Overflow")
        else:
            self.top += 1
            self.items[self.top] = self.item

    def pop(self):
        if self.top == -1:
            print("Stack Underflow")
            return None
        else:
            self.item = self.items[self.top]
            self.top -= 1
            return self.item

    def display(self):
        if self.top == -1:
            print("Stack is empty")
        else:
            print("Stack:", self.items[:self.top+1])

class Numpyqueue:
    def __init__(self, size):
        self.size = size
        self.queue = np.empty(size, dtype=int)
        self.front = -1
        self.rear = -1
        self.item = None

    def enqueue(self, item):
        self.item = item
        if (self.rear + 1) % self.size == self.front:
            print("Queue Overflow")
        else:
            if self.front == -1:
                self.front = 0
            self.rear = (self.rear + 1) % self.size
            self.queue[self.rear] = self.item

    def dequeue(self):
        if self.front == -1:
            print("Queue Underflow")
            return None
        else:
            self.item = self.queue[self.front]
            if self.front == self.rear:
                self.front = self.rear = -1
            else:
                self.front = (self.front + 1) % self.size
            return self.item

    def display(self):
        if self.front == -1:
            print("Queue is empty")
        else:
            if self.rear >= self.front:
                print("Queue:", self.queue[self.front:self.rear+1])
            else:
                print("Queue:", np.concatenate((self.queue[self.front:], self.queue[:self.rear+1])))

s = Numpystack(5)
s.push(5)
s.push(10)
s.push(15)
s.display()
print("Popped:", s.pop())
s.display()

q = Numpyqueue(5)
q.enqueue(1)
q.enqueue(2)
q.enqueue(3)
q.display()
print("Dequeued:", q.dequeue())
q.display()
