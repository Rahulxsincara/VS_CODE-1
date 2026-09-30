// Online C compiler to run C program online
#include <stdio.h>

int main() {
    int n;
    printf("Enter the value: ");
    scanf("%d",&n);
    int arr[n];
    int brr[n];
    printf("Enter arr values: ");
    for(int i=0;i<n;i++){
        scanf("%d",&arr[i]);
    }
    printf("Reverse arr: ");
    for(int i=0;i<n;i++){
        
            brr[i]=arr[n-1-i];
            
        }
        for(int j=0;j<n;j++){
        printf("%d ",brr[j]);
        }

    return 0;
}