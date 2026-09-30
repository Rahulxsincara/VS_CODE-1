package JAVA.Inputs;
import java.util.Scanner;
public class simple_interest {
    public static void main(String[] args){
        Scanner sc=new Scanner(System.in);
        System.out.println("Enter the principle: ");
        float p =sc.nextFloat();
        System.out.println("Enter the time: ");
        int t= sc.nextInt();
        System.out.println("Enter the rate: ");
        int r=sc.nextInt();
        
        float SI=(p*t*r)/100;

        System.out.print("Simple Interest: "+SI);


    }
}
