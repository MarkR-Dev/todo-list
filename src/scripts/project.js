import Todo from "./todo";
import { v4 as uuidv4 } from "uuid";

//format the date via datefns when creating/editing todos

class Project {
    constructor(title, projectID, todoArray = []) {
        this.title = title;
        this.projectID = projectID;
        this.todoArray = todoArray;
    }
    
    log(){
        console.log(this);
    }

    addTodo(todoDataObj){
        const { title, description, dueDate, priority, note, isComplete } = todoDataObj;
        const todo = new Todo(title, description, dueDate, priority, note, this.projectID, isComplete, uuidv4());
        this.todoArray.push(todo);
    }

    removeTodo(todoID){
        const index = this.todoArray.findIndex(todo => {
            return todo.todoID === todoID;
        });

        if(index >= 0){
            this.todoArray.splice(index, 1);
        }
    }

    removeAllTodos() {
        this.todoArray.length = 0;
    }

    editTodo(todoID, newTodoData){
        const index = this.todoArray.findIndex(todo => {
            return todo.todoID === todoID
        });
        
        if(index >= 0) {
            const todo = this.todoArray[index];
            todo.title = newTodoData.title;
            todo.description = newTodoData.description;
            todo.dueDate = newTodoData.dueDate;
            todo.priority = newTodoData.priority;
            todo.note = newTodoData.note;
            todo.isComplete = newTodoData.isComplete;
        }
    }

    getTodo(todoID){
        const index = this.todoArray.findIndex(todo => {
            return todo.todoID === todoID;
        });
        
        return this.todoArray[index];
    }

    toggleTodoCompleted(todoID){
        console.log(todoID)
        const index = this.todoArray.findIndex(todo => {
            return todo.todoID === todoID;
        });
        this.todoArray[index].isComplete = !this.todoArray[index].isComplete;
    }

    remakeProject() {
        this.todoArray.forEach((todo, index) => {
            const { title, description, dueDate, priority, note, isComplete } = todo;
            this.todoArray[index] = new Todo(title, description, dueDate, priority, note, this.projectID, isComplete, uuidv4());
        })
    }
}

export default Project;