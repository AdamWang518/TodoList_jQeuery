function favorite(index) {
    let star = $(`#star_${index}`);
    let todo = $(`#todo-item-top_${index}`);

    if (star.hasClass("todo-edit-star")) {
        star.removeClass("todo-edit-star");
        star.addClass("todo-switch-star")
        todo.removeClass("todo-item-top");
        todo.addClass("todo-item-top-switch");
    }
    else {
        star.removeClass("todo-switch-star");
        star.addClass("todo-edit-star")
        todo.removeClass("todo-item-top-switch");
        todo.addClass("todo-item-top");
    }
    console.log('favorite');
    upDate(index);

}
function check() {
    let time = $('#date_0');
    console.log(time.value);
}
function fold(editID, itemBottomID) {
    let edit = $("#" + editID);
    let item = $("#" + itemBottomID);

    if (edit.hasClass("todo-edit-text")) {

        edit.removeClass("todo-edit-text");
        edit.addClass("todo-switch-text");
        item.removeClass("todo-item-bottom");
        item.addClass("todo-switch-bottom");

    }
    else {
        edit.removeClass("todo-switch-text");
        edit.addClass("todo-edit-text")
        item.removeClass("todo-switch-bottom");
        item.addClass("todo-item-bottom");

    }

}
function editText(type, textID, inputID) {
    let todoText = $("#" + textID);
    let todoTextInput = $("#" + inputID);
    if (type == "click") {
        todoTextInput.val(todoText.text());
        console.log("click");
        todoText.addClass("todo-text-switch");
        todoText.removeClass("todo-text");
        todoTextInput.value = todoText.innerText;
        todoTextInput.addClass("todo-text-input");
        todoTextInput.removeClass("todo-text-input-switch");
        todoTextInput.focus();
    }
    else if (type == "blur") {
        todoText.val(todoTextInput.text());
        console.log("blur");
        todoText.removeClass("todo-text-switch");
        todoText.addClass("todo-text");
        todoText.innerText = todoTextInput.value;
        todoTextInput.removeClass("todo-text-input");
        todoTextInput.addClass("todo-text-input-switch");
    }
}
function guid() {
    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}

function save(index) {
    store(index)
    destroy()
}
function store(index) {
    let todo_text = $(`#todo-input`);
    let date = $(`#date_${index}`);
    let time = $(`#time_${index}`);
    let comment = $(`#comment_${index}`);
    $.ajax({
        url: 'http://localhost:63320/setTodoList',
        method: 'post',
        dataType: 'json',

        data: { 'text': todo_text.val(), 'date': date.val(), 'time': time.val(), 'comment': comment.val() },

        success: function (res) { create() },
        error: function (err) { console.log(err) },
    });
}
function test() {
    $.ajax({
        url: 'http://localhost:63320/getTodoList',
        method: 'get',
        dataType: 'json',

        success: function (res) { console.log(res) },
        error: function (err) { console.log(err) },
    });
}
function upDate(index) {

    let todo_check = $(`#todo-check_${index}`);
    let todo_text = $(`#todo-text_${index}`);
    let date = $(`#date_${index}`);
    let time = $(`#time_${index}`);
    let comment = $(`#comment_${index}`);
    let mark = $(`#star_${index}`);
    let todo_mark;
    if (mark.hasClass("todo-edit-star")) {
        todo_mark = false;
    }
    else {
        todo_mark = true;
    }
    console.log(todo_mark);
    $.ajax({
        url: 'http://localhost:63320/updateTodoList',
        method: 'post',
        dataType: 'json',
        data: { 'text': todo_text.text(), 'date': date.val(), 'time': time.val(), 'comment': comment.val(), 'id': index, 'isComplete': todo_check.val(), 'isMarked': todo_mark },

        success: function (res) {
            destroy();
            create();
        },
        error: function (err) { console.log(err) },
    });

}
function edit(index) {
    let todo_check = $(`#todo-check_${index}`);
    let todo_text = $(`#todo-text_${index}`);
    let date = $(`#date_${index}`);
    let time = $(`#time_${index}`);
    let comment = $(`#comment_${index}`);
    let mark = $(`#star_${index}`);
    let todo_mark;
    let item_bottom=$(`item-bottom_${index}`)
    if (mark.hasClass("todo-edit-star")) {
        todo_mark = true;
    }
    else {
        todo_mark = false;
    }
    $.ajax({
        url: 'http://localhost:63320/updateTodoList',
        method: 'post',
        dataType: 'json',
        data: { 'text': todo_text.text(), 'date': date.val(), 'time': time.val(), 'comment': comment.val(), 'id': index, 'isComplete': todo_check.val(), 'isMarked': todo_mark },

        success: function (res) { console.log(res) 
            item_bottom.addClass('todo-switch-bottom');
            item_bottom.removeClass('todo-item-bottom');
        },
        error: function (err) { console.log(err) },
    });

}
function cancel(index) {
    $.ajax({
        url: `http://localhost:63320/deleteTodoList?id=${index}`,
        method: 'get',
        dataType: 'json',

        success: function (res) { item_delete(index); },
        error: function (err) { console.log(err) },
    });
}
function item_delete(index) {
    let item = $(`#todo-item-container_${index}`).remove();
}
function restore(value) {
    index = value.id;
    let todo_calendar = $(`#todo-calendar_${index}`);
    let todo_comment = $(`#todo-comment_${index}`);
    let todo_file = $(`#todo-file_${index}`);


    let todo_check = $(`#todo-check_${index}`);
    let todo_text = $(`#todo-text_${index}`);
    let todo_text_input = $(`#todo-text-input_${index}`);
    let date = $(`#date_${index}`);
    let time = $(`#time_${index}`);
    let comment = $(`#comment_${index}`);
    todo_check.prop('checked', value.isComplete);
    todo_text.text(value.text);
    todo_text_input.text(value.text);
    date.val(value.date);
    time.val(value.time);
    comment.text(value.comment);
    let commentValue = value.comment.replace(' ', '');
    if (commentValue == '') {
        todo_comment.removeClass("todo-comment");
        todo_comment.addClass("todo-icon-hide");
        console.log(value.comment);
    }
    if (value.file == undefined || value.file == '') {
        todo_file.removeClass("todo-file");
        todo_file.addClass("todo-icon-hide");
    }
    if (value.time == undefined || value.date == undefined || value.time == '' || value.date == '') {
        todo_calendar.removeClass("todo-calendar");
        todo_calendar.addClass("todo-icon-hide");
    }
}
function expand() {
    let bottom = $('#item-bottom_0');
    let input=$('#todo-input');
    if (bottom.hasClass('todo-switch-bottom')) {
        bottom.addClass('todo-item-bottom');
        bottom.removeClass('todo-switch-bottom');
        
        input.addClass('todo-switch-input');
        input.removeClass('todo-input');
    }
    else {
        bottom.removeClass('todo-item-bottom')
        bottom.addClass('todo-switch-bottom')
        input.addClass('todo-input');
        input.removeClass('todo-switch-input');
    }

}

function insert(value) {
    
    index = value.id;
    let item = $('#todo-container');
    if (value.isMarked == false) {
        item[0].insertAdjacentHTML('beforeend',
            `
    <div class="todo-item-container" id="todo-item-container_${index}">
        <div class="todo-item-top" id="todo-item-top_${index}">
            <div class="todo-edit">
                <input class="todo-check" type="checkbox" id="todo-check_${index}" onchange="upDate('${index}')">
                <div class="todo-text" id="todo-text_${index}" onclick="editText('click','todo-text_${index}','todo-text-input_${index}')" >Type Something Here…</div>
                <input class="todo-text-input-switch" id="todo-text-input_${index}" type="text" onblur="editText('blur','todo-text_${index}','todo-text-input_${index}')">
                <div class="todo-star-container">
                    <i class="fa-solid fa-star todo-edit-star" onclick="favorite('${index}')" id="star_${index}"></i>
                    <i class="fa-solid fa-pen todo-switch-text" onclick="fold('edit_${index}','item-bottom_${index}')" id="edit_${index}"></i>
                </div>


            </div>
            <!-- <i class="fa-thin fa-star todo-star"></i>
            <i class="fa-thin fa-pen"></i> -->
            <div class="todo-tag">
                <i class="fa-solid fa-calendar-days todo-calendar" id="todo-calendar_${index}"></i>
                <i class="fa-solid fa-comment-dots todo-comment" id="todo-comment_${index}"></i>
                <i class="fa-solid fa-file todo-file" id="todo-file_${index}"></i>
            </div>


        </div>
        <div class="todo-switch-bottom" id="item-bottom_${index}">
            <div class="todo-editer">
                <div class="Deadline">
                    <i class="fa-solid fa-calendar-days"></i>
                    <div style="display: inline-block;">Deadline</div>
                    <br>
                    <input class="date" type="date" id="date_${index}">
                    <input class="time" type="time" id="time_${index}">
                </div>
                <div class="File">
                    <i class="fa-solid fa-file"></i>
                    File
                    <br>
                    <input type="file" id="file">
                    <!-- <textarea class="comment-input"type="text"> -->
                </div>
                <div class="Comment">
                    <i class="fa-solid fa-comment-dots"></i>
                    Comment
                    <br>
                    <div class="input-area">
                        <textarea rows="10" style="width: 90%; border: none; outline: none; resize:none;" id="comment_${index}">
                        </textarea>
                    </div>
                    
                </div>

            </div>

            <div class="selector">
                <div class="cancel" id="cancel_${index}" onclick="cancel('${index}')">
                    <i class="fa-solid fa-xmark"></i>
                    Cancel
                </div>
                <div class="save" id="save_${index}"onclick="edit('${index}')">
                    <i class="fa-solid fa-plus"></i>
                    Edit
                </div>
            </div>
        </div>


    </div>`)
        restore(value);

    }
    else if (value.isMarked == true) {
        item[0].insertAdjacentHTML('beforeend',
            `
    <div class="todo-item-container" id="todo-item-container_${index}">
        <div class="todo-item-top" id="todo-item-top_${index}">
            <div class="todo-edit">
                <input class="todo-check" type="checkbox" id="todo-check_${index}" onchange="upDate('${index}')">
                <div class="todo-text" id="todo-text_${index}" onclick="editText('click','todo-text_${index}','todo-text-input_${index}')" >Type Something Here…</div>
                <input class="todo-text-input-switch" id="todo-text-input_${index}" type="text" onblur="editText('blur','todo-text_${index}','todo-text-input_${index}')">
                <div class="todo-star-container">
                    <i class="fa-solid fa-star todo-edit-star" onclick="favorite('${index}')" id="star_${index}"></i>
                    <i class="fa-solid fa-pen todo-switch-text" onclick="fold('edit_${index}','item-bottom_${index}')" id="edit_${index}"></i>
                </div>


            </div>
            <!-- <i class="fa-thin fa-star todo-star"></i>
            <i class="fa-thin fa-pen"></i> -->
            <div class="todo-tag">
                <i class="fa-solid fa-calendar-days todo-calendar" id="todo-calendar_${index}"></i>
                <i class="fa-solid fa-comment-dots todo-comment" id="todo-comment_${index}"></i>
                <i class="fa-solid fa-file todo-file" id="todo-file_${index}"></i>
            </div>


        </div>
        <div class="todo-switch-bottom" id="item-bottom_${index}">
            <div class="todo-editer">
                <div class="Deadline">
                    <i class="fa-solid fa-calendar-days"></i>
                    <div style="display: inline-block;">Deadline</div>
                    <br>
                    <input class="date" type="date" id="date_${index}">
                    <input class="time" type="time" id="time_${index}">
                </div>
                <div class="File">
                    <i class="fa-solid fa-file"></i>
                    File
                    <br>
                    <input type="file" id="file">
                    <!-- <textarea class="comment-input"type="text"> -->
                </div>
                <div class="Comment">
                    <i class="fa-solid fa-comment-dots"></i>
                    Comment
                    <br>
                    <div class="input-area">
                        <textarea rows="10" style="width: 90%; border: none; outline: none; resize:none;" id="comment_${index}">
                        </textarea>
                    </div>
                    
                </div>

            </div>

            <div class="selector">
                <div class="cancel" id="cancel_${index}" onclick="cancel('${index}')">
                    <i class="fa-solid fa-xmark"></i>
                    Cancel
                </div>
                <div class="save" id="save_${index}"onclick="edit('${index}')">
                    <i class="fa-solid fa-plus"></i>
                    Edit
                </div>
            </div>
        </div>


    </div>`)
        restore(value)
        mark(index);
    }

}
function mark(index) {
    let star = $(`#star_${index}`);
    let todo = $(`#todo-item-top_${index}`);
    // if (star.classList.contains("test")) {
    //     star.classList.remove("test");
    // }
    // else {
    //     star.classList.add("test");
    // }
    // console.log(star.classList);
    if (star.hasClass("todo-edit-star")) {
        star.removeClass("todo-edit-star");
        star.addClass("todo-switch-star")
        todo.removeClass("todo-item-top");
        todo.addClass("todo-item-top-switch");
    }
    else {
        star.removeClass("todo-switch-star");
        star.addClass("todo-edit-star")
        todo.removeClass("todo-item-top-switch");
        todo.addClass("todo-item-top");
    }
}
let array;
type = 0;
function choose(todoType) {
    let my_tasks = $('#my-tasks');
    let in_progress = $('#in-progress');
    let completed = $('#completed');
    switch (todoType) {
        case 0:
            my_tasks.addClass('task-onclick');
            my_tasks.removeClass('tasks');
            in_progress.removeClass('task-onclick');
            in_progress.addClass('tasks');
            completed.removeClass('task-onclick');
            completed.addClass('tasks');
            break;
        case 1:
            my_tasks.removeClass('task-onclick');
            my_tasks.addClass('tasks');
            in_progress.addClass('task-onclick');
            in_progress.removeClass('tasks');
            completed.removeClass('task-onclick');
            completed.addClass('tasks');
            break;
        case 2:
            my_tasks.removeClass('task-onclick');
            my_tasks.addClass('tasks');
            in_progress.removeClass('task-onclick');
            in_progress.addClass('tasks');
            completed.addClass('task-onclick');
            completed.removeClass('tasks');
            break;
    }
    type = todoType;
    destroy();
    create();
}
function create() {
    $.ajax({
        url: `http://localhost:63320/getTodoList?type=${type}`,
        method: 'get',
        dataType: 'json',
        success: function (res) {
            array = res["data"]
            array.forEach(function (value) {
                console.log("insert");
                insert(value)
            });
        },
        error: function (err) { console.log(err) },
    });
}
function destroy() {
    $('#todo-container').html("");

}
create()
