'use strict'

var state = {
    tasks: [{
        name: 'Dust',
        checked: false
    }, {
        name: 'Organize',
        checked: false
    }]
};

//add task to list
function addTask(state, task) {
    state.tasks.push(task);
    return state.tasks;
}

//checkoff the task function
function checkTask(state, tasksName) {
    for (var i = 0; i < state.tasks.length; i++) {
        if (state.tasks[i].name === tasksName) {
            state.tasks[i].checked = !state.tasks[i].checked;
        }
    }
}

//delete the task function
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
            buildTheHtmlOutput += '<span class="to-do-list-task">' + taskValue.name + '</span>';
        } else {
            buildTheHtmlOutput += '<span class="to-do-list-task to-do-list-task-checked">' + taskValue.name + '</span>';
        }
        buildTheHtmlOutput += '<div class="taskControls">';
        buildTheHtmlOutput += '<button class="taskToggle">';
        buildTheHtmlOutput += '<span class="button-label">Complete</span>';
        buildTheHtmlOutput += '</button>';
        buildTheHtmlOutput += '<button class="taskDelete">';
        buildTheHtmlOutput += '<span class="button-label">Delete</span>';
        buildTheHtmlOutput += '</button>';
        buildTheHtmlOutput += '<button class="taskDetails">';
        buildTheHtmlOutput += '<span class="button-label">Details</span>';
        buildTheHtmlOutput += '</button>';
        buildTheHtmlOutput += '<button class="taskDeadline">';
        buildTheHtmlOutput += '<span class="button-label">Deadline</span>';
        buildTheHtmlOutput += '</button>';
        buildTheHtmlOutput += '</div>';
        buildTheHtmlOutput += '</li>';
    });
    $('.to-Do-List').html(buildTheHtmlOutput);
    //clear out last entry in fields
    $('#to-do-list-entry').val('');
    $('#to-do-list-deadline').val('');
}

$(document).ready(function () {
    renderList(state);

    $("#to-do-list-form").on('submit keypress', function (event) {
        if (event.type === 'submit') {
            event.preventDefault();
            var tasksName = $('#to-do-list-entry').val();
            var taskItem = {
                name: tasksName,
                checked: false
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
});

//delete this item from the list
$('ul').on('click', 'button.taskDelete', function (event) {
    var tasksName = $(this).closest('li').find('.to-do-list-task').text();
    deleteTask(state, tasksName);
    renderList(state);
});

//add details to this item
$('ul').on('click', 'button.taskDetails', function (event) {
    var detailsInput = prompt("Add task details here:");
    $(this).closest('li').append("<li>Details: " + detailsInput + "<button class='showHide'>" + "<span class='button-label'>Show/Hide" + "</button>" + "</li>");
});

//add deadline to this item
$('ul').on('click', 'button.taskDeadline', function (event) {
    var deadlineDate = prompt("Deadline date for task:");
    $(this).closest('li').append("<li>Deadline: " + deadlineDate + "</li>");
});

////show and hide details
//$('button.showHide').click(function () {
//    $('li').toggle();
//});
