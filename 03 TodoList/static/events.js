/* 事件处理程序 */

const input = document.getElementById("text-input");

function addTodoItem() {
    if (input.value) {
        todoItems.addItem(input.value);
        input.value = "";
    } else {
        alert("请输入内容！");
    }
}

function inputSubmit(e) {
    if (e.keyCode === 13) {
        addTodoItem();
    }
}

/* 绑定事件处理程序 */

document.getElementById("add-button").addEventListener("click", addTodoItem);
input.addEventListener("keydown", inputSubmit);