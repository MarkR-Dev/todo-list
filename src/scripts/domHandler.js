import todoList from "./todoList";

const dom = (function() {
    function updateHomeTotal(homeProject) {
        const homeTotal = document.querySelector("#home-total");
        homeTotal.textContent = "";
        homeTotal.textContent = homeProject.todoArray.length;
    }

    function createProjectElement(project) {
        const projectDiv = document.createElement("div");
        projectDiv.classList.add("project");
        projectDiv.setAttribute("data-project-id", `${project.projectID}`);
    
        const projectTitle = document.createElement("h2");
        projectTitle.classList.add("project-title");
        projectTitle.textContent = project.title;
        const projectTotal = document.createElement("span");
        projectTotal.classList.add("project-total");
        projectTotal.textContent = ` (${project.todoArray.length})`;
        projectTitle.appendChild(projectTotal);
        projectDiv.appendChild(projectTitle);
    
        const projectButtonsDiv = document.createElement("div");
        projectButtonsDiv.classList.add("project-buttons");
    
        const editBtn = document.createElement("button");
        editBtn.setAttribute("type", "button");
        editBtn.classList.add("edit");
        editBtn.textContent = "Edit";
        projectButtonsDiv.appendChild(editBtn);
    
        const deleteBtn = document.createElement("button");
        deleteBtn.setAttribute("type", "button");
        deleteBtn.classList.add("delete");
        deleteBtn.textContent = "Delete";
        projectButtonsDiv.appendChild(deleteBtn);
    
        projectDiv.appendChild(projectButtonsDiv);
    
        return projectDiv;
    }

    function updateProjectsContainer(todoListArray) {
        const createdProjectNav = document.querySelector("#created-project-nav");
        createdProjectNav.textContent = "";
    
        todoListArray.forEach((project,index) => {
            if(index === 0) {
                return
            }
            createdProjectNav.appendChild(createProjectElement(project));
        })
    }

    function updateEditProjectForm(project) {
        const editProjectTitle = document.querySelector("#edit-project-title");

        editProjectTitle.value = project.title;
    }

    function updateUI() {
        const todoListArray = todoList.getProjectArray();
        const homeProject = todoListArray[0];

        updateHomeTotal(homeProject);
        updateProjectsContainer(todoListArray);
    }
    return { updateUI, updateEditProjectForm }
})();

export default dom;