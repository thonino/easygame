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
          class="${item <= 10 ? 'btn-info' : 'btn-secondary'} box btn fs-1 fw-bold col-2"
          style="min-height : 60px"
        >
          ${item}
        </button>
      `;
    });


  // HandleGame
  let tabResult = [];
  for(i = 1; i <= 10 ; i++){ tabResult.push(i)}
  let countClick = 1 ;

  // allow button
  let gameOn = true;

  tabRandom.forEach(item => {
    let listenBtn = document.getElementById("it-"+item);
    let progressbar = document.getElementById("progressbar");
    let message = document.getElementById("message");
    let message2 = document.getElementById("message2");

    // item hide
    setTimeout(() => {
      listenBtn.textContent = ""
    }, 5000);

    // listen btn
    listenBtn.addEventListener("click", () => {
      if (!gameOn) return;
      if(countClick == listenBtn.value){
        if(countClick == 10){ 
          message.innerHTML =`<p id="message" class="text-success"> Perfect You Win ! </p>`
          gameOn = false;
          console.log("win : " + gameOn);
        } else {
          message.innerHTML =`<p id="message" class="text-info">${listenBtn.value} Yes !</p>`
        }
        message2.innerHTML =`<p id="message2"></p>`
        progressbar.style.width = (countClick*10)+"%";
        countClick ++;
      } else {
        message.innerHTML =`<p id="message" class="text-danger"> You lose !</p>`
        message2.innerHTML =`<p id="message2" class="text-info h2"> Try again ? </p>`
        countClick = 1;
        progressbar.style.width = "0%";
      }
    });
  });
}
newTab ()

// resetGame
function newgame() { 
  message.innerHTML =`<p id="message"></p>`
  message2.innerHTML =`<p id="message2"></p>`
  countClick = 1;
  progressbar.style.width = "0%";
  gameOn = true;
  newTab()
}


// How to show datas with : forEach
// let tabs = [
//   { row1 : "a", row2 : "0" },
//   { row1 : "b", row2 : "1" },
//   { row1 : "c", row2 : "2" },
//   { row1 : "d", row2 : "3" },
//   { row1 : "e", row2 : "4" },
//   { row1 : "f", row2 : "5" },
//   { row1 : "g", row2 : "6" },
//   { row1 : "h", row2 : "7" },
//   { row1 : "i", row2 : "8" },
//   { row1 : "j", row2 : "9" },
// ];

// let tabs1 = [];
// let tabs2 = [];

// let show1 = document.getElementById("show1");
// let show2 = document.getElementById("show2");
// tabs.forEach(item => {
//   show1.innerHTML += `{ ${Object.keys(item)[0]} : ${Object.values(item)[0]} } , `;
//   show2.innerHTML += `{ ${Object.keys(item)[1]} : ${Object.values(item)[1]} } , ` 
//   tabs1.push(`row1 : ${Object.values(item)[0]}`);
//   tabs2.push(`row2 : ${Object.values(item)[1]}`)
// });

// let show3 = document.getElementById("show3");
// let show4 = document.getElementById("show4")
// tabs1.forEach(item => {
//   show3.innerHTML += `{ ${item } } , `
// })
// tabs2.forEach(item => {
//   show4.innerHTML += `{ ${item} } , `
// })

/*

<!-- How to show datas with forEach -->
<!-- <h1 id="title" class="fw-bold text-info-dark">MemoClick</h1>
<div class="d-flex ">
  <p id="show1"></p>
</div>
<div class="d-flex">
  <p id="show2"></p>
</div>
<div class="d-flex ">
  <p id="show3"></p>
</div>
<div class="d-flex ">
  <p id="show4"></p>
</div> -->

*/