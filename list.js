const addTaskbtn = document.querySelector(".addTaskBtn");
const inputText = document.querySelector(".taskInput");
const contenedor = document.querySelector(".container");
const checkbox = document.querySelector(".checkTask");
const deleteTask = document.querySelectorAll(".delete");
const editTask = document.querySelectorAll(".edit");
let totalTask = document.querySelectorAll(".task");
let totalChecks = document.querySelectorAll(".check");
const h3 = document.querySelector(".tasks");

h3.innerHTML = `${totalChecks.length} of ${totalTask.length} tasks have been completed`;

//ADD TASK BUTTON EVENT
addTaskbtn.addEventListener("click", () => {
    totalTask = document.querySelectorAll(".task");
    let text = inputText.value;
    let n = totalTask.length;
    console.log(n);
    newTask(n, text);
    tasksCompleted();
});

//DELETE, EDIT AND CHECKBOX EVENT
contenedor.addEventListener("click", function (event) {
    const input = event.target;

    if (input.type === "checkbox") {
        if (input.checked) {
            input.classList.add("check");
        } else {
            input.classList.remove("check");
        }
        tasksCompleted();
    }

    if (input.classList.contains("delete")) {
        let classes = input.parentNode.classList;
        let classTask = classes[1];
        sessionStorage.removeItem(classTask);
        input.parentNode.remove();
        location.reload();
        tasksCompleted();
    }

    if (input.classList.contains("edit")) {
        const inp = input.previousElementSibling;
        inp.disabled = false;
        input.classList.add("save");
        input.classList.remove("edit");
        input.innerHTML = "SAVE";
    } else if (input.classList.contains("save")) {
        const inp = input.previousElementSibling;
        inp.disabled = true;
        input.classList.add("edit");
        input.classList.remove("save");
        input.innerHTML = "EDIT";
    }
});


//LOADING EVENT 
window.onload = ()=>{
    if(sessionStorage.length > 0){

        for(let x = 0; x < sessionStorage.length; x++){
            const fragment = document.createDocumentFragment();
            const div = document.createElement("div");
            const check = document.createElement("input");
            const textTask = document.createElement("input");
            const editBtn = document.createElement("button");
            const deleteBtn = document.createElement("button");

            let taskN = sessionStorage.key(x);
            let taskText = sessionStorage.getItem(taskN);
            div.classList.add("task", taskN);
            check.classList.add("checkTask");
            check.type = "checkbox";
            textTask.classList.add("taskText");
            textTask.type = "text";
            textTask.disabled = true;
            textTask.value = taskText;
            editBtn.classList.add("taskBtn", "edit");
            editBtn.innerHTML = "EDIT";
            deleteBtn.classList.add("taskBtn", "delete");
            deleteBtn.innerHTML = "DELETE";

            div.appendChild(check);
            div.appendChild(textTask);
            div.appendChild(editBtn);
            div.appendChild(deleteBtn);
            fragment.appendChild(div);

            contenedor.appendChild(fragment);
        }
        
    }

}

//SET N TASKS COMPLETED OF N TASKS
const tasksCompleted = () => {
    totalChecks = document.querySelectorAll(".check");
    totalTask = document.querySelectorAll(".task");
    h3.innerHTML = `${totalChecks.length} of ${totalTask.length} tasks have been completed`;
};


//CREATE AND ADD A NEW TASK
const newTask = (n, text) => {
    const fragment = document.createDocumentFragment();
    const div = document.createElement("div");
    const check = document.createElement("input");
    const textTask = document.createElement("input");
    const editBtn = document.createElement("button");
    const deleteBtn = document.createElement("button");

    div.classList.add("task", `task-${n + 1}`);
    check.classList.add("checkTask");
    check.type = "checkbox";
    textTask.classList.add("taskText");
    textTask.type = "text";
    textTask.disabled = true;
    textTask.value = text;
    editBtn.classList.add("taskBtn", "edit");
    editBtn.innerHTML = "EDIT";
    deleteBtn.classList.add("taskBtn", "delete");
    deleteBtn.innerHTML = "DELETE";

    div.appendChild(check);
    div.appendChild(textTask);
    div.appendChild(editBtn);
    div.appendChild(deleteBtn);
    fragment.appendChild(div);

    contenedor.appendChild(fragment);
    sessionStorage.setItem(`task-${n+1}`, text);
};
