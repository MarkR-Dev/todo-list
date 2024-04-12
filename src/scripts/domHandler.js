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

    function updateActiveProjectTitle(activeProject) {
        const projectTitle = document.querySelector("#active-project-title h2");
        projectTitle.textContent = "";
        projectTitle.textContent = activeProject.title;
    }

    function createTodoElement(todo) {
        const todoDiv = document.createElement("div");
        todoDiv.setAttribute("data-todo-id", `${todo.todoID}`);
        todoDiv.classList.add("todo");

        if(todo.priority === "1"){
            todoDiv.classList.add("low");
        }else if(todo.priority === "2"){
            todoDiv.classList.add("medium");
        }else{
            todoDiv.classList.add("high");
        }

        const checkboxDiv = document.createElement("div");
        checkboxDiv.classList.add("checkbox");

        const checkboxInput = document.createElement("input");
        checkboxInput.setAttribute("type", "checkbox");
        checkboxInput.setAttribute("name", "completed");
        checkboxInput.classList.add("checkbox-input");
        checkboxDiv.appendChild(checkboxInput);

        const infoDiv = document.createElement("div");
        infoDiv.classList.add("info");

        if(todo.isComplete){
            infoDiv.classList.add("completed");
            checkboxInput.setAttribute("checked", true);
        }

        const infoTitleDiv = document.createElement("div");
        infoTitleDiv.classList.add("todo-title");
        infoTitleDiv.textContent = todo.title;
        infoDiv.appendChild(infoTitleDiv);

        const infoDescDiv = document.createElement("div");
        infoDescDiv.classList.add("todo-desc");
        infoDescDiv.textContent = todo.description;
        infoDiv.appendChild(infoDescDiv);

        const buttonsDiv = document.createElement("div");
        buttonsDiv.classList.add("todo-buttons");

        const viewBtn = document.createElement("button");
        viewBtn.classList.add("view");
        viewBtn.setAttribute("type", "button");
        viewBtn.textContent = "View";
        buttonsDiv.appendChild(viewBtn);

        const editBtn = document.createElement("button");
        editBtn.classList.add("edit");
        editBtn.setAttribute("type", "button");
        editBtn.textContent = "Edit";
        buttonsDiv.appendChild(editBtn);

        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("delete");
        deleteBtn.setAttribute("type", "button");
        deleteBtn.textContent = "Delete";
        buttonsDiv.appendChild(deleteBtn);

        todoDiv.appendChild(checkboxDiv);
        todoDiv.appendChild(infoDiv);
        todoDiv.appendChild(buttonsDiv);

        return todoDiv
    }

    function updateActiveProject(project) {
        const todoDisplayContainer = document.querySelector("#todo-display");
        todoDisplayContainer.textContent = "";

        project.todoArray.forEach(todo => {
            todoDisplayContainer.appendChild(createTodoElement(todo));
        });
    }

    function createOptionElement(project){
        const option = document.createElement("option");
        option.setAttribute("value", `${project.projectID}`);
        option.textContent = `${project.title}`;
        return option;
    }

    function updateFormProjectSelect(projectArray){
        const addTodoSelectDropdown = document.querySelector("#add-todo-project");
        addTodoSelectDropdown.textContent = "";
        projectArray.forEach(project => {
            addTodoSelectDropdown.appendChild(createOptionElement(project));
        });
    }

    function updateAddTodoForm(){
        const addTodoFormProject = document.querySelector("#add-todo-project");
        const optionsArray = [...addTodoFormProject.options];

        for(let i = 0; i < optionsArray.length; i++){
            if(optionsArray[i].value === todoList.getActiveProject().projectID){
                optionsArray[i].selected = true;
            }
        }
    }

    function updateUI() {
        const todoListArray = todoList.getProjectArray();
        const homeProject = todoListArray[0];
        const activeProject = todoList.getActiveProject();
        
        updateHomeTotal(homeProject);
        updateProjectsContainer(todoListArray);
        updateActiveProjectTitle(activeProject);
        updateActiveProject(activeProject);
    }
    return { updateUI, updateEditProjectForm, updateFormProjectSelect, updateAddTodoForm  }
})();

export default dom;