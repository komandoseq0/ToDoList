'use strict';

const modal = document.querySelector(".taskModal");
const overlay = document.querySelector(".overlay");
const btnShowModal = document.querySelector(".addTask");
const btnCloseModalAdd = document.querySelector(".closeModalAdd");
const btnCloseModalEdit = document.querySelector(".closeModalEdit");
const modalMessage = document.querySelector(".modalMessage");

const taskName = document.querySelector(".taskName");
const category = document.querySelector(".category");
const taskDesc = document.querySelector(".taskDesc");

const errorMsgName = document.querySelector(".errorName");
const errorMsgCate = document.querySelector(".errorCate");

const tasksBox = document.querySelector(".taskBox");
const taskEx = document.querySelector(".taskExample");
const editTaskBtn = document.querySelectorAll(".edit");
const showDesc = document.querySelectorAll(".showDesc");

const categoryF = document.querySelector(".categoryF");

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
    let taskClone = taskEx.cloneNode(true);

    taskClone.classList.remove("hidden");
    taskClone.classList.remove("taskExample");
    taskClone.setAttribute("id", tasks[i].id);

    taskClone.querySelector(".taskName").textContent = tasks[i].name;
    taskClone.querySelector(".taskCategory").textContent = tasks[i].category;
    taskClone.querySelector(".teskDescription").textContent = tasks[i].desc;
    taskClone.setAttribute("data-category", tasks[i].category);

    tasksBox.appendChild(taskClone);
}

const addTask = function() {
    if (taskName.length === 0) {
        errorMsgName.classList.toggle("hidden");
    } else if (category.value === '') {
        errorMsgCate.classList.toggle("hidden");
    } else {
        closeModal();

        const task = {
            id: tasks.length,
            name: taskName.value,
            category: category.value,
            desc: taskDesc.value,
        }

        tasks[tasks.length] = task;

        tasksBox.textContent = '';

        for(let i = 0; i < tasks.length; i++) {
            loopingThroughTasks(i)
        };

        taskName.value = '';
        category.value = '';
        taskDesc.value = '';
    };

};

const editTask = function() {
    if (taskName.length === 0) {
        errorMsgName.classList.toggle("hidden");
    } else if (category.value === '') {
        errorMsgCate.classList.toggle("hidden");
    } else {
        closeModal();

        const task = {
            id: editTaskId,
            name: taskName.value,
            category: category.value,
            desc: taskDesc.value,
        }

        tasks[editTaskId] = task; 

        tasksBox.textContent = '';

        for(let i = 0; i < tasks.length; i++) {
            categoryF.value = "All";
            loopingThroughTasks(i)
        };

        taskName.value = '';
        category.value = '';
        taskDesc.value = '';
        editTaskId = 0;
    };
}


const editingTask = function(event) {
    const task = event.target.closest(".task"); 
    const taskId = task.getAttribute("id");
    editTaskId = taskId;
    
    if(taskId) {
        modalMessage.textContent = "Edit your task";
        btnCloseModalAdd.classList.toggle("hidden");
        btnCloseModalEdit.classList.toggle("hidden");
        openModal();
        
        taskName.value = tasks[editTaskId].name;
        category.value = tasks[editTaskId].category;
        taskDesc.value = tasks[editTaskId].desc;
    }
}

const delateTask = () => {
    const task = event.target.closest(".task"); 
    const taskId = task.getAttribute("id");
    editTaskId = taskId;

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
    tasksBox.textContent = '';

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
