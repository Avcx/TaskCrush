//Collect interactive elements
const addButton       = document.getElementById("add-item");
const completedItems  = document.getElementsByClassName("completed")[0];
const incompleteItems = document.getElementsByClassName("incomplete")[0];
const inputText       = document.getElementById("input-text");
const closeButton     = document.getElementById("close-dia");
const Bg              = document.getElementById("backdrop");
const openDia         = document.getElementById("open-dia");
const app             = document.querySelector(".app");
const dialog          = document.querySelector(".add-box.card");
const version_number  = 1;
const animationLength = 500;

function toggleButton() {
  slideAnimation.call(openDia, true);
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
  if (exists === false) {
    newListItem.style.pointerEvents = "none";
    newListItem.style.transition = `transform ${animationLength / 1000}s`;
    newListItem.style.transform = "translateX(-110vw)";
  }
  if (isComplete == "true") {
    completedItems.appendChild(newListItem);
    checkbox.checked = "checked";
  } else {
    incompleteItems.appendChild(newListItem);
  }
  inputText.value = "";
  setTimeout(() => {
    newListItem.style.transform = "translateX(0)";
    newListItem.style.pointerEvents = "all";
  }, animationLength)
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
          toggleButton();
          return;
  }
    listItem.classList.remove("edit-mode");
		heading.textContent = textbox.value;
    toggleButton();
    icon.textContent = "create";
  } else {
    listItem.classList.add("edit-mode");
    toggleButton();
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
  let openDia = document.getElementById("open-dia");
  if (dialog.classList.contains("open")) {
    toggleButton()
    dialog.classList.remove("open");
    Bg.classList.remove("open");
    Bg.style.pointerEvents = "none";
  } else {
    toggleButton();
    dialog.classList.add("open");
    Bg.style.visibility = "visible";
    Bg.classList.add("open");
    Bg.style.pointerEvents = "all";
    setTimeout( () => {
      inputText.focus();
    }, animationLength);
  }
};

let slideAnimation = function(isParent = false) {
  let item;

  if (isParent) {
    item = this;
  } else {
    item = this.parentNode;
  }
  if (!item.style.transform) {
    item.style.transform = "translateX(0px)";
    item.style.transition = `transform ${animationLength / 1000}s`
  }

  if (item.style.transform === "translateX(0px)") {
    console.log('Moving out');
    item.style.pointerEvents = "none";
    item.style.transform = "translateX(110vw)";
  } else {
    console.log('Moving back');
    item.style.transform = "translateX(0px)";
    item.style.pointerEvents = "all";
  }
}

//Functions to set Event Listeners
openDia.onclick = toggleDialog;
closeButton.onclick = toggleDialog;
Bg.onclick = toggleDialog;
addButton.style.pointerEvents = "none";
inputText.onchange = () => {
  if (inputText.value === "") {
    addButton.style.pointerEvents = "none";
  } else {
    addButton.style.pointerEvents = "all";
  }
}

addButton.addEventListener("click", () => {
  toggleDialog();
  setTimeout(add, animationLength);
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
  let listItem = targetElement.parentNode;
  console.log(listItem);
  // console.log(targetElement);
    switch (targetElement.className) {
      case "edit":
        editItem.call(targetElement);
        break;
      case "delete":
        slideAnimation.call(targetElement);
        setTimeout(() => {
          removeItem.call(targetElement);
        }, animationLength);
        break;
    }
  })
