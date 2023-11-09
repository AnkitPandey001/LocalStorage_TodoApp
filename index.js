let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function addTaskToList(task) {
    const li = document.createElement('li');
    li.innerText = task.text;
    li.style.textDecoration = task.completed ? 'line-through' : 'none';

    const chkBox = document.createElement('input');
    chkBox.type = "checkbox";
    chkBox.style.width = "20px";
    chkBox.style.height = "20px";
    chkBox.checked = task.completed;
    chkBox.addEventListener('change', function() {
        task.completed = this.checked;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        li.style.textDecoration = this.checked ? 'line-through' : 'none';
    });

    const btn = document.createElement('button');
    btn.innerText = "X";
    btn.addEventListener('click', function() {
        tasks = tasks.filter(t => t !== task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        li.remove();
    });

    li.append(chkBox, btn);
    document.querySelector('.ul').append(li);
}

tasks.forEach(addTaskToList);

const input = document.querySelector('#txttoDo');
input.addEventListener('keyup', function(e) {
    if (e.key == "Enter") {
        const task = { text: e.target.value, completed: false };
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        addTaskToList(task);
        e.target.value = "";
    }
});