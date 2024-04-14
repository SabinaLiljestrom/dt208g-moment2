"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoList = void 0;
/*Implementerar det skapade interfacet*/
var TodoList = /** @class */ (function () {
    /*constructor som initierar todos-array och laddar från local storage*/
    function TodoList(task, priority) {
        this.task = task;
        this.completed = false;
        this.priority = priority;
        this.todos = JSON.parse(localStorage.getItem('todos') || '[]');
    }
    TodoList.prototype.validateInput = function (task, priority) {
        if (task.trim() === "" || !(priority === 1 || priority === 2 || priority === 3)) {
            return false;
        }
        return true;
    };
    /*Metod för att lägga till nya todos med prioritet */
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
    /*Metod för att markera todods som klara*/
    TodoList.prototype.markTodoCompleted = function (todoIndex) {
        if (todoIndex >= 0 && todoIndex < this.todos.length) {
            this.todos[todoIndex].completed = true;
            this.saveToLocalStorage();
        }
    };
    /*metod för att hämta hela listan med todos*/
    TodoList.prototype.getTodos = function () {
        return this.todos;
    };
    /*metod för att spara todos till localstorage*/
    TodoList.prototype.saveToLocalStorage = function () {
        localStorage.setItem('todos', JSON.stringify(this.todos));
    };
    /*metod för att hämta todos från local storage */
    TodoList.prototype.loadFromLocalStorage = function () {
        var savedToDos = localStorage.getItem("todos");
        if (savedToDos)
            this.todos = JSON.parse(savedToDos);
    };
    return TodoList;
}());
exports.TodoList = TodoList;
