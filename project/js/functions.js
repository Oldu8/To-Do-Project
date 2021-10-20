let handleClickOnBlock = (event) => {
    let targetEvent = event.target;
    if (targetEvent.classList.contains('add__btn')){
        createModalWindowForAddNewTask();
    }
    if (targetEvent.classList.contains('save__btn')) {
        createNewTask('New');
        cancelClick();
        setInLocalStorage();
    }
    if (targetEvent.classList.contains('cancel__btn')){
        cancelClick();
    }
    if (targetEvent.classList.contains('remove__btn')){
        createDeleteSymbol();
    }
    if (targetEvent.classList.contains('edit__btn')){
        createEditSymbol();
    }
    if (targetEvent.classList.contains('cross__btn')) {
        const indexOfChosenItem = targetEvent.getAttribute('cross__index')
        removeChosenTaskBlock(indexOfChosenItem);
        setInLocalStorage();
    }
    if (targetEvent.classList.contains('edit__symbol__btn')){
        const indexOfChosenItem = targetEvent.getAttribute('edit__index')
        editChosenTaskBlock(indexOfChosenItem);
    }
    if (targetEvent.classList.contains('save__edit__btn')){
        saveEditionTask();
        cancelClick();
        setInLocalStorage();
    }
}

const createModalWindowForAddNewTask = () => {
    let modalAddWindow = document.createElement('div');
    const hiddenBlockForFunction = document.querySelector('.hidden__block');
    modalAddWindow.innerHTML = `
    <div class="wrapper__window">
        <div class="todos__window">
            <li class="todo__li__window">
                <form class="window__form" name="formWithDataForNewTask">
                    <p class="header__input">Choose name for you task</p>
                    <input name="headline" type="text" class="text__input"></input>
                    <p class="header__input">Choose status for you task</p>
                    <select name="status" class="status__input select__input"> ${selectField('status')}</select>
                    <p class="header__input">Chose priority for you task</p>
                    <select name="priority" class="priority__input select__input"> ${selectField('priority')}</select>
                    <p class="header__input">Chose deadline for you task</p>
                    <input name="ddl" type="date" min="2021-07-20" max="2021-12-31" class="ddl__input"></input>
                </form>
            </li>
            <div class="window__btn">
                <form class="save__form__btn"><input class="save__btn btn__window" type="button" value="Save"></input></form>
                <form class="cancel__form__btn"><input class="cancel__btn btn__window" type="button" value="Cancel"></input></form>
            </div>
        </div>
    </div>`
    modalAddWindow.classList.add('modal__add__window');
    hiddenBlockForFunction.appendChild(modalAddWindow);
}

let cancelClick = () => {
    document.querySelector('.modal__add__window').remove();
}

let selectField = (tagName, prevItem) => {
    let outGoingText = "";
    let arr = [];
    if (tagName === "priority"){
        arr = arrPriority;
    }
    if (tagName === "status") {
        arr = arrStatus;
    }
    arr.forEach((item)=>{
        if (item === prevItem){
            outGoingText += `<option value="${item}" selected>${item}</option>` 
        }
        outGoingText += `<option value="${item}">${item}</option>`
    })
    return outGoingText;
}

const createNewTask = (isNew, index) => {
    const taskToCreate = document.createElement('li');
    const blockForTasks = document.querySelector('.todos');
    fillTaskBlock(taskToCreate, isNew, index);
    taskToCreate.classList.add('todo_li');
    blockForTasks.appendChild(taskToCreate);
}

const fillTaskBlock = (newTaskItem, isNew, index) => {
    let valuesForTask = {};
    if (isNew === 'New') {
        valuesForTask = getValuesFromCreateNewTask();
    }
    if (isNew === "Old"){
        valuesForTask = getValuesFromLS(index);
    }
    newTaskItem.innerHTML = `
    <span class="todo-text">${valuesForTask.article}</span>
    <form class="todo-status-form">
        <span class="todo-status">${valuesForTask.status}</span>
    </form>
    <form class="todo-priority-form">
        <span class="todo-priority">${valuesForTask.priority}</span>
    </form>
    <form class="todo-ddl-form">
        <span class="todo-ddl">${valuesForTask.ddl}</span>
    </form>`
}

const getValuesFromCreateNewTask = () => {
    const formWithDataForNewTask = document.querySelector('.window__form');
    if (!formWithDataForNewTask.headline.value) {
        alert('There is not headline of a task!')
    } 
    if (!formWithDataForNewTask.ddl.value) {
        alert('There is not deadline of a task!')
    } 
    if (formWithDataForNewTask.headline.value.length <= 3 ) {
        alert('There is not enough symbols in headline of a task!')
    } else {
    return {
        article: formWithDataForNewTask.headline.value,
        status: formWithDataForNewTask.status.value,
        priority: formWithDataForNewTask.priority.value,
        ddl: formWithDataForNewTask.ddl.value
    }};
}

const createDeleteSymbol = () => {
    const crossColecction = document.querySelectorAll('.cross__btn');
    if (crossColecction.length !== 0) {
        deleteSymboltoEditOrRemove("remove");
    }
    else {
    const tasksCollection = document.querySelectorAll('.todo_li');
    const crossForRemove = document.createElement('input');
    crossForRemove.classList.add('cross__btn');
    crossForRemove.getAttribute('cross__index');
    tasksCollection.forEach((item, index)=>{
        const copyCrossForRemove = crossForRemove.cloneNode();
        item.appendChild(copyCrossForRemove);
        copyCrossForRemove.setAttribute('cross__index', index);
    })
}}

const removeChosenTaskBlock = (index) => {
    const tasksCollection = document.querySelectorAll('.todo_li');
    tasksCollection[index].remove();
    deleteSymboltoEditOrRemove()
}

const deleteSymboltoEditOrRemove = (action) => {
    if (action === "remove"){
    const crossColecction = document.querySelectorAll('.cross__btn');
    crossColecction.forEach((item)=>{
        item.remove();
    })}
    if (action === "edit"){
    const editSymbolColecction = document.querySelectorAll('.edit__symbol__btn');
    editSymbolColecction.forEach((item)=>{
        item.remove();
    })}
}

const createEditSymbol = () => {
    const editSymbolColecction = document.querySelectorAll('.edit__symbol__btn');
    if (editSymbolColecction.length !== 0) {
        deleteSymboltoEditOrRemove("edit");
    }
    else {
    const tasksCollection = document.querySelectorAll('.todo_li');
    const symbolToEdit = document.createElement('input');
    symbolToEdit.classList.add('edit__symbol__btn');
    symbolToEdit.getAttribute('edit__index');
    tasksCollection.forEach((item, index)=>{
        const copySymbolToEdit = symbolToEdit.cloneNode();
        item.appendChild(copySymbolToEdit);
        copySymbolToEdit.setAttribute('edit__index', index);
    })
}}

const editChosenTaskBlock = (index) =>{
    const chosenTask = document.querySelectorAll('.todo_li')[index];
    createModalWindowForEdition(chosenTask, index);
    deleteSymboltoEditOrRemove()
}

const createModalWindowForEdition = (item, index) =>{
    const hiddenBlockForFunction = document.querySelector('.hidden__block');
    const nameOfTaskToEdit = item.querySelector('.todo-text').innerHTML;
    const statusOfTaskToEdit = item.querySelector('.todo-status').innerHTML;
    const priorityOfTaskToEdit = item.querySelector('.todo-priority').innerHTML;
    const modalEditWindow = document.createElement('div');
    modalEditWindow.innerHTML = `
    <div class="wrapper__window">
        <div class="todos__window">
            <li class="todo__li__window" data-index="${index}">
                <form class="window__form" name="formWithDataForNewTask">
                    <p class="header__input">Choose name for you task</p>
                    <input name="headline" type="text" class="text__input" value="${nameOfTaskToEdit}"></input>
                    <p class="header__input">Choose status for you task</p>
                    <select name="status" class="status__input select__input"> ${selectField('status',statusOfTaskToEdit)}</select>
                    <p class="header__input">Chose priority for you task</p>
                    <select name="priority" class="priority__input select__input"> ${selectField('priority',priorityOfTaskToEdit)}</select>
                    <p class="header__input">Chose deadline for you task</p>
                    <input name="ddl" type="date" min="2021-07-20" max="2021-12-31" class="ddl__input"></input>
                </form>
            </li>
            <div class="window__btn">
                <form class="save__form__btn"><input class="save__edit__btn btn__window" type="button" value="Save"></input></form>
                <form class="cancel__form__btn"><input class="cancel__btn btn__window" type="button" value="Cancel"></input></form>
            </div>
        </div>
    </div>`
    modalEditWindow.classList.add('modal__add__window');
    hiddenBlockForFunction.appendChild(modalEditWindow);
}

const saveEditionTask = () => {
    const indexTaskToSave = document.querySelector('.todo__li__window').getAttribute('data-index');
    const taskToEdit = document.querySelectorAll('.todo_li')[indexTaskToSave];
    fillTaskBlock(taskToEdit, "Old", indexTaskToSave);
}

const getValuesFromTasks =()=> {
    const collectionWithCreatedTasks = document.querySelectorAll('.todo_li');
    let arrWithTasks = [];
    collectionWithCreatedTasks.forEach((item)=>{
        const nameOfTaskToEdit = item.querySelector('.todo-text').innerHTML;
        const statusOfTaskToEdit = item.querySelector('.todo-status').innerHTML;
        const priorityOfTaskToEdit = item.querySelector('.todo-priority').innerHTML;
        const deadlineOfTaskToEdit = item.querySelector('.todo-ddl').innerHTML;
        const task = new Task(nameOfTaskToEdit, statusOfTaskToEdit, priorityOfTaskToEdit, deadlineOfTaskToEdit);
        arrWithTasks.push(task);
    }) 
    return arrWithTasks}

const setInLocalStorage = () => {
    const jsonArrWithTasks = JSON.stringify(getValuesFromTasks());
    localStorage.clear();
    localStorage.setItem("Tasks", jsonArrWithTasks);
}

const createTasksPool =()=> {
    const tasksFromLS = JSON.parse(localStorage.getItem('Tasks'));
    tasksFromLS.forEach((item, index)=>{
        createNewTask("Old", index)
    })
}

const getValuesFromLS =(index)=> {
    const arrWithTasks = JSON.parse(localStorage.getItem('Tasks')); 
    return {
        article: arrWithTasks[index].article,
        status: arrWithTasks[index].status,
        priority: arrWithTasks[index].priority,
        ddl: arrWithTasks[index].ddl
    };
}