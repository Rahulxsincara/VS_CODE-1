package JAVA.Inputs;

import java.util.Scanner;
public class add_inputs{
    public static void main(String[] args){
        Scanner sc=new Scanner(System.in);
        System.out.println("Enter a,b: ");
        int a=sc.nextInt();
        float b=sc.nextFloat();
        System.out.println(a+b);
    }
}