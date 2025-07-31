// ----------            App Feature
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
// ------------            To Do List
function toDoList() {
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
}
toDoList();

// ---------------------------------            Daily Planner
function dailyPlanner() {
  let dayPlanData = JSON.parse(localStorage.getItem("dayPlanData")) || {};
  let dayPlanner = document.querySelector(".day-planner");
  var hours = Array.from(
    { length: 18 },
    (_, idx) => `${6 + idx}:00 - ${7 + idx}:00`
  );
  var wholeDaySum = "";
  hours.forEach(function (elem, idx) {
    var savedData = dayPlanData[idx] || "";
    wholeDaySum =
      wholeDaySum +
      `<div class="day-planner-time">
              <p>${elem}</p>
              <input id=${idx} type="text" placeholder="..." value=${savedData}>
            </div>`;
  });
  dayPlanner.innerHTML = wholeDaySum;
  let dayPlannerInput = document.querySelectorAll(".day-planner input");
  dayPlannerInput.forEach(function (elem) {
    elem.addEventListener("input", function () {
      dayPlanData[elem.id] = elem.value;
      localStorage.setItem("dayPlanData", JSON.stringify(dayPlanData));
    });
  });
}
dailyPlanner();

// function motivationalQuote() {
//   let motivationQuoteContent = document.querySelector(".motivation-2 h1");
//   let motivationAuthor = document.querySelector(".motivation-3 h2");

//   async function fetchQuote() {
//     try {
//       let response = await fetch(
//         "https://api.quotable.io/random"
//       );
//       let data = await response.json();
//       console.log(data);

//       // Pick a random quote
//       let randomIndex = Math.floor(Math.random() * data.length);
//       let quote = data[randomIndex];

//       motivationQuoteContent.innerHTML = quote.text;
//       motivationAuthor.innerHTML = quote.author ? quote.author : "Unknown";
//     } catch (error) {
//       console.error("Error fetching quote:", error);
//     }
//   }

//   fetchQuote();
// }

// motivationalQuote();

// --------------------------------------      Pomodoro Timer

function pomodoroTimer() {
  let timer = document.querySelector(".pomo-timer h2");
  let startBtn = document.querySelector(".pomo-timer .start");
  let pauseBtn = document.querySelector(".pomo-timer .pause");
  let resetBtn = document.querySelector(".pomo-timer .reset");
  let session = document.querySelector(".pomodoro-timer-page h4");

  let isWorkSessoin = true;
  let timeInterval = null;
  let totalSeconds = 25 * 60;

  function updateTimer() {
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;
    timer.innerHTML = `${String(minutes).padStart(2, "0")}:${String(
      seconds
    ).padStart(2, "0")}`;
  }

  function startTimer() {
    clearInterval(timeInterval);

    if (isWorkSessoin) {
      timeInterval = setInterval(function () {
        if (totalSeconds == 0) {
          clearInterval(timeInterval);
          session.innerHTML = "Take a Break";
          timer.innerHTML = "05:00";
          totalSeconds = 5 * 60;
          session.style.backgroundColor = "var(--blue)";
          isWorkSessoin = false;
        } else {
          totalSeconds--;
          updateTimer();
        }
      }, 1000);
    } else {
      timeInterval = setInterval(function () {
        if (totalSeconds == 0) {
          clearInterval(timeInterval);
          isWorkSessoin = true;
          timer.innerHTML = "25:00";
          totalSeconds = 25 * 60;
          session.innerHTML = "Word Session";
          session.style.backgroundColor = "var(--green)";
        } else {
          totalSeconds--;
          updateTimer();
        }
      }, 1000);
    }
  }

  function pauseTimer() {
    clearInterval(timeInterval);
  }
  function resetTimer() {
    clearInterval(timeInterval);
    totalSeconds = 25 * 60;
    updateTimer();
  }
  startBtn.addEventListener("click", startTimer);
  pauseBtn.addEventListener("click", pauseTimer);
  resetBtn.addEventListener("click", resetTimer);
}
pomodoroTimer();

// -------------------------------        Weather

function weatherFetch() {
  let key = " 6792389ce2444454bc5170553253007";
  let city = "Multan";
  let data = null;
  let header1Time = document.querySelector(".header1 h2");
  let header1Date = document.querySelector(".header1 h3");
  let tem = document.querySelector(".header2 h2");
  let condition = document.querySelector(".header2 h3");
  let precipitation = document.querySelector(".header2 .precipitation");
  let humidity = document.querySelector(".header2 .humidity");
  let wind = document.querySelector(".header2 .wind");

  async function weather() {
    try {
      let response = await fetch(
        `http://api.weatherapi.com/v1/current.json?key=${key}&q=${city}&aqi=no`
      );
      data = await response.json();
      console.log(data);

      tem.innerHTML = `${Math.floor(data.current.temp_c)}°C`;
      condition.innerHTML = `${data.current.condition.text}`;
      precipitation.innerHTML = `Heat Index: ${data.current.heatindex_c}%`;
      humidity.innerHTML = `Humidity: ${data.current.humidity}%`;
      wind.innerHTML = `Wind: ${data.current.wind_kph} km/h`;
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  }
  weather();
  let date = null;
  function timeDate() {
    const totalDayOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    date = new Date();
    let dayOfWeek = totalDayOfWeek[date.getDay()];
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    let tarikh = date.getDate();
    let month = months[date.getMonth()];
    let year = date.getFullYear();

    if (hours > 12) {
      header1Time.innerHTML = `${String(hours - 12).padStart(2, "0")}:${String(
        minutes
      ).padStart(2, "0")}:${String(seconds).padStart(2, "0")} pm`;
    } else {
      header1Time.innerHTML = `${String(hours).padStart(2, "0")}:${String(
        minutes
      ).padStart(2, "0")}:${String(seconds).padStart(2, "0")} am`;
    }
    header1Date.innerHTML = `${dayOfWeek}, ${tarikh} ${month}, ${year}`;
  }
  setInterval(() => {
    timeDate();
  }, 1000);
}
weatherFetch();
