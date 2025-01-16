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

const ITEMS = {
  0: {
    color: "bg-info",
    schema: ["y0-x0", "y1-x0", "y2-x0", "y3-x0"]
  },
  1: {
    color: "bg-warning",
    schema: ["y0-x0", "y0-x1", "y1-x0", "y1-x1"]
  },
  2: {
    color: "bg-warning-dark",
    schema: ["y0-x0", "y1-x0", "y2-x0", "y2-x1"]
  },
  3: {
    color: "bg-primary",
    schema: ["y0-x0","y0-x1", "y1-x0", "y2-x0"]
  },
  4: {
    color: "bg-success",
    schema: ["y0-x0","y1-x0", "y1-x1", "y2-x1"]
  },
  5: {
    color: "bg-danger",
    schema: ["y0-x1","y1-x0", "y1-x1", "y2-x0"]
  },
  6: {
    color: "bg-purple",
    schema: ["y0-x0","y1-x0", "y1-x1", "y2-x0"]
  },
};

// random item
let item = Object.values(ITEMS);
let randomItem = item[Math.floor(Math.random() * item.length)];

function fillItem() {
  randomItem.schema.forEach(fill => {
    let fullId = "prevScreen-" + fill; 
    let cell = document.getElementById(fullId); 
    if (cell) cell.classList.add(randomItem.color);
  });
}
fillItem();