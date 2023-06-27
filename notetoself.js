window.onload = init;

function init() {
  var button = document.getElementById("add_button");
  button.onclick = createSticky;

  var clearButton = document.getElementById("clear_button");
  clearButton.onclick = clearStorage;

  var stickiesArray = getStickiesArray();

  for (var i = 0; i < localStorage.length; i++) {
    var key = localStorage[i];
    var value = JSON.parse(localStorage[key]);
    addStickyToDOM(key, value);
  }
}


function getStickiesArray() {
  var stickiesArray = localStorage.getItem("stickiesArray");
  if (!stickiesArray) {
    stickiesArray = [];
    localStorage.setItem("stickiesArray", JSON.stringify(stickiesArray));
  } else {
    stickiesArray =JSON.parse(stickiesArray);
  }
  return stickiesArray;
}


function createSticky() {
  var stickiesArray = getStickiesArray();
  var currentDate = new Date();
  var colorSelectObj = document.getElementById("note_color");
  var index = colorSelectObj.selectedIndex;
  var color = colorSelectObj[index].value;
  var key = "sticky_" + currentDate.getTime();
  var value = document.getElementById("note_text").value;
  var stickyObj = {
    "value": value,
    "color": color
  };
  localStorage.setItem(key, JSON.stringify(stickyObj));
  stickiesArray.push(key);
  localStorage.setItem("stickiesArray", JSON.stringify(stickiesArray));
  addStickyToDOM(key, stickyObj);
}

function addStickyToDOM(key, stickyObj) {
  var stickies = document.getElementById("stickies");// a treference to the stickies list
  var sticky = document.createElement("li");// creating a list item for that list
  sticky.setAttribute("id", key);
  sticky.style.backgroundColor = stickyObj.color;
  var span = document.createElement("span");// creating a span item to put into the list item soon
  span.setAttribute("class", "sticky");// set the attributes of the span so that it looks a certain way
  span.innerHTML = stickyObj.value;// sets the text of the span to whatever is in the var 'value'
  sticky.appendChild(span);// attach the created span to the created list item
  stickies.appendChild(sticky);// attaches the created construct to the stickies list
  sticky.onclick = deleteSticky;
}

function deleteSticky(e) {
  var key = e.target.id;
  if (e.target.tagName.toLowerCase() == "span") {
    key = e.target.parentNode.id;
  }
  localStorage.removeItem(key);
  var stickiesArray = getStickiesArray();
  if (stickies) {
    for (var i = 0; i < stickiesArray.length; i++) {
      if (key == stickiesArray[i]) {
        stickiesArray.splice(i, 1);
      }
    }
    localStorage.setItem("stickiesArray", JSON.stringify(stickiesArray));
    removeStickyFromDOM(key);
  }
}

function removeStickyFromDOM(key) {
  var sticky = document.getElementById(key);
  sticky.parentNode.removeChild(sticky);
}

function clearStorage() {
  localStorage.clear();
}

// we could substiute sessionStorage for localStorage so that the browser doesn't store data after the browser closes
