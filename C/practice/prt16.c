// Online C compiler to run C program online
#include <stdio.h>

int main() {
    int n;
    int min;
    printf("Enter the value: ");
    scanf("%d",&n);
    int arr[n];
    printf("Enter arr values: ");
    for(int i=0;i<n;i++){
        scanf("%d",&arr[i]);
    }
    min=arr[0];
    for(int i=0;i<n;i++){
        if(min >arr[i]){
            min=arr[i];
        }
    }
    printf("MIN VALUE: %d",min);

    return 0;
}