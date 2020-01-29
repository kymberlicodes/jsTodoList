var todoItems = [];

function addTodo() {
    var todoInput = document.getElementsByClassName('todo-input')[0];
    var newTodo = todoInput.value;

    var todoItem = {
        name: newTodo,
        checked: false,
        id: Date.now
    }

    todoItems.push(todoItem);

    renderTodos();
    clearInputs();
}


function completeTodo() {

}

function deleteTodo() {

}

function editTodo() {
    
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
        html += `<li>${ todoItem.name }</li>`;
    }

    todoListEl.innerHTML = html;
}


// check off todo
// delete todo
// edit todo