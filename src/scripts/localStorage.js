function getLocalStorage() {
    return JSON.parse(localStorage.getItem("todoList"));
}

function setLocalStorage(todoListArr) {
    localStorage.setItem("todoList", JSON.stringify(todoListArr));
}

export { getLocalStorage, setLocalStorage }
