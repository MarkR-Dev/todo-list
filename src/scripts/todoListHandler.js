import todoList from "./todoList";
import { setLocalStorage } from "./localStorage";

const todoListHandler = (function() {
    // Home
    const homeBtn = document.querySelector("#home");

    // Add Project
    const addProjectBtn = document.querySelector("#add-project-btn");
    const addProjectModal = document.querySelector("#add-project-modal");
    const addProjectForm = document.querySelector("#add-project-form");
    const addProjectCancel = document.querySelector("#add-project-cancel");
    
    // Home Listener
    homeBtn.addEventListener("click", () => {
        //set home as active project
        //update dom
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
        //update DOM
    });

    addProjectCancel.addEventListener("click", () => {
        addProjectModal.close();
        addProjectForm.reset();
    });

    document.addEventListener("keydown", event => {
        if(event.key === "Escape"){
            addProjectForm.reset();
        }
    });
    
    const init = () => {
        window.addEventListener("load", () => {
            todoList.remakeTodoList();
            //set active project to home
            //update dom
        });
        window.addEventListener("beforeunload", () => {
            setLocalStorage(todoList.getProjectArray());
        });
    }

    return { init }
})();

export default todoListHandler;