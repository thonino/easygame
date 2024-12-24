
//  Create tab
let row1 = document.getElementById("row1");
let row2 = document.getElementById("row2");
let row3= document.getElementById("row3");
let row4 = document.getElementById("row4");
let row5 = document.getElementById("row5");

let tabs = [];
for(i = 1; i <= 30 ; i++){ tabs.push(i) }

let tabRandom = [];
while( tabs.length > 0){
  let numberRandom = tabs[Math.floor(Math.random()*tabs.length)]; 
  tabs = tabs.filter(data => data !== numberRandom)
  tabRandom.push(numberRandom); 
}

tabRandom.forEach((item, index) => {

  if( index < 6) {
    row1.innerHTML += `
    <button  
      id="tabRandom" 
      class="${item <= 10 ? 'btn-info' : 'btn-secondary'} btn fs-1 fw-bold col-2"
    >
      ${item} 
    </button>
    `
  }
  else if( index >= 6 && index < 12 ) {
    row2.innerHTML += `
    <button  
      id="tabRandom" 
      class="${item <= 10 ? 'btn-info' : 'btn-secondary'} btn fs-1 fw-bold col-2"
    >
      ${item} 
    </button>
    `
  }
  else if( index >= 12 && index < 18 ) {
    row3.innerHTML += `
    <button  
      id="tabRandom" 
      class="${item <= 10 ? 'btn-info' : 'btn-secondary'} btn fs-1 fw-bold col-2"
    >
      ${item} 
    </button>
    `
  }
  else if( index >= 18 && index < 24 ) {
    row4.innerHTML += `
    <button  
      id="tabRandom" 
      class="${item <= 10 ? 'btn-info' : 'btn-secondary'} btn fs-1 fw-bold col-2"
    >
      ${item} 
    </button>
    `
  }
  if ( index >= 24 ){
    row5.innerHTML += `
    <button  
      id="tabRandom" 
      class="${item <= 10 ? 'btn-info' : 'btn-secondary'} btn fs-1 fw-bold col-2"
    >
      ${item} 
    </button>
    `
  }
});









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