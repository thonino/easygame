// Créer une grille de 10x10
let row = {};
for (let i = 0; i < 10; i++) {
  row[`row${i}`] = [];
  for (let n = 0; n < 10; n++) {
    row[`row${i}`].push(n);
  }
}

// Inclure la grille dans le HTML
let table = document.getElementById("table");
for (let i = 0; i < 10; i++) {
  let rowDiv = document.createElement("div"); // Ligne
  rowDiv.style.display = "flex";
  rowDiv.style.marginBottom = "1px";

  row[`row${i}`].forEach(item => {
    let colDiv = document.createElement("div"); // Colonne
    colDiv.id = "x" + i + "-y" + item;
    colDiv.style.width = "30px";
    colDiv.style.height = "30px";
    colDiv.style.backgroundColor = "#d6d8db";
    colDiv.style.marginRight = "1px";
    rowDiv.appendChild(colDiv);
  });
  table.appendChild(rowDiv);
}

// Créer le serpent par défaut
let size = 2;
let direction = "right";
let snake = ["x5-y4", "x5-y3"];
let lastPosition = [];
snake.forEach(fill => {
  let cell = document.getElementById(fill);
  if (cell) cell.classList.add("bg-info");
});

// buttons
function changeDirection(value) {
  direction = value;
}

// Fonction pour vérifier si le serpent dépasse les limites
function isOut(position) {
  return position.some(pos => {
    let matches = pos.match(/-?\d+/g);
    return matches.some(num => parseInt(num) < 0 || parseInt(num) > 9); 
  });
}

// Mouvement du serpent
function shiftSnake() {
  // Supprimer les styles actuels
  snake.forEach(fill => {
    let cell = document.getElementById(fill);
    if (cell) cell.classList.remove("bg-info");
  });

  // Calculer les nouvelles positions
  snake = snake.map(item => {
    lastPosition = snake;
    let splitting = item.match(/\d+/g);
    let x = parseInt(splitting[0], 10);
    let y = parseInt(splitting[1], 10);
    if (direction === "right") y += 1;
    if (direction === "left") y -= 1;
    if (direction === "up") x -= 1;
    if (direction === "down") x += 1;
    return "x" + x + "-y" + y;
  });
  console.log(lastPosition);
  // Vérifier les limites
  if (isOut(snake)) {
    clearInterval(gameInterval); // Arrêter le mouvement
    console.log("your snake is out");
    lastPosition.forEach(fill => {
      let cell = document.getElementById(fill);
      if (cell) cell.classList.add("bg-danger");
    });
    return;
  }

  // Ajouter les styles pour les nouvelles positions
  snake.forEach(fill => {
    let cell = document.getElementById(fill);
    if (cell) cell.classList.add("bg-info");
  });
}

// Lancer le mouvement
let gameInterval = setInterval(shiftSnake, 500);
