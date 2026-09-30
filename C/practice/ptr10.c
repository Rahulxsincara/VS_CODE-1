//Maximum number in an array
#include "stdio.h"
int main(){
    int n;
    int max=0;
    printf("Enter the value of size: ");
    scanf("%d",&n);
    int arr[n];
    for(int i=0;i<n;i++){
        scanf("%d",&arr[i]);
    }
    for(int i=0;i<n;i++){
        if (max<arr[i]){
            max=arr[i];
        }
    }
    printf("maximum value: %d",max);
    return 0;
}    