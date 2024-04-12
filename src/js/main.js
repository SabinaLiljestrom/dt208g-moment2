"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM is fully loaded and parsed');
});
//funktion skriva ut todo på sidan //
function printTodoDetails(todo) {
    var todoListDiv = document.getElementById("todoList");
    if (todoListDiv) {
        var newTodoDiv = document.createElement("div");
        newTodoDiv.innerHTML = "\n        <p><span id=\"taskSpan\" contenteditable=\"true\" data-key=\"task\">".concat(todo.task, "</span></p>\n        <p>Prioritet: <span id=\"prioritySpan\" contenteditable=\"true\" data-key=\"priority\">").concat(todo.priority, "</span></p>\n        <button id=\"completedButton\" ").concat(todo.completed ? 'style="text-decoration: line-through;"' : '', " ").concat(todo.completed ? 'disabled' : '', ">Markera som klar</button>\n        ");
        todoListDiv.appendChild(newTodoDiv);
    }
}
//hämta DOM-element för formulär och todo detaljer
var todoForm = document.getElementById("todoForm");
var todos = JSON.parse(localStorage.getItem("todos") || "[]");
//skriva ut todo detaljer för varje sparade todo från local storage när sidan laddas om
todos.forEach(function (todo) {
    printTodoDetails(todo);
});
//eventlyssnar på lägg till knappen
todoForm.addEventListener("submit", function (event) {
    event.preventDefault();
    //hämta värden som skirvs in i förmuläret
    var taskInput = document.getElementById("task");
    var priorityInput = document.getElementById("priority");
    //skapar todo objekt och sparar i lokal array och localstorage 
    var newTodo = {
        task: taskInput.value,
        priority: parseInt(priorityInput.value),
        completed: false,
    };
    todos.push(newTodo);
    localStorage.setItem("todos", JSON.stringify(todos));
    printTodoDetails(newTodo);
    taskInput.value = ''; // Rensar input efter att man lagt till 
    priorityInput.value = ''; // Rensar prioritet
});
//eventlyssnare klar knapp, texten strycks över när den är gjord
document.addEventListener('click', function (event) {
    var _a;
    if (event.target && event.target.id === 'completedButton') {
        var taskSpan = (_a = event.target.closest('div')) === null || _a === void 0 ? void 0 : _a.querySelector('#taskSpan');
        if (taskSpan) {
            taskSpan.style.textDecoration = 'line-through';
        }
        event.target.disabled = true;
    }
});
