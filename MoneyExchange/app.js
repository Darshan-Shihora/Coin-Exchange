const Rupee = document.getElementById("rupee");
const Note = document.getElementById("note");
const productPrice = document.querySelector("#product_price");
const priceToShopkeeper = document.querySelector("#price_to_shopkeeper");
const showChange = document.querySelector("#show");
const addBtn = document.getElementById("add");
const changeBtn = document.querySelector("#change");

function deepCopy(obj) {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }

  // console.log(Array.isArray(obj));
  let newObj = Array.isArray(obj) ? [] : {};
  for (let key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
      newObj[key] = deepCopy(obj[key]);
    }
  }
  return newObj;
}

// let data = [
//   { 1000: 1 },
//   { 500: 1 },
//   { 200: 3 },
//   { 100: 1 },
  // {50 : 1}
// ];
// let newData = deepCopy(data);

let data = [];
let editId = "";
let flag = true;

function addObject(rupee, number) {
  rupee = +rupee;
  number = +number;
  let obj = {
    [rupee]: number,
  };
  if (addBtn.innerHTML === "Add") {
    data.push(obj);
  } else if (addBtn.innerHTML === "Save") {
    data[editId - 1] = obj;
  }
  
}

function updateUI(){
  descendingOrder();
  for (let i = 0; i < data.length; i++) {
    let rupee_row = document.getElementById(`rupees_row${i + 1}`);
    let note_row = document.getElementById(`no_of_notes_row${i + 1}`);
    let rupee = Object.keys(data[i])[0];
    let note = data[i][rupee];
    rupee_row.innerHTML = rupee;
    note_row.innerHTML = note;
  }
}

addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let table_len = table.rows.length;
  if (addBtn.innerHTML === "Save") {
    console.log("Saving data in ID :", editId);
    let rupee_row = document.getElementById(`rupees_row${editId}`);
    let note_row = document.getElementById(`no_of_notes_row${editId}`);
    // CheckDuplicate();
    // if(flag === true){
    addObject(Rupee.value, Note.value);
    updateUI();
    rupee_row.innerHTML = Rupee.value;
    note_row.innerHTML = Note.value;
    // descendingOrder();
    // }

    addBtn.innerHTML = "Add";
    Rupee.value = "";
    Note.value = "";
  } else {
    console.log("Adding data in ID :", table_len);
    if (Rupee.value == "" || Note.value == "") {
      Rupee.value = "";
      Note.value = "";
      alert("Please Enter both field !!");
      return;
    }
    CheckDuplicate();
    if (flag === true) {
      AddNewRow(table_len);
    }
    CheckForEditBtn();
    CheckForDelBtn();
    updateUI();
  }
});

function CheckDuplicate() {
  flag = true;
  data.map((val) => {
    for (let obj in val) {
      if (obj == Rupee.value) {
        flag = false;
        Rupee.value = "";
        Note.value = "";
        alert("This note is already added");
        return;
      }
    }
  });
}

function AddNewRow(table_len) {
  let row = document.createElement("tr");
  row.id = `row${table_len}`;
  row.innerHTML = `
  <td id="rupees_row${table_len}">${Rupee.value}</td>
    <td id="no_of_notes_row${table_len}">${Note.value}</td>
    <td class="no_border">
    <button id="edit_button${table_len}" class="edit" value="${Rupee.value}">Edit</button>
    <button id="delete_button${table_len}" class="delete" value="${Rupee.value}">Delete</button>
    </td>`;
  tBody.appendChild(row);
  addObject(Rupee.value, Note.value);
  // const newData = data.map((val) => {
  //   return val;
  // });
  console.log(data);
  // descendingOrder();
  Rupee.value = "";
  Note.value = "";
}

function CheckForEditBtn() {
  let editBtn = document.querySelectorAll(".edit");
  for (let edit of editBtn) {
    if (!edit.hasEventListener) {
      edit.hasEventListener = true;
      edit.addEventListener("click", (e) => {
        let str = e.target.id;
        let ID = str[str.length - 1];
        console.log("Editing row with ID: ", ID);
        let rupee_row = document.getElementById(`rupees_row${ID}`);
        let note_row = document.getElementById(`no_of_notes_row${ID}`);
        Rupee.value = rupee_row.innerHTML;
        Note.value = +note_row.innerHTML;
        addBtn.innerHTML = "Save";
        editId = ID;
      });
    }
  }
}

function CheckForDelBtn() {
  let deleteBtn = document.querySelectorAll(".delete");
  for (let del of deleteBtn) {
    if (!del.hasEventListener) {
      del.hasEventListener = true;
      del.addEventListener("click", (e) => {
        let str = e.target.id;
        let ID = str[str.length - 1];
        console.log("Deleting row with ID: ", ID);
        let rowToDelete = document.getElementById(`row${ID}`);
        let dataId = 0;
        for (let i = 0; i < data.length; i++) {
          if (e.target.value == Object.keys(data[i])) {
            dataId = i;
          }
        }
        data.splice(dataId, 1);
        updateUI();
        if (rowToDelete) {
          // descendingOrder();
          rowToDelete.outerHTML = "";
        } else {
          console.error("Row not found for deletion.");
        }
      });
    }
  }
}

function descendingOrder() {
  data.sort((a, b) => {
    let keyA = Object.keys(a)[0];
    let keyB = Object.keys(b)[0];
    return keyB - keyA;
  });
  // console.log(data);
}
console.log(data);

changeBtn.addEventListener("click", (e) => {
  e.preventDefault();
  descendingOrder();
  let newData = deepCopy(data);
  // let Value = e.target.value;
  let diff = +priceToShopkeeper.value - +productPrice.value;
  if (diff < 0) {
    alert("You need to give more " + -diff + " rupee");
  } else {
    // console.log(diff);
    showChange.innerHTML = `Shopkepper need to give ${diff}₹ to you`;
    let actualDiff = diff;

    for (let i = 0; i < newData.length; i++) {
      for (let j = i; j < newData.length; j++) {
        if (Object.values(newData[j])[0] > 0) {
          if (diff >= +Object.keys(newData[j])[0]) {
            diff -= +Object.keys(newData[j])[0];

            // let note_row = document.getElementById(`no_of_notes_row${j + 1}`);
            // note_row.innerHTML--;

            newData[j][Object.keys(newData[j])]--;
            j--;
          }
          if (diff !== 0 && j == newData.length - 1) {
            diff = actualDiff;
            // console.log(diff);
            newData = deepCopy(data);
            // console.log(newData);
          }
        } else {
          continue;
        }
      }
      if (diff == 0) {
        break;
      }
      if(diff !== 0 && i == newData.length - 1){
        newData = deepCopy(data);
        alert("Change is not available");
      }
    }

    for(let i = 0; i < newData.length - 1; i++){
      let note_row = document.getElementById(`no_of_notes_row${i + 1}`);
      if(note_row){
        console.log(note_row.innerHTML,Object.values(newData[i])[0]);
        note_row.innerHTML = Object.values(newData[i])[0];
      }
    }


    for (let j = 0; j < newData.length; j++) {
      if (Object.values(newData[j])[0] == 0) {
        // console.log(newData[i]);
        newData.splice(j, 1);
        let row = document.getElementById(`row${j + 1}`);
        row.innerHTML = '';
        j--;
      }
    }

    data = deepCopy(newData);
    console.table(newData)
  }
});