// main screen : create rows and columns
let row = {};
for (let i = 0; i < 20; i++) {
  row[`row${i}`] = [];
  for (let n = 0; n < 10; n++) {
    row[`row${i}`].push(n);
  }
}

// include the table to html
let table1 = document.getElementById("table1");
for (let i = 0; i < 20; i++) {
  let rowDiv = document.createElement("div"); // row
  rowDiv.style.display = "flex";
  rowDiv.style.marginBottom = "1px";

  row[`row${i}`].forEach(item => {
    let colDiv = document.createElement("div"); // Column
    colDiv.id = "x" + i + "-y" + item;
    colDiv.style.width = "20px";
    colDiv.style.height = "20px";
    colDiv.style.backgroundColor = "#d6d8db";
    colDiv.style.marginRight = "1px";
    rowDiv.appendChild(colDiv);
  });
  table1.appendChild(rowDiv);
}

// previous screen : create rows and columns
let row2 = {};
for(let i = 0; i < 4; i++){
  row[`row${i}`] = [];
  for(let n = 0; n < 3; n++){
    row[`row${i}`].push(n);
  }
}

// include the table to html
let table2 = document.getElementById("table2");
for (let i = 0; i < 4; i++) {
  let rowDiv = document.createElement("div"); // row
  rowDiv.style.display = "flex";
  rowDiv.style.marginBottom = "1px";

  row[`row${i}`].forEach(item => {
    let colDiv = document.createElement("div"); // Column
    colDiv.id = "x" + i + "-y" + item;
    colDiv.style.width = "20px";
    colDiv.style.height = "20px";
    colDiv.style.backgroundColor = "#d6d8db";
    colDiv.style.marginRight = "1px";
    rowDiv.appendChild(colDiv);
  });
  table2.appendChild(rowDiv);
}
