
let speed = 5; 
let lastTimestamp = 0; 
let npx = 89; 
let position = 2; // default
let currentOffset = 0; // current

let car1 = document.getElementById("car1");

// directions
document.addEventListener("keydown", (event) => {
  switch (event.keyCode) {
    case 37: turnOn("left"); break;
    case 39: turnOn("right"); break;
  }
});

// update position
function updatePosition() {
  car1.style.transform = `translateX(${currentOffset}px)`;
}

function turnOn(value) {
  if(!startGame || isPaused) return;
  if (value === "right" && position < 3) {
    position++;
    currentOffset += npx;
  } else if (value === "left" && position > 1) {
    position--;
    currentOffset -= npx;
  }
  updatePosition(); 
}

// Sélectionne les trottoirs
let sidewalks = document.querySelectorAll(".sidewalk");

// Create sidewalk
function createSidewalkLine(parent) {
  let line = document.createElement("div");
  line.style.width = "10px";
  line.style.height = "20px";
  line.style.position = "absolute";
  line.style.top = "-20px"; 
  line.classList.add("move", "bg-success-dark", "rounded");
  parent.appendChild(line);
}

let roadLines = document.querySelectorAll(".roadLines");
function createChildRoadLines(){
  roadLines.forEach(parent => {
    let childRoadLines = document.createElement("div");
    childRoadLines.style.width = "1px";
    childRoadLines.style.height = "75px";
    childRoadLines.style.position = "absolute";
    childRoadLines.style.top = "-75px"; 
    childRoadLines.classList.add("bg-info-light", "move");
  parent.appendChild(childRoadLines);
  })
}

// Animation
function animateSidewalkLines(timestamp) {
  if (!startGame || isPaused) return; 
  if (!lastTimestamp) lastTimestamp = timestamp;
  let delta = timestamp - lastTimestamp;
  if (delta > 16) { 
    // sidewalk lines
    sidewalks.forEach(parent => {
      const sidewalkLines = parent.querySelectorAll(".move");
      sidewalkLines.forEach(line => {
        let currentTop = parseInt(line.style.top);
        if (currentTop > 600) { line.remove(); } 
        else { line.style.top = `${currentTop + speed}px`; } // move
      });
      if (!sidewalkLines.length || parseInt(sidewalkLines[sidewalkLines.length - 1].style.top) > 200) {
        createSidewalkLine(parent);
      }
    });
    // road lines
    roadLines.forEach(parent => {
      const roadLines = parent.querySelectorAll(".move");
      roadLines.forEach(line => {
        let currentTop = parseInt(line.style.top);
        if (currentTop > 600) { line.remove(); } 
        else { line.style.top = `${currentTop + speed}px`; } // move
      });
      if (!roadLines.length || parseInt(roadLines[roadLines.length - 1].style.top) > 75) {
        createChildRoadLines(parent);
      }
    });
    lastTimestamp = timestamp;
  }
  animationId = requestAnimationFrame(animateSidewalkLines); 
}

// score
let showScore = document.getElementById("showScore");
showScore.textContent = "0 m";
let score = 0;
let scoreInterval;
let isPaused = true; 
let startGame = false; 
let animationId;

// update score
function updateScore() {
  score += 0.1;
  showScore.textContent = score.toFixed(1) + " m";
}

// start update score
function startUpdateScore() {
  scoreInterval = setInterval(updateScore, 100);
}

// stop update score
function stopScoreUpdate() {
  clearInterval(scoreInterval);
}

// driving
function drive() {
  animationId = requestAnimationFrame(animateSidewalkLines);
}

// start and pause drive : keyboard
document.addEventListener("keydown", (event) => {
  if (event.keyCode === 32) {
    toggleGame();
  }
});

// start drive: btn
let pause = document.getElementById("pause");
let startBtn = document.getElementById("start");

// start drive : btn
startBtn.addEventListener("click", toggleGame);

// pause btn
pause.addEventListener("click", toggleGame);

// toggle game state
function toggleGame() {
  if (!startGame) {
    // Démarrer le jeu
    startGame = true;
    isPaused = false;
    drive();
    startUpdateScore();
    startBtn.classList.add("d-none");
    pause.classList.remove("d-none");
  } else if (isPaused) {
    // Reprendre le jeu
    isPaused = false;
    drive();
    startUpdateScore();
    startBtn.classList.add("d-none");
    pause.classList.remove("d-none");
  } else {
    // pause game
    isPaused = true;
    cancelAnimationFrame(animationId);
    stopScoreUpdate();
    startBtn.classList.remove("d-none");
    pause.classList.add("d-none");
  }
}

// stop
function stopGame() {
  isPaused = true;
  cancelAnimationFrame(animationId);
  stopScoreUpdate();
}



