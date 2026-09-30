// Sum of Numbers in an Array
#include "stdio.h"
int main(){
    int n;
    printf("Enter the value of size: ");
    scanf("%d",&n);
    int arr[n];
    printf("Enter the value of arr: \n");
    for(int i=0;i<n;i++){
        printf("arr[%d]= ",i);
        scanf("%d",&arr[i]);
    }
    int sum=0;
    for(int i=0;i<n;i++){
        sum=sum+arr[i];
       
    }
     printf("Sum= %d",sum);
}