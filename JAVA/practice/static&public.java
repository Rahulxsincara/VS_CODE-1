public class static&public {
    public class struct{
    static void sta_method(){
        System.out.println("Static rahul");
    }
    public void pub_method(){
        System.out.println("Public rahul");
    }
    }    

public static void main(String[] args){
    /*static mrthod*/
    sta_method();
    
    struct obj=new struct();
    obj.pub_method();
    
}

    
}
