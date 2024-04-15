"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoList = void 0;
var TodoList = /** @class */ (function () {
    function TodoList(task, priority) {
        this.task = task;
        this.completed = false;
        this.priority = priority;
        this.todos = JSON.parse(localStorage.getItem('todos') || '[]');
    }
    //Metod för att lägga till nya todos med prioritet
    TodoList.prototype.addTodo = function (task, priority) {
        if (task != "" && (priority == 1 || priority == 2 || priority == 3)) {
            var newTodo = {
                task: task,
                priority: priority,
                completed: false
            };
            this.todos.push(newTodo);
            this.saveToLocalStorage();
        }
    };
    //Metod för att markera todos som klara
    TodoList.prototype.markTodoCompleted = function (todoIndex) {
        if (todoIndex >= 0 && todoIndex < this.todos.length) {
            this.todos[todoIndex].completed = true;
            this.saveToLocalStorage();
        }
    };
    //metod för att hämta hela listan med todos
    TodoList.prototype.getTodos = function () {
        return this.todos;
    };
    //metod för att spara todos till localstorage
    TodoList.prototype.saveToLocalStorage = function () {
        localStorage.setItem('todos', JSON.stringify(this.todos));
    };
    //metod för att hämta todos från local storage
    TodoList.prototype.loadFromLocalStorage = function () {
        var savedTodos = localStorage.getItem("todos");
        if (savedTodos)
            this.todos = JSON.parse(savedTodos);
    };
    return TodoList;
}());
exports.TodoList = TodoList;
