import todoList from "./todoList";
import { setLocalStorage } from "./localStorage";
import dom from './domHandler';

const todoListHandler = (function() {
    // Home
    const homeBtn = document.querySelector("#home");

    // Add Project
    const addProjectBtn = document.querySelector("#add-project-btn");
    const addProjectModal = document.querySelector("#add-project-modal");
    const addProjectForm = document.querySelector("#add-project-form");
    const addProjectCancel = document.querySelector("#add-project-cancel");

    // Edit Project
    const editProjectModal = document.querySelector("#edit-project-modal");
    const editProjectForm = document.querySelector("#edit-project-form");
    const editProjectCancel = document.querySelector("#edit-project-cancel");

    // Projects Container
    const projectContainer = document.querySelector("#created-project-nav");

    // Add Todo
    const addTodoBtn = document.querySelector("#add-todo");
    const addTodoModal = document.querySelector("#add-todo-modal");
    const addTodoCancel = document.querySelector("#add-todo-cancel");
    const addTodoForm = document.querySelector("#add-todo-form");

    // Sort Project
    const sortByPriority = document.querySelector("#sort-priority");
    const sortByDate = document.querySelector("#sort-date");

    // Remove Project
    const removeProjectBtn = document.querySelector("#remove-project");

    // Todo Display Container
    const todoDisplayContainer = document.querySelector("#todo-display");

    // View Todo
    const viewTodoModal = document.querySelector("#view-todo-modal");
    const viewTodoCancel = document.querySelector("#view-todo-cancel");

    // Edit Todo
    const editTodoModal = document.querySelector("#edit-todo-modal");
    const editTodoCancel = document.querySelector("#edit-todo-cancel");
    const editTodoForm = document.querySelector("#edit-todo-form");

    // Home Listener
    homeBtn.addEventListener("click", () => {
        const homeProject = todoList.getProjectArray()[0];
        todoList.setActiveProject(homeProject);
        dom.updateUI();
    });

    // Add Project Listeners
    addProjectBtn.addEventListener("click", () => {
        addProjectModal.showModal();
    });
    
    addProjectForm.addEventListener("submit", () => {
        const projectData = {
            title: document.querySelector("#add-project-title").value,
        }
        addProjectForm.reset();
        todoList.addProject(projectData);
        dom.updateUI();
    });

    addProjectCancel.addEventListener("click", () => {
        addProjectModal.close();
        addProjectForm.reset();
    });

    // Edit Project Listeners
    editProjectForm.addEventListener("submit", () => {
        const newProjectData = {
            title: document.querySelector("#edit-project-title").value,
        }
        editProjectForm.reset();
        todoList.editProject(todoList.getSelectedProjectID(), newProjectData);
        dom.updateUI();
    });

    editProjectCancel.addEventListener("click", () => {
        editProjectModal.close();
        editProjectForm.reset();
    });

    // Projects Container Listener
    projectContainer.addEventListener("click", (event) => {
        const projectID = event.target.closest(".project").dataset.projectId;
        const project = todoList.getProject(projectID);

        if(event.target.classList.contains("edit")){
            todoList.setSelectedProjectID(projectID);
            dom.updateEditProjectForm(project);
            editProjectModal.showModal();
        }else if(event.target.classList.contains("delete")){
            todoList.removeProject(projectID);
            dom.updateUI();
        }else if(event.target.closest(".project")){
            todoList.setActiveProject(project);
            dom.updateUI();
        }
    });

    // Add Todo Listeners
    addTodoBtn.addEventListener("click", () => {
        dom.updateFormProjectSelect(todoList.getProjectArray());
        dom.updateAddTodoForm();
        addTodoModal.showModal();
    });

    addTodoCancel.addEventListener("click", () => {
        addTodoModal.close();
        addTodoForm.reset();
    });

    addTodoForm.addEventListener("submit", () => {
        const projectID = document.querySelector("#add-todo-project").value;
        const todoData = {
            title: document.querySelector("#add-todo-title").value,
            description: document.querySelector("#add-todo-description").value,
            dueDate: document.querySelector("#add-todo-due").value,
            priority: document.querySelector("#add-todo-priority").value,
            note: document.querySelector("#add-todo-note").value,
            isComplete: document.querySelector("#add-todo-completed").checked,
        }
        const project = todoList.getProject(projectID);
        project.addTodo(todoData);
        addTodoForm.reset();
        dom.updateUI();
    });

    // Sorting Listeners
    sortByPriority.addEventListener("click", () => {
        const project = todoList.getActiveProject();
        project.sortByPriority();
        dom.updateUI();
    });

    sortByDate.addEventListener("click", () => {
        const project = todoList.getActiveProject();
        project.sortByDate();
        dom.updateUI();
    });

    // Remove Project Listener
    removeProjectBtn.addEventListener("click", () => {
        const activeProject = todoList.getActiveProject();
        todoList.removeProject(activeProject.projectID);
        dom.updateUI();
    })

    // Todo Display Container
    todoDisplayContainer.addEventListener("click", (event) => {
        if(event.target.id === "todo-display"){
            return
        }

        const todoID = event.target.closest(".todo").dataset.todoId; 
        const project = todoList.getActiveProject();
       
        if(event.target.classList.contains("view")){
            dom.updateViewTodo(project.getTodo(todoID));
            viewTodoModal.showModal();
        }else if(event.target.classList.contains("edit")){
            todoList.setSelectedTodoID(todoID);
            dom.updateFormProjectSelect(todoList.getProjectArray());
            dom.updateEditTodoForm(project.getTodo(todoID));
            editTodoModal.showModal();
        }else if(event.target.classList.contains("delete")){
            project.removeTodo(todoID);
            dom.updateUI();
        }else if(event.target.classList.contains("checkbox-input")){
            event.target.parentElement.nextSibling.classList.toggle("completed");
            project.toggleTodoCompleted(todoID);
        }
    });

    // View Todo Listener
    viewTodoCancel.addEventListener("click", () => {
        viewTodoModal.close();
    });

    // Edit Todo Listeners
    editTodoCancel.addEventListener("click", () => {
        editTodoModal.close();
        editTodoForm.reset();
    });

    editTodoForm.addEventListener("submit", () => {
        const todoID = todoList.getSelectedTodoID();
        const project = todoList.getActiveProject();
        const newTodoData = {
            title: document.querySelector("#edit-todo-title").value,
            description: document.querySelector("#edit-todo-description").value,
            dueDate: document.querySelector("#edit-todo-due").value,
            priority: document.querySelector("#edit-todo-priority").value,
            note: document.querySelector("#edit-todo-note").value,
            isComplete: document.querySelector("#edit-todo-completed").checked,
            projectID: document.querySelector("#edit-todo-project").value,
        }
        
        if(newTodoData.projectID !== project.projectID){
            project.removeTodo(todoID);
            todoList.moveTodoToNewProject(newTodoData, newTodoData.projectID);
        }else{
            project.editTodo(todoID, newTodoData);
        }

        dom.updateUI();
    });

    document.addEventListener("keydown", event => {
        if(event.key === "Escape"){
            addProjectForm.reset();
            editProjectForm.reset();
            addTodoForm.reset();
            editTodoForm.reset();
        }
    });
    
    const init = () => {
        window.addEventListener("load", () => {
            todoList.remakeTodoList();
            const homeProject = todoList.getProjectArray()[0];
            todoList.setActiveProject(homeProject);
            dom.updateUI();
        });

        window.addEventListener("beforeunload", () => {
            setLocalStorage(todoList.getProjectArray());
        });
    }

    return { init }
})();

export default todoListHandler;