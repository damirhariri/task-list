//UI Vars
const form = document.querySelector("#task-form");
const taskList = document.querySelector(".task-list");
const clearBtn = document.querySelector("#clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task-input");

loadEventListeners();

// Load event listeners
function loadEventListeners() {
  document.addEventListener("DOMContentLoaded", insertItemFromLS);
  form.addEventListener("submit", addTask);
  taskList.addEventListener("click", deleteItem);
  clearBtn.addEventListener("click", clearTasks);
  filter.addEventListener("keyup", filterTasks);
}

function insertItemFromLS() {
  let tasks;

  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.className = "list-item";
    li.appendChild(document.createTextNode(task));
    const a = document.createElement("a");
    a.className = "delete-item";
    a.innerHTML = '<i class="fa fa-remove"></i>';
    li.appendChild(a);
    taskList.appendChild(li);
  });
}

function addTask(e) {
  if (taskInput.value === "") {
    alert("Add a task");
  } else {
    const li = document.createElement("li");
    li.className = "list-item";
    li.appendChild(document.createTextNode(taskInput.value));
    const a = document.createElement("a");
    a.className = "delete-item";
    a.innerHTML = '<i class="fa fa-remove"></i>';
    li.appendChild(a);
    taskList.appendChild(li);

    setItemInLocalStorage(taskInput.value);

    taskInput.value = "";

    e.preventDefault();
  }
}

function setItemInLocalStorage(task) {
  let tasks;

  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.push(task);

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function deleteItem(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("are you sure?")) {
      e.target.parentElement.parentElement.remove();

      removeFromLS(e.target.parentElement.parentElement);
    }
  }
}

function removeFromLS(item) {
  let tasks;

  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach((task, index) => {
    if (item.textContent === task) {
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function clearTasks() {
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
  clearTasksFromLocalStorage();
}

function clearTasksFromLocalStorage() {
  localStorage.clear();
}

function filterTasks(e) {
  const inputText = e.target.value.toLowerCase();

  document.querySelectorAll(".task-list").forEach((task) => {
    const item = task.firstChild.textContent.toLowerCase();
    console.log(item);
    if (item.toLowerCase().indexOf(inputText) !== -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}
