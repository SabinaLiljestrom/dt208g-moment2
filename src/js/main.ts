import { ITodo } from './ITodo';

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM is fully loaded and parsed');
});
//funktion skriva ut todo på sidan //
function printTodoDetails(todo: ITodo): void {
    const todoListDiv = document.getElementById("todoList");

    if (todoListDiv) {
        const newTodoDiv = document.createElement("div");
        newTodoDiv.innerHTML = `
        <p><span id="taskSpan" contenteditable="true" data-key="task">${todo.task}</span></p>
        <p>Prioritet: <span id="prioritySpan" contenteditable="true" data-key="priority">${todo.priority}</span></p>
        <button id="completedButton" ${todo.completed ? 'style="text-decoration: line-through;"' : ''} ${todo.completed ? 'disabled' : ''}>Markera som klar</button>
        `;
        todoListDiv.appendChild(newTodoDiv);
    }
}
//hämta DOM-element för formulär och todo detaljer
const todoForm = document.getElementById("todoForm") as HTMLFormElement;
let todos: ITodo[] = JSON.parse(localStorage.getItem("todos") || "[]");
//skriva ut todo detaljer för varje sparade todo från local storage när sidan laddas om
todos.forEach(todo => {
    printTodoDetails(todo);
});

//eventlyssnar på lägg till knappen
todoForm.addEventListener("submit", (event) => {
    event.preventDefault();
//hämta värden som skirvs in i förmuläret
    const taskInput = document.getElementById("task") as HTMLInputElement;
    const priorityInput = document.getElementById("priority") as HTMLSelectElement;
    //skapar todo objekt och sparar i lokal array och localstorage 
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
//eventlyssnare klar knapp, texten strycks över när den är gjord
document.addEventListener('click', (event) => {
    if (event.target && (event.target as HTMLElement).id === 'completedButton') {
        const taskSpan = (event.target as HTMLElement).closest('div')?.querySelector('#taskSpan') as HTMLElement;
        if (taskSpan) {
            taskSpan.style.textDecoration = 'line-through';
        }
        (event.target as HTMLButtonElement).disabled = true;
    }
});