//  UI vars

const form = document.querySelector("form");
const input = document.querySelector("#txtTaskName");
const btnDeleteAll = document.querySelector("#btnDeleteAll");
const tasklist = document.querySelector("#task-list");
let items;

// load items
loadItems();

// Call event Listeners
eventListeners();

function eventListeners() {
  // submit event
  form.addEventListener("submit", addNewItem);
  // delete an item
  tasklist.addEventListener("click", deleteItem);
  // delete all items
  btnDeleteAll.addEventListener("click", deleteAllItems);
}

//load items

function loadItems() {
  items = getItemsFromLS();
  items.forEach(function (item) {
    createItem(item);
  });
}

// get items from Local Storage
function getItemsFromLS() {
  if (localStorage.getItem("items") === null) {
    items = [];
  } else {
    items = JSON.parse(localStorage.getItem("items"));
  }
  return items;
}

// set item to localStorage
function setItemToLS(text) {
  items = getItemsFromLS();
  items.push(text);
  localStorage.setItem("items", JSON.stringify(items));
}

// delete item form LS
function deleteItemFromLs(text) {
  items = getItemsFromLS();
  items.forEach(function (item, index) {
    if (item === text) {
      items.splice(index, 1);
    }
  });
  localStorage.setItem("items", JSON.stringify(items));
}

function createItem(text) {
  // create li
  const li = document.createElement("li");

  li.className = "list-group-item list-group-item-secondary";
  li.appendChild(document.createTextNode(text));
  //create a
  const a = document.createElement("a");
  a.classList = "delete-item float-right";
  a.setAttribute("href", "#");
  a.innerHTML = '<i class="fas fa-times"></i>';

  // add a to li
  li.appendChild(a);

  // add li to ul

  tasklist.appendChild(li);
}

// add new item
function addNewItem(e) {
  if (input.value === "") {
    alert("add new item");
  }

  //add item
  createItem(input.value);

  // save to LS
  setItemToLS(input.value);

  // clear input

  input.value = "";

  e.preventDefault();
}

// delete an item
function deleteItem(e) {
  if (e.target.className === "fas fa-times") {
    if (confirm("Are You Sure ?")) {
      e.target.parentElement.parentElement.remove();

      // delete item LS
      deleteItemFromLs(e.target.parentElement.parentElement.textContent);
    }
  }

  e.preventDefault(); // scrolbar aşağı yukarı oynamasın tıkladığımızda
}

// delete all items
function deleteAllItems(e) {
  if (confirm("Are You Sure?")) {
    //   tasklist.innerHTML = ""; **1.yöntem
    // tasklist.childNodes.forEach(function (item) { **2.yöntem
    //   if (item.nodeType === 1) {
    //     item.remove();
    //   }
    // });
    while (tasklist.firstChild) {
      tasklist.removeChild(tasklist.firstChild); // ***3.yöntem
    }
    localStorage.clear();
  }

  e.preventDefault();
}
