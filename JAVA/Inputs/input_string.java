import java.util.Scanner;
public class input_string{
    public static void main(String[] args){
        Scanner sc=new Scanner(System.in);
        String str="I Am Rahul Sincara";
        System.out.println("Enter your name: ");
        String gtr=sc.nextLine();
        System.out.println(str);
        System.out.println("you are enter: "+gtr);
    }
}