//Print Multiplication Table with 7
#include <stdio.h>
int main(){
    int n;
    printf("Enter the value: ");
    scanf("%d",&n);
    for(int i=1;i<=n;i++){
        if(i%7==0){
            printf("%d ",i);
        }
    }
    return 0;
}


