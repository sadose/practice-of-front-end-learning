/* 事件绑定 */

// 表单相关

const form = document.getElementById("form");
const submitInfo = document.getElementById("submit-info");

const msgBox = document.getElementById("msg-box");

const emailInput = document.getElementById("email-input");

let timer;

(function () {
    if (window.localStorage.getItem("signupStatus")) {
        submitInfo.removeAttribute("hidden");
        form.setAttribute("hidden", "hidden");
        form.classList.remove("hidden");
        showMsg("您已完成报名！", "success", 10);
    }
})();

function showMsg(msg, type, timeout) {
    // 展示消息框
    msgBox.innerText = msg;
    msgBox.setAttribute("data-type", type);
    if (timer !== undefined) {
        clearTimeout(timer);
    }
    timer = setTimeout(() => {
        msgBox.setAttribute("data-type", "");
    }, (timeout ? timeout : 6) * 1000);
}

function submitForm() {
    // 表单提交
    if (!schoolSelector.getValue()) {
        showMsg("请选择您当前就读的学校！", "error");
    } else if (!gradeSelector.getValue()) {
        showMsg("请选择您的年级！", "error");
    } else if (!emailInput.value) {
        showMsg("请输入您的邮箱！", "error");
    } else if (emailInput.value.search(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
        showMsg("您输入的邮箱地址格式不正确！请重新输入！", "error");
    } else {
        submitInfo.removeAttribute("hidden");
        form.setAttribute("hidden", "hidden");
        form.classList.remove("hidden");
        window.localStorage.setItem("signupStatus", "true");
        showMsg(`恭喜来自 ${schoolSelector.getValue()+(schoolSelector.getValue()==="其他"?"大学":"")} ${gradeSelector.getValue()+(gradeSelector.getValue()==="其他"?"年级":"")} 的 ${emailInput.value} 同学，您已报名成功！`, "success", 20);
    }
}

document.getElementById("submit-button").addEventListener("click", submitForm);
emailInput.addEventListener("keypress", (e) => {
    if (e.keyCode === 13) {
        submitForm();
    }
});

document.getElementById("re-signup").addEventListener("click", () => {
    // 重新报名
    msgBox.setAttribute("data-type", "");
    submitInfo.setAttribute("hidden", "hidden");
    form.removeAttribute("hidden");
    schoolSelector.reset();
    gradeSelector.reset();
    emailInput.value = "";
});

// toTop

document.getElementById("to-top").addEventListener("click", () => {
    (function loop() {
        document.documentElement.scrollTop -= 90;
        if (document.documentElement.scrollTop) {
            setTimeout(loop, 15);
        }
    })();
});

// 全局点击事件

const schoolSelectDom = document.getElementById("school-select");
const gradeSelectDom = document.getElementById("grade-select");

document.addEventListener("mouseup", (e) => {
    if (!(schoolSelectDom === e.target) && !schoolSelectDom.contains(e.target)) {
        schoolSelector.close();
    }
    if (!(gradeSelectDom === e.target) && !gradeSelectDom.contains(e.target)) {
        gradeSelector.close();
    }
});