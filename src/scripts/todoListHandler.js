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

    // Home Listener
    homeBtn.addEventListener("click", () => {
        //set home as active project
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
        
        if(event.target.classList.contains("edit")){
            todoList.setSelectedProjectID(projectID);
            const project = todoList.getProject(projectID);
            dom.updateEditProjectForm(project);
            editProjectModal.showModal();
        }
    })

    //---------------------
    document.addEventListener("keydown", event => {
        if(event.key === "Escape"){
            addProjectForm.reset();
            editProjectForm.reset();
        }
    });
    
    const init = () => {
        window.addEventListener("load", () => {
            todoList.remakeTodoList();
            //set active project to home
            dom.updateUI();
        });
        window.addEventListener("beforeunload", () => {
            setLocalStorage(todoList.getProjectArray());
        });
    }

    return { init }
})();

export default todoListHandler;