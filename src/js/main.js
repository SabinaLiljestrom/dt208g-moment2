"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM is fully loaded and parsed');
});
//funktion skriva ut todo på sidan
function printTodoDetails(todo) {
    var todoListDiv = document.getElementById("todoList");
    if (todoListDiv) {
        var newTodoDiv = document.createElement("div");
        newTodoDiv.innerHTML = "\n        <p><span id=\"taskSpan\" contenteditable=\"true\" data-key=\"task\">".concat(todo.task, "</span></p>\n        <button id=\"completedButton\" ").concat(todo.completed ? 'style="text-decoration: line-through;"' : '', " ").concat(todo.completed ? 'disabled' : '', ">Markera som klar</button>\n        ");
        todoListDiv.appendChild(newTodoDiv);
    }
}
//hämta DOM-element för formulär och todo detaljer
var todoForm = document.getElementById("todoForm");
var todos = JSON.parse(localStorage.getItem("todos") || "[]");
// sortera efter prioritet
function displayAllTodos() {
    var todoListDiv = document.getElementById("todoList");
    if (todoListDiv) {
        // Rensar befintliga todos från sidan
        todoListDiv.innerHTML = '';
        // SKriver ut sorterad lista
        todos.forEach(function (todo) {
            printTodoDetails(todo);
        });
    }
}
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
    todos = todos.sort(function (a, b) { return a.priority - b.priority; }); // Sorterar todos på sidan
    localStorage.setItem("todos", JSON.stringify(todos));
    displayAllTodos(); // Skriver ut nya sorterade listan 
    taskInput.value = '';
    priorityInput.value = '';
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
displayAllTodos();
// Händelsehanterar när man ändrar info i en kurs så ändras det bara i just den kursen och updaterar local storage
document.body.addEventListener("input", function (event) {
    var _a, _b;
    var target = event.target;
    if (target && target.getAttribute("contenteditable") === "true") {
        var key_1 = target.getAttribute("data-key");
        var value_1 = target.textContent || "";
        var todoTask_1 = (_b = (_a = target.closest("div")) === null || _a === void 0 ? void 0 : _a.querySelector("#taskSpan")) === null || _b === void 0 ? void 0 : _b.textContent;
        if (todoTask_1) {
            todos = todos.map(function (todo) {
                var _a;
                if (todo.task === todoTask_1) {
                    return __assign(__assign({}, todo), (_a = {}, _a[key_1] = value_1, _a));
                }
                return todo;
            });
            localStorage.setItem("todos", JSON.stringify(todos));
        }
    }
});
