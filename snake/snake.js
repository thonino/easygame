// create rows and columns
let row = {};
for (let i = 0; i < 10; i++) {
  row[`row${i}`] = [];
  for (let n = 0; n < 10; n++) {
    row[`row${i}`].push(n);
  }
}

// include the table to html
let table = document.getElementById("table");
for (let i = 0; i < 10; i++) {
  let rowDiv = document.createElement("div"); // row
  rowDiv.style.display = "flex";
  rowDiv.style.marginBottom = "1px";

  row[`row${i}`].forEach(item => {
    let colDiv = document.createElement("div"); // Column
    colDiv.id = "x" + i + "-y" + item;
    colDiv.style.width = "30px";
    colDiv.style.height = "30px";
    colDiv.style.backgroundColor = "#d6d8db";
    colDiv.style.marginRight = "1px";
    rowDiv.appendChild(colDiv);
  });
  table.appendChild(rowDiv);
}

// create the snake default
let size = 2;
let direction = "right";
let snake = ["x5-y3", "x5-y2"];
snake.forEach(fill => {
  let cell = document.getElementById(fill);
  if (cell) cell.classList.add("bg-info");
});

// direction buttons and forbid revers
function changeDirection(value) {
  let reverse = { left: "right", up: "down", down: "up", right: "left" };
  if (value === reverse[direction]) {
    console.log(`direction ${value} error`);
    return;
  }
  direction = value;
}

// map limit
function isOut(position) {
  return position.some(pos => {
    let matches = pos.match(/-?\d+/g);
    return matches.some(num => parseInt(num) < 0 || parseInt(num) > 9);
  });
}

// Random number generator
function randomNumber() {
  return Math.floor(Math.random() * 10);
}

// eat default
let eat = "x3-y6"; 
let level = 1;

// Update food position
function updateEatPosition(newPosition) {
  if (document.getElementById(eat)) {
    document.getElementById(eat).style.backgroundColor = "#d6d8db";
  }
  if (document.getElementById(newPosition)) {
    document.getElementById(newPosition).style.backgroundColor = "#198754";
  }
  eat = newPosition;
}
updateEatPosition(eat);

// Generate a new eat
function generateNewEat() {
  level++;
  const newX = randomNumber();
  const newY = randomNumber();
  const newEat = `x${newX}-y${newY}`;
  updateEatPosition(newEat);
}

// check if eat
function checkEat() {
  if (snake[0] === eat) {
    let lastPosition = [...snake];
    snake.push(lastPosition[1])
    generateNewEat();
  }
}

// Movement snake
function moveSnake() {
  snake.forEach(fill => {
    let cell = document.getElementById(fill);
    if (cell) cell.classList.remove("bg-info");
  });
  let lastPosition = [...snake];
  snake = snake.map((item, index) => {
    let splitting = item.match(/\d+/g);
    let x = parseInt(splitting[0], 10);
    let y = parseInt(splitting[1], 10);
    if (index === 0) {
      if (direction === "right") y += 1;
      if (direction === "left") y -= 1;
      if (direction === "up") x -= 1;
      if (direction === "down") x += 1;
    } else {
      let prev = lastPosition[index - 1];
      return prev;
    }
    return "x" + x + "-y" + y;
  });

  snake.forEach(fill => {
    let cell = document.getElementById(fill);
    if (cell) cell.classList.add("bg-info");
  });

  if (isOut(snake)) {
    clearInterval(gameInterval);
    console.log("the snake is out");
    lastPosition.forEach(fill => {
      let cell = document.getElementById(fill);
      if (cell) cell.classList.add("bg-danger");
    });
    return;
  }

  checkEat();
}

let gameInterval = setInterval(moveSnake, 500);
