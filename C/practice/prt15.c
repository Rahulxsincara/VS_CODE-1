// Online C compiler to run C program online
#include <stdio.h>

int main() {
    int n;
    printf("Enter the value: ");
    scanf("%d",&n);
    int arr[n];
    printf("Enter arr values: ");
    for(int i=0;i<n;i++){
        scanf("%d",&arr[i]);
    }
    int sum=0;
    for(int i=0;i<n;i++){
        sum=sum+arr[i];
    }
    printf("sum= %d",sum);
    

    return 0;
}