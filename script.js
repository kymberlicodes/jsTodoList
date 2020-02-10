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
    var id = this.parentElement.parentElement.id;
    var todo = getTodoById(id);

    todo.checked = !todo.checked;

    if(todo.checked) {
        document.getElementById(todo.id).classList.add('done');
    } else {
        document.getElementById(todo.id).classList.remove('done');
    }
}

function deleteTodo() {
    var id = this.parentElement.parentElement.id;
    var todo = getTodoById(id);
    var todoIndex = getTodoIndex(id);
    todoItems.splice(todoIndex, 1);
    
    renderTodos();
    alert(`Deleted ${todo.name}!`);
}

function editTodo() {
    var id = this.parentElement.parentElement.id;
    var todo = getTodoById(id);
    var inEditMode = true;
    var previousTodoName = todo.name;
    var checkbox = document.getElementById(todo.id).getElementsByClassName("checkbox-field");
    var editField = document.getElementById(todo.id).getElementsByClassName("edit-field");
    var hide = 'none';
    var show = 'block';
    
    if(inEditMode) {
        checkbox[0].style.display = hide;
        editField[0].style.display = show;
    } else {
        checkbox[0].style.display = show;
        editField[0].style.display = hide;
    }

    // renderTodos();
    
    alert('edited!');
}

function modifyTodoText(todo, text) {
    var id = this.parentElement.parentElement.id;
    var todo = getTodoById(id);
    var previousTodoName = todo.name;
    var updatedTodoName = document.getElementById(id).getElementsByClassName("edit-todo-input")[0].value;

    if(document.getElementById(id).getElementsByClassName("update")[0].onclick) {
        modifyTodoText(todo.name, updatedTodoName);
    } else if (document.getElementById(id).getElementsByClassName("cancel")[0].onclick) {
        modifyTodoText(todo.name, previousTodoName);
    }
}

function getTodoHtmlTemplate(todoItem) {
    return `
        <li class="todo" id="${ todoItem.id }">
            <div class="checkbox-field">
                <input class="checkbox" type="checkbox"> ${ todoItem.name } 
                <button class="btn edit"><i class="fa fa-pencil-square-o"></i></button>
                <button class="btn delete"><i class="fa fa-trash"></i></button>
            </div>
            <div class="hide edit-field">
                <input type="text" placeholder="Edit ${todoItem.name}" class="edit-todo-input">
                <div class="edit-todo-btn-container">
                    <button class="cancel" onClick="modifyTodoText()">
                        Cancel
                    </button>
                    <button class="update" value="submit" onClick="modifyTodoText()">
                        Update
                    </button>
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