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
// --------------------------------         motivational quote
let motivationQuoteContent = document.querySelector(".motivation-2 h1");
let motivationAuthor = document.querySelector(".motivation-3 h2");
function motivationalQuote() {
  async function fetchQuote() {
    try {
      const res = await fetch("quote.json"); // Local fetch
      const data = await res.json();
      const random = data[Math.floor(Math.random() * data.length)];
      localStorage.setItem("dailyQuote", JSON.stringify(random));
      motivationQuoteContent.innerText = `"${random.content}"`;
      motivationAuthor.innerText = `-- ${random.author}`;
    } catch (error) {
      console.error("Error fetching local quote:", error);
    }
  }

  fetchQuote(); // fetch quote on page load
}
let dailyQuote = JSON.parse(localStorage.getItem("dailyQuote"));
if (dailyQuote == null) {
  motivationalQuote();
} else {
  motivationQuoteContent.innerText = `"${dailyQuote.content}"`;
  motivationAuthor.innerText = `-- ${dailyQuote.author}`;
}
setInterval(() => {
  motivationalQuote();
}, 86400000);

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

// -------------  theme
let theme = document.querySelector(".theme");
let flag = 0;

function currentTheme() {
  flag = JSON.parse(localStorage.getItem("flag"));
  let rootElement = document.documentElement;
  if (flag == 0) {
    rootElement.style.setProperty("--pri", "#f8f4e1");
    rootElement.style.setProperty("--sec", "#381c0a");
    rootElement.style.setProperty("--tri1", "#feba17");
    rootElement.style.setProperty("--tri2", "#74512d");
  } else if (flag == 1) {
    rootElement.style.setProperty("--pri", "#f1f0ecff");
    rootElement.style.setProperty("--sec", "#222831");
    rootElement.style.setProperty("--tri1", "#948979");
    rootElement.style.setProperty("--tri2", "#393E46");
  } else if (flag == 2) {
    rootElement.style.setProperty("--pri", "#E8FFD7");
    rootElement.style.setProperty("--sec", "#3E5F44");
    rootElement.style.setProperty("--tri1", "#93DA97");
    rootElement.style.setProperty("--tri2", "#5E936C");
  } else if (flag == 3) {
    rootElement.style.setProperty("--pri", "#DDE6ED");
    rootElement.style.setProperty("--sec", "#27374D");
    rootElement.style.setProperty("--tri1", "#9DB2BF");
    rootElement.style.setProperty("--tri2", "#526D82");
  } else if (flag == 4) {
    rootElement.style.setProperty("--pri", "#E7EFC7");
    rootElement.style.setProperty("--sec", "#3B3B1A");
    rootElement.style.setProperty("--tri1", "#AEC8A4");
    rootElement.style.setProperty("--tri2", "#8A784E");
  } else if (flag == 5) {
    rootElement.style.setProperty("--pri", "#EDE8DC");
    rootElement.style.setProperty("--sec", "#B17F59");
    rootElement.style.setProperty("--tri1", "#C1CFA1");
    rootElement.style.setProperty("--tri2", "#A5B68D");
  } else if (flag == 6) {
    rootElement.style.setProperty("--pri", "#EEEFE0");
    rootElement.style.setProperty("--sec", "#819A91");
    rootElement.style.setProperty("--tri1", "#D1D8BE");
    rootElement.style.setProperty("--tri2", "#A7C1A8");
  } else if (flag == 7) {
    rootElement.style.setProperty("--pri", "#F1F0E4");
    rootElement.style.setProperty("--sec", "#3E3F29");
    rootElement.style.setProperty("--tri1", "#BCA88D");
    rootElement.style.setProperty("--tri2", "#7D8D86");
  }
}
currentTheme();
function changeTheme() {
  if (flag == 0) {
    localStorage.removeItem("flag");
    localStorage.setItem("flag", JSON.stringify(1));
    currentTheme();
  } else if (flag == 1) {
    localStorage.removeItem("flag");
    localStorage.setItem("flag", JSON.stringify(2));
    currentTheme();
  } else if (flag == 2) {
    localStorage.removeItem("flag");
    localStorage.setItem("flag", JSON.stringify(3));
    currentTheme();
  } else if (flag == 3) {
    localStorage.removeItem("flag");
    localStorage.setItem("flag", JSON.stringify(4));
    currentTheme();
  } else if (flag == 4) {
    localStorage.removeItem("flag");
    localStorage.setItem("flag", JSON.stringify(5));
    currentTheme();
  } else if (flag == 5) {
    localStorage.removeItem("flag");
    localStorage.setItem("flag", JSON.stringify(6));
    currentTheme();
  } else if (flag == 6) {
    localStorage.removeItem("flag");
    localStorage.setItem("flag", JSON.stringify(7));
    currentTheme();
  } else if (flag == 7) {
    localStorage.removeItem("flag");
    localStorage.setItem("flag", JSON.stringify(0));
    currentTheme();
  }
}
theme.addEventListener("click", function () {
  changeTheme();
});

// ---------------------  daily goals

function dailyGoals() {
  let form = document.querySelector(".addGoal form");
  let goalInput = document.querySelector(".daily-goals-page #goal-input");
  let allGoalsDiv = document.querySelector(".daily-goals-page .allTask");

  let dailyGoals = JSON.parse(localStorage.getItem("dailyGoals")) || [];

  function renderGoals() {
    localStorage.setItem("dailyGoals", JSON.stringify(dailyGoals));
    let content = "";
    dailyGoals.forEach((goal, idx) => {
      content += `
        <div class="goal">
          <p>${goal}</p>
          <button id="${idx}" class="remove-goal">Remove</button>
        </div>`;
    });
    allGoalsDiv.innerHTML = content;

    document.querySelectorAll(".remove-goal").forEach((btn) => {
      btn.addEventListener("click", function () {
        dailyGoals.splice(btn.id, 1);
        renderGoals();
      });
    });
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    dailyGoals.push(goalInput.value);
    goalInput.value = "";
    renderGoals();
  });

  renderGoals();
}
dailyGoals();
