import '../css/reset.css';
import '../css/style.css';

// import { format, compareAsc } from 'date-fns';

import todoList from './todoList';
import { setLocalStorage } from './localStorage';

const testTodo = {
    title: "Test",
    description: "Test",
    dueDate: "Test",
    priority: "Test",
    note: "Test", 
    isComplete: false
}
const testTodo2 = {
    title: "ed",
    description: "ed",
    dueDate: "ed",
    priority: "ed",
    note: "ed", 
    isComplete: false
}

const testProject = {
    title: "Test",
}

//move to todolist handler eventually
window.addEventListener("load", () => {
    todoList.remakeTodoList();
});
window.addEventListener("beforeunload", () => {
    setLocalStorage(todoList.getProjectArray());
});


