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

// reset last item on prevScreen
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

const ITEMS = [
  {
    color: "bg-info", 
    schema: ["y0-x0", "y1-x0", "y2-x0", "y3-x0"]
  }, {
    color: "bg-warning", 
    schema: ["y0-x0", "y0-x1", "y1-x0", "y1-x1"]
  },{
    color: "bg-warning-dark",
    schema: ["y0-x0", "y1-x0", "y2-x0", "y2-x1"]
  },
  {
    color: "bg-primary",
    schema: ["y0-x0","y0-x1", "y1-x0", "y2-x0"]
  },
  {
    color: "bg-success", 
    schema: ["y0-x0","y1-x0", "y1-x1", "y2-x1"]
  }, {
    color: "bg-danger", 
    schema: ["y0-x1","y1-x0", "y1-x1", "y2-x0"]
  },
  {
    color: "bg-purple", 
    schema: ["y0-x0","y1-x0","y2-x0","y1-x1"]
},
];

const ROTATIONS = {
  "bg-info": {
    1: [[0, 0], [-1, 1], [-2, 2], [-3, 3]],
    2: [[0, 0], [1, -1], [2, -2], [3, -3]],
  },
  "bg-warning-dark": {
    1: [[1, 0], [0, 1], [-1, 2], [-2, 1]],
    2: [[-1, 0], [-1, 0], [0, -1], [2, -1]], 
    3: [[0, 0], [0, 0], [-1, 1], [-1, -1]],
    4: [[0, 0], [1, -1], [2, -2], [1, 1]],
  },
  "bg-primary": 
  {
    1: [[0, 0], [1, -1], [0, 1], [-1, 2]],
    2: [[0, 1], [0, 1], [1, 0], [1, -2]],
    3: [[0, -1], [-1, 0], [-2, 1], [-1, 2]],
    4: [[0, 0], [0, 0], [1, -2], [1,-2]],
  },
  "bg-success": {
    1: [[0, 1], [-1, 2], [0, -1], [-1, 0]],
    2: [[0, -1], [1, -2], [0, 1], [1, 0]],
  },

  "bg-danger": {
    1: [[0, -1], [-1, 1], [0, 0], [-1, 2]],
    2: [[0, 1], [1, -1], [0, 0], [1, -2]],
  },
  "bg-purple": {
    1: [[2, 0], [0, 1], [0, 1], [1, 1]],
    2: [[-1,0], [-1,0], [-1,0], [0, -1]], 
    3: [[-1, 0], [0, 0], [0, 0],[-2, 1]],
    4: [[0, 0], [1, -1], [1, -1], [1, -1]],
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
function move(value) {
  if (!isMovable) return;
  resetMainScreen(newLastItem);
  // Move left
  if (value === "left") {
    const canMoveLeft = newLastItem.schema.every(coord => {
      const [y, x] = coord.match(/\d+/g).map(Number);
      if (x <= 0) return false;
      const coordNextItem = `mainScreen-y${y}-x${x - 1}`;
      const checkColor = document.getElementById(coordNextItem);
      return !(checkColor && checkColor.classList.length > 0);
    });
    if (canMoveLeft) {
      newLastItem.schema = newLastItem.schema.map(coord => {
        const [y, x] = coord.match(/\d+/g).map(Number);
        return `y${y}-x${x - 1}`;
      });
    }
  }
  // Move right
  if (value === "right") {
    const canMoveRight = newLastItem.schema.every(coord => {
      const [y, x] = coord.match(/\d+/g).map(Number);
      if (x >= 9) return false;
      const coordNextItem = `mainScreen-y${y}-x${x + 1}`;
      const checkColor = document.getElementById(coordNextItem);
      return !(checkColor && checkColor.classList.length > 0);
    });
    if (canMoveRight) {
      newLastItem.schema = newLastItem.schema.map(coord => {
        const [y, x] = coord.match(/\d+/g).map(Number); 
        return `y${y}-x${x + 1}`;
      });
    }
  }
  // Move down
  if (value === "down") {
    const canMoveDown = newLastItem.schema.every(coord => {
      const [y, x] = coord.match(/\d+/g).map(Number);
      if (y >= 19) return false;
      const nextCell = document.getElementById(`mainScreen-y${y + 1}-x${x}`);
      return !(nextCell && nextCell.classList.length > 0);
    });
    if (canMoveDown) {
      newLastItem.schema = newLastItem.schema.map(coord => {
        const [y, x] = coord.match(/\d+/g).map(Number);
        return `y${y + 1}-x${x}`;
      });
    }
  }
  // Hard drop (space)
  if (value === "space") {
    let gap = 19;
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
    newLastItem.schema = newLastItem.schema.map(coord => {
      const [y, x] = coord.match(/\d+/g).map(Number);
      return `y${y + gap}-x${x}`;
    });
  }

  // rotation
  if (value === "up") {
    const color = newLastItem.color;
    const currentROTATIONS = ROTATIONS[color];
    let allowRotation = true;
    if (currentROTATIONS) {
      const canMoveUp = newLastItem.schema.every((coord, i) => {
        const [y, x] = coord.match(/\d+/g).map(Number);
        const coordNextItem = `mainScreen-y${y}-x${x - 1}`;
        const checkColor = document.getElementById(coordNextItem);
        // restriction by filled
        const [dy, dx] = currentROTATIONS[newLastItem.stape || 1][i] || [0, 0];
        const newY = y + dy;
        const newX = x + dx;
        const newCoord = `mainScreen-y${newY}-x${newX}`;
        const obstacleCheck = document.getElementById(newCoord);
        if (obstacleCheck && obstacleCheck.classList.length > 0) {
          allowRotation = false; 
          return false;
        }
        // restriction by position
        let isPortrait = true;
        if (newLastItem.stape === 2 || newLastItem.stape === 4) isPortrait = false;
        if (isPortrait) {
          if (newLastItem.color === "bg-info" && x > 6) allowRotation = false;
          else if (x > 8) allowRotation = false;
        } else {
          if (newLastItem.color === "bg-info" && y > 16) allowRotation = false;
          else if (y > 18) allowRotation = false;
        }
        return !(checkColor && checkColor.classList.length > 0);
      });
      if (canMoveUp && allowRotation) {
        if (!newLastItem.stape) newLastItem.stape = 1;
        newLastItem.schema = newLastItem.schema.map((coord, i) => {
          const [y, x] = coord.match(/\d+/g).map(Number);
          const [dy, dx] = currentROTATIONS[newLastItem.stape][i] || [0, 0];
          return `y${y + dy}-x${x + dx}`;
        });
        newLastItem.stape =
          newLastItem.stape < Object.keys(currentROTATIONS).length
            ? newLastItem.stape + 1  : 1;
      }
    }
  }
    fillItemMain(newLastItem);
  }

// button
function action(value) { move(value); }

// keyboards
document.addEventListener("keydown", (event) => {
  if (!isMovable) return;
  switch (event.keyCode) {  
    case 32: move("space"); break; // space
    case 37: move("left"); break; // left
    case 38: move("up"); break; // up
    case 39: move("right"); break; // right
    case 40: move("down"); break; // down
  }
});

let showTopScore = document.getElementById("topScore");
let showScore = document.getElementById("score");
let showLevel = document.getElementById("level");
let score = 0;
let topScore = 0;
let lines = 0;
let level = 1;
let speed = 800;

showLevel.textContent = level;
showScore.textContent = score;
showTopScore.textContent = topScore;

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
    let filledLines = [];
    for (let n = 0; n < 20; n++) {
      line[n] = [];
      for (let i = 0; i < 10; i++) {
        let checkLine = document.getElementById(`mainScreen-y${n}-x${i}`);
        if (checkLine && checkLine.classList.length > 0) { 
          line[n].push("yes");
        } 
        else { 
          line[n].push("no"); 
        }
      }
      // if rows filled
      if (line[n].every(cell => cell === "yes")) {
        filledLines.push(n); // Track the filled line index
        lines += 1;
        showScore.textContent = score;
        if (lines === 10) { 
          level = level + 1; 
          // leveling
          if (level >= 29) { speed = 16;  } 
          else if (level >= 20) { speed = 66; } 
          else if (level >= 15) { speed = 83; } 
          else if (level >= 10) { speed = 100; } 
          else { speed = 800 - (level - 1) * 84; if (speed < 133) speed = 133; }
          showLevel.textContent = level;  
          lines = 0; 
        }
        // clear and move rows above
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
    // scoring
    let numberLine = filledLines.length;
    if (filledLines.length > 0) {
      if(numberLine === 1 ){ score += 100 }
      if(numberLine === 2 ){ score += 300 }
      if(numberLine === 3 ){ score += 500 }
      if(numberLine === 4 ){ score += 800 }
      showScore.textContent = score;
      filledLines = [];  // reset tab
    }
    setTimeout(() => { falling(); }, 200); return;
  }
  // update item position
  newLastItem.schema = nextSchema;
  fillItemMain(newLastItem);
}

// reset table 1
function resetTable1() {
  for (let n = 0; n < 4; n++) {
    for (let i = 0; i < 3; i++) {
      let checkLine = document.getElementById(`prevScreen-y${n}-x${i}`);
      if (checkLine) { // Vérifie si l'élément existe
        checkLine.style.backgroundColor = "#d6d8db";
        checkLine.classList.remove(...checkLine.classList); 
      }
    }
  }
}

// reset table 2
function resetTable2() {
  for (let n = 0; n < 20; n++) {
    for (let i = 0; i < 10; i++) {
      let checkLine = document.getElementById(`mainScreen-y${n}-x${i}`);
      if (checkLine) { // Vérifie si l'élément existe
        checkLine.style.backgroundColor = "#d6d8db";
        checkLine.classList.remove(...checkLine.classList); 
      }
    }
  }
}

// reset Game
function resetGame() {
  clearInterval(fallingInterval);
  gameOver = false;
  score = 0;
  level = 1;
  lines = 0;
  speed = 800;
  showScore.textContent = score;
  showLevel.textContent = level;
  resetTable1();
  resetTable2()
  nextItem = randomItem();
  lastItem = null;
  resetPrevScreen(nextItem);
  fillItemPrev(nextItem);
}


let gameOver = false;

document.getElementById("pause").addEventListener("click", pauseFall);
document.getElementById("resume").addEventListener("click", resumeFall);

// start
function falling() {
  if(gameOver)return;
  // handle : game over
  let checkGameOver = document.getElementById("mainScreen-y0-x4");
  const showGameOverModal = document.getElementById("gameOverModal");
  const showTopScoreTrophy = document.getElementById("showTopScoreTrophy");
  document.getElementById("start").classList.remove("d-none")
  document.getElementById("pause").classList.add("d-none");
  document.getElementById('endScore').textContent = score;
  const modal = new bootstrap.Modal(showGameOverModal);
  if (checkGameOver.classList.length > 0) {
    clearInterval(fallingInterval); 
    gameOver = true;
    if(score > topScore){ 
      topScore = score;
      showTopScore.textContent = topScore
    }
    if(score === topScore){ showTopScoreTrophy.classList.remove("d-none"); }
    else{ showTopScoreTrophy.classList.add("d-none")}
    setTimeout(() => {
      modal.show();
      setTimeout(() => { 
        modal.hide();
        resetGame(); 
      }, 4000);
    }, 500);    
    return; 
  }
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
  fallingInterval = setInterval(fall, speed); 
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
    fallingInterval = setInterval(fall, speed); 
  }
}

// Initialisation
fillItemPrev(nextItem);