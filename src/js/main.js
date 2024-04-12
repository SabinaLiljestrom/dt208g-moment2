"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM is fully loaded and parsed');
});
/*funktion skriva ut todo på sidan */
function printTodoDetails(todo) {
    var todoListDiv = document.getElementById("todoList");
    if (todoListDiv) {
        var newTodoDiv = document.createElement("div");
        newTodoDiv.innerHTML = "\n            <p><strong>Att g\u00F6ra:</strong> <span>".concat(todo.task, "</span></p>\n            <p><strong>Prioritet:</strong> <span>").concat(todo.priority, "</span></p>\n            <p><strong>Markera som klar:</strong> <input type=\"checkbox\" ").concat(todo.completed ? 'checked' : '', " disabled></p>\n        ");
        todoListDiv.appendChild(newTodoDiv);
    }
}
var todoForm = document.getElementById("todoForm");
var todos = JSON.parse(localStorage.getItem("todos") || "[]");
todos.forEach(function (todo) {
    printTodoDetails(todo);
});
/*eventlyssnar på lägg till knappen*/
todoForm.addEventListener("submit", function (event) {
    event.preventDefault();
    var taskInput = document.getElementById("task");
    var priorityInput = document.getElementById("priority");
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
