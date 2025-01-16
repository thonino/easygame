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
    colDiv.id = `y${i}-x${item}`;
    colDiv.style.width = "35px";
    colDiv.style.height = "35px";
    colDiv.style.backgroundColor = "#d6d8db";
    colDiv.style.marginRight = "1px";
    rowDiv.appendChild(colDiv);
  });
  table.appendChild(rowDiv);
}

// create the snake default
let direction = "right";
let snake = ["y5-x3", "y5-x2"];
snake.forEach(fill => {
  let cell = document.getElementById(fill);
  if (cell) cell.classList.add("bg-info");
});


  document.addEventListener("keydown", (event) => {
  switch (event.keyCode) {
    case 37: changeDirection("left"); break;
    case 38: changeDirection("up"); break;
    case 40: changeDirection("down"); break;
    case 39: changeDirection("right"); break;
  }
});

// direction buttons and forbid revers
function changeDirection(value) {
  let reverse = { left: "right", up: "down", down: "up", right: "left" };
  if (value === reverse[direction]) {
    console.log(`direction ${value} error`);
    return;
  }
  setTimeout(() => { direction = value; }, 100);
}

// map limit
function isOut(position) {
  return position.some(pos => {
    let matches = pos.match(/-?\d+/g);
    let y = parseInt(matches[0], 10);
    let x = parseInt(matches[1], 10);
    return y < 0 || y > 9 || x < 0 || x > 9;
  });
}

// eat default
let eat = "y3-x6"; 
let score = 0;
let topScore = 0;
let gameOverPosition = [];
let lastEatPosition = [];

// show score and topScore
let showScore = document.getElementById("score");
showScore.textContent = score;

let showTopScore = document.getElementById("topScore");
showTopScore.textContent = topScore;

// update eat position
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

// generate a new eat
function generateNewEat() {
  score += 1;
  showScore.textContent = score; // update score
  if(score > topScore) {
    topScore = score ;
    showTopScore.textContent = topScore; // update topScore
  } 
  let random = Math.floor(Math.random() * 10);
  const newX = random;
  const newY = random;
  const newEat = `y${newY}-x${newX}`;
  updateEatPosition(newEat);
}

// check if eat
function checkEat() {
  if (snake[0] === eat) {
    lastEatPosition = [...snake];
    snake.push(lastEatPosition[1])
    generateNewEat();
  }
}
function checkBodyCut(){
  let checkSnake = [...snake.slice(1)];
  return checkSnake.includes(snake[0]);
}

// Movement snake
function moveSnake() {
  snake.forEach(fill => {
    let cell = document.getElementById(fill);
    if (cell) cell.classList.remove("bg-info");
  });
  gameOverPosition = [...snake];
  snake = snake.map((item, index) => {
    let splitting = item.match(/\d+/g);
    let y = parseInt(splitting[0], 10); 
    let x = parseInt(splitting[1], 10);
    if (index === 0) {
      if (direction === "right") x += 1;
      if (direction === "left") x -= 1;
      if (direction === "up") y -= 1;
      if (direction === "down") y += 1;
    } else {
      let prev = gameOverPosition[index - 1];
      return prev;
    }
    return "y" + y + "-x" + x;
  });

  snake.forEach(fill => {
    let cell = document.getElementById(fill);
    if (cell) cell.classList.add("bg-info");
  });

  // gameOver
  if (isOut(snake) || checkBodyCut()) {
    gameOver = true
    clearInterval(gameInterval);
    console.log("the snake is out");
    gameOverPosition.forEach(fill => {
      let cell = document.getElementById(fill);
      if (cell) cell.classList.add("bg-danger");
    });
    
    pauseBtn.classList.add("d-none"); // hide pause btn

    // show gameOver modal
    let showTopScore = document.getElementById("showTopScore");
    const showGameOverModal = document.getElementById("gameOverModal");
    const modal = new bootstrap.Modal(showGameOverModal);
    setTimeout(() => {
      document.getElementById('endScore').textContent = score;
      let curentScore = Number(score);
      if (curentScore === Number(topScore)) {
        showTopScore.classList.remove("d-none");
      }
      modal.show();
      
      setTimeout(() => {
        modal.hide();
      }, 4000);

      setTimeout(() => {
        newgame()
      }, 500);
    }, 500);
    return;
  }
  checkEat();
}

// start and pause with btn
let gameOver = false;
let gaming = false;
let gameInterval = "";
let startBtn = document.getElementById("start");
let pauseBtn = document.getElementById("pause");

// toggle function
function toggleGame() {
  if (gaming) {
    gaming = false;
    startBtn.classList.remove("d-none");
    pauseBtn.classList.add("d-none");
    clearInterval(gameInterval);
  } else {
    gaming = true;
    gameInterval = setInterval(moveSnake, 300);
    startBtn.classList.add("d-none");
    pauseBtn.classList.remove("d-none");
  }
}

// with buttons
startBtn.addEventListener("click", toggleGame);
pauseBtn.addEventListener("click", toggleGame);

// with keyCode "Espace: 32" only gameOver = false
document.addEventListener("keydown", (event) => {
  if (event.keyCode === 32 && !gameOver) {   
    toggleGame();   
    let showTopScore = document.getElementById("showTopScore");
    showTopScore.classList. add("d-none"); 
  }
});

// new game
function newgame() {  
  gameOver = false;
  gaming = false;
  score = 0;
  showScore.textContent = score;

  // remove btn
  startBtn.classList.remove("d-none");
  pauseBtn.classList.add("d-none");

  // delete gameOver's classes
  gameOverPosition.forEach(fill => {
    let cell = document.getElementById(fill);
    if (cell) {
      cell.classList.remove("bg-info", "bg-danger", "bg-secondary-light");  
      cell.style.backgroundColor = "#d6d8db"; 
    }
  });

  // delete lastEatPositions classes
  snake.forEach(fill => {
    let cell = document.getElementById(fill);
    if (cell) {
      cell.classList.remove("bg-info", "bg-danger", "bg-secondary-light");  
      cell.style.backgroundColor = "#d6d8db"; 
    }
  });

  // Reset eat
  if (document.getElementById(eat)) {
    document.getElementById(eat).style.backgroundColor = "#d6d8db"; 
  }

  // Reset snake
  eat = "y3-x6"; 
  if (document.getElementById(eat)) {
    document.getElementById(eat).style.backgroundColor = "#198754"; 
  }

  // reset directions
  direction = "right";
  snake = ["y5-x3", "y5-x2"];
  snake.forEach(fill => {
    let cell = document.getElementById(fill);
    if (cell) { cell.classList.add("bg-info"); }
  });
  gameOverPosition = [];
}

// new game with keycode
document.addEventListener("keydown", (event) => {
  if (event.keyCode === 13 ) { newgame() }
});
