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
    var todoEl = this.closest(".todo");
    var todo = getTodoById(todoEl.id);

    todo.checked = !todo.checked;

    if(todo.checked) {
        todoEl.classList.add('done');
    } else {
        todoEl.classList.remove('done');
    }
}

function deleteTodo() {
    var todoEl = this.closest(".todo");
    var todoIndex = getTodoIndex(todoEl.id);
    todoItems.splice(todoIndex, 1);
    
    renderTodos();
}

function openEditMode() {
    var todoEl = this.closest(".todo");
    todoEl.classList.add('edit-mode');
}

function cancelEditMode() {
    var todoEl = this.closest(".todo");
    todoEl.classList.remove('edit-mode');
}

function updateTodo() {
    var todoEl = this.closest(".todo");
    var todoInput = todoEl.querySelector('.edit-todo-input');
    var newName = todoInput.value;
    
    var todo = getTodoById(todoEl.id);
    todo.name = newName;

    todoEl.classList.remove('edit-mode');

    renderTodos();
}

function getTodoHtmlTemplate(todoItem) {
    return `
        <li class="todo" id="${ todoItem.id }">
            <div class="checkbox-field">
                <input class="checkbox" type="checkbox"> ${ todoItem.name } 
                <button class="btn edit"><i class="fa fa-pencil-square-o"></i></button>
                <button class="btn delete"><i class="fa fa-trash"></i></button>
            </div>
            <div class="edit-field">
                <input type="text" placeholder="Edit ${ todoItem.name }" class="edit-todo-input">
                <div class="edit-todo-btn-container">
                    <button class="cancel">Cancel</button>
                    <button class="update" value="submit">Update</button>
                </div>
            </div>
        </li>`;
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

function renderTodos() {
    var todoListEl = document.getElementsByClassName('todo-list')[0];
    var html = '';

    for(var i = 0; i < todoItems.length; i++) {
        var todoItem = todoItems[i];
        html += getTodoHtmlTemplate(todoItem);
    }

    todoListEl.innerHTML = html;

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
        editBoxes[i].addEventListener('click', openEditMode);
    }

    var cancelButtons = document.getElementsByClassName('cancel');
    for(var i = 0; i < cancelButtons.length; i++) {
        cancelButtons[i].addEventListener('click', cancelEditMode);
    }

    var updateButtons = document.getElementsByClassName('update');
    for(var i = 0; i < updateButtons.length; i++) {
        updateButtons[i].addEventListener('click', updateTodo);
    }
}