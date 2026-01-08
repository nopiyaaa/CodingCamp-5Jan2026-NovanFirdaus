const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const dateInput = document.getElementById('date-input');
const todoListBody = document.getElementById('todo-list-body');
const filterInput = document.getElementById('filter-input');
const deleteAllBtn = document.getElementById('delete-all');
const emptyMessage = document.getElementById('empty-message');

todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    if (todoInput.value.trim() === "" || dateInput.value === "") {
        return;
    }

    addTask(todoInput.value, dateInput.value);
    todoForm.reset();
    checkEmpty();
});

function addTask(task, date) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td><input type="checkbox" class="complete-checkbox"></td>
        <td class="task-text">${task}</td>
        <td>${date}</td>
        <td class="status-cell"><span class="status-pending">Pending</span></td>
        <td><button class="delete-task-btn">Delete</button></td>
    `;

    const checkbox = row.querySelector('.complete-checkbox');
    const taskText = row.querySelector('.task-text');
    const statusCell = row.querySelector('.status-cell');

    checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
            taskText.classList.add('completed-task');
            statusCell.innerHTML = '<span class="status-done">Done</span>';
        } else {
            taskText.classList.remove('completed-task');
            statusCell.innerHTML = '<span class="status-pending">Pending</span>';
        }
    });

    row.querySelector('.delete-task-btn').addEventListener('click', () => {
        row.remove();
        checkEmpty();
    });

    todoListBody.appendChild(row);
}

filterInput.addEventListener('keyup', (e) => {
    const term = e.target.value.toLowerCase();
    const tasks = todoListBody.getElementsByTagName('tr');

    Array.from(tasks).forEach(task => {
        const text = task.querySelector('.task-text').textContent.toLowerCase();
        task.style.display = text.indexOf(term) !== -1 ? '' : 'none';
    });
});

deleteAllBtn.addEventListener('click', () => {
    if(confirm("Are you sure you want to delete all tasks?")) {
        todoListBody.innerHTML = "";
        checkEmpty();
    }
});

function checkEmpty() {
    if (todoListBody.children.length === 0) {
        emptyMessage.style.display = 'block';
    } else {
        emptyMessage.style.display = 'none';
    }
}

checkEmpty();