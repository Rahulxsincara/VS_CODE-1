import java.util.Scanner;
public class Relational_operators{
    public static void main(String args[]){
        Scanner sc=new Scanner(System.in);
        System.out.println("Enter the a value: ");
        float a=sc.nextFloat();
        System.out.println("Enter the b value: ");
        float b=sc.nextFloat();
        System.out.println("\n(a>=b): "+(a>=b));
        System.out.println("(a<=b): "+(a<=b));
        System.out.println("(a>b): "+(a>b));
        System.out.println("(a<b): "+(a<b));
        System.out.println("(a!=b): "+(a!=b));
        sc.close();
    }
}
    
