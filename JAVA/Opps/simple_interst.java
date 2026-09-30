import java.util.Scanner;
public class simple_interst{
    public static void main(String args[]){
        Scanner sc=new Scanner(System.in);
        System.out.print("Enter the principal: ");
        float p=sc.nextFloat();
        System.out.println("Enter the rate: ");
        float rate=sc.nextFloat();
        System.out.println("Enter the time: ");
        int time =sc.nextInt();
        float SI=(p*rate*time)/100;
        System.out.println("Simple Interst: "+SI);
        sc.close();
    }
}