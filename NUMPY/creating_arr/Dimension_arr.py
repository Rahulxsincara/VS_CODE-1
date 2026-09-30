import numpy as np

print ("NumPy Arrays provides the ndim attribute that returns an integer that tells us how many dimensions the array have.")

a= np.array(42)
b= np.array([1,78,95,78,56,48,72,36])
c= np.array([[87,45,96,78],[12,32,56,]])
c= np.array([[[78,85,97],[7,9,47,56],[7,5,45,6]]])

print(a.ndim)
print(b.ndim)

