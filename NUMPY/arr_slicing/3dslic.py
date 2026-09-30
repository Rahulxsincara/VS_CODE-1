import numpy as np

arr = np.array([[1, 2, 3, 4, 5], [6, 7, 8, 9, 10]])
print("From both elements, slice index 1 to index 4 (not included), this will return a 2-D array:")

print(arr[0:2, 1:4])