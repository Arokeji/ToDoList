let taskInput = document.querySelector(".task__input");
let taskButton = document.querySelector(".task__button");
let listTasks = document.querySelector(".list__tasks");
let listElement = document.querySelector(".list__element");
let deleteButton = document.querySelector("list__delete-button");
let allTasks = [];
let empty = true;

taskButton.addEventListener('click', function (){
    if(empty) {
        listTasks.innerHTML = '';
        empty = false;
    }

    if(taskInput.value != '') {
        addTask(taskInput.value);
    }
    taskInput.value = '';
})

function deleteTask(task, container){
    console.log(allTasks[task]);
    allTasks.splice(task, 1);
    renderList();
}

function addTask(){
    allTasks.push(taskInput.value);
    renderList();
}

function renderList(){
    listTasks.innerHTML = '';

    let elementContainer = createElement("li", "list__element");
    let elementText = createElement("p", "list__text");
    let elementActions = createElement("div", "list__actions");
    let elementEditButton = createElement("button", "list__edit-button");
    let elementEditIcon = createElement("span", "list__edit fa-solid fa-pen-to-square");
    let elementDeleteButton = createElement("button", "list__delete-button");
    let elementDeleteIcon = createElement("span", "list__delete fa-solid fa-trash");
    
    for(let task in allTasks){
        console.log(allTasks[task]);
        elementText.innerText = allTasks[task];
        elementDeleteButton.value = task;
        elementDeleteButton.addEventListener('click', function() {
            deleteTask(task, elementContainer);
        })
        elementActions.appendChild(elementEditButton);
        elementEditButton.appendChild(elementEditIcon);
        elementActions.appendChild(elementDeleteButton);
        elementDeleteButton.appendChild(elementDeleteIcon);
        elementContainer.appendChild(elementText);
        elementContainer.appendChild(elementActions);
        listTasks.appendChild(elementContainer);

        
    }
}

function createElement (elementType, elementClass){
    let item = document.createElement(elementType);
    item.className = elementClass;
    return item;
}
