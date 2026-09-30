import java.util.Scanner;
public class string_input{
    public static void main(String args[]){
        Scanner sc=new Scanner(System.in);
        System.out.println("Enter your name: ");
        String name=sc.next();
        System.out.println("My name is : "+name);
        sc.close();
    }
}