// Score
let showScore = document.getElementById("showScore");
let showTopScore = document.getElementById("showTopScore");
let showTimer = document.getElementById("showTimer");
let score = 0;
let topScore =  0;
let timer = 5;
showScore.textContent = score;
showTopScore.textContent = topScore;
showTimer.textContent = timer; 


function addScore(n, element) {
  score += Number(n);
  showScore.textContent = score;
  function syncTopScore() {
    if (score > topScore) {
      topScore = score;
      showTopScore.textContent = topScore;
    }
  }
  syncTopScore()

  // Transformer en "+1" lors du clic
  element.textContent = "+1";
  element.style.transition = "opacity 0.5s ease, transform 0.5s ease";
  element.classList.add( "display-1", "text-light", "d-flex", );
  element.style.justifyContent = "center";
  element.style.alignItems = "center";
  element.style.transform += " scale(0)";

  // Buble death
  setTimeout(() => {
    element.remove();
  }, 250);
}

// Create element
let addElement = () => {
  let color = [
    "bg-primary", "bg-primary-light",
    "bg-success", "bg-success-light",
    "bg-danger", "bg-danger-light",
    "bg-info", "bg-info-light",
    "bg-warning", "bg-warning-light",
  ];

  let colorRandom = color[Math.random() * color.length | 0]; // color random
  let positionRandom = Math.floor(Math.random() * 111); // position random (0 110)
  let angle = Math.floor(Math.random() * 601) - 300; // angle random (-300 300)
  let size = Math.floor(Math.random() * 61) + 80; // size random (80 150)
  let distance = Math.floor(Math.random() * 201) + 300; // distance random (300 500)

  const target = document.getElementById("targetBuble");
  let newSpan = document.createElement("span");
  newSpan.onclick = function () {
    addScore(1, this);
  };


  // Styles appliqués
  newSpan.style.width = size + "px";
  newSpan.style.height = size + "px";
  newSpan.style.left = positionRandom + "%";
  newSpan.style.position = "absolute";
  newSpan.style.bottom = "0";
  newSpan.style.opacity = 0.9;
  newSpan.style.transition = "transform 2.5s ease";

  newSpan.classList.add(colorRandom, "rounded-circle", "shadow");
  target.appendChild(newSpan);

  // Translate
  setTimeout(() => {
    newSpan.style.transform = `translate(${angle}px, -${distance}px)`; // translate
  }, 250);

  // Supprimer l'élément après un certain temps
  setTimeout(() => {
    if (newSpan.parentNode) {
      target.removeChild(newSpan);
    }
  }, 2000);
};

// Start
let gameRunning = false; 
function gameLogic() {
  if (gameRunning) return;  gameRunning = true;
  let playInterval = setInterval(addElement, 300); // start
  for (let i = timer; i >= 0; i--) {
    setTimeout(() => {
      showTimer.textContent = i;
      if (i === 0) {
        clearInterval(playInterval); // End
        let showTopScoreEndGame = document.getElementById("showTopScoreEndGame");
        let showEndScore = document.getElementById("showEndScore");
        const showEndGameModal = document.getElementById("showEndGameModal");
        const modal = new bootstrap.Modal(showEndGameModal);
        // Show modal
        setTimeout(() => {
          modal.show();
          showEndScore.textContent = score;
          setTimeout(() => {
            modal.hide();
            gameRunning = false; 
          }, 4000);
        }, 2000);
        // Show topScore
        if (Number(score) === Number(topScore)) {
          showTopScoreEndGame.classList.remove("d-none");
          console.log("score : " + score + " topScore : " + topScore);
        } else {
          showTopScoreEndGame.classList.add("d-none");
          console.log("score : " + score + " topScore : " + topScore);
        }
        // Reset 
        setTimeout(() => {
          score = 0;
          showScore.textContent = score;
          showTimer.textContent = 5;
        }, 2000);
      }
    }, (timer - i) * 1000);
  }
}

// Gestion des événements
document.getElementById("start").addEventListener("click", gameLogic);
document.addEventListener("keydown", (event) => {
  if (event.keyCode === 32) { // Barre d'espace
    console.log("keydown 32");
    gameLogic();
  }
});

