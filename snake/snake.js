// create columns : 10
let row = {}; 
for (let i = 0; i < 10; i++) { 
  row[`row${i}`] = []; 
  for (let n = 0; n < 10; n++) {
    row[`row${i}`].push(n); 
  }
}

// Inclure les tables dans le HTML
let table = document.getElementById("table");
for (let i = 0; i < 10; i++) { 
  let rowDiv = document.createElement("div"); // row
  rowDiv.style.display = "flex"; 
  rowDiv.style.marginBottom = "1px"; 
  
  // Accéder uniquement aux rows définis
  row[`row${i}`].forEach(item => {
    let colDiv = document.createElement("div"); // column
    colDiv.id = "x"+ i + "-y" + item;
    colDiv.style.width = "30px";
    colDiv.style.height = "30px";
    colDiv.style.backgroundColor = "#d6d8db";
    colDiv.style.marginRight = "1px"; 
    rowDiv.appendChild(colDiv); 
  });
  table.appendChild(rowDiv); 
}

// create default snake
let size = 2;
let direction = "right";
let snake = ["x8-y1", "x8-y2"];
snake.forEach(fill => {
  let cell = document.getElementById(fill);
  cell.classList.add("bg-info");
});

// map limite
function mapLimit(xy) {
  return xy.some(pos => {
    let matches = pos.match(/-?\d+/g); 
    return matches.some(num => ["10","-1"].includes(num)); 
  });
}
// allow movevment
let checkPosition = mapLimit(snake) ? false : true;

// movement
// Movement
function shiftSnake() {
  if (checkPosition) {
    // Right
    if (direction == "right") {
      snake.forEach(fill => {
        let cell = document.getElementById(fill);
        if (cell) cell.classList.remove("bg-info");
      });
      snake = snake.map(item => { 
        let splitting = item.match(/\d+/g); 
        let x = parseInt(splitting[0], 10); 
        let y = parseInt(splitting[1], 10) + 1;  
        return "x" + x + "-y" + y; 
      });
    // add bg 
    snake.forEach(fill => {
      let cell = document.getElementById(fill);
      if (cell) cell.classList.add("bg-info");
    });

    // Up
    if (direction == "up") {
      snake.forEach(fill => {
        let cell = document.getElementById(fill);
        if (cell) cell.classList.remove("bg-info");
      });
      snake = snake.map(item => { 
        let splitting = item.match(/\d+/g); 
        let x = parseInt(splitting[0], 10); 
        let y = parseInt(splitting[1], 10) + 1;  
        return "x" + x + "-y" + y; 
      });
    // add bg 
    snake.forEach(fill => {
      let cell = document.getElementById(fill);
      if (cell) cell.classList.add("bg-info");
    });

    }
    
  }
}

// Start the movement 
if (checkPosition) {
  setInterval(shiftSnake, 500); 
}







