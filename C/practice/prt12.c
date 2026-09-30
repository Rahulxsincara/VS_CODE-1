// Check if a number is prime
#include <stdio.h>
int main(){
    int n,f=1;
    printf("Enter the value: ");
    scanf("%d",&n);
    
    if(n<=0){
        f=0;
    }else{
        for(int i=2;i*i<=n;i++){
            if(n%i==0){
                f=0;
            }
        }
        if(f==0)
        printf("NOT A PRIME NO");
        
        else
        printf("IT's A PRIME NO");
    }
    return 0;
}




