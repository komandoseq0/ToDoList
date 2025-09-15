'use strict';

// Modal elents
const modal = document.querySelector(".taskModal");
const overlay = document.querySelector(".overlay");
const btnShowModal = document.querySelector(".addTask");
const btnCloseModalAdd = document.querySelector(".closeModalAdd");
const btnCloseModalEdit = document.querySelector(".closeModalEdit");
const modalMessage = document.querySelector(".modalMessage");

// Modal values
const taskName = document.querySelector(".taskName");
const category = document.querySelector(".category");
const taskDesc = document.querySelector(".taskDesc");

// Error messages
const errorMsgName = document.querySelector(".errorName");
const errorMsgCate = document.querySelector(".errorCate");

// Task list elements
const tasksBox = document.querySelector(".taskBox");
const taskEx = document.querySelector(".taskExample");
const editTaskBtn = document.querySelectorAll(".edit");
const showDesc = document.querySelectorAll(".showDesc")

// Categories
const categoryF = document.querySelector(".categoryF");

// Task table
const tasks = [];
let editTaskId;

const openModal = function() {
    modal.classList.toggle("showing");
    modal.classList.toggle("hiding");
    modal.classList.toggle("hidden");
    overlay.classList.toggle("hidden");
}

const closeModal = function() {
    modal.classList.toggle("showing");
    modal.classList.toggle("hidden");
    overlay.classList.toggle("hidden");
}

const loopingThroughTasks = function(i) {
    // Cloning example element 
    let taskClone = taskEx.cloneNode(true);

    // Removing unecesery classes and setting id 
    taskClone.classList.remove("hidden");
    taskClone.classList.remove("taskExample");
    taskClone.setAttribute("id", tasks[i].id);

    // Writing values into task
    taskClone.querySelector(".taskName").textContent = tasks[i].name;
    taskClone.querySelector(".taskCategory").textContent = tasks[i].category;
    taskClone.querySelector(".teskDescription").textContent = tasks[i].desc;

    // Showing tasks
    tasksBox.appendChild(taskClone);
}

const addTask = function() {
    // Validating modal

    // Showing error messages
    if (taskName.length === 0) {
        errorMsgName.classList.toggle("hidden");
    } else if (category.value === '') {
        errorMsgCate.classList.toggle("hidden");
    } else {
        closeModal();

        // Putting values into temporary task element
        const task = {
            id: tasks.length,
            name: taskName.value,
            category: category.value,
            desc: taskDesc.value,
        }

        // Putting temporary task into tasks table
        tasks[tasks.length] = task;

        // Cleaning taskBox element before showing new tasks
        tasksBox.textContent = '';

        // Showing all tasks 
        for(let i = 0; i < tasks.length; i++) {
            loopingThroughTasks(i)
        };

        // Cleaning modal form
        taskName.value = '';
        category.value = '';
        taskDesc.value = '';
    };

};

const editTask = function() {
    // Showing error messages
    if (taskName.length === 0) {
        errorMsgName.classList.toggle("hidden");
    } else if (category.value === '') {
        errorMsgCate.classList.toggle("hidden");
    } else {
        closeModal();

        // Putting values into temporary task element
        const task = {
            id: editTaskId,
            name: taskName.value,
            category: category.value,
            desc: taskDesc.value,
        }

        // Putting temporary task into tasks table in place of task that is edited
        tasks[editTaskId] = task; 

        // Cleaning taskBox element before showing new tasks
        tasksBox.textContent = '';

        // Showing all tasks 
        for(let i = 0; i < tasks.length; i++) {
            categoryF.value = "All";
            loopingThroughTasks(i)
        };

        // Cleaning modal form and cleaning editTaskId variable
        taskName.value = '';
        category.value = '';
        taskDesc.value = '';
        editTaskId = 0;
    };
}


const editingTask = function(event) {
    // Showing values of task that is edited in modal

    // Getting task element that is edited and it's id, storing id in variable editTaskId
    const task = event.target.closest(".task"); 
    const taskId = task.getAttribute("id");
    editTaskId = taskId;
    
    // Showing in modal values of task to edit 
    if(taskId) {
        modalMessage.textContent = "Edit your task";
        btnCloseModalAdd.classList.toggle("hidden");
        btnCloseModalEdit.classList.toggle("hidden");
        openModal();
        
        // Replacing values of task
        taskName.value = tasks[editTaskId].name;
        category.value = tasks[editTaskId].category;
        taskDesc.value = tasks[editTaskId].desc;
    }
}

const delateTask = () => {
    // Getting task element that is edited and it's id, storing id in variable editTaskId
    const task = event.target.closest(".task"); 
    const taskId = task.getAttribute("id");
    editTaskId = taskId;

    // Delating task from DOM and from table
    if(taskId) {
        document.getElementById(editTaskId).remove();
        tasks.splice(taskId, 1);

        tasksBox.textContent = '';

        for(let i = 0; i < tasks.length; i++) {
            loopingThroughTasks(i);
        }
    }
}

const categoryFun = function() {
    // Showing tasks by category
    tasksBox.textContent = '';

    // Showing tasks with chosen category
    for(let i = 0; i < tasks.length; i++) {
        if (categoryF.value === tasks[i].category) {
            loopingThroughTasks(i)
        } else if (categoryF.value === "All") {
            loopingThroughTasks(i)
        }
    };
}

const showingDesc = function(event) {
    const descEl = event.target.closest(".task").querySelector(".teskDescription");
    
    descEl.classList.toggle("hidden");
}

btnShowModal.addEventListener("click", openModal);
btnCloseModalAdd.addEventListener("click", addTask);
btnCloseModalEdit.addEventListener("click", editTask);
overlay.addEventListener("click", closeModal);
categoryF.addEventListener("change", categoryFun);
document.addEventListener("click", (event) => {
    if (event.target.classList.contains("edit")) {
        editingTask(event);
    }
});
document.addEventListener("click", (event) => {
    if (event.target.classList.contains("showDesc")) {
        showingDesc(event);
    }
});
document.addEventListener("click", (event) => {
    if (event.target.classList.contains("delateTask")) {
        delateTask(event);
    }
});
