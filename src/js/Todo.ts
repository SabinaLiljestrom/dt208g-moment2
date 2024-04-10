import { ITodo } from './ITodo';

export class TodoList implements ITodo {
    task: string; 
    completed: boolean; 
    priority: number; 

    constructor(task: string, priority: number) {
        this.task = task;
        this.completed = false;
        this.priority = priority;
    }

todos: []; //array av alla todo-objekt

/*Metod för att lägga till nya todos med prioritet */
addTodo (task: string, priority: number): boolean {
    if (task != "" && (priority ==1 || priority ==2 || priority==3 )) {
        return true;
    } else {
    return false;
}}
/*Metod för att markera todods som klara*/

/*metod för att hämta hela listan med todos*/

/*metod för att spara todos till localstorage*/

/*metod för att hämta todos från local storage*/
}