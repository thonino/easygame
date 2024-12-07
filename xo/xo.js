let player1 = [];
let player2 = [];
let player1Score = 0;
let player2Score = 0;
document.getElementById("player1Score").textContent = player1Score;
document.getElementById("player2Score").textContent = player2Score;

let player1Name = "Player 1";
let player2Name = "Player 2";

// Setting players names
function initializePlayerNames() {
  document.querySelectorAll(".player1Name").forEach((element) => {
    element.textContent = player1Name;
  });
  document.querySelectorAll(".player2Name").forEach((element) => {
    element.textContent = player2Name;
  });
}

initializePlayerNames(); // update names 

// display name's values 
document.getElementById("modal").addEventListener("show.bs.modal", () => {
  document.getElementById("player1-input").value = player1Name;
  document.getElementById("player2-input").value = player2Name;
});

// uptade names
let input1 = document.getElementById("player1-input");
let input2 = document.getElementById("player2-input");
let button = document.getElementById("catchNames");
button.addEventListener("click", () => {
  player1Name = input1.value;
  player2Name = input2.value;
  input1.value = "";
  input2.value = "";

  initializePlayerNames(); // update names 
});

// reverse both players 
function reverse() {
  // save scores
  let nameSaved = player1Name;
  let scoreSaved = player1Score;

  // revers scores
  player1Score = player2Score;
  player2Score = scoreSaved;
  // reverse name
  player1Name = player2Name;
  player2Name = nameSaved;
  
  // update scores
  document.getElementById("player1Score").textContent = player1Score;
  document.getElementById("player2Score").textContent = player2Score;

  initializePlayerNames(); // update names 
}

let turn = 0;
let buttons = document.querySelectorAll(".box");
let message1 = document.getElementById('message1'); 
let message2 = document.getElementById('message2'); 
let player1Turn = document.getElementById('player1Turn');
let player2Turn = document.getElementById('player2Turn');
let gameOver = false; 


// update scores
function updateScores() {
  document.getElementById('player1Score').innerHTML = player1Score;
  document.getElementById('player2Score').innerHTML = player2Score;
}

// check if a player won
function win(tab) {
  const combinations = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [7, 5, 3]
  ];

  // return winning datas
  return combinations.find(combination =>
    combination.every(num => tab.includes(num))
  );
}

// show or hide whose turn it is
function togglePlayerTurn() {
  if (turn % 2 === 0) {
    player1Turn.classList.add('show');
    player1Turn.classList.remove('hidden');
    player2Turn.classList.remove('show');
    player2Turn.classList.add('hidden');
  } else {
    player2Turn.classList.add('show');
    player2Turn.classList.remove('hidden');
    player1Turn.classList.remove('show');
    player1Turn.classList.add('hidden');
  }
}

buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    if (gameOver) return; // check if the game stopped

    let number = parseInt(e.target.value);
    let player1Selected = document.getElementById(`player1-${number}`);
    let player2Selected = document.getElementById(`player2-${number}`);
    
    if (!player1.includes(number) && !player2.includes(number)) {
      if (turn % 2 === 0) {
        // Player 1 Turn
        player1.push(number);
        player1Selected.classList.add("show");
        player1Selected.classList.remove("hidden");
        if (win(player1)) {
          const winning = win(player1); 
          for (let i = 1; i < 10; i++) {
            if (![winning[0], winning[1], winning[2]].includes(i)) {
              document.getElementById(`btn-${i}`).classList.add("bgAdded");
            }
          }
          message1.innerHTML = `${player1Name} Win !!`;
          message2.innerHTML = "";
          player1Score++;
          updateScores();
          gameOver = true; // game stopped
          return;
        }
      } else {
        // Player 2 Turn
        player2.push(number);
        player2Selected.classList.add("show");
        player2Selected.classList.remove("hidden");
        if (win(player2)) {
          const winning = win(player2);
          for (let i = 1; i < 10; i++) {
            if (![winning[0], winning[1], winning[2]].includes(i)) {
              document.getElementById(`btn-${i}`).classList.add("bgAdded");
            }
          }
          message1.innerHTML = `${player2Name} Win !!`;
          message2.innerHTML = "";
          player2Score++;
          updateScores();
          gameOver = true; // game stopped
          return;
        }
      }

      turn++; // incrément
      togglePlayerTurn(); // call switch turn function
    } else {
      // cases not available
      message2.innerHTML = "Not available !";
      message1.innerHTML = "";
    }
  });
});

// game reset function
function newgame() {
  for (let i = 1; i < 10  ; i++) {
    document.getElementById(`player1-${i}`).classList.remove('show');
    document.getElementById(`player2-${i}`).classList.remove('show');
    document.getElementById(`player1-${i}`).classList.add('hidden');
    document.getElementById(`player2-${i}`).classList.add('hidden');
  }
  for (let i = 1; i < 10; i++) {
    document.getElementById(`btn-${i}`).classList.remove("bgAdded");
  }
  player1 = [];
  player2 = [];
  message1.innerHTML = "";
  message2.innerHTML = "";
  gameOver = false;
  turn = 0;
  togglePlayerTurn();
}

// reset scores
function resetScores(){
  player1Score = 0;
  player2Score = 0;
  document.getElementById('player1Score').innerHTML = player1Score;
  document.getElementById('player2Score').innerHTML = player2Score;
}
