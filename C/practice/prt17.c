// Online C compiler to run C program online
#include <stdio.h>
#include <stdbool.h>

int main() {
    int n;
    int m;
    bool flag=false;
    int index;
    printf("Enter the value: ");
    scanf("%d",&n);
    int arr[n];
    printf("Enter arr values: ");
    for(int i=0;i<n;i++){
        scanf("%d",&arr[i]);
    }
    printf("Enter finding value: ");
    scanf("%d",&m);
    for(int i=0;i<n;i++){
        if(m==arr[i]){
            flag=true;
            index=i+1;
            break;
        }
    }
    if(flag==true){
        printf("Value found at position: %d",index);
    }
    else{
        printf("Value not found");
    }

    return 0;
}