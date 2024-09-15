document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("taskInput");
    const addBtn = document.getElementById("addBtn");
    const taskList = document.getElementById("taskList");
    const clearBtn = document.getElementById("clearBtn");
    const noTasksMessage = document.getElementById("noTasksMessage");

    function updateNoTasksMessage() {
        if (taskList.children.length === 0) {
            noTasksMessage.style.display = "block";
            clearBtn.disabled = true;
        } else {
            noTasksMessage.style.display = "none";
            clearBtn.disabled = false;
        }
    }

    function saveTasks() {
        const tasks = [];
        taskList.querySelectorAll('.listItem').forEach(item => {
            tasks.push({
                text: item.textContent,
                completed: item.querySelector('input[type="checkbox"]').checked
            });
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.forEach(task => {
            const listItem = document.createElement('p');
            listItem.className = 'listItem';
            listItem.textContent = task.text;
            const checkbox = document.createElement('input');
            checkbox.setAttribute('type', 'checkbox');
            checkbox.checked = task.completed;
            listItem.appendChild(checkbox);
            taskList.appendChild(listItem);
        });
        updateNoTasksMessage();
    }

    addBtn.addEventListener("click", function () {
        const taskText = taskInput.value.trim();
        if (taskText !== "") {
            const listItem = document.createElement("p");
            listItem.className = 'listItem';
            listItem.textContent = taskText;

            const checkbox = document.createElement('input');
            checkbox.setAttribute('type', 'checkbox');
            listItem.appendChild(checkbox);

            taskList.appendChild(listItem);
            taskInput.value = "";

            saveTasks();
            updateNoTasksMessage();
        }
    });

    clearBtn.addEventListener("click", function () {
        taskList.innerHTML = "";
        localStorage.setItem("tasks", JSON.stringify([]));
        saveTasks();
        updateNoTasksMessage();
    });

    taskList.addEventListener('change', saveTasks);

    loadTasks();
    updateNoTasksMessage();
});