import java.util.Scanner;

public class read_string {
    public static void main(String args[]) {
        Scanner sc = new Scanner(System.in);

        System.out.print("Enter a string: ");
        String str = sc.nextLine();  

        System.out.print("Enter the index value: ");
        int i = sc.nextInt();    
        char ch = str.charAt(i);

        System.out.println("Character: " + ch);

        sc.close();
    }
}
