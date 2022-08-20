function favorite(index) {
    let star = document.getElementById(`star_${index}`);
    let todo = document.getElementById(`todo-item-top_${index}`);
    // if (star.classList.contains("test")) {
    //     star.classList.remove("test");
    // }
    // else {
    //     star.classList.add("test");
    // }
    // console.log(star.classList);
    if (star.classList.contains("todo-edit-star")) {
        star.classList.remove("todo-edit-star");
        star.classList.add("todo-switch-star")
        todo.classList.remove("todo-item-top");
        todo.classList.add("todo-item-top-switch");
    }
    else {
        star.classList.remove("todo-switch-star");
        star.classList.add("todo-edit-star")
        todo.classList.remove("todo-item-top-switch");
        todo.classList.add("todo-item-top");
    }
    console.log('favorite');
    upDate(index);
    
}
function check() {
    let time = document.getElementById('date_0');
    console.log(time.value);
}
function fold(editID, itemBottomID) {
    let edit = document.getElementById(editID);
    let item = document.getElementById(itemBottomID);

    if (edit.classList.contains("todo-edit-text")) {

        edit.classList.remove("todo-edit-text");
        edit.classList.add("todo-switch-text");
        item.classList.remove("todo-item-bottom");
        item.classList.add("todo-switch-bottom");

    }
    else {
        edit.classList.remove("todo-switch-text");
        edit.classList.add("todo-edit-text")
        item.classList.remove("todo-switch-bottom");
        item.classList.add("todo-item-bottom");

    }

}
function editText(type, textID, inputID) {
    let todoText = document.getElementById(textID);
    let todoTextInput = document.getElementById(inputID);
    if (type == "click") {
        console.log("click");
        todoText.classList.add("todo-text-switch");
        todoText.classList.remove("todo-text");
        todoTextInput.value = todoText.innerText;
        todoTextInput.classList.add("todo-text-input");
        todoTextInput.classList.remove("todo-text-input-switch");
        todoTextInput.focus();
    }
    else if (type == "blur") {
        console.log("blur");
        todoText.classList.remove("todo-text-switch");
        todoText.classList.add("todo-text");
        todoText.innerText = todoTextInput.value;
        todoTextInput.classList.remove("todo-text-input");
        todoTextInput.classList.add("todo-text-input-switch");
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
    let data = new FormData();
    let todo_text = document.getElementById(`todo-input`);
    let date = document.getElementById(`date_${index}`);
    let time = document.getElementById(`time_${index}`);
    let comment = document.getElementById(`comment_${index}`);
    data.append('text', todo_text.value);
    data.append('date', date.value);
    data.append('time', time.value);
    console.log(comment.value);
    data.append('comment', comment.value);
    let xhr = new XMLHttpRequest();
    xhr.open('post', 'http://localhost:63320/setTodoList', true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(JSON.stringify({ 'text': todo_text.value, 'date': date.value, 'time': time.value, 'comment': comment.value }));
    xhr.onload = function () {
        console.log(xhr.responseText);
        if (xhr.status == 200) {
            create()
        } else {
            console.log('資料錯誤');
        }
    }
}
function test() {
    let xhr = new XMLHttpRequest();
    xhr.open('get', 'http://localhost:63320/getTodoList', true);
    xhr.send();
    xhr.onload = function () {
        console.log(xhr.responseText);
        if (xhr.status == 200) {
            let str = JSON.parse(xhr.responseText);
            console.log(str);
        } else {
            console.log('資料錯誤');
        }
    }
}
function upDate(index) {

    let todo_check = document.getElementById(`todo-check_${index}`);
    let todo_text = document.getElementById(`todo-text_${index}`);
    let date = document.getElementById(`date_${index}`);
    let time = document.getElementById(`time_${index}`);
    let comment = document.getElementById(`comment_${index}`);
    let mark=document.getElementById(`star_${index}`);
    let todo_mark;
    if(mark.classList.contains("todo-edit-star")){
        todo_mark=false;
    }
    else{
        todo_mark=true;
    }
    console.log(todo_mark);
    let xhr = new XMLHttpRequest();
    xhr.open('post', 'http://localhost:63320/updateTodoList', true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    console.log(JSON.stringify({ 'text': todo_text.innerText, 'date': date.value, 'time': time.value, 'comment': comment.value, 'id': index, 'isComplete': todo_check.checked,'isMarked':todo_mark }));
    xhr.send(JSON.stringify({ 'text': todo_text.innerText, 'date': date.value, 'time': time.value, 'comment': comment.value, 'id': index, 'isComplete': todo_check.checked,'isMarked':todo_mark }));
    xhr.onload = function () {
        console.log(xhr.responseText);
        if (xhr.status == 200) {
            console.log('update');
            destroy();
            create();
        } else {
            console.log('資料錯誤');
        }
    }
}
function edit(index) {
    let todo_check = document.getElementById(`todo-check_${index}`);
    let todo_text = document.getElementById(`todo-text_${index}`);
    let date = document.getElementById(`date_${index}`);
    let time = document.getElementById(`time_${index}`);
    let comment = document.getElementById(`comment_${index}`);
    let mark=document.getElementById(`star_${index}`);
    let todo_mark;
    if(mark.classList.contains("todo-edit-star")){
        todo_mark=true;
    }
    else{
        todo_mark=false;
    }
    let xhr = new XMLHttpRequest();
    xhr.open('post', 'http://localhost:63320/updateTodoList', true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(JSON.stringify({ 'text': todo_text.innerText, 'date': date.value, 'time': time.value, 'comment': comment.value, 'id': index, 'isComplete': todo_check.checked ,'isMarked':todo_mark}));
}
function cancel(index) {
    let xhr = new XMLHttpRequest();
    xhr.open('get', `http://localhost:63320/deleteTodoList?id=${index}`, true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send();
    xhr.onload = function () {
        console.log(xhr.responseText);
        if (xhr.status == 200) {
            item_delete(index);
        } else {
            console.log('資料錯誤');
        }
    }
}
function item_delete(index) {
    let item = document.getElementById(`todo-item-container_${index}`);
    item.remove();
}
function restore(value) {
    index = value.id;
    let todo_calendar = document.getElementById(`todo-calendar_${index}`);
    let todo_comment = document.getElementById(`todo-comment_${index}`);
    let todo_file = document.getElementById(`todo-file_${index}`);
    
    
    let todo_check = document.getElementById(`todo-check_${index}`);
    let todo_text = document.getElementById(`todo-text_${index}`);
    let todo_text_input = document.getElementById(`todo-text-input_${index}`);
    let date = document.getElementById(`date_${index}`);
    let time = document.getElementById(`time_${index}`);
    let comment = document.getElementById(`comment_${index}`);
    console.log(value);
    todo_check.checked = value.isComplete;
    todo_text.innerText = value.text;
    todo_text_input.innerText = value.text;
    date.value = value.date;
    time.value = value.time;
    comment.innerText = value.comment;
    let commentValue=value.comment.replace(' ','');
    if (commentValue == '') {
        todo_comment.classList.remove("todo-comment");
        todo_comment.classList.add("todo-icon-hide");
        console.log(value.comment);
    }
    if (value.file == undefined||value.file == '') {
        todo_file.classList.remove("todo-file");
        todo_file.classList.add("todo-icon-hide");
    }
    if (value.time == undefined || value.date == undefined||value.time == ''|| value.date == '') {
        todo_calendar.classList.remove("todo-calendar");
        todo_calendar.classList.add("todo-icon-hide");
    }
}
function expand() {
    let bottom = document.getElementById('item-bottom_0');
    if (bottom.classList.contains('todo-switch-bottom')) {
        bottom.classList.add('todo-item-bottom')
        bottom.classList.remove('todo-switch-bottom')
    }
    else {
        bottom.classList.remove('todo-item-bottom')
        bottom.classList.add('todo-switch-bottom')
    }

}

function insert(value) {
    index = value.id;
    let item = document.getElementById('todo-container');
    if(value.isMarked==false){
        item.insertAdjacentHTML('beforeend',
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
    else if(value.isMarked==true){
        item.insertAdjacentHTML('beforeend',
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
function mark(index){
    let star = document.getElementById(`star_${index}`);
    let todo = document.getElementById(`todo-item-top_${index}`);
    // if (star.classList.contains("test")) {
    //     star.classList.remove("test");
    // }
    // else {
    //     star.classList.add("test");
    // }
    // console.log(star.classList);
    if (star.classList.contains("todo-edit-star")) {
        star.classList.remove("todo-edit-star");
        star.classList.add("todo-switch-star")
        todo.classList.remove("todo-item-top");
        todo.classList.add("todo-item-top-switch");
    }
    else {
        star.classList.remove("todo-switch-star");
        star.classList.add("todo-edit-star")
        todo.classList.remove("todo-item-top-switch");
        todo.classList.add("todo-item-top");
    }
}
let array;
type = 0;
function choose(todoType) {
    let my_tasks = document.getElementById('my-tasks');
    let in_progress = document.getElementById('in-progress');
    let completed = document.getElementById('completed');
    switch (todoType) {
        case 0:
            my_tasks.classList.add('task-onclick');
            my_tasks.classList.remove('tasks');
            in_progress.classList.remove('task-onclick');
            in_progress.classList.add('tasks');
            completed.classList.remove('task-onclick');
            completed.classList.add('tasks');
            break;
        case 1:
            my_tasks.classList.remove('task-onclick');
            my_tasks.classList.add('tasks');
            in_progress.classList.add('task-onclick');
            in_progress.classList.remove('tasks');
            completed.classList.remove('task-onclick');
            completed.classList.add('tasks');
            break;
        case 2:
            my_tasks.classList.remove('task-onclick');
            my_tasks.classList.add('tasks');
            in_progress.classList.remove('task-onclick');
            in_progress.classList.add('tasks');
            completed.classList.add('task-onclick');
            completed.classList.remove('tasks');
            break;
    }
    type = todoType;
    destroy();
    create();
}
function create() {
    let xhr = new XMLHttpRequest();
    xhr.open('get', `http://localhost:63320/getTodoList?type=${type}`, true);
    xhr.send();
    xhr.onload = function () {
        console.log(xhr.responseText);
        if (xhr.status == 200) {
            let str = JSON.parse(xhr.responseText);
            //console.log(str["data"])
            array = str["data"]
            array.forEach(function (value) {
                insert(value)
            });
        } else {
            console.log('資料錯誤');
        }

    }
}
function destroy() {
    document.getElementById('todo-container').innerHTML = '';

}
create()
