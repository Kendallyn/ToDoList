'use strict'

var state = {
    tasks: [{
        name: 'Dust',
        checked: false,
        description: 'Dust all the furniture'
    }, {
        name: 'Organize',
        checked: true,
        description: 'Organize all bedrooms closets'
    }]
};

//add task to list
function addTask(state, task) {
    state.tasks.push(task);
    return state.tasks;
}

//checkoff the task
function checkTask(state, tasksName) {
    for (var i = 0; i < state.tasks.length; i++) {
        if (state.tasks[i].name === tasksName) {
            state.tasks[i].checked = !state.tasks[i].checked;
        }
    }
}

//delete the task
function deleteTask(state, tasksName) {
    var tasksArray = state.tasks;
    var index;
    for (var i = 0; i < tasksArray.length; i++) {
        if (tasksArray[i].name === tasksName) {
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
            buildTheHtmlOutput += '<span class="to-do-list-task">' + taskValue.name + ": " + taskValue.description + '</span>';
        } else {
            buildTheHtmlOutput += '<span class="to-do-list-task to-do-list-task-checked">' + taskValue.name + ": " + taskValue.description + '</span>';
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
            var tasksName = $('#to-do-list-entry').val();
            var taskItem = {
                name: tasksName,
                checked: false,
                description: tasksDescription
            }
            if (tasksName) {
                addTask(state, taskItem);
                renderList(state);
            }
        }
    });
});

//toggle checked or unchecked
$('ul').on('click', 'button.taskToggle', function (event) {
    var tasksName = $(this).closest('li').find('.to-do-list-task').text();
    checkTask(state, tasksName);
    renderList(state);
    console.log('made it');
});

//delete this item from the list
$('ul').on('click', 'button.taskDelete', function (event) {
    var tasksName = $(this).closest('li').find('.to-do-list-task').text();
    deleteTask(state, tasksName);
    renderList(state);
});
