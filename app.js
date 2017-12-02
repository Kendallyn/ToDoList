'use strict'

var state = {
    tasks: [{
        name: 'Clean',
        checked: false,
    }, {
        name: 'Organize',
        checked: true,
    }]
};

//add task to list
function addTask(state, task) {
    state.tasks.push(task);
    return state.tasks;
}

//check the task
function checkTask(state, taskName) {
    for (var i = 0; i < state.tasks.length; i++) {
        if (state.tasks[i].name === taskName) {
            state.tasks[i].checked = !state.tasks[i].checked;
        }
    }
}

//delete the task
function deleteTask(state, taskName) {
    var tasksArray = state.tasks;
    var index;
    for (var i = 0; i < tasksArray.length; i++) {
        if (tasksArray[i].name === taskName) {
            index = i;
        }
    }
    tasksArray.splice(index, 1);
}
