import java.util.Scanner;
public class Logical_oprators{
    public static void main(String args[]){
        Scanner sc=new Scanner(System.in);
        System.out.println("Enter the value of a,b: ");
        int a=sc.nextInt();
        int b=sc.nextInt();
        System.out.println("AND(&&): "+((a>=b)&&(a<=b)));
        System.out.println("OR(||): "+((a>=b)||(a<=b)));
        System.out.println("NOT(!): "+(!(a<=b)));
        sc.close();

        
        
    }
}