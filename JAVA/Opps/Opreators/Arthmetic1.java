import java.util.Scanner;
public class Arthmetic1{
    public static void main(String args[]){
        Scanner sc=new Scanner(System.in);
        System.out.print("Enter first num: ");
        float num_1=sc.nextFloat();
        System.out.print("Enter the second num: ");
        float num_2=sc.nextFloat();
        System.out.println("Addition: "+(num_1+num_2));
        System.out.println("Multiplication: "+(num_1*num_2));
        System.out.println("Substraction: "+(num_1-num_2));
        System.out.println("Division: "+(num_1/num_2));
        System.out.println("Modulo: "+(num_1%num_2));
        System.out.println("Increment: "+(++num_1));
        System.out.println("Decrement: "+(--num_2));
        sc.close();
    }
}

