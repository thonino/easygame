// Score
let showScore = document.getElementById("showScore");
let score = 0;
showScore.textContent = score;

function addScore(n, element) {
  score += Number(n);
  showScore.textContent = score;

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

  const target = document.getElementById("target");
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
  newSpan.style.transition = "transform 1.5s ease";

  newSpan.classList.add(colorRandom, "rounded-circle", "shadow");
  target.appendChild(newSpan);

  // Translate
  setTimeout(() => {
    newSpan.style.transform = `translate(${angle}px, -${distance}px)`; // translate
  }, 450);

  // Supprimer l'élément après un certain temps
  setTimeout(() => {
    if (newSpan.parentNode) {
      target.removeChild(newSpan);
    }
  }, 1500);
};

// start game
let start = document.getElementById("start");
start.addEventListener("click", () => {
  setInterval(addElement, 150);
})

