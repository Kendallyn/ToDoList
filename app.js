'use strict'

var state = {
    tasks: [{
        name: 'Dust',
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

//render the list
function renderList(state) {
    var buildTheHtmlOutput = "";

    $.each(state.tasks, function (taskKey, taskValue) {
        buildTheHtmlOutput += '<li>';
        if (taskValue.checked == false) {
            buildTheHtmlOutput += '<span class="to-do-list-task">' + taskValue.name + '</span>';
        } else {
            buildTheHtmlOutput += '<span class="to-do-list-task-checked">' + taskValue.name + '</span>';
        }
        buildTheHtmlOutput += '<div class="taskControls">';
        buildTheHtmlOutput += '<button class="taskToggle">';
        buildTheHtmlOutput += '<span class="button-label">Check</span>';
        buildTheHtmlOutput += '</button>';
        buildTheHtmlOutput += '<button class="taskDelete">';
        buildTheHtmlOutput += '<span class="button-label">Delete</span>';
        buildTheHtmlOutput += '</button>';
        buildTheHtmlOutput += '</div>';
        buildTheHtmlOutput += '</li>';
    });
    $('.to-Do-List').html(buildTheHtmlOutput);
    $('#to-do-list-entry').val('');
}

$(document).ready(function () {
    renderList(state);

    $("#to-do-list-form").on('submit keypress', function (event) {
        if (event.type === 'submit') {
            event.preventDefault();
            var taskName = $('#to-do-list-entry').val();
            var taskItem = {
                name: taskName,
                checked: false,
            }
            if (taskName) {
                addTask(state, taskItem);
                renderList(state);
            }
        }
    });
});
