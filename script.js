var todoItems = [];

function addTodo() {
    var todoInput = document.getElementsByClassName('todo-input')[0];
    var newTodo = todoInput.value;

    var todoItem = {
        id: generateId(),
        name: newTodo,
        checked: false
    }

    todoItems.push(todoItem);

    renderTodos();
    clearInputs();
}

function generateId() {
    return Math.random().toString(36).substring(2, 15);
}

function toggleTodo() {
    var id = this.parentElement.id;
    var todo = getTodoById(id);

    todo.checked = !todo.checked;

    if(todo.checked) {
        document.getElementById(todo.id).classList.add('done');
    } else {
        document.getElementById(todo.id).classList.remove('done');
    }
}

function deleteTodo() {
    var id = this.parentElement.id;
    var todoAddress = todoItems.indexOf(getTodoById(id));

    todoItems.splice(todo, 1);
    alert('deleted!');
}

function editTodo() {
    var id = this.parentElement.id;
    var todo = getTodoById(id);
    alert('edited!');
}

function getTodoById(id) {
    for(var i = 0; i < todoItems.length; i++) {
        if(id === todoItems[i].id) {
            return todoItems[i];
        }
    }
}

function clearInputs() {
    var todoInput = document.getElementsByClassName('todo-input')[0];
    todoInput.value = '';
}

function renderTodos() {
    var todoListEl = document.getElementsByClassName('todo-list')[0];
    var html = '';

    for(var i = 0; i < todoItems.length; i++) {
        var todoItem = todoItems[i];
        html += `<li class="todo" id="${ todoItem.id }"><input class="checkbox" type="checkbox"> ${ todoItem.name } <button class="delete btn"><i class="fa fa-trash"></i></button></li>`;
    }

    todoListEl.innerHTML = html;

    // add change event
    var checkboxes = document.getElementsByClassName('checkbox');
    for(var i = 0; i < checkboxes.length; i++) {
        checkboxes[i].addEventListener('change', toggleTodo);
    }

    var deleteBoxes = document.getElementsByClassName('delete');
    for(var i = 0; i < deleteBoxes.length; i++) {
        deleteBoxes[i].addEventListener('click', deleteTodo);
    }
}