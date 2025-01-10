// Global settings
const SPEED = 7;
const N_PIXELS = 89;
const ITEMS = ["bad", "good", "car2"];
const POSITION_ITEM_X = ["41", "130", "219"];
const ITEM_HEIGHT = { "bad": 40, "good": 80, "car2": 125 };
const ANGLE = 45;

let lastTimestamp = 0;
let positionCar = 1;
let currentPositionCar = 0;
let score = 0;
let lifeScore = 0;
let isPaused = true;
let startGame = false;
let animationId;
let itemsInterval;
let activeItems = []; // Active items array
let lastKeyPress = 0;

// DOM elements
const car1 = document.getElementById("car1");
const showScore = document.getElementById("showScore");
const startBtn = document.getElementById("start");
const pauseBtn = document.getElementById("pause");
const sidewalks = document.querySelectorAll(".sidewalk");
const roadLines = document.querySelectorAll(".roadLines");
const itemContainer = document.querySelector(".items");
const showLifeScore = document.getElementById("showLifeScore");

showLifeScore.textContent = lifeScore;

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
  activeItems.push(item);
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
  const isSameY = itemTop + itemHeight - 5 >= carTopMin && itemTop + itemHeight - 5 <= carTopMax;
  if (isSameX && isSameY) {
    if (item.dataset.type === "good") {
      updateLifeScore("more");
    } else {
      if (lifeScore > 0) {
        updateLifeScore("less");
      } else {
        console.log("GAME OVER");
        gameOver();
      }
    }
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
  showScore.textContent = `${score} m`;
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
    activeItems = activeItems.filter((item) => {
      const currentTop = parseInt(item.style.top);
      if (currentTop > 600 || isBoum(item)) {
        item.remove();
        return false; // Remove from activeItems
      } else {
        item.style.top = `${currentTop + SPEED}px`;
        return true; // Keep in activeItems
      }
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
    else line.style.top = `${currentTop + SPEED}px`;
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

// Game state
function toggleGame() {
  if (startGame) {
    if (isPaused) resumeGame();
    else pauseGame();
  } else startGaming();
}

function startGaming() {
  startGame = true;
  isPaused = false;
  drive();
  itemsInterval = setInterval(appearItems, 3000);
  startBtn.classList.add("d-none");
  pauseBtn.classList.remove("d-none");
}

function resumeGame() {
  isPaused = false;
  drive();
  itemsInterval = setInterval(appearItems, 3000);
  startBtn.classList.remove("d-none");
  pauseBtn.classList.add("d-none");
}

function pauseGame() {
  isPaused = true;
  cancelAnimationFrame(animationId);
  clearInterval(itemsInterval);
  startBtn.classList.remove("d-none");
  pauseBtn.classList.add("d-none");
}

function gameOver() {
  pauseGame();
}

// Driving animation
function drive() {
  animationId = requestAnimationFrame(animate);
}

// Keyboard events
document.addEventListener("keydown", (event) => {
  switch (event.keyCode) {
    case 37:
      turnOn("left");
      break; // Left arrow
    case 39:
      turnOn("right");
      break; // Right arrow
    case 32:
      toggleGame();
      break; // Space
  }
});



// Init
function init() {
  showScore.textContent = "0 m";
  lifeScore = 0;
  activeItems = [];
}

init();
