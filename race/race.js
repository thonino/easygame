// Global settings
const N_PIXELS = 89;
const ITEMS = ["bad","bad","bad", "good", "boost","car2", "car2"];
const POSITION_ITEM_X = ["41", "130", "219"];
const ITEM_HEIGHT = { "bad": 40, "good": 80, "car2": 125, "boost" : 80, };
const ANGLE = 45;

let speed = 7;
let itemspeed = { "bad": speed, "good": speed, "boost" : speed, "car2": speed / 2,}; 
let lastTimestamp = 0;
let positionCar = 1;
let currentPositionCar = 0;
let score = 0;
let topScore = 0;
let lifeScore = 0;
let isPaused = true;
let startGame = false;
let animationId;
let itemsInterval;
let lastKeyPress = 0;
let gameOverStatus = false;

// DOM elements
const car1 = document.getElementById("car1");
const showScore = document.getElementById("showScore");
const startBtn = document.getElementById("start");
const retryBtn = document.getElementById("retry");
const pauseBtn = document.getElementById("pause");
const sidewalks = document.querySelectorAll(".sidewalk");
const roadLines = document.querySelectorAll(".roadLines");
const itemContainer = document.querySelector(".items");
const showLifeScore = document.getElementById("showLifeScore");
const showTopScore = document.getElementById("showTopScore");
const fire = document.getElementById("fire");
const showDirections = document.getElementById("showDirections");

showLifeScore.textContent = lifeScore;
showTopScore.textContent = topScore;

// Car movement
function updatePosition(direction) {
  const angle = direction === "left" ? -ANGLE : ANGLE;
  car1.style.transform = `translateX(${currentPositionCar}px) rotate(${angle}deg)`;
  setTimeout(() => {
    car1.style.transform = `translateX(${currentPositionCar}px) rotate(0deg)`;
  }, 125);
}

function turnOn(direction) {
  if (!startGame || isPaused) return;
  if (direction === "right" && positionCar < 2) {
    positionCar++;
    currentPositionCar += N_PIXELS;
  } else if (direction === "left" && positionCar > 0) {
    positionCar--;
    currentPositionCar -= N_PIXELS;
  }
  updatePosition(direction);
}

// Item appear
function appearItems() {
  const randomItem = ITEMS[Math.floor(Math.random() * ITEMS.length)];
  const randomPosition = POSITION_ITEM_X[Math.floor(Math.random() * POSITION_ITEM_X.length)];
  const height = ITEM_HEIGHT[randomItem];
  const topPosition = -height;
  const item = document.createElement("img");
  item.src = `../img/${randomItem}.png`;
  item.style.position = "absolute";
  item.style.top = `${topPosition}px`;
  item.style.left = `${randomPosition}px`;
  item.classList.add("move");
  item.dataset.type = randomItem;
  itemContainer.appendChild(item);
}

// Collision detection
function isBoum(item) {
  const carPositionX = POSITION_ITEM_X[positionCar];
  const carTopMin = 390;
  const carTopMax = 540;
  const itemTop = parseInt(item.style.top);
  const itemLeft = parseInt(item.style.left);
  const itemHeight = ITEM_HEIGHT[item.dataset.type];
  const isSameX = itemLeft === parseInt(carPositionX);
  const isSameY = itemTop + itemHeight +30 >= carTopMin && 
                  itemTop + itemHeight +30 <= carTopMax;
  if (isSameX && isSameY) {
    if (item.dataset.type === "boost") { 
      speed = 14  ;
      fire.classList.remove("d-none");
      animate();
      setTimeout(() => {
      speed = 7  ;
      fire.classList.add("d-none");
      animate();  
      }, 10000);
    } 
    if (item.dataset.type === "good") { updateLifeScore("more");} 
    if (item.dataset.type !== "good" && item.dataset.type !== "boost"){ 
      if (lifeScore > 0) { updateLifeScore("less"); } 
      else { gameOver();  }
    }
    item.remove();  // Remove item after collision
    return true; // Collision happened
  }
  return false; // No collision
}

// Update life score
function updateLifeScore(value) {
  lifeScore += value === "more" ? 1 : -1;
  showLifeScore.textContent = lifeScore;
}

function updateScore() {
  score++;
  showScore.textContent = score;
  updateTopScore(score);
}

function updateTopScore(score){
  if(score > topScore) {
    topScore = score;
    showTopScore.textContent = topScore;
  }
}

// Animation
let frameCount = 0; // Frame counter
let scoreUpdateInterval = 10; // Update score every 10 frames
function animate(timestamp) {
  if (!startGame || isPaused) return;
  const delta = timestamp - lastTimestamp;
  if (delta > 16) {
    sidewalks.forEach(createMoveElements);
    roadLines.forEach(createMoveElements);
    const items = document.querySelectorAll(".items img");
    items.forEach((item) => {
      const currentTop = parseInt(item.style.top);
      if(currentTop > 600 || isBoum(item)){ item.remove();} // Remove item
      else{item.style.top = `${currentTop + itemspeed[item.dataset.type]}px`;}
    });
    lastTimestamp = timestamp;
  }
  frameCount++;
  if (frameCount >= scoreUpdateInterval) {
    updateScore();  // Update the score
    frameCount = 0;  // Reset the counter
  }
  animationId = requestAnimationFrame(animate);
}

// Create moving elements
function createMoveElements(parent) {
  parent.querySelectorAll(".move").forEach((line) => {
    const currentTop = parseInt(line.style.top);
    if (currentTop > 600) line.remove();
    else line.style.top = `${currentTop + speed}px`;
  });
  const moveElements = parent.querySelectorAll(".move");
  const lastTop = moveElements.length
    ? parseInt(moveElements[moveElements.length - 1].style.top)
    : 0;
  if (!moveElements.length || lastTop > 200) {
    const line = document.createElement("div");
    line.style.width = parent.classList.contains("sidewalk") ? "10px" : "1px";
    line.style.height = parent.classList.contains("sidewalk") ? "20px" : "75px";
    line.style.position = "absolute";
    line.style.top = "-20px";
    line.classList.add("move","rounded", parent.classList.contains("sidewalk") 
                              ? "bg-success-dark": "bg-info-light");
    parent.appendChild(line);
  }
}

// Keyboard events
document.addEventListener("keydown", (event) => {
  switch (event.keyCode) {
    case 37: turnOn("left"); break; // Left arrow
    case 39: turnOn("right"); break; // Right arrow
    case 32: 
      if(gameOverStatus){ retryFx(); }
      else{ toggleGame(); }
    break; // Space
  }
});

// Game state

function toggleGame() {
  if (startGame) {
    if (isPaused) {
      resumeGame(); 
      showDirections.classList.remove("d-none");
      showDirections.style.opacity = 1; 
    }
    else{ 
      pauseGame(); 
      showDirections.classList.add("d-none");
    }
  } else { 
    startGaming(); 
    car1.style.transition = "margin-bottom 2s ease";  
    car1.classList.add("mb-5"); 

    // Transition de showDirections
    setTimeout(() => {
      showDirections.classList.remove("d-none");
      setTimeout(() => {
        showDirections.style.opacity = 1; 
      }, 10);
    }, 1000);

    // Réduire la transition après 2 secondes
    setTimeout(() => {
      car1.style.transition = "margin-bottom 0.4s ease";  
      car1.style.transition = "transform 0.5s ease";  
    }, 2000);
  }
}




function startGaming() {
  startGame = true;
  isPaused = false;
  drive();
  itemsInterval = setInterval(appearItems, 2500);
  startBtn.classList.add("d-none");
  pauseBtn.classList.remove("d-none");
}

function resumeGame() {
  isPaused = false;
  drive();
  itemsInterval = setInterval(appearItems, 2500);
  startBtn.classList.add("d-none");
  pauseBtn.classList.remove("d-none");
}

function pauseGame() {
  isPaused = true;
  cancelAnimationFrame(animationId);
  clearInterval(itemsInterval);
  startBtn.classList.remove("d-none");
  pauseBtn.classList.add("d-none");
}

const showGameOverModal = document.getElementById("gameOverModal");
const topScoreBroken = document.getElementById("topScoreBroken");
const modal = new bootstrap.Modal(showGameOverModal)
function gameOver() {
  gameOverStatus = true;
  isPaused = true;
  cancelAnimationFrame(animationId);
  clearInterval(itemsInterval);
  pauseBtn.classList.add("d-none");
  retryBtn.classList.remove("d-none");
  showDirections.classList.add("d-none");
  document.getElementById('endScore').textContent = score;
  setTimeout(() => {
    modal.show();
    if(score === topScore){ topScoreBroken.classList.remove("d-none");  }
    setTimeout(() => { modal.hide(); }, 4000);
  }, 500);
}

// Driving animation
function drive() { animationId = requestAnimationFrame(animate); }

function retryFx() {
  gameOverStatus = false;
  init();
  toggleGame();
  topScoreBroken.classList.add("d-none");
  retryBtn.classList.add("d-none");
  if(positionCar === 0){
    positionCar++;
    currentPositionCar += N_PIXELS;
    let turn = "right";
    updatePosition(turn);
  }
  if(positionCar === 2){
    positionCar--;
    currentPositionCar -= N_PIXELS;
    let turn = "left";
    updatePosition(turn);
  }
}

// Init
function init() {
  score = 0;
  showScore.textContent = "0";
  const items = document.querySelectorAll(".items img");
  items.forEach(item => item.remove());  // Clear any existing items
}

init(); 
