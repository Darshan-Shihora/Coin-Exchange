let info = document.querySelectorAll("info");
let table = document.querySelector("table");
let tBody = document.querySelector("#tBody");
let addBtn = document.querySelector("#add");
let Rupee = document.querySelector("#rupee");
let Note = document.querySelector("#note");
let editBtn = document.querySelectorAll(".edit");
let deleteBtn = document.querySelectorAll(".delete");
let changeBtn = document.querySelector("#change");
let showChange = document.querySelector("#show");
let productPrice = document.querySelector("#product_price");
let priceToShopkeeper = document.querySelector("#price_to_shopkeeper");
let data = [];
let baseID = "";

function addObject(rupee, number) {
  let tempData = {
    [rupee]: number,
  };
  if (addBtn.innerHTML === "Add") {
    data.push(tempData);
  } else if (addBtn.innerHTML === "Save") {
    data[baseID - 1] = tempData;
  }
}

addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let table_len = table.rows.length;
  if (addBtn.innerHTML === "Save") {
    console.log("Saving data in ID :", baseID);
    let rupee_row = document.getElementById(`rupees_row${baseID}`);
    let note_row = document.getElementById(`no_of_notes_row${baseID}`);
    rupee_row.innerHTML = Rupee.value;
    note_row.innerHTML = Note.value;
    // data[rupee_row.innerHTML] = +Note.value;
    // console.log(data[baseID - 1]);
    addObject(Rupee.value, +Note.value);
    addBtn.innerHTML = "Add";
    Rupee.value = "";
    Note.value = "";
  } else {
    console.log("Adding data in ID :", table_len);
    baseID = table_len;
    addingRow(baseID);

    // editBtn = document.querySelectorAll(".edit");
    // for (let edit of editBtn) {
    //   if (!edit.hasEventListener) {
    //     edit.hasEventListener = true;
    //     edit.addEventListener("click", EditFunctionality);
    //   }
    // }

    editBtn = document.querySelector(`#edit_button${e.target.value}`);
    editBtn.addEventListener("click", EditFunctionality);

    // deleteBtn = document.querySelectorAll(".delete");
    // for (let del of deleteBtn) {
    //   if (!del.hasEventListener) {
    //     del.hasEventListener = true;
    //     del.addEventListener("click",DeleteFunctionality);
    //   }
    // }

    // deleteBtn = document.querySelector(`delete_button${baseID}`);
    // deleteBtn.addEventListener('click',() => {
    // console.log(del.value);
    // let keyToDelete = document.getElementById(`rupees_row${baseID}`);
    // let deleteData = keyToDelete.innerHTML;
    // delete data[deleteData];
    // data.splice(deleteBtn.value - 1, 1);

    // deleteRowHandler(deleteBtn);
    //   });
  }
});

function addingRow(table_len) {
  let row = document.createElement("tr");
  row.id = `row${table_len}`;
  row.innerHTML = `
    <td id="rupees_row${table_len}">${Rupee.value}</td>
    <td id="no_of_notes_row${table_len}">${Note.value}</td>
    <td class="no_border">
    <button id="edit_button${table_len}" class="edit" value="${table_len}">Edit</button>
    <button id="delete_button${table_len}" class="delete" value="${table_len}">Delete</button>
    </td>`;
  tBody.appendChild(row);
  // data[Rupee.value] = +Note.value;
  addObject(Rupee.value, +Note.value);
  Rupee.value = "";
  Note.value = "";
}

function EditFunctionality() {
  console.log("Editing row with ID: ", baseID);
  let id = baseID;
  let rupee_row = document.getElementById(`rupees_row${id}`);
  let note_row = document.getElementById(`no_of_notes_row${id}`);
  Rupee.value = rupee_row.innerHTML;
  Note.value = +note_row.innerHTML;
  addBtn.innerHTML = "Save";
  // baseID = +id;
}

function deleteRowHandler(del) {
  console.log("Deleting row with ID: ", del.value);
  let rowToDelete = document.getElementById(`row${del.value}`);
  if (rowToDelete) {
    rowToDelete.outerHTML = "";
  } else {
    console.error("Row not found for deletion.");
  }
}

function DeleteFunctionality() {}

changeBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let diff = +priceToShopkeeper.value - +productPrice.value;
  if (+productPrice.value > +priceToShopkeeper.value) {
    alert("Product price is higher");
    return;
  } else {
    showChange.innerHTML = `Money needed to return : ${diff}`;
    for (let i = 0; i < data.length; i++) {
      // console.log(data);
    }
  }
});
