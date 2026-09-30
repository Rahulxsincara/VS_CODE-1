import numpy as np
print("The astype() function creates a copy of the array, and allows you to specify the data type as a parameter.")
arr=np.array([1.1,1.2,1.3,0.4])

new_arr=arr.astype('i')
print(new_arr)
print(new_arr.dtype)

new_arr=arr.astype('f')
print(new_arr)
print(new_arr.dtype)

new_arr=arr.astype('S')
print(new_arr)
print(new_arr.dtype)

new_arr=arr.astype('bool')
print(new_arr)
print(new_arr.dtype)