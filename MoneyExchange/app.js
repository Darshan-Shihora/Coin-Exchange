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

function updateUI(toggleData) {
  descendingOrder();
  for (let i = 0; i < toggleData.length; i++) {
    let rupee_row = document.getElementById(`rupees_row${i + 1}`);
    let note_row = document.getElementById(`no_of_notes_row${i + 1}`);
    let edit_row = document.getElementById(`edit_button${i + 1}`);
    let delete_row = document.getElementById(`delete_button${i + 1}`);
    // console.log(edit_row, delete_row);
    if (rupee_row && note_row) {
      let rupee = Object.keys(toggleData[i])[0];
      let note = toggleData[i][rupee];
      rupee_row.innerHTML = rupee;
      note_row.innerHTML = note;
      edit_row.value = rupee;
      delete_row.value = rupee;
    } else {
      let updatedRow = document.getElementById(`row${i + 2}`);
      let updatedRupeeRow = document.getElementById(`rupees_row${i + 2}`);
      let updatedNoteRow = document.getElementById(`no_of_notes_row${i + 2}`);
      let updatedEditRow = document.getElementById(`edit_button${i + 2}`);
      let updatedDeleteRow = document.getElementById(`delete_button${i + 2}`);
      updatedRow.id = `row${i + 1}`;
      updatedRupeeRow.id = `rupees_row${i + 1}`;
      updatedNoteRow.id = `no_of_notes_row${i + 1}`;
      updatedEditRow.id = `edit_button${i + 1}`;
      updatedDeleteRow.id = `delete_button${i + 1}`;
      i--;
    }
  }
}

addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let table_len = table.rows.length;
  if (addBtn.innerHTML === "Save") {
    console.log("Saving data in ID :", editId);
    let rupee_row = document.getElementById(`rupees_row${editId}`);
    let note_row = document.getElementById(`no_of_notes_row${editId}`);
    addObject(Rupee.value, Note.value);
    updateUI(data);
    rupee_row.innerHTML = Rupee.value;
    note_row.innerHTML = Note.value;

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
      updateUI(data);
    }
    CheckForEditBtn();
    CheckForDelBtn();
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
  console.log(data);
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
        console.log(e.target);
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
      del.addEventListener("click", deleteButtonClickHandler);
    }
  }
}

function deleteButtonClickHandler(e) {
  let str = e.target.id;
  let ID = str[str.length - 1];
  console.log("Deleting row with ID: ", ID);
  let rowToDelete = document.getElementById(`row${ID}`);
  console.log(rowToDelete);
  if (rowToDelete) {
    rowToDelete.remove();
    data.splice(ID - 1, 1);
    updateUI(data);
  } else {
    console.error("Row not found for deletion.");
  }
}

function descendingOrder() {
  data.sort((a, b) => {
    let keyA = Object.keys(a)[0];
    let keyB = Object.keys(b)[0];
    return keyB - keyA;
  });
}
console.log(data);

changeBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let ul = document.getElementById("show_note_given");
  if (ul) {
    ul.innerHTML = "";
  }
  let newData = deepCopy(data);
  let diff = +priceToShopkeeper.value - +productPrice.value;
  if (diff < 0) {
    alert("You need to give more " + -diff + " rupee");
  } else {
    // console.log(diff);
    if (newData.length == 0) {
      alert("Money not available");
      return;
    }
    showChange.innerHTML = `Shopkepper need to give ${diff}₹ to you`;
    let actualDiff = diff;

    for (let i = 0; i < newData.length; i++) {
      for (let j = i; j < newData.length; j++) {
        if (Object.values(newData[j])[0] > 0) {
          if (diff >= +Object.keys(newData[j])[0]) {
            diff -= +Object.keys(newData[j])[0];
            newData[j][Object.keys(newData[j])]--;
            j--;
          }
          if (diff !== 0 && j == newData.length - 1) {
            diff = actualDiff;
            newData = deepCopy(data);
          }
        } else {
          continue;
        }
      }
      if (diff == 0) {
        break;
      }
      if (diff !== 0 && i == newData.length - 1) {
        newData = deepCopy(data);
        alert("Change is not available");
      }
    }

    for (let i = 0; i < newData.length; i++) {
      let note_row = document.getElementById(`no_of_notes_row${i + 1}`);
      let rupee_row = document.getElementById(`rupees_row${i + 1}`);
      // console.log(note_row);
      if (note_row) {
        console.log(note_row.innerHTML, Object.values(newData[i])[0]);
        let diff = +note_row.innerHTML - Object.values(newData[i])[0];
        note_row.innerHTML = Object.values(newData[i])[0];
        let li = document.createElement("li");
        li.style = "list-style: none;";
        console.log(diff);
        li.innerHTML = `${diff} x ${rupee_row.innerHTML}`;
        ul.appendChild(li);
      }
    }

    for (let j = 0; j < newData.length; j++) {
      if (Object.values(newData[j])[0] == 0) {
        newData.splice(j, 1);
        let row = document.getElementById(`row${j + 1}`);
        row.remove();
        updateUI(newData);
        j--;
      }
    }

    data = deepCopy(newData);
    console.log(newData);
  }
});
