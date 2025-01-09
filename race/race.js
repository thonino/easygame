// Configuration et variables globales
const SPEED = 5;
const N_PIXELS = 89;
const ITEMS = ["bad", "bad", "bad", "good", "car2", "car2"];
const POSITION_ITEM_X = ["41", "130", "219"];
const ITEM_HEIGHT = { "bad": 40, "good": 80, "car2": 150 };

let lastTimestamp = 0;
let position = 2;
let currentOffset = 0;
let score = 0;
let isPaused = true;
let startGame = false;
let animationId;
let itemsInterval;

// DOM Elements
const car1 = document.getElementById("car1");
const showScore = document.getElementById("showScore");
const startBtn = document.getElementById("start");
const pauseBtn = document.getElementById("pause");
const sidewalks = document.querySelectorAll(".sidewalk");
const roadLines = document.querySelectorAll(".roadLines");
const itemContainer = document.querySelector(".items");

// Mise à jour de la position de la voiture
function updatePosition() {
  car1.style.transform = `translateX(${currentOffset}px)`;
}

// Tourner à gauche ou à droite
function turnOn(direction) {
  if (startGame && !isPaused) {
    const isRight = direction === "right";
    const isLeft = direction === "left";
    const canMoveRight = position < 3;
    const canMoveLeft = position > 1;
    if (isRight && canMoveRight){position++; currentOffset += N_PIXELS;} 
    else if (isLeft && canMoveLeft){position--; currentOffset -= N_PIXELS;}
    updatePosition();
  }
}

// Afficher un élément à une position aléatoire
function appearItems(randomItem, randomPositionItemX) {
  const height = ITEM_HEIGHT[randomItem];
  const topPosition = -height + 20;
  const appear = document.createElement("img");
  appear.src = `../img/${randomItem}.png`;
  appear.style.position = "absolute";
  appear.style.top = `${topPosition}px`;
  appear.style.left = `${randomPositionItemX}px`;
  appear.classList.add("move");
  itemContainer.appendChild(appear);
}

// Créer une ligne de trottoir
function createSidewalkLine(parent) {
  const line = document.createElement("div");
  line.style.width = "10px";
  line.style.height = "20px";
  line.style.position = "absolute";
  line.style.top = "-20px";
  line.classList.add("move", "bg-success-dark", "rounded");
  parent.appendChild(line);
}

// Créer une ligne de route
function createChildRoadLines(parent) {
  const childRoadLines = document.createElement("div");
  childRoadLines.style.width = "1px";
  childRoadLines.style.height = "75px";
  childRoadLines.style.position = "absolute";
  childRoadLines.style.top = "-75px";
  childRoadLines.classList.add("bg-info-light", "move");
  parent.appendChild(childRoadLines);
}

// Animation 
function animate(timestamp) {
  if (!startGame || isPaused) return;
  if (!lastTimestamp) lastTimestamp = timestamp;
  let delta = timestamp - lastTimestamp;
  if (delta > 16) {
    sidewalks.forEach(createMoveElements); // sidewalk move
    roadLines.forEach(createMoveElements); // road move
    // Items move
    itemContainer.querySelectorAll(".move").forEach(line => {
      let currentTop = parseInt(line.style.top);
      if (currentTop > 600) line.remove();
      else line.style.top = `${currentTop + SPEED}px`;
    });
    lastTimestamp = timestamp;
  }
  animationId = requestAnimationFrame(animate);
}

function createMoveElements(parent) {
  parent.querySelectorAll(".move").forEach(line => {
    let currentTop = parseInt(line.style.top);
    if (currentTop > 600) line.remove();
    else line.style.top = `${currentTop + SPEED}px`;
  });
  const moveElements = parent.querySelectorAll(".move");
  const lastTop = moveElements.length ? 
    parseInt(moveElements[moveElements.length - 1].style.top) : 0;
  if (!moveElements.length || lastTop > 200) {
    if (parent.classList.contains("sidewalk")) createSidewalkLine(parent);
    else if (parent.classList.contains("roadLines")) createChildRoadLines(parent);
  }
  
}

// updates
function updateScore(){score++; showScore.textContent = `${score} m`;}
function startUpdateScore(){setInterval(updateScore, 250);}
function drive() { animationId = requestAnimationFrame(animate);}

// Keyboard
document.addEventListener("keydown", (event) => {
  switch (event.keyCode) {
    case 37: turnOn("left"); break; // Flèche gauche
    case 39: turnOn("right"); break; // Flèche droite
    case 32: toggleGame(); break;  // Espace pour démarrer/mettre en pause
  }
});

// Toggle de l'état du jeu
function toggleGame() {
  if (startGame) { 
    if (isPaused) { resumeGame();} 
    else { pauseGame();}} 
  else { startGameFlow();}
}

function startGameFlow() {
  startGame = true;
  isPaused = false;
  drive();
  itemsInterval = setInterval(() => {
    const randomItem = ITEMS[Math.floor(Math.random() * ITEMS.length)];
    const randomPosition = POSITION_ITEM_X[Math.floor(Math.random() * POSITION_ITEM_X.length)];
    appearItems(randomItem, randomPosition);
  }, 2000);
  startUpdateScore();
  startBtn.classList.add("d-none");
  pauseBtn.classList.remove("d-none");
}

function resumeGame() {
  isPaused = false;
  drive();
  itemsInterval = setInterval(() => {
    const randomItem = ITEMS[Math.floor(Math.random() * ITEMS.length)];
    const randomPosition = POSITION_ITEM_X[Math.floor(Math.random() * POSITION_ITEM_X.length)];
    appearItems(randomItem, randomPosition);
  }, 2000);
  startUpdateScore();
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

// Démarrer/arrêter le jeu via les boutons
startBtn.addEventListener("click", toggleGame);
pauseBtn.addEventListener("click", toggleGame);

// Initialisation
function init() {
  showScore.textContent = "0 m";
  startGame = false;
  isPaused = true;
}

init();
