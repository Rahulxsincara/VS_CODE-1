// Online C compiler to run C program online
#include <stdio.h>

int main() {
    int n;
    printf("Enter the size of array: ");
    scanf("%d",&n);
    int arr[n];
    printf("Enter the values: ");
    for(int i=0;i<n;i++){
        scanf("%d",&arr[i]);
    }
    printf("orignal: ");
    for(int i=0;i<n;i++){
        printf("%d ",arr[i]);
    }
    // printf("\nLeft shift: ");
    // int t=arr[0];
    // for(int i=0;i<n-1;i++){
    //     arr[i]=arr[i+1];
    // }
    // arr[n-1]=t;
    
    //  for(int i=0;i<n;i++){
    //     printf("%d ",arr[i]);
    // }
      printf("\nRight shift: ");
     int  t=arr[n-1];
    for(int i=n-1;i>0;i--){
        arr[i]=arr[i-1];
    }
    arr[0]=t;
    
    
     for(int i=0;i<n;i++){
        printf("%d ",arr[i]);
    }

    return 0;
}