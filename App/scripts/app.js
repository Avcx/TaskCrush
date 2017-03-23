//Collect interactive elements
const addButton       = document.getElementById("add-item");
const completedItems  = document.getElementsByClassName("completed")[0];
const incompleteItems = document.getElementsByClassName("incomplete")[0];
const inputText       = document.getElementById("input-text");
const closeButton     = document.getElementById("close-dia");
const Bg              = document.getElementById("backdrop");
const openDia         = document.getElementById("open-dia");
const app             = document.querySelector(".app");
const version_number  = 1;

function hideButton() {
  openDia.style.visibility = "hidden";
  openDia.style.opacity    = "0";
}
function showButton() {
  openDia.style.visibility = "visible";
  openDia.style.opacity    = "1";
}


let add = function(itemName, isComplete = false, exists = false) {
  //Create required elements
    itemName = itemName || inputText.value;
  if (itemName === "") {
    toggleDialog();
    return alert("Task name must not be empty!");
  } else if (typeof itemName != "string") {
    toggleDialog();
    return alert("Task name must not be empty!");
  }
  //Create all needed elements
	let editButton   = document.createElement('button');
  let deleteButton = document.createElement('button');
	let newListItem  = document.createElement('li');
  let checkbox     = document.createElement('input');
  let header       = document.createElement("h3");
  let editBox      = document.createElement("input");
  let editIcon     = document.createElement("i");
  let deleteIcon   = document.createElement("i");
  //Modify attributes and text
  newListItem.classList.add("card", "list");
    //Icons
  editIcon.classList.add("material-icons");
  editIcon.textContent = "create";
  deleteIcon.classList.add("material-icons");
  deleteIcon.textContent = "delete";
  	//Header
  header.innerText = itemName;
  header.classList.add("card-header");
  	//Input boxes
  checkbox.setAttribute('type', 'checkbox');
  checkbox.classList.add("list-select");
  editBox.setAttribute('type', 'text');
      //Temporary fix for overflowing headers
  editBox.setAttribute('maxlength', "12")
  editBox.classList.add("edit-text");
  	//Edit button
  editButton.appendChild(editIcon);
  editButton.classList.add("edit");
  	//Delete button
  deleteButton.appendChild(deleteIcon);
  deleteButton.classList.add("delete");
  //Append
  newListItem.append(checkbox, header, editBox, editButton, deleteButton);
  if (isComplete == "true") {
    completedItems.appendChild(newListItem);
    checkbox.checked = "checked";
  } else {
    incompleteItems.appendChild(newListItem);
  }
  inputText.value = "";
}

let removeItem = function() {
  let listItem = this.parentNode;
    listItem.remove();
};
let editItem = function() {
  // Selecting all elements
  let button    = this;
  let listItem  = button.parentNode;
  let heading   = listItem.querySelector(".card-header");
  let textbox   = listItem.querySelector(".edit-text");
  let openDia   = document.querySelector("#open-dia");
  let icon      = button.querySelector("i");
  // Checks to see if item is in edit-mode already.
  if (listItem.classList.contains("edit-mode")) {
    // Checks for an empty value in the textbox
        if (textbox.value === "") {
          listItem.classList.remove("edit-mode");
          icon.textContent = "create";
          showButton();
          return;
  }
    listItem.classList.remove("edit-mode");
		heading.textContent = textbox.value;
    showButton();
    icon.textContent = "create";
  } else {
    listItem.classList.add("edit-mode");
    hideButton();
    textbox.value = heading.textContent;
    textbox.focus();
    icon.textContent = "save";
  }
};

let moveToComp = function() {
  console.log('Moving to Completed.');
  let listItem = this.parentNode;
  completedItems.appendChild(listItem);
};
let moveToIncomp = function() {
  console.log('Moving to Incomplete.');
  let listItem = this.parentNode;
  incompleteItems.appendChild(listItem);
};

let toggleDialog = function() {
  const dialog = document.getElementsByTagName("dialog")[0];
  let openDia = document.getElementById("open-dia");
  if (dialog.hasAttribute("open")) {
    dialog.removeAttribute("open");
    openDia.style.visibility = "visible";
    openDia.style.visibility = "visible";
    Bg.style.visibility = "hidden";
  } else {
  dialog.setAttribute("open", "open");
    inputText.focus();
    openDia.style.visibility = "hidden";
    Bg.style.visibility = "visible";
  }
};

//Functions to set Event Listeners
openDia.onclick = toggleDialog;
closeButton.onclick = toggleDialog;
Bg.onclick = toggleDialog;

addButton.addEventListener("click", () => {
  toggleDialog();
  add();
});

//Automatically sets event listeners based on the items list

completedItems.addEventListener("click", (event) => {
  let targetElement = event.target;
    if (targetElement.className === "list-select") {
        targetElement.onchange = moveToIncomp.call(targetElement);
    }
})
incompleteItems.addEventListener("click", (event) => {
  let targetElement = event.target;
    if (targetElement.className === "list-select") {
        targetElement.onchange = moveToComp.call(targetElement);
    }
})

app.addEventListener("click", (event) => {
  let targetElement = event.target;
  // console.log(targetElement);
    switch (targetElement.className) {
      case "edit":
        editItem.call(targetElement);
        break;
      case "delete":
        removeItem.call(targetElement);
        break;
    }
  })
