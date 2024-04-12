import { ITodo } from './ITodo';

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM is fully loaded and parsed');
});
/*funktion skriva ut todo på sidan */
function printTodoDetails(todo: ITodo): void {
    const todoListDiv = document.getElementById("todoList");

    if (todoListDiv) {
        const newTodoDiv = document.createElement("div");
        newTodoDiv.innerHTML = `
            <p><strong>Att göra:</strong> <span>${todo.task}</span></p>
            <p><strong>Prioritet:</strong> <span>${todo.priority}</span></p>
            <p><strong>Markera som klar:</strong> <input type="checkbox" ${todo.completed ? 'checked' : ''} disabled></p>
        `;
        todoListDiv.appendChild(newTodoDiv);
    }
}

const todoForm = document.getElementById("todoForm") as HTMLFormElement;
let todos: ITodo[] = JSON.parse(localStorage.getItem("todos") || "[]");

todos.forEach(todo => {
    printTodoDetails(todo);
});

/*eventlyssnar på lägg till knappen*/
todoForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const taskInput = document.getElementById("task") as HTMLInputElement;
    const priorityInput = document.getElementById("priority") as HTMLSelectElement;
    
    const newTodo: ITodo = {
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