const tasks = document.querySelector('.tasks');
const form = document.querySelector('#new-task-form');
const formInput = document.querySelector('.new-task-input'); 
const noTask = document.querySelector("#no");


const addTaskToDom = (task)=>{
    noTask.style.display = "none";
    const newTask = document.createElement("div");
    newTask.classList.add("task");

    const newContent = document.createElement("div");
    newContent.classList.add("content");

    const newInput = document.createElement("input");
    newInput.type = "text";
    newInput.classList.add("text");
    newInput.value = task;
    newInput.setAttribute("readonly","readonly");

    const newAction = document.createElement("div");
    newAction.classList.add("action");

    const newEdit = document.createElement("button");
    newEdit.classList.add("edit");
    newEdit.innerHTML = "EDIT";

    const newDelete = document.createElement("button");
    newDelete.classList.add("delete");
    newDelete.innerHTML = "DELETE";

    newContent.appendChild(newInput);
    newAction.appendChild(newEdit);
    newAction.appendChild(newDelete);

    newTask.appendChild(newContent);
    newTask.appendChild(newAction);

    tasks.appendChild(newTask);

    //edit
    newEdit.addEventListener("click",(e)=>{
        if(newEdit.innerHTML==="EDIT"){
            newEdit.innerHTML="SAVE";
            newInput.removeAttribute("readonly");
            newInput.focus();
        }
        else if(newInput.value.trim()=='')
        {
            alert("Cannot leave the Task empty");
            newInput.focus();
        }
        else{
            newEdit.innerHTML="EDIT";
            newInput.setAttribute("readonly","readonly");
            editStorage(task,newInput.value);
        }
    })
    newInput.addEventListener("keydown",(e)=>{
        if(e.key==="Enter"){
            if(newInput.value.trim()=='')
            {
                alert("Cannot leave the Task empty");
                newInput.focus();
            }
            else{
                newEdit.innerHTML="EDIT";
                newInput.setAttribute("readonly","readonly");
                editStorage(task,newInput.value);
            }
        }
    })

    //delete
    newDelete.addEventListener("click",(e)=>{
        tasks.removeChild(newTask);
        if(tasks.childElementCount == 0){
            console.log(tasks.childElementCount);
            noTask.style.display = "block";
        }
        removeStorage(task);
    })
}

form.addEventListener("submit" , (e)=>{
    e.preventDefault();
    if(formInput.value.trim()=='')
    {
        return alert("Please Enter some TASK first");
    }
    addTaskToDom(formInput.value);
    addTaskToStorage(formInput.value);
    formInput.value='';
})

const addTaskToStorage = (task)=>{
    const taskStorage = JSON.parse(localStorage.getItem('taskStorage'));
    taskStorage.push(task);
    localStorage.setItem("taskStorage",JSON.stringify(taskStorage));
}
const loadTasks = ()=>{
    const taskStorage = JSON.parse(localStorage.getItem('taskStorage'));
    if (taskStorage.length > 0) {
        taskStorage.forEach(task => {
            addTaskToDom(task);
        });
    }
}
const removeStorage = (task)=>{
    const taskStorage = JSON.parse(localStorage.getItem('taskStorage')) ;
    let index = taskStorage.indexOf(task);
    taskStorage.splice(index,1);
    localStorage.setItem("taskStorage",JSON.stringify(taskStorage));
}
const editStorage = (task,newValue)=>{
    const taskStorage = JSON.parse(localStorage.getItem('taskStorage'));
    let index = taskStorage.indexOf(task);
    taskStorage[index] = newValue;
    localStorage.setItem("taskStorage",JSON.stringify(taskStorage));
}

loadTasks();
if(tasks.childElementCount > 0){
    console.log(tasks.childElementCount);
    noTask.style.display = "none";
}