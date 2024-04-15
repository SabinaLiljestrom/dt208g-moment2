import { ITodo } from './ITodo';
export class TodoList {
    task: string; 
    completed: boolean; 
    priority: number; 
    todos: ITodo[];

    constructor(task: string, priority: number) {
        this.task = task;
        this.completed = false;
        this.priority = priority;
        this.todos = JSON.parse(localStorage.getItem('todos') || '[]');
    }
//Metod för att lägga till nya todos med prioritet
    addTodo(task: string, priority: number): void {
        if (task != "" && (priority == 1 || priority == 2 || priority == 3)) {
            const newTodo = {
                task: task,
                priority: priority,
                completed: false
            };
            this.todos.push(newTodo);
            this.saveToLocalStorage();
        }
    }
//Metod för att markera todos som klara
    markTodoCompleted(todoIndex: number): void {
        if (todoIndex >= 0 && todoIndex < this.todos.length) {
            this.todos[todoIndex].completed = true;
            this.saveToLocalStorage();
        }
    }
//metod för att hämta hela listan med todos
    getTodos(): ITodo[] {
        return this.todos;
    }
//metod för att spara todos till localstorage
saveToLocalStorage(): void {
    localStorage.setItem('todos', JSON.stringify(this.todos));
}
//metod för att hämta todos från local storage
    loadFromLocalStorage() {
        const savedTodos = localStorage.getItem("todos");
        if (savedTodos) this.todos = JSON.parse(savedTodos);
    }
}