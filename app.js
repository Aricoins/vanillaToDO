document.addEventListener("DOMContentLoaded", function() {
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");

    // Array para almacenar las tareas
    let tasks = [];

    // Función para renderizar las tareas en la lista
    function renderTasks() {
        taskList.innerHTML = "";
        tasks.forEach((task, index) => {
            const li = document.createElement("li");
            li.className = "task";
            li.innerHTML = `
                ${task.text}
                <button class="complete-btn" data-index="${index}">Completar</button>
                <button class="delete-btn" data-index="${index}">Eliminar</button>
            `;
            if (task.completed) {
                li.classList.add("completed");
            }
            taskList.appendChild(li);
        });
    }
    
    // Función para agregar una nueva tarea
    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText !== "") {
            tasks.push({
                text: taskText,
                completed: false
            });
            taskInput.value = "";
            renderTasks();
        }
    }

    // Función para marcar una tarea como completada
    function completeTask(index) {
        tasks[index].completed = !tasks[index].completed;
        renderTasks();
    }

    // Función para eliminar una tarea
    function deleteTask(index) {
        tasks.splice(index, 1);
        renderTasks();
    }

    // Event listener para el botón de agregar tarea
    addTaskBtn.addEventListener("click", addTask);

    // Event delegation para marcar como completada o eliminar tareas
    taskList.addEventListener("click", function(event) {
        if (event.target.classList.contains("complete-btn")) {
            const index = event.target.dataset.index;
            completeTask(index);
        }
        if (event.target.classList.contains("delete-btn")) {
            const index = event.target.dataset.index;
            deleteTask(index);
        }
    });

    // Renderizar las tareas iniciales
    renderTasks();
});
