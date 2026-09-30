import numpy as np
print("Create an array with data type 4&8 bytes integer:")
arr=np.array([1,2,3,4], dtype='i4')
print(arr)
print(arr.dtype)
arr=np.array([1,2,3,4], dtype='i8')
print(arr)
print(arr.dtype)
