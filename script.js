const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');

// Load saved todos from localStorage
document.addEventListener('DOMContentLoaded', () => {
  const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
  savedTodos.forEach(addTodo);
});

form.addEventListener('submit', function(e) {
  e.preventDefault();
  if (input.value.trim() !== '') {
    addTodo(input.value);
    saveTodos();
    input.value = '';
  }
});

function addTodo(taskText) {
  const li = document.createElement('li');
  li.textContent = taskText;

  li.addEventListener('click', () => {
    li.classList.toggle('completed');
    saveTodos();
  });

  const delBtn = document.createElement('button');
  delBtn.textContent = 'Delete';
  delBtn.className = 'delete-btn';
  delBtn.addEventListener('click', () => {
    li.remove();
    saveTodos();
  });

  li.appendChild(delBtn);
  list.appendChild(li);
}

function saveTodos() {
  const todos = [];
  document.querySelectorAll('#todo-list li').forEach(li => {
    todos.push({
      text: li.childNodes[0].textContent,
      completed: li.classList.contains('completed')
    });
  });
  localStorage.setItem('todos', JSON.stringify(todos));
}
