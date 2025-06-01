const addTask = document.getElementById("addTask");
addTask.addEventListener("click", tasks);

let taskslist = [];
let completedTasks = [];

const result = document.getElementById("divResult");
const completedResult = document.getElementById("completedResult");

// Load data from local storage on start
loadFromLocalStorage();

// Add new task
function tasks() {
    const newTaskValue = document.getElementById("task").value.trim();

    if (newTaskValue === "") {
        alert("Please input a valid task");
        return;
    }

    taskslist.push(newTaskValue);
    document.getElementById("task").value = "";

    renderTasks();
    saveToLocalStorage(); // ✅ Save after change
}

// Show pending tasks
function renderTasks() {
    result.innerHTML = "";

    const taskElement = document.createElement("div");
    taskElement.className = "task-container";
    const ul = document.createElement("ol");

    taskslist.forEach((task, index) => {
        const li = document.createElement("li");
        li.className = "task-item";
        li.textContent = task;

        const deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
        deleteBtn.className = "delete-btn";
        deleteBtn.addEventListener('click', () => {
            deleteTask(index);
        });

        const completeBtn = document.createElement("button");
        completeBtn.className = "complete-btn";
        completeBtn.innerHTML = '<i class="fas fa-check"></i>';
        completeBtn.addEventListener("click", () => {
            completeTask(task, index);
        });

        const div = document.createElement("div");
        div.className = "completeDeleteDiv";
        div.appendChild(deleteBtn);
        div.appendChild(completeBtn);
        li.appendChild(div);
        ul.appendChild(li);
    });

    taskElement.appendChild(ul);
    result.appendChild(taskElement);
}

// Show completed tasks
function renderCompletedTask() {
    completedResult.innerHTML = "";
    const completeText = document.createElement("h2");
    completeText.textContent = "Completed Tasks List";

    const completeTaskElement = document.createElement("div");
    completeTaskElement.className = "completeTask-container";
    const ul = document.createElement("ol");

    completedTasks.forEach((completeTask, index) => {
        const li = document.createElement("li");
        li.className = "completeTask-item";
        li.textContent = completeTask;

        const completeDeleteBtn = document.createElement("button");
        completeDeleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
        completeDeleteBtn.className = "delete-btn";
        completeDeleteBtn.addEventListener('click', () => {
            completeDeleteTask(index);
        });

        const incompleteBtn = document.createElement("button");
        incompleteBtn.className = "complete-btn";
        incompleteBtn.innerHTML = '<i class="fa fa-repeat" aria-hidden="true"></i>';
        incompleteBtn.addEventListener("click", () => {
            laterWork(completeTask, index);
        });

        const completeDiv = document.createElement("div");
        completeDiv.className = "completeDeleteDiv";
        completeDiv.appendChild(completeDeleteBtn);
        completeDiv.appendChild(incompleteBtn);

        li.appendChild(completeDiv);
        ul.appendChild(li);
    });

    completeTaskElement.appendChild(ul);

    if (completedTasks.length > 0) {
        completedResult.appendChild(completeText);
        completedResult.appendChild(completeTaskElement);
    }
}

// Delete pending task
function deleteTask(index) {
    taskslist.splice(index, 1);
    renderTasks();
    saveToLocalStorage(); // ✅
}

// Mark task as complete
function completeTask(task, index) {
    completedTasks.push(task);
    taskslist.splice(index, 1);
    renderTasks();
    renderCompletedTask();
    saveToLocalStorage(); // ✅
}

// Move completed task back to pending
function laterWork(task, index) {
    document.getElementById("task").value = task;
    taskslist.push(task); // direct push instead of calling tasks()
    completedTasks.splice(index, 1);
    document.getElementById("task").value = "";
    renderTasks();
    renderCompletedTask();
    saveToLocalStorage(); // ✅
}

// Delete from completed
function completeDeleteTask(index) {
    completedTasks.splice(index, 1);
    renderCompletedTask();
    saveToLocalStorage(); // ✅
}

// ✅ Save to local storage
function saveToLocalStorage() {
    localStorage.setItem("taskslist", JSON.stringify(taskslist));
    localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
}

// ✅ Load from local storage
function loadFromLocalStorage() {
    const storedTasks = localStorage.getItem("taskslist");
    const storedCompleted = localStorage.getItem("completedTasks");

    if (storedTasks) {
        taskslist = JSON.parse(storedTasks);
    }
    if (storedCompleted) {
        completedTasks = JSON.parse(storedCompleted);
    }

    renderTasks();
    renderCompletedTask();
}
