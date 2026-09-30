// Fibonacci numbers without recursion
#include <stdio.h>
int main(){
    int a=0,b=1,sum;
    for(int i=1;i<=15;i++){
        printf("%d ",a);
        sum=b+a;
        b=a;
        a=sum;
    }
    return 0;
}
