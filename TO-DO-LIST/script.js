var ul = document.getElementById("box");
var input = document.getElementById("input");

// Load items from local storage but do not display them on page load
document.addEventListener("DOMContentLoaded", function() {
    // Items are loaded but not appended to the DOM
    var tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    console.log("Tasks loaded from local storage:", tasks);
});

function add() {
    var inputValue = input.value.trim();
    if (inputValue !== "") {
        var listItem = createListItem(inputValue);
        ul.append(listItem);
        saveToLocalStorage();
        input.value = ""; 
    }
}

function deleteItem(event) {
    event.target.parentElement.remove();
    saveToLocalStorage();
}

function editItem(event) {
    var listItem = event.target.parentElement;
    var span = listItem.querySelector("span");
    var currentText = span.innerText;
    var input = document.createElement("input");
    input.type = "text";
    input.value = currentText;
    input.className = "edit-input";
    listItem.replaceChild(input, span);
    event.target.innerText = "SAVE";
    event.target.onclick = function() {
        saveItem(event, input);
    };
    input.focus();
}

function saveItem(event, input) {
    var listItem = event.target.parentElement;
    var updatedText = input.value.trim();
    var span = document.createElement("span");
    span.innerText = updatedText;
    listItem.replaceChild(span, input);
    event.target.innerText = "EDIT";
    event.target.onclick = function() {
        editItem(event);
    };
    saveToLocalStorage();
}

// Function to save the current tasks to local storage
function saveToLocalStorage() {
    var tasks = [];
    ul.querySelectorAll("li").forEach(function(listItem) {
        tasks.push(listItem.querySelector("span").innerText);
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Helper function to create a list item
function createListItem(text) {
    var listItem = document.createElement("li");
    listItem.innerHTML = `
        <span>${text}</span>
        <button onclick='editItem(event)'>EDIT</button>
        <button onclick='deleteItem(event)'>DELETE</button>
    `;
    return listItem;
}

