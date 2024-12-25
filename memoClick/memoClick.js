let row1 = document.getElementById("row1");
let row2 = document.getElementById("row2");
let row3 = document.getElementById("row3");
let row4 = document.getElementById("row4");
let row5 = document.getElementById("row5");

// show Tab
let rows = [row1, row2, row3, row4, row5];
function newTab () {
  // reset 
  rows.forEach(row => row.innerHTML = "");

  // tabs
  let tabs = [];
  for(i = 1; i <= 30 ; i++){ tabs.push(i) }

  // random tab
  let tabRandom = [];
  while( tabs.length > 0){
    let numberRandom = tabs[Math.floor(Math.random()*tabs.length)]; 
    tabs = tabs.filter(data => data !== numberRandom)
    tabRandom.push(numberRandom); 
  }
  tabRandom.forEach((item, index) => {
    let rowIndex = Math.floor(index / 6); 
    rows[rowIndex].innerHTML += `
      <button  
        id="it-${item}" 
        value="${item}"
        class="${item <= 10 ? 'text-info' : 'text-secondary'} box btn fs-1 fw-bold col-2"
      >
        ${item}
      </button>
    `;
  });
  
  // HandleGame
  let tabResult = [];
  for(i = 1; i <= 10 ; i++){ tabResult.push(i)}
  let countClick = 1 ;

  let gameOn = false;

  // Allow button
  setTimeout(() => {
    gameOn = true;
  }, 8000);

  tabRandom.forEach(item => {
    let listenBtn = document.getElementById("it-"+item);
    let progressbar = document.getElementById("progressbar");
    let message = document.getElementById("message");
    let message2 = document.getElementById("message2");

    // Show positions
    let showPositions = document.getElementById("showPositions");
    showPositions.addEventListener("click", () => {
      if(item <= 10){
        listenBtn.style.backgroundColor = "#0dcaf0";
        showPositions.classList.add("d-none")
      }
    })

    // GiveUp
    let giveUp = document.getElementById("giveUp");
    giveUp.addEventListener("click", () => {
      if(item <= 10){
        listenBtn.textContent = listenBtn.value; 
      }
      message.innerHTML =`<p id="message" class="text-danger"> You lost !</p>`
      message2.textContent = "";
      listenBtn.style.backgroundColor = "#f8f9fa";
      showPositions.classList.add("d-none");
      giveUp.classList.add("d-none");
      gameOn = false;
    })

    // Item hide
    setTimeout(() => {
      listenBtn.textContent = ""; 
      listenBtn.style.backgroundColor = "#f0f0f0"; 
    }, 8000);

    // timer
    let timerNumber = 8;
    let timerElement = document.getElementById("timer");
    for (let timer = timerNumber; timer >= 0; timer--) {
      setTimeout(() => {
        timerElement.textContent = timer;
      }, (timerNumber - timer) * 1000); 
    }
    setTimeout(() => {
      timerElement.textContent = "";
    },  timerNumber*1000);

    // listen btn
    listenBtn.addEventListener("click", () => {
      if (!gameOn) return;
      if(countClick == listenBtn.value){
        if(countClick == 10){ 
          message.innerHTML =`<p id="message" class="text-success"> Perfect You Won ! </p>`
          gameOn = false;
          message2.textContent = "";
        } else {
          message.innerHTML =`<p id="message" class="text-info">${listenBtn.value} Yes !</p>`
        }
        message2.innerHTML =`<p id="message2"></p>`
        progressbar.style.width = (countClick*10)+"%";
        countClick ++;
      } else {
        message.innerHTML =`<p id="message" class="text-danger"> It's wrong !</p>`
        message2.innerHTML =`<p id="message2" class="h2 fw-bold text-info"> Try again ! </p>`
        countClick = 1;
        progressbar.style.width = "0%";
      }
    });
  });
}

// resetGame
function newgame() { 
  message.textContent = "";
  message2.textContent = "";
  countClick = 1;
  progressbar.style.width = "0%";
  showPositions.classList.remove("d-none");
  giveUp.classList.remove("d-none");
  gameOn = true;
  newTab()
}

window.addEventListener("load", () => {
  newgame()
});


// Toast
const toastTrigger = document.getElementById('liveToastBtn')
const toastLiveExample = document.getElementById('liveToast')
if (toastTrigger) {
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
  toastTrigger.addEventListener('click', () => {
    toastBootstrap.show()
  })
}

