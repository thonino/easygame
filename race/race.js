const car1 = document.getElementById("car1");

// Variables globales
const npx = 89; // Distance entre les positions
let position = 2; // Position initiale (milieu)
let currentOffset = 0; // Décalage horizontal
let startGame = false; // Indique si le jeu a commencé
let roadHeight = 1000; // Hauteur totale de la route
let visibleHeight = 560; // Hauteur visible dans le conteneur
let roadOffset = 0; // Décalage pour les lignes centrales
let sidewalkOffset = 0; // Décalage pour les lignes de trottoir
let speed = 6; // Vitesse de défilement des lignes (plus grand = plus rapide)

const sidewalk = document.querySelectorAll(".sidewalk");
const roadLines = document.querySelectorAll(".roadLines");

// Gestion des directions (gauche/droite)
document.addEventListener("keydown", (event) => {
  if (!startGame) return; // Ignore si le jeu n'a pas commencé
  switch (event.keyCode) {
    case 37: // Flèche gauche
      turnOn("left");
      break;
    case 39: // Flèche droite
      turnOn("right");
      break;
  }
});

// Met à jour la position de la voiture
function updatePosition() {
  car1.style.transform = `translateX(${currentOffset}px)`;
}

function turnOn(direction) {
  if (direction === "right" && position < 3) {
    position++;
    currentOffset += npx;
  } else if (direction === "left" && position > 1) {
    position--;
    currentOffset -= npx;
  }
  updatePosition();
}

// Crée les lignes de trottoir
function createSidewalkLines() {
  sidewalk.forEach((item) => {
    const sidewalkLine = document.createElement("div");
    sidewalkLine.style.width = "15px";
    sidewalkLine.style.height = "20px";
    sidewalkLine.style.position = "absolute";
    sidewalkLine.style.top = `${sidewalkOffset}px`;
    sidewalkLine.classList.add("bg-success-dark", "rounded", "move");
    item.appendChild(sidewalkLine);
  });
}

// Crée les lignes centrales de la route
function createChildRoadLines() {
  roadLines.forEach((line) => {
    const roadLine = document.createElement("div");
    roadLine.style.width = "1px";
    roadLine.style.height = "200px";
    roadLine.style.position = "absolute";
    roadLine.style.top = `${roadOffset}px`;
    roadLine.classList.add("bg-info-light", "move");
    line.appendChild(roadLine);
  });
}

// Met à jour la route et ajoute dynamiquement des lignes
function updateRoad() {
  const moveElements = document.querySelectorAll(".move");
  moveElements.forEach((element) => {
    const currentTop = parseInt(element.style.top);
    if (currentTop > visibleHeight) {
      element.remove(); // Supprime les lignes dépassées
    } else {
      element.style.top = `${currentTop + speed}px`; // Fait défiler les lignes selon la vitesse
    }
  });

  // Ajout de nouvelles lignes si nécessaire
  roadOffset -= 300;
  sidewalkOffset -= 120;
  createSidewalkLines();
  createChildRoadLines();
}

// Étend la hauteur des trottoirs et de la route
function extendRoad() {
  sidewalk.forEach((item) => {
    item.style.height = `${roadHeight}px`;
  });
  roadLines.forEach((line) => {
    line.style.height = `${roadHeight}px`;
  });
}

// Fonction principale pour démarrer le jeu
function startGameFunction() {
  if (startGame) return; // Empêche plusieurs démarrages
  startGame = true;
  extendRoad(); // Étend la route au démarrage du jeu
  console.log("Game started!");

  gameLoop(); // Démarre la boucle d'animation
}

// Fonction de mise à jour régulière avec `requestAnimationFrame` pour fluidité
function gameLoop() {
  updateRoad(); // Mise à jour de la route
  if (startGame) {
    requestAnimationFrame(gameLoop); // Appel récursif pour un défilement fluide
  }
}

// Fonction pour arrêter le jeu
function stopGameFunction() {
  startGame = false;
  console.log("Game paused!");
}

// Ajout d'un écouteur pour démarrer et mettre en pause le jeu avec la barre d'espace
document.addEventListener("keydown", (event) => {
  if (event.keyCode === 32) { // Barre d'espace pour démarrer/pauser
    if (startGame) {
      stopGameFunction(); // Si le jeu est déjà lancé, on le met en pause
    } else {
      startGameFunction(); // Si le jeu est en pause, on le démarre
    }
  }

  // Changer la vitesse avec les touches de direction haut/bas
  if (event.keyCode === 38) { // Flèche haut pour augmenter la vitesse
    speed = Math.min(speed + 1, 20); // Limite la vitesse à 20
    console.log("Speed up: " + speed);
  } else if (event.keyCode === 40) { // Flèche bas pour réduire la vitesse
    speed = Math.max(speed - 1, 1); // Limite la vitesse à 1
    console.log("Speed down: " + speed);
  }
});
