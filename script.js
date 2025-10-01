let [hours, minutes, seconds, milliseconds] = [0, 0, 0, 0];
let timer = null;
let running = false;

const display = document.getElementById("display");
const startStopBtn = document.getElementById("startStopBtn");
const resetLapBtn = document.getElementById("resetLapBtn");
const laps = document.getElementById("laps");
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const themeLabel = document.getElementById("themeLabel");


function updateDisplay() {
  let h = hours < 10 ? "0" + hours : hours;
  let m = minutes < 10 ? "0" + minutes : minutes;
  let s = seconds < 10 ? "0" + seconds : seconds;
  let ms = milliseconds < 10 ? "0" + milliseconds : milliseconds;
  display.textContent = `${h}:${m}:${s}.${ms}`;
}

function timerTick() {
  milliseconds++;
  if (milliseconds === 100) {
    milliseconds = 0;
    seconds++;
  }
  if (seconds === 60) {
    seconds = 0;
    minutes++;
  }
  if (minutes === 60) {
    minutes = 0;
    hours++;
  }
  updateDisplay();
}

startStopBtn.addEventListener("click", () => {
  if (!running) {
    timer = setInterval(timerTick, 10);
    running = true;
    startStopBtn.textContent = "Stop";
    startStopBtn.className = "stop";
    resetLapBtn.textContent = "Lap";
    resetLapBtn.className = "lap";
  } else {
    clearInterval(timer);
    running = false;
    startStopBtn.textContent = "Start";
    startStopBtn.className = "start";
    resetLapBtn.textContent = "Reset";
    resetLapBtn.className = "reset";
  }
});

resetLapBtn.addEventListener("click", () => {
  if (!running) {

    // Reset
    [hours, minutes, seconds, milliseconds] = [0, 0, 0, 0];
    updateDisplay();
    laps.innerHTML = "";
  } else {

    // Laps
    const li = document.createElement("div");
    li.className = "lap-item";

    const lapLabel = document.createElement("span");
    lapLabel.textContent = `Lap ${laps.children.length + 1}`;

    const lapValue = document.createElement("span");
    lapValue.textContent = display.textContent;

    li.appendChild(lapLabel);
    li.appendChild(lapValue);
    laps.appendChild(li);
  }
});

//  Dark/Light Mode 
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  if (document.body.classList.contains("dark")) {
     themeIcon.src = "images/light_mode.svg";
     themeLabel.textContent = " Light";
  } else {
    themeIcon.src = "images/dark_mode.svg";
    themeLabel.textContent = "Dark"; 
  }
});

updateDisplay();
