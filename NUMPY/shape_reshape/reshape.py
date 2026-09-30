import numpy as np
print("\n")
print("Convert the following 1-D array with 12 elements into a 2-D array.\n The outermost dimension will have 4 arrays, each with 3 elements:")
arr=np.array([1,2,3,4,4,5,66,6,7,88,0,0])
new_arr=arr.reshape(4,3)
print(new_arr)
new_arr2=arr.reshape(3,3)


