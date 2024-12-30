// Page elements
let row1 = document.getElementById("row1");
let row2 = document.getElementById("row2");
let row3 = document.getElementById("row3");
let row4 = document.getElementById("row4");
let row5 = document.getElementById("row5");

// Show Tab
let rows = [row1, row2, row3, row4, row5];

// Game variables 
let gameOn = false;
let timerNumber = 3; 
let level = 5; 
let countClick = 1; 

function newTab() {
  // Reset the rows and game state
  rows.forEach(row => row.innerHTML = "");

  // Generate a list of numbers from 1 to 30
  let tabs = [];
  for (let i = 1; i <= 30; i++) {
    tabs.push(i);
  }

  // Randomize the numbers
  let tabRandom = [];
  while (tabs.length > 0) {
    let numberRandom = tabs[Math.floor(Math.random() * tabs.length)];
    tabs = tabs.filter(data => data !== numberRandom);
    tabRandom.push(numberRandom);
  }

  // Generate the buttons in the rows
  tabRandom.forEach((item, index) => {
    let rowIndex = Math.floor(index / 6);
    rows[rowIndex].innerHTML += `
      <button  
        id="it-${item}" 
        value="${item}"
        class="${item <= level ? 'text-info' : 'text-secondary'} box btn fs-1 fw-bold col-2"
      >
        ${item}
      </button>
    `;
  });

  // Game logic
  let tabResult = [];
  for (let i = 1; i <= level; i++) { tabResult.push(i);}

  // Allow button
  setTimeout(() => { gameOn = true; }, timerNumber*1000);                                                                                                                                         

  // Handle button clicks and game flow
  tabRandom.forEach(item => {
    let listenBtn = document.getElementById("it-" + item);
    let progressbar = document.getElementById("progressbar");
    let message = document.getElementById("message");
    let message2 = document.getElementById("message2");
    let tryagain = document.getElementById("tryagain");
    let showPositions = document.getElementById("showPositions");
    let hidePositions = document.getElementById("hidePositions");
    let positions = false;

    // Show positions
    showPositions.addEventListener("click", () => {
      if (item <= level) {
        listenBtn.style.backgroundColor = "#0dcaf0";
        showPositions.classList.add("d-none");
        hidePositions.classList.remove("d-none");
        positions = true;
      }
    });

    // Hide positions
    hidePositions.addEventListener("click", () => {
      if (item <= level) {
        listenBtn.style.backgroundColor = "#f0f0f0";
        hidePositions.classList.add("d-none");
        showPositions.classList.remove("d-none");
        positions = false;
      }
    });

    // Display the timer
    let timerElement = document.getElementById("timer");
    for (let timer = timerNumber; timer >= 0; timer--) {
      setTimeout(() => {
        timerElement.textContent = timer;
      }, (timerNumber - timer) * 1000);
    }
    setTimeout(() => { timerElement.textContent = ""; }, timerNumber * 1000);

    // Hide the button after the timer
    setTimeout(() => {
      listenBtn.textContent = "";
      listenBtn.style.backgroundColor = "#f0f0f0";
    }, timerNumber * 1000);

    // Handle GiveUp
    let giveUp = document.getElementById("giveUp");
    giveUp.addEventListener("click", () => {
      showValues();
      message.innerHTML = `<p id="message" class="text-danger"> You lost !</p>`;
      message2.textContent = "";
      listenBtn.style.backgroundColor = "#f8f9fa";
      giveUp.classList.add("d-none");
      tryagain.classList.add("d-none");
      gameOn = false;
    });

    // Show values when clicked
    function showValues() {
      if (item <= level) {
        message2.textContent = "";
        listenBtn.textContent = listenBtn.value;
        listenBtn.style.backgroundColor = "#f0f0f0";
        showPositions.classList.add("d-none");
        hidePositions.classList.add("d-none");
        giveUp.classList.add("d-none");
        gameOn = false;
      }
    }

    // Listen for button click
    listenBtn.addEventListener("click", () => {
      if (!gameOn) return;
      if (countClick == listenBtn.value) {
        if (countClick == level) {
          message.innerHTML = `<p id="message" class="text-info"> Perfect you won ! </p>`;
          showValues();
          listenBtn.style.color = "#198754";
        } else {
          message.innerHTML = `<p id="message" class="text-info">${listenBtn.value} Yes !</p>`;
          listenBtn.textContent = listenBtn.value;
          listenBtn.style.backgroundColor = "#f0f0f0";
        }
        progressbar.style.width = (countClick * (100 / level)) + "%";
        countClick++;
      } else {
        message.innerHTML = `<p id="message" class="text-danger"> It's wrong !</p>`;
        listenBtn.textContent = listenBtn.value;
        tryagain.classList.remove("d-none");
        gameOn = false;
        countClick = 1;
        progressbar.style.width = "0%";
      }
    });

    // Try again
    tryagain.addEventListener("click", () => {
      listenBtn.textContent = "";
      gameOn = true;
      message.textContent = "";
      message2.textContent = "";
      tryagain.classList.add("d-none");
      if (positions) { listenBtn.style.backgroundColor = "#0dcaf0"; } 
      else { listenBtn.style.backgroundColor = "#f0f0f0"; }
    });
  });
}

// Reset the game and start a new one
function newgame() {
  message.textContent = "";
  message2.textContent = "";
  countClick = 1;
  progressbar.style.width = "0%";
  showPositions.classList.remove("d-none");
  hidePositions.classList.add("d-none");
  giveUp.classList.remove("d-none");
  gameOn = false;
  newTab(); 
}

// current values 
settingBtn.addEventListener("click", () => {
  setTimer.value = timerNumber;
  setDificulty.value = level;
});

// Save Settings function
function saveSettings() {
  let newTimer = Number(document.getElementById("setTimer").value); 
  let newLevel = Number(document.getElementById("setDificulty").value); 

  // Update values
  if (!isNaN(newTimer) && newTimer > 0) { timerNumber = newTimer; }
  if (!isNaN(newLevel) && newLevel >= 1 && newLevel <= 30) { level = newLevel;  }
  newgame();

  // Close modal
  let targetModal = document.getElementById("settingModal");
  const modal = bootstrap.Modal.getInstance(targetModal);
  modal.hide(); 
}

// SaveSettings fX and button
document.getElementById("saveSetting").addEventListener("click", saveSettings);

// Load page
window.addEventListener("load", () => { newgame(); });

// Toast for displaying messages
const toastTrigger = document.getElementById('liveToastBtn');
const toastLiveExample = document.getElementById('liveToast');
if (toastTrigger) {
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
  toastTrigger.addEventListener('click', () => {
    toastBootstrap.show();
  });
};
