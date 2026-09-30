package JAVA.practice; // Add this line at the top

class Person {
    String name;
    int age;

    void displayInfo() {
        System.out.println("Name: " + name + ", Age: " + age);
    }
}

class Student extends Person {
    String course;

    void showCourse() {
        System.out.println("Course: " + course);
    }
}

public class SingleInheritanceDemo {
    public static void main(String[] args) {
        Student s = new Student();
        s.name = "Amit";
        s.age = 21;
        s.course = "Java OOPS";

        s.displayInfo();
        s.showCourse();
    }
}