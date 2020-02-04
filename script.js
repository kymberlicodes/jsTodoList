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
    var todo = getTodoById(id);
    var todoIndex = getTodoIndex(id);
    todoItems.splice(todoIndex, 1);
    
    renderTodos();
    alert(`Deleted ${todo.name}!`);
}

function editTodo() {
    var id = this.parentElement.id;
    var todo = getTodoById(id);
    var todoIndex = getTodoIndex(id);
    // change the todo item to a text box
    // todo.getElementById(id).style.display = none;
    toggleEdit();
    // document.getElementsByClassName('edit-field').style.display = contents;
    // allow user to change the name
    // update the todo name
    // render the list again
    // renderTodos();

    // alert('edited!');
}

function getTodoById(id) {
    for(var i = 0; i < todoItems.length; i++) {
        if(id === todoItems[i].id) {
            return todoItems[i];
        }
    }
}

function getTodoIndex(id) {
    for(var i = 0; i < todoItems.length; i++) {
        if(todoItems[i].id === id) {
            return todoItems.indexOf(todoItems[i]);
        }
    }
}

function clearInputs() {
    var todoInput = document.getElementsByClassName('todo-input')[0];
    todoInput.value = '';
}

function toggleEdit(todoItem) {
    document.getElementsByClassName('checkbox-field').style.display = "none";
    document.getElementsByClassName('edit-field').style.display = "contents";
}

function getTodoHtmlTemplate(todoItem) {
    return `
        <li class="todo" id="${ todoItem.id }">
            <div class="checkbox-field">
                <input class="checkbox" type="checkbox"> ${ todoItem.name } 
                <button class="edit btn"><i class="fa fa-pencil-square-o"></i></button>
                <button class="delete btn"><i class="fa fa-trash"></i></button>
            </div>
            <div class="edit-field">
                <input type="text">
                <button>
                    Cancel
                </button>
                <button>
                    Save
                </button>
            </div>
        </li>`;
}

function renderTodos() {
    var todoListEl = document.getElementsByClassName('todo-list')[0];
    var html = '';

    for(var i = 0; i < todoItems.length; i++) {
        var todoItem = todoItems[i];
        html += getTodoHtmlTemplate(todoItem);
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

    var editBoxes = document.getElementsByClassName('edit');
    for(var i = 0; i < editBoxes.length; i++) {
        editBoxes[i].addEventListener('click', editTodo);
    }
}