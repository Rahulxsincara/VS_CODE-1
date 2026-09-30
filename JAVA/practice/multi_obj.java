public class multi_obj{
    int x=20;
    
    public static void main(String[] args){
        multi_obj obj1=new multi_obj();
        multi_obj obj2=new multi_obj();
        
        obj2.x=25;
        System.out.println(obj1.x);
        System.out.println(obj2.x);
    }
}    