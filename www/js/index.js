$(document).ready(function() {
    function ajouterTache() {
        const task = document.getElementById('task');

        if (task.value) {
            const taskList = document.getElementById('taskList');
            const newTask = document.createElement('li');
            newTask.textContent = task.value;
            $(newTask).on("swiperight", function() {
                moveToCompleted(this);
            });
            taskList.appendChild(newTask);
            $(taskList).listview('refresh');
            task.value = '';
            task.focus();
        }
    }

    function reinitialiser() {
        const task = document.getElementById('task');
        const taskList = document.getElementById('taskList');
        const completedTaskList = document.getElementById('completedTaskList');

        taskList.innerHTML = '';
        completedTaskList.innerHTML = '';
        task.value = '';
        task.focus();
    }

    function moveToCompleted(taskItem) {
        const completedTaskList = document.getElementById('completedTaskList');
        $(taskItem).off("swiperight");
        $(taskItem).on("swiperight", function() {
            moveToTaskList(this);
        });
        completedTaskList.appendChild(taskItem);
        $(completedTaskList).listview('refresh');
    }

    function moveToTaskList(taskItem) {
        const taskList = document.getElementById('taskList');
        $(taskItem).off("swiperight");
        $(taskItem).on("swiperight", function() {
            moveToCompleted(this);
        });
        taskList.appendChild(taskItem);
        $(taskList).listview('refresh');
    }

    window.ajouterTache = ajouterTache;
    window.reinitialiser = reinitialiser;

    $('#taskList li').on("swiperight", function() {
        moveToCompleted(this);
    });

    $('#completedTaskList li').on("swiperight", function() {
        moveToTaskList(this);
    });
});
