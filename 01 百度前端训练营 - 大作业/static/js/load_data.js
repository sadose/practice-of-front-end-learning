/* 加载高校数据 */

let schoolSelector = null;
let gradeSelector = null;

(async () => {
    const res = await fetch("static/json/schools.json");
    const data = await res.json();
    schoolSelector = new Selector("school-select", data, "请选择学校");
    gradeSelector = new Selector("grade-select", {
        "本科": ["本科一年级", "本科二年级", "本科三年级", "本科四年级", "本科五年级", "其他"],
        "硕士": ["硕士一年级", "硕士二年级", "硕士三年级", "其他"],
        "博士": ["博士一年级", "博士二年级", "博士三年级", "其他"],
        "其他": ["其他"]
    }, "请选择年级", "small");
})();

/* 加载课程数据 */

(async () => {
    const coursesMap = {
        all: document.getElementById("all-courses"),
        html: document.getElementById("html-courses"),
        css: document.getElementById("css-courses"),
        js: document.getElementById("js-courses")
    };
    const tags = {
        html: '<span class="html-tag"></span> ',
        css: '<span class="css-tag"></span> ',
        js: '<span class="js-tag"></span> '
    };
    const res = await fetch("static/json/courses.json");
    const data = await res.json();
    for (let course of data) {
        let tagsList = "";
        for (let tag of course["tags"]) {
            tagsList += tags[tag];
        }
        let courseHtml = `<div class="course"><img src="static/img/courses/${course["img"]}.jpg" alt=""><div class="content"><h3>${course["title"]}</h3><div class="text">${course["text"]}</div><div>${tagsList}</div></div></div>`;
        coursesMap["all"].innerHTML += courseHtml;
        for (let tag of course["tags"]) {
            coursesMap[tag].innerHTML += courseHtml;
        }
    }
})();