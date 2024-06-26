import Project from "./project";
import { v4 as uuidv4 } from "uuid";
import { getLocalStorage } from "./localStorage";

const todoList = (function(){
    const projectArray = getLocalStorage() || [new Project("Home", uuidv4())];
    let selectedProjectID = null;
    let activeProject = null;
    let selectedTodoID = null;
    
    const log = () => {
        console.log(projectArray);
        console.table(projectArray);
    }

    const getProjectArray = () => {
        return projectArray;
    }

    const addProject = (projectData) => {
        const { title } = projectData;
        projectArray.push(new Project(title, uuidv4()));
    }

    const removeProject = (projectID) => {
        const index = projectArray.findIndex(project => {
            return project.projectID === projectID;
        });

        if(index === 0){
            projectArray[0].removeAllTodos();
            return
        }

        if(projectID === activeProject.projectID){
            activeProject = projectArray[0];
        }

        projectArray.splice(index, 1);
    }

    const editProject = (projectID, newProjectData) => {
        const index = projectArray.findIndex(project => {
            return project.projectID === projectID;
        });
        const project = projectArray[index];
        project.title = newProjectData.title;
    }

    const getProject = (projectID) => {
        const index = projectArray.findIndex(project => {
            return project.projectID === projectID;
        });
        return projectArray[index];
    }

    const moveTodoToNewProject = (todo, newProjectID) => {
        const newProjectIndex = projectArray.findIndex(project => {
            return project.projectID === newProjectID;
        });
        const newProject = projectArray[newProjectIndex];
        newProject.addTodo(todo);
    }

    const getSelectedProjectID = () => {
        return selectedProjectID;
    }

    const setSelectedProjectID = (projectID) => {
        selectedProjectID = projectID;
    }

    const getActiveProject = () => {
        return activeProject;
    }

    const setActiveProject = (project) => {
        activeProject = project;
    }

    const getSelectedTodoID = () => {
        return selectedTodoID;
    }

    const setSelectedTodoID = (todoID) => {
        selectedTodoID = todoID;
    }

    const remakeTodoList = () => {
        projectArray.forEach((project, index) => {
            projectArray[index] = new Project(project.title, uuidv4(), project.todoArray);

            projectArray[index].remakeProject();
        })
        activeProject = projectArray[0];
    }

    return { log, getProjectArray, addProject, removeProject, editProject, getProject, moveTodoToNewProject, remakeTodoList, getSelectedProjectID, setSelectedProjectID, getActiveProject, setActiveProject, getSelectedTodoID, setSelectedTodoID }
})();

export default todoList;