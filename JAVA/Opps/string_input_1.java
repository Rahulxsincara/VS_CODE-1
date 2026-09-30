import java.util.Scanner;
public class string_input_1 {
    public static void main(String args[]){
        Scanner sc=new Scanner(System.in);
        System.out.println("Enter your name: ");
        String name=sc.nextLine();
        System.out.println("My name is : "+name);
        sc.close();
    } 
}
