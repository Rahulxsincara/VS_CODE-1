//Positive Numbers in an Array (Solution 1)
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
     printf("only negative num: ");
    for(int i=0;i<n;i++){
       if(arr[i]<0){
           printf("%d ",arr[i]);
       }
    }
   
}
