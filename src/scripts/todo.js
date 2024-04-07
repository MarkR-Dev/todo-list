class Todo {
    constructor(title, description, dueDate, priority, note, projectID, isComplete, todoID){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.note = note;
        this.projectID = projectID;
        this.isComplete = isComplete;
        this.todoID = todoID;
    }
}

export default Todo;