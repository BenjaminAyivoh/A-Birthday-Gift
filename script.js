let timerInterval; // Declare this at the top of your script.js
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(taskList));
}

function renderTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  taskList.forEach((task, index) => {
    if (
      currentFilter === "completed" && !task.done ||
      currentFilter === "pending" && task.done
    ) return;

    const li = document.createElement("li");
    li.textContent = task.text;
    if (task.done) li.classList.add("done");

    li.onclick = () => toggleTask(index);

    const deleteBtn = document.createElement("span");
    deleteBtn.textContent = "❌";
    deleteBtn.style.marginLeft = "10px";
    deleteBtn.style.cursor = "pointer";
    deleteBtn.onclick = (e) => {
      e.stopPropagation();
      deleteTask(index);
    };

    li.appendChild(deleteBtn);
    list.appendChild(li);
  });
}

function addTask() {
  const input = document.getElementById("taskInput");
  const text = input.value.trim();
  if (text === "") return;
  taskList.push({ text, done: false });
  input.value = "";
  saveTasks();
  renderTasks();
}

function toggleTask(index) {
  taskList[index].done = !taskList[index].done;
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  taskList.splice(index, 1);
  saveTasks();
  renderTasks();
}

function setFilter(filter) {
  currentFilter = filter;
  document.querySelectorAll("#filters button").forEach(btn => {
    btn.classList.remove("active");
  });
  document.querySelector(`#filters button[onclick*="${filter}"]`).classList.add("active");
  renderTasks();
}

renderTasks();

function startTimer() {
  clearInterval(timerInterval);
  time = 25 * 60;
  updateDisplay();
  document.querySelector('button[onclick="startTimer()"]').disabled = true;

  timerInterval = setInterval(() => {
    tick();
    if (time <= 0) {
      document.querySelector('button[onclick="startTimer()"]').disabled = false;
    }
  }, 1000);
}

    function updateDisplay() {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    document.getElementById("timer-display").textContent =
      `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }

    function tick() {
  if (time <= 0) {
    clearInterval(timerInterval);
    alert("Time's up! Take a short break.");
  } else {
    time--;
    updateDisplay();
  }
}

 function stopTimer() {
  clearInterval(timerInterval);
  document.getElementById("timer-display").textContent = "25:00";
}
    