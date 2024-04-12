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

    document.addEventListener("keydown", event => {
        if(event.key === "Escape"){
            addProjectForm.reset();
            editProjectForm.reset();
            addTodoForm.reset();
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