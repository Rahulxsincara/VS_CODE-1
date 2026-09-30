import java.util.Scanner;
public class swap_num{
    public static void main(String args[]){
        Scanner sc=  new Scanner(System.in);
        System.out.println("Enter a and b");
        int a=sc.nextInt();
        int b=sc.nextInt();
        int c=a;
        a=b;
        b=c;
        System.out.println("Value of a=" +a+" and b="+b);
        System.out.println(String.format("Value of a = %d and b = %d", a, b));
        sc.close();
        
    }
}