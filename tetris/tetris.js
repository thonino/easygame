// main screen : create rows and columns
const ROW = {};
for (let i = 0; i < 20; i++) {
  ROW[`ROW${i}`] = [];
  for (let n = 0; n < 10; n++) {
    ROW[`ROW${i}`].push(n);
  }
}

// include the table to html
const table1 = document.getElementById("table1");
for (let i = 0; i < 20; i++) {
  let rowDiv = document.createElement("div"); // row
  rowDiv.style.display = "flex";
  rowDiv.style.marginBottom = "1px";
  ROW[`ROW${i}`].forEach(item => {
    let colDiv = document.createElement("div"); // column
    colDiv.id = "mainScreen-" + "y" + i + "-x" + item;
    colDiv.style.width = "20px";
    colDiv.style.height = "20px";
    colDiv.style.backgroundColor = "#d6d8db";
    colDiv.style.marginRight = "1px";
    rowDiv.appendChild(colDiv);
  });
  table1.appendChild(rowDiv);
}

// prev screen : create rows and columns
let ROW2 = {};
for(let i = 0; i < 4; i++){
  ROW2[`ROW2${i}`] = [];
  for(let n = 0; n < 3; n++){
    ROW2[`ROW2${i}`].push(n);
  }
}

// include the table to html
const table2 = document.getElementById("table2");
for (let i = 0; i < 4; i++) {
  let rowDiv = document.createElement("div"); // row
  rowDiv.style.display = "flex";
  rowDiv.style.marginBottom = "1px";

  ROW2[`ROW2${i}`].forEach(item => {
    let colDiv = document.createElement("div"); // column
    colDiv.id = "prevScreen-" + "y" + i + "-x" + item;
    colDiv.style.width = "20px";
    colDiv.style.height = "20px";
    colDiv.style.backgroundColor = "#d6d8db";
    colDiv.style.marginRight = "1px";
    rowDiv.appendChild(colDiv);
  });
  table2.appendChild(rowDiv);
}

const ITEMS = [{
    color: "bg-info", 
    schema: ["y0-x0", "y1-x0", "y2-x0", "y3-x0"]
  },{
    color: "bg-warning", 
    schema: ["y0-x0", "y0-x1", "y1-x0", "y1-x1"]
  },{
    color: "bg-warning-dark",
    schema: ["y0-x0", "y1-x0", "y2-x0", "y2-x1"]
  },{
    color: "bg-primary",
    schema: ["y0-x0","y0-x1", "y1-x0", "y2-x0"]
  },{
    color: "bg-success", 
    schema: ["y0-x0","y1-x0", "y1-x1", "y2-x1"]
  }, {
    color: "bg-danger", 
    schema: ["y0-x1","y1-x0", "y1-x1", "y2-x0"]
  },{
    color: "bg-purple", 
    schema: ["y0-x0","y1-x0","y2-x0","y1-x1"]
},];

const ROTATIONS = {
  "bg-primary": {
    1: [[0, 0], [1, -1], [0, 1], [-1, 2]],
    2: [[0, 1], [0, 1], [1, 0], [1, -2]],
    3: [[0, -1], [-1, 0], [-2, 1], [-1, 2]],
    4: [[0, 0], [0, 0], [1, -2], [1,-2]],
  },
  "bg-warning-dark": {
    1: [[1, 0], [0, 1], [-1, 2], [-2, 1]],
    2: [[-1, 0], [-1, 0], [0, -1], [2, -1]], 
    3: [[0, 0], [0, 0], [-1, 1], [-1, -1]],
    4: [[0, 0], [1, -1], [2, -2], [1, 1]],
  },
  "bg-purple": {
    1: [[2, 2], [1, 1], [0, 0], , [0, 0]],
    2: [[0, 0], [-2, 1], [-1, 2], , [0, 0]], 
    3: [[-2, -2], [0, 0], [-1, -1], , [0, 0]],
    4: [[0, 0], [1, -2], [2, -1], , [0, 0]],
  },
  "bg-danger": {
    1: [[0, -1], [-1, 1], [0, 0], [-1, 2]],
    2: [[0, 1], [1, -1], [0, 0], [1, -2]],
  },
  "bg-success": {
    1: [[0, 1], [-1, 2], [0, -1], [-1, 0]],
    2: [[0, -1], [1, -2], [0, 1], [1, 0]],
  },
  "bg-info": {
    1: [[0, 0], [-1, 1], [-2, 2], [-3, 3]],
    2: [[0, 0], [1, -1], [2, -2], [3, -3]],
  },
};

// random items
let nextItem = randomItem(); 
let lastItem;

function randomItem(lastItem) {
  if(lastItem){
    // filter to avoid generating thes same items 
    let item  = ITEMS.filter(item => item.color !== lastItem.color);
    return item[Math.floor(Math.random() * item.length)];
  }
  let item = ITEMS;
  return item[Math.floor(Math.random() * item.length)];
}

function fillItemPrev(item) {
  if (!item) return; 
  item.schema.forEach(fill => {
    let fullId = "prevScreen-" + fill; 
    let cell = document.getElementById(fullId); 
    if (cell) cell.classList.add(item.color); 
  });
}

function resetPrevScreen(item) {
  if (!item) return;
  item.schema.forEach(fill => {
    let fullId = "prevScreen-" + fill; 
    let cell = document.getElementById(fullId); 
    if (cell) {
      cell.style.backgroundColor = "#d6d8db"; 
      cell.classList.remove(item.color); 
    }
  });
}

// handle item
let newLastItem;
let isMovable = true;

function letMove(value) {
  if (value !== null) { isMovable = value; }
  return isMovable;
}

function fillItemMain(item) {
  if (!item) return;
  item.schema.forEach(fill => {
    const fullId = "mainScreen-" + fill;
    const cell = document.getElementById(fullId);
    if (cell) cell.classList.add(item.color);
  });
}
// reset item
function resetMainScreen(item) {
  if (!item) return;
  item.schema.forEach(fill => {
    const fullId = "mainScreen-" + fill;
    const cell = document.getElementById(fullId);
    if (cell) {
      cell.style.backgroundColor = "#d6d8db";
      cell.classList.remove(item.color);
    }
  });
}

// handle : move
function move(direction) {
  if (!isMovable) return;
  resetMainScreen(newLastItem);
  // left boolean
  const canMoveLeft = newLastItem.schema.every(coord => { 
    const [y, x] = coord.match(/\d+/g).map(Number);
    if (x <= 0) return false;
    const coordNextItem = `mainScreen-y${y}-x${x - 1}`;
    const checkColor = document.getElementById(coordNextItem);
    return !(checkColor && checkColor.classList.length > 0);
  });
  // right boolean
  const canMoveRight = newLastItem.schema.every(coord => { 
    const [y, x] = coord.match(/\d+/g).map(Number);
    if (x >= 9) return false;
    const coordNextItem = `mainScreen-y${y}-x${x + 1}`;
    const checkColor = document.getElementById(coordNextItem);
    return !(checkColor && checkColor.classList.length > 0);
  });
  // rotations boolean
  const canMoveUp = newLastItem.schema.every(coord => {
    const [y, x] = coord.match(/\d+/g).map(Number);
    const coordNextItem = `mainScreen-y${y}-x${x - 1}`;
    const checkColor = document.getElementById(coordNextItem);
    return !(checkColor && checkColor.classList.length > 0);
  });
  // rotations
  if (direction === "up" && canMoveUp) {
    const color = newLastItem.color;
    const currentROTATIONS = ROTATIONS[color];
    if (currentROTATIONS){
      if (!newLastItem.stape) newLastItem.stape = 1;
      newLastItem.schema = newLastItem.schema.map((coord, i) => {
        const [y, x] = coord.match(/\d+/g).map(Number);
        const [dy, dx] = currentROTATIONS[newLastItem.stape][i] || [0, 0];
        return `y${y + dy}-x${x + dx}`;
      });
      // update stapes
      if (newLastItem.stape < Object.keys(currentROTATIONS).length) {
        newLastItem.stape++;
      } else {
        newLastItem.stape = 1;
      }
    }
  }
  // use space
  if (direction === "space") {
    let gap = 19;
    // calculate gap
    newLastItem.schema.forEach(coord => {
      const [y, x] = coord.match(/\d+/g).map(Number);
      for (let spaceY = y + 1; spaceY <= 19; spaceY++) {
        const spaceCell = document.getElementById(`mainScreen-y${spaceY}-x${x}`);
        if (spaceCell && spaceCell.classList.length > 0) {
          gap = Math.min(gap, spaceY - y - 1);
          break;
        }
      }
      gap = Math.min(gap, 19 - y);
    });
    // apply gap
    newLastItem.schema = newLastItem.schema.map(coord => {
      const [y, x] = coord.match(/\d+/g).map(Number);
      return `y${y + gap}-x${x}`;
    });
  }
  
  if (direction === "left" && canMoveLeft) {
    newLastItem.schema = newLastItem.schema.map(coord => {
      const [y, x] = coord.match(/\d+/g).map(Number);
      return `y${y}-x${x - 1}`;
    });
  } 
  // move left
  else if (direction === "right" && canMoveRight) {
    newLastItem.schema = newLastItem.schema.map(coord => {
      const [y, x] = coord.match(/\d+/g).map(Number);
      return `y${y}-x${x + 1}`;
    });
  }
  fillItemMain(newLastItem);
}

// button
function direction(value) { move(value); }

// keyboards
document.addEventListener("keydown", (event) => {
  if (!isMovable) return;
  switch (event.keyCode) {  
    case 37: move("left"); break; // left
    case 38: move("up"); break; // up
    case 39: move("right"); break; // right
    case 32: move("space"); break; // space
  }
});

let fallingInterval = null;

function fall() {
  let isFalling = true;
  resetMainScreen(newLastItem);
  // make next schema
  const nextSchema = newLastItem.schema.map(coord => {
    const [y, x] = coord.match(/\d+/g).map(Number);
    let coordNextItem = `mainScreen-y${y + 1}-x${x}`;
    const checkColor = document.getElementById(coordNextItem);
    if (y >= 19 || (checkColor && checkColor.classList.length > 0)) {  
      isFalling = false;
      isMovable = false;
      letMove(false);
      return coord;  
    }
    return `y${y + 1}-x${x}`; // item fall
  });
  if (!isFalling) {
    clearInterval(fallingInterval);
    fillItemMain(newLastItem);
    // check if the rows are filled
    let line = [];
    for (let n = 0; n < 20; n++) {
      line[n] = [];
      for (let i = 0; i < 10; i++) {
        let checkLine = document.getElementById(`mainScreen-y${n}-x${i}`);
        if (checkLine && checkLine.classList.length > 0) { 
          line[n].push("yes");
        } 
        else { line[n].push("no"); }
      }
      // if rows filled
      if (line[n].every(cell => cell === "yes")) {
        for (let currentRow = n; currentRow > 0; currentRow--) {
          for (let i = 0; i < 10; i++) {
            let currentCell = document.getElementById(`mainScreen-y${currentRow}-x${i}`);
            let aboveCell = document.getElementById(`mainScreen-y${currentRow - 1}-x${i}`);
            if (currentCell && aboveCell) {
              // copy above cells colors
              currentCell.style.backgroundColor = aboveCell.style.backgroundColor;
              ITEMS.forEach(item => {
                if (aboveCell.classList.contains(item.color)) {
                  currentCell.classList.add(item.color);
                } else {
                  currentCell.classList.remove(item.color);
                }
              });
              // reset above cells
              aboveCell.style.backgroundColor = "#d6d8db";
              ITEMS.forEach(item => aboveCell.classList.remove(item.color));
            }
          }
        }
      }
    }
    setTimeout(() => { falling(); }, 200); return; } // reload 
  // uptdate item position
  newLastItem.schema = nextSchema;
  fillItemMain(newLastItem);
}

document.getElementById("pause").addEventListener("click", pauseFall);
document.getElementById("resume").addEventListener("click", resumeFall);

// start
function falling() {
  document.getElementById("start").classList.add("d-none");
  document.getElementById("pause").classList.remove("d-none");
  lastItem = nextItem; 
  nextItem = randomItem(lastItem); 
  resetPrevScreen(lastItem); 
  fillItemPrev(nextItem); 
  letMove(true);
  newLastItem = {
    ...lastItem,
    schema: lastItem.schema.map(item => {
      return item.slice(0, 4) + (Number(item[4]) + 4) + item.slice(5);
    }),
  };
  fillItemMain(newLastItem);  
  fallingInterval = setInterval(fall, 500); 
}

// pause
function pauseFall() {
  document.getElementById("resume").classList.remove("d-none")
  document.getElementById("pause").classList.add("d-none");
  if (fallingInterval) {
    clearInterval(fallingInterval);
    fallingInterval = null;
  }
}

// resume
function resumeFall() {
  document.getElementById("resume").classList.add("d-none");
  document.getElementById("pause").classList.remove("d-none")
  if (!fallingInterval) {
    fallingInterval = setInterval(fall, 500); 
  }
}

// Initialisation
fillItemPrev(nextItem);
