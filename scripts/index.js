//Get references to HTML elements

//The input field where the user types new tasks
const taskInput = document.querySelector(".tasks");

//The 'Add' button that the user clicks to add a task
const addBtn = document.querySelector(".Addbtn");

//The <ul> element where all our task <li> items will be displayed
const taskListUL = document.querySelector(".taskList");

//The filter buttons
const allFilterBtn = document.querySelector(".allBtn");
const pendingFilterBtn = document.querySelector(".pendingBtn");
const completedFilterBtn = document.querySelector(".completedBtn");

// This will be an array of objects.
let tasks = [];

// A variable to keep track of the currently active filter
let currentFilter = "all";

//Local Storage Functions

//Saves the tasks array to localStorage.
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  console.log("Tasks saved to localStorage:", tasks); //debbuuging!
}

//Loads tasks from localStorage when the page opens.
function loadTasks() {
  const storedTasks = localStorage.getItem("tasks");

  if (storedTasks) {
    tasks = JSON.parse(storedTasks);
    console.log("Tasks loaded from localStorage:", tasks); //debbuuging!
  } else {
    tasks = [];
    console.log("No tasks found in localStorage. Starting with an empty list."); //debugging!
  }
}

//Diplay the tasks Visually
function renderTasks() {
  taskListUL.innerHTML = "";

  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.classList.add("taskItem");
    li.dataset.id = task.id;

    if (task.completed) {
      li.classList.add("completed");
    }

    li.innerHTML = `
            <input type="checkbox" class="task-checkbox" ${
              task.completed ? "checked" : ""
            }>
            <span class="task-text">${task.text}</span>
            <div class="task-actions">
                <button class="edit-btn" ${
                  task.completed ? "disabled" : ""
                }>Edit</button>
                <button class="delete-btn">Delete</button>
            </div>
        `;

    taskListUL.appendChild(li);
  });
  console.log("Tasks rendered to page."); //debugging!
}

//Add Task Functionality

function addTask() {
  const taskText = taskInput.value.trim();

  if (taskText === "") {
    alert("Please enter a task!");
    return;
  }

  const newTask = {
    id: Date.now().toString(), //unique ID based on current timestamp
    text: taskText,
    completed: false,
  };

  tasks.push(newTask);
  saveTasks();
  taskInput.value = "";
  renderTasks();
}

//Initial App Setup

document.addEventListener("DOMContentLoaded", () => {
  loadTasks();
  renderTasks();
  addBtn.addEventListener("click", addTask);

  taskListUL.addEventListener("change", (event) => {
    if (event.target.classList.contains("task-checkbox")) {
      const taskId = event.target.closest(".taskItem").dataset.id;
      console.log(`Checkbox toggled for task ID: ${taskId}`); //debuugging!

      const taskIndex = tasks.findIndex((task) => task.id === taskId);

      if (taskIndex !== -1) {
        tasks[taskIndex].completed = !tasks[taskIndex].completed;
        console.log(
          `Task '${tasks[taskIndex].text}' completed status changed to: ${tasks[taskIndex].completed}`
        ); //debugging!

        saveTasks();
        renderTasks();
      }
    }
  });

  taskListUL.addEventListener("click", (event) => {
    const taskItemElement = event.target.closest(".taskItem");
    if (!taskItemElement) return;

    const taskId = taskItemElement.dataset.id;
    const taskIndex = tasks.findIndex((task) => task.id === taskId);

    if (taskIndex === -1) return; // Task not found, exit

    if (event.target.classList.contains("edit-btn")) {
      const currentText = tasks[taskIndex].text;
      const newText = prompt("Edit task:", currentText);

      if (newText !== null && newText.trim() !== "") {
        tasks[taskIndex].text = newText.trim();
        saveTasks();
        renderTasks();
      } else if (newText !== null && newText.trim() === "") {
        alert("Task text cannot be empty! Task not updated.");
      }
    }

    if (event.target.classList.contains("delete-btn")) {
      const confirmDelete = confirm(
        `Are you sure you want to delete "${tasks[taskIndex].text}"?`
      );

      if (confirmDelete) {
        tasks = tasks.filter((task) => task.id !== taskId);

        saveTasks();
        renderTasks();
      }
    }
  });
});
