let taskInput = document.querySelector(".task__input");
let taskButton = document.querySelector(".task__button");
let listTasks = document.querySelector(".list__tasks");
let listElement = document.querySelector(".list__element");
let deleteButton = document.querySelector("list__delete-button");
let allTasks = [];
let editing = false;

for(let i = 0; i < localStorage.length; i++){

    allTasks.push(localStorage.getItem(i));
}

renderList();

taskButton.addEventListener('click', function (){
    if(taskInput.value != '') {
        addTask(taskInput.value);
    }
    taskInput.value = '';
})

function deleteTask(task){
    allTasks.splice(task, 1);
    renderList();
}

function editTask(task){
    editing = true;

    let textParragraph = document.getElementById(task);
    let text = textParragraph.innerText;
    
    textParragraph.parentElement.innerHTML = 
    '<input class="list__input" type="text" placeholder="Editar tarea..." value="' 
    + text + '"><button class="list__submit">CAMBIAR</button>';
    
    let submitEdit = document.querySelector('.list__submit');
    let textEdit = document.querySelector('.list__input');

    submitEdit.addEventListener('click', function() {
        allTasks[task] = textEdit.value;
        submitEdit.parentElement.innerHTML = 'createElement("p", "list__text", task)';
        editing = false;
        renderList();
    })  
}

function addTask(){
    allTasks.push(taskInput.value);
    renderList();
}

function renderList(){
    localStorage.clear();
    if(allTasks.length > 0){
        for(let i = 0; i < allTasks.length; i++) {
            localStorage.setItem(i.toString(), allTasks[i]);
        }
    }

    listTasks.innerHTML = '';

    if (allTasks.length == 0) {
        let elementContainer = createElement("li", "list__element");
        let elementText = createElement("p", "list__text");
        elementText.innerText = 'Tu lista está vacía';
        elementContainer.appendChild(elementText);
        listTasks.appendChild(elementContainer);
    }

    for(let task in allTasks){
        let elementContainer = createElement("li", "list__element");
        let elementText = createElement("p", "list__text", task);
        let elementActions = createElement("div", "list__actions");
        let elementEditButton = createElement("button", "list__edit-button");
        let elementEditIcon = createElement("span", "list__edit fa-solid fa-pen-to-square");
        let elementDeleteButton = createElement("button", "list__delete-button");
        let elementDeleteIcon = createElement("span", "list__delete fa-solid fa-trash");

        elementText.innerText = allTasks[task];

        elementEditButton.addEventListener('click', function() {
            if(!editing){
                editTask(task, elementText);
            } else {
                editing = false;
                renderList();
                editTask(task, elementText);
            }
        })
        
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

function createElement (elementType, elementClass, id){
    let item = document.createElement(elementType);
    item.className = elementClass;
    if(id){
        item.setAttribute('id', id);
    }
    return item;
}
