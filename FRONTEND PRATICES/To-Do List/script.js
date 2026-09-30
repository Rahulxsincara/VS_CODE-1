let taskInput= document.getElementById("taskInput");
let addBtn=document.getElementById("addBtn");
let taskList=document.getElementById("taskList");

addBtn.addEventListener("click",function(){
    let task= taskInput.value.trim();
    if(task===""){
        alert("Please enter a task!");
        return;
    }
    let li=document.createElement("li");
    li.textContent = task;
    taskList.appendChild(li);
    taskInput.value="";
});