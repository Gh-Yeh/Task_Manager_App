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
