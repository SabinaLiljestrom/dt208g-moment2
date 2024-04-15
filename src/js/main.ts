import { ITodo } from './ITodo';

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM is fully loaded and parsed');
});
//funktion skriva ut todo på sidan
function printTodoDetails(todo: ITodo): void {
    const todoListDiv = document.getElementById("todoList");

    if (todoListDiv) {
        const newTodoDiv = document.createElement("div");
        newTodoDiv.innerHTML = `
        <p><span id="taskSpan" contenteditable="true" data-key="task">${todo.task}</span></p>
        <button id="completedButton" ${todo.completed ? 'style="text-decoration: line-through;"' : ''} ${todo.completed ? 'disabled' : ''}>Markera som klar</button>
        `;
        todoListDiv.appendChild(newTodoDiv);
    }
}
//hämta DOM-element för formulär och todo detaljer
const todoForm = document.getElementById("todoForm") as HTMLFormElement;
let todos: ITodo[] = JSON.parse(localStorage.getItem("todos") || "[]");
// sortera efter prioritet
function displayAllTodos(): void {
  const todoListDiv = document.getElementById("todoList");
    if (todoListDiv) {
        // Rensar befintliga todos från sidan
        todoListDiv.innerHTML = '';
        // SKriver ut sorterad lista
        todos.forEach(todo => {
            printTodoDetails(todo);
        });
    }
  }

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
  todos = todos.sort((a, b) => a.priority - b.priority); // Sorterar todos på sidan
  localStorage.setItem("todos", JSON.stringify(todos));
  displayAllTodos(); // Skriver ut nya sorterade listan 
  taskInput.value = '';
  priorityInput.value = '';
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
displayAllTodos();
// Händelsehanterar när man ändrar info i en kurs så ändras det bara i just den kursen och updaterar local storage
document.body.addEventListener("input", (event) => {
    const target = event.target as HTMLElement;
    if (target && target.getAttribute("contenteditable") === "true") {
        const key = target.getAttribute("data-key");
        const value = target.textContent || "";
        const todoTask = target.closest("div")?.querySelector("#taskSpan")?.textContent;
        if (todoTask) {
            todos = todos.map(todo => {
                if (todo.task === todoTask) {
                    return { ...todo, [key]: value };
                }
                return todo;
            });
            localStorage.setItem("todos", JSON.stringify(todos)); 
        }
    }
});
