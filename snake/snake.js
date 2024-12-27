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
let snake = ["x5-y4", "x5-y3"];
let lastPosition = [];
snake.forEach(fill => {
  let cell = document.getElementById(fill);
  if (cell) cell.classList.add("bg-info");
});

// direction buttons and not allow revers
function changeDirection(value) {
  let reverse = { left: "right", up: "down", down: "up", right: "left" };
  // change direction
  if (value === reverse[direction]){ 
    console.log(`direction ${value} error`);
    return;
  }
  direction = value; // new direction
}

// map limit
function isOut(position) {
  return position.some(pos => {
    let matches = pos.match(/-?\d+/g);
    return matches.some(num => parseInt(num) < 0 || parseInt(num) > 9); 
  });
}

// Movement
function shiftSnake() {
  // delete last style
  snake.forEach(fill => {
    let cell = document.getElementById(fill);
    if (cell) cell.classList.remove("bg-info");
  });

  // handle new position
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

  // make style for new position
  snake.forEach(fill => {
    let cell = document.getElementById(fill);
    if (cell) cell.classList.add("bg-info");
  });

  // check if the snake is out
  if (isOut(snake)) {
    clearInterval(gameInterval); // stop move
    console.log("your snake is out");
    lastPosition.forEach(fill => {
      let cell = document.getElementById(fill);
      if (cell) cell.classList.add("bg-danger");
    });
    return;
  }
}
// start the movement
let gameInterval = setInterval(shiftSnake, 500);
