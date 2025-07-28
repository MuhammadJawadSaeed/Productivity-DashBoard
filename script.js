// ------------            To Do List      -----------------

function openFeatures() {
  var allElem = document.querySelectorAll(".elem");
  var allElemPage = document.querySelector(".allElems");
  var fullElemPage = document.querySelectorAll(".fullElem");
  var fullElemBack = document.querySelectorAll(".back");

  let activeSectionId = localStorage.getItem("activeSection");
  if (activeSectionId !== null) {
    fullElemPage[activeSectionId].style.display = "block";
    allElemPage.style.display = "none";
    
  }

  allElem.forEach(function (elem) {
    elem.addEventListener("click", function () {
      localStorage.setItem("activeSection", elem.id);
      fullElemPage[elem.id].style.display = "block";
      allElemPage.style.display = "none";
    });
  });

  fullElemBack.forEach(function (back) {
    back.addEventListener("click", function () {
      fullElemPage[back.id].style.display = "none";
      allElemPage.style.display = "flex";
      localStorage.removeItem("activeSection");
    });
  });
}
openFeatures();

let form = document.querySelector(".addTask form");
let taskInput = document.querySelector(".addTask form #task-input");
let taskDetailsInput = document.querySelector(".addTask form textarea");
let taskCheckbox = document.querySelector(".addTask form #check");

let currentTask = [];

if (localStorage.getItem("currentTask")) {
  currentTask = JSON.parse(localStorage.getItem("currentTask"));
} else {
  console.log("No task.");
}

function renderTast() {
  localStorage.setItem("currentTask", JSON.stringify(currentTask));
  var allTask = document.querySelector(".allTask");
  let sum = "";
  currentTask.forEach(function (elem, idx) {
    sum =
      sum +
      `<div class="task">
              <h5>${elem.task} <span class=${elem.imp}>imp</span></h5>
              <button id=${idx}>Mark As Completed</button>
            </div>`;
  });

  allTask.innerHTML = sum;
}
renderTast();

form.addEventListener("submit", function (e) {
  e.preventDefault();
  currentTask.push({
    task: taskInput.value,
    details: taskDetailsInput.value,
    imp: taskCheckbox.checked,
  });

  taskInput.value = "";
  taskDetailsInput.value = "";
  taskCheckbox.value = false;
  renderTast();
  location.reload();
});

let markCompletedBtn = document.querySelectorAll(".task button");

markCompletedBtn.forEach(function (btn) {
  btn.addEventListener("click", function () {
    currentTask.splice(btn.id, 1);
    renderTast();
    location.reload();
  });
});
