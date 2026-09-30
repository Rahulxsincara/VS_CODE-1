import java.util.Scanner;
public class square{
    public static void main(String args[]){
        Scanner sc=new Scanner(System.in);
        System.out.println("Enter the number: ");
        int a=sc.nextInt();
        int square=a*a;
        System.out.println("Square="+square);
        sc.close();
        
    }
}