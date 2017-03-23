//Collect interactive elements
const addButton = document.getElementById("add-item");
const completedItems = document.getElementsByClassName("completed")[0];
const incompleteItems = document.getElementsByClassName("incomplete")[0];
const inputText = document.getElementById("input-text");
const closeButton = document.getElementById("close-dia");
const Bg = document.getElementById("backdrop");
const openDia = document.getElementById("open-dia");
const app = document.querySelector(".app");
const version_number = 1;

function hideButton() {
  openDia.style.visibility = "hidden";
  openDia.style.opacity = "0";
}

function showButton() {
  openDia.style.visibility = "visible";
  openDia.style.opacity = "1";
}


let add = function(itemName, isComplete = false, exists = false) {
  //Create required elements
    itemName = itemName || inputText.value;
  if (itemName === "") {
    openDialog();
    return alert("Task name must not be empty!");
  } else if (typeof itemName != "string") {
    openDialog();
    return alert("Task name must not be empty!");
  }
	let editButton = document.createElement('button');
  let deleteButton = document.createElement('button');
	let newListItem = document.createElement('li');
  let checkbox = document.createElement('input');
  let header = document.createElement("h3");
  let editBox = document.createElement("input");
  //Modify attributes and text
  newListItem.classList.add("card", "list");
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
  editButton.innerHTML = "<i class='material-icons'>create</i>";
  editButton.classList.add("edit");
  	//Delete button
  deleteButton.innerHTML = "<i class='material-icons'>delete</i>";
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

let bindFunction = function(li, checkboxEvent) {
  let checkbox = li.querySelector("li input[type='checkbox']");
  let editButton = li.querySelector("li .edit");
  let deleteButton = li.querySelector("li .delete");
  let textbox = li.querySelector("li .edit-text");
    if (checkboxEvent === "incomp") {
      checkbox.onchange = moveToIncomp;
        } else if (checkboxEvent === "comp") {
         checkbox.onchange = moveToComp;
        }
  deleteButton.addEventListener("click", remove);
  editButton.addEventListener("click", edit);
};
let remove = function() {
  let listItem = this.parentNode;
    listItem.remove();
};
let edit = function() {
  let listItem = this.parentNode;
  let heading = listItem.querySelector("li .card-header");
  let textbox = listItem.querySelector("li .edit-text");
  let openDia = document.querySelector("#open-dia");
  if (listItem.classList.contains("edit-mode")) {
        if (textbox.value === "") {
          listItem.classList.remove("edit-mode");
          this.innerHTML = "<i class='material-icons'>create</i>";
          showButton();
          return;
  }
    listItem.classList.remove("edit-mode");
		heading.innerText = textbox.value;
    showButton();
    this.innerHTML = "<i class='material-icons'>create</i>";
  } else {
    listItem.classList.add("edit-mode");
    hideButton();
    textbox.focus();
    textbox.value = heading.innerText;
    this.innerHTML = "<i class='material-icons'>save</i>";
  }
};

let moveToComp = function() {
  console.log('Moving to Completed.');
  let listItem = this.parentNode;
  completedItems.append(listItem);
  bindFunction(listItem, "incomp");
};
let moveToIncomp = function() {
  console.log('Moving to Incomplete.');
  let listItem = this.parentNode;
  incompleteItems.append(listItem);
  bindFunction(listItem, "comp");
};

const openDialog = function() {
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
openDia.onclick = openDialog;
closeButton.onclick = openDialog;
Bg.onclick = openDialog;

addButton.addEventListener("click", () => {
  openDialog();
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
    switch (targetElement.className) {
      case "edit":
        edit.call(targetElement);
        break;
      case "delete":
        remove.call(targetElement);
        break;
    }
  })

// for (let i = 0; i < completedItems.children.length; i++) {
//   bindFunction(completedItems.children[i], "incomp");
// };
//
// for (let i = 0; i < incompleteItems.children.length; i++) {
//   bindFunction(incompleteItems.children[i], "comp");
// };
