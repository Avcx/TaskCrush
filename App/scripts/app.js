//Collect interactive elements
const addButton       = document.getElementById("add-item");
const completedItems  = document.getElementsByClassName("completed")[0];
const incompleteItems = document.getElementsByClassName("incomplete")[0];
const inputText       = document.getElementById("input-text");
const closeButton     = document.getElementById("close-dialog");
const Bg              = document.getElementById("backdrop");
const openDia         = document.getElementById("open-dia");
const app             = document.querySelector(".app");
const dialog          = document.querySelector(".add-box.card");
const version_number  = 1;
const animationLength = 500;

function toggleButton() {
  slideAnimation.call(openDia, true);
}



const add = function(itemName = undefined, isComplete = false, exists = false) {
  //Create required elements
    itemName = itemName || inputText.value;
  if (itemName === "") {
    toggleDialog();
    return alert("Task name must not be empty!");
  } else if (typeof itemName != "string") {
    toggleDialog();
    return alert("Task name must not be empty!");
  }
  //Create all constded elements
	const editButton   = document.createElement('button');
  const deleteButton = document.createElement('button');
	const newListItem  = document.createElement('li');
  const checkbox     = document.createElement('input');
  const header       = document.createElement("h3");
  const editBox      = document.createElement("input");
  const editIcon     = document.createElement("i");
  const deleteIcon   = document.createElement("i");
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

const removeItem = function() {
  let listItem = this.parentNode;
    listItem.remove();
};
const editItem = function() {
  // Selecting all elements
  const button    = this;
  const listItem  = button.parentNode;
  const heading   = listItem.querySelector(".card-header");
  const textbox   = listItem.querySelector(".edit-text");
  const openDia   = document.querySelector("#open-dia");
  const icon      = button.querySelector("i");
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
// Callback for moving the list items to completedItems
let moveToComp = function() {
  console.log('Moving to Completed.');
  const listItem = this.parentNode;
  completedItems.appendChild(listItem);
};
//Callback for moving the list items to incompleteItems
let moveToIncomp = function() {
  console.log('Moving to Incomplete.');
  const listItem = this.parentNode;
  incompleteItems.appendChild(listItem);
};

// Opens and closes the dialog window
let toggleDialog = function() {
  const openDia = document.getElementById("open-dia");
  if (dialog.classList.contains("open")) {
    toggleButton()
    dialog.classList.remove("open");
    Bg.classList.remove("open");
    Bg.style.pointerEvents = "none";
    setTimeout(() => {
      dialog.style.visibility = "hidden"
    }, animationLength)
  } else {
    toggleButton();
    dialog.classList.add("open");
    dialog.style.visibility = "visible"
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
    console.log('Moving in');
    item.style.transform = "translateX(0px)";
    item.style.pointerEvents = "all";
  }
}

//Functions to set Event Listeners
openDia.onclick = toggleDialog;
closeButton.onclick = toggleDialog;
Bg.onclick = toggleDialog;
addButton.style.pointerEvents = "none";

//This makes sures sure the button cannot
//be clicked when the textbox is empty
inputText.oninput = () => {
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

/*  Automatically sets event listeners based on the items list.
  This means that when an item is moved, its checkbox is assigned
  the appropriate function  */
completedItems.addEventListener("click", (event) => {
  const targetElement = event.target;
    if (targetElement.classList.contains("list-select")) {
        targetElement.onchange = moveToIncomp.call(targetElement);
    }
})
incompleteItems.addEventListener("click", (event) => {
  const targetElement = event.target;
    if (targetElement.classList.contains("list-select")) {
        targetElement.onchange = moveToComp.call(targetElement);
    }
})

/*  Listens for clicks inside list items and maps out
which button was pressed. This lowers the amount of
needed event listeners.  */
app.addEventListener("click", (event) => {
  const targetElement = event.target;
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
//Listens for mouse movement entering list items
  app.addEventListener("mouseover", (event) => {
    const targetElement = event.target;
    const targetParent = targetElement.parentNode;
    if (targetElement.classList.contains("list")) {
      targetElement.classList.add("buttons");
    } else if (targetParent.classList.contains("list")) {
      targetParent.classList.add("buttons");
    }
  })
//Listens for mouse movement leaving list items
  app.addEventListener("mouseout", (event) => {
    const targetElement = event.target;
    const targetParent = targetElement.parentNode;
    if (targetElement.classList.contains("list")) {
      targetElement.classList.remove("buttons");
    } else if (targetParent.classList.contains("list")) {
      targetParent.classList.remove("buttons");
    }
  })
