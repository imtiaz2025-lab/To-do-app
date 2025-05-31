const addTask = document.getElementById("addTask");
addTask.addEventListener("click", tasks);
let taskslist = [];
let completedTasks = [];
const result = document.getElementById("divResult");
const completedResult = document.getElementById("completedResult");

function tasks() {
    const newTaskValue = document.getElementById("task").value.trim();

    // Check input validity
    if (newTaskValue === "") {
        alert("Please input a valid task");
        return;
    };

    // Add task to array
    taskslist.push(newTaskValue);

    // Clear and rebuild the task list
    renderTasks();

    // Clear input field
    document.getElementById("task").value = "";
}

function renderTasks() {
    // Clear existing tasks
    result.innerHTML = "";

    // Create container for tasks
    const taskElement = document.createElement("div");
    taskElement.className = "task-container";
    const ul = document.createElement("ol");

    // Create list items for each task
    taskslist.forEach((task, index) => {
        const li = document.createElement("li");
        li.className = "task-item";
        li.textContent = task;

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.className = "delete-btn";
        deleteBtn.addEventListener('click', () => deleteTask(index));

        //create complete button
        const completeBtn = document.createElement("button");
        completeBtn.className = " complete-btn"
        completeBtn.textContent = "TASK COMPLETE"
        completeBtn.addEventListener("click", () => completeTask(task, index))

        li.appendChild(deleteBtn);
        li.appendChild(completeBtn);
        ul.appendChild(li);


    });

    taskElement.appendChild(ul);
    result.appendChild(taskElement);
}

function deleteTask(index) {
    taskslist.splice(index, 1); // Remove from array
    renderTasks(); // Re-render the task list
}

function completeTask(task, index) {
    completedTasks.push(task);
    taskslist.splice(index, 1); // Remove from array
    renderTasks(); // Re-render the task list
    renderCompletedTask();
}

// function to render completed tasks
function renderCompletedTask() {
    completedResult.innerHTML = "";
    const completeText = document.createElement("h2");
    completeText.textContent = "Completed Tasks List";

    // Create container for tasks
    const completeTaskElement = document.createElement("div");
    completeTaskElement.className = "completeTask-container";
    const ul = document.createElement("ol");

    // Create list items for each task
    completedTasks.forEach((completeTask, index) => {
        const li = document.createElement("li");
        li.className = "completeTask-item";
        li.textContent = completeTask;

        const completeDeleteBtn = document.createElement("button");
        completeDeleteBtn.textContent = "Delete";
        completeDeleteBtn.className = "delete-btn";
        completeDeleteBtn.addEventListener('click', () => completeDeleteTask(index));

        //create incomplete? button

       let incompleteBtn =  document.createElement("button");
       incompleteBtn.textContent = " INCOMPLETE ??"
       incompleteBtn.className = "delete-btn"
       incompleteBtn.addEventListener("click", () => laterWork( completeTask, index))


        li.appendChild(completeDeleteBtn);
        li.appendChild(incompleteBtn);
        ul.appendChild(li);
    });

    completeTaskElement.appendChild(ul);
    completedResult.appendChild(completeText);
    completedResult.appendChild(completeTaskElement);


    if (completedTasks.length == 0) {
        completedResult.removeChild(completeText);
    }

}

function laterWork( task,index){
    document.getElementById("task").value = task ;
    tasks();
    completedTasks.splice(index, 1);
    renderCompletedTask();
    document.getElementById("task").value = " ";
}



function completeDeleteTask(index) {
    completedTasks.splice(index, 1);
    renderCompletedTask();
}

