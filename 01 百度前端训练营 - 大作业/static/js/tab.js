/* 课程选项卡 */

// 容器 DOM
const coursesCon = document.getElementsByClassName("courses-lists")[0];

// 选项卡标题 DOM
const tabs = [
    document.getElementById("all-tab"),
    document.getElementById("html-tab"),
    document.getElementById("css-tab"),
    document.getElementById("js-tab")
];

// 选项卡内容区域 DOM
const courses = [
    document.getElementById("all-courses"),
    document.getElementById("html-courses"),
    document.getElementById("css-courses"),
    document.getElementById("js-courses")
];

// 各选项卡内容区域高度
const tabHeight = [];

// 切换前的选项卡 ID
let lastActiveId = 0;

// 滑动的 bar
const bar = document.getElementById("active-bar");

// 用来生成选项卡点击事件函数的工厂函数
function activeBarSwitch(tabId) {
    // 当前选项卡高度
    const height = tabHeight[tabId];
    return function () {
        // 如果没有切换，什么也不做
        if (tabId === lastActiveId) {
            return;
        }
        // 滑动 bar
        bar.classList.add("position-" + tabId);
        tabs[lastActiveId].classList.remove("active");
        tabs[tabId].classList.add("active");
        // 滚动选项卡内容区域
        if (tabId > lastActiveId) {
            for (let i = lastActiveId; i < tabId; i++) {
                courses[i].classList.add("left");
                if (i === lastActiveId) {
                    courses[i].classList.remove("active");
                } else {
                    courses[i].classList.remove("right");
                }
            }
            courses[tabId].classList.add("active");
            courses[tabId].classList.remove("right");
        } else {
            for (let i = tabId + 1; i < lastActiveId + 1; i++) {
                courses[i].classList.add("right");
                if (i === lastActiveId) {
                    courses[i].classList.remove("active");
                } else {
                    courses[i].classList.remove("left");
                }
            }
            courses[tabId].classList.add("active");
            courses[tabId].classList.remove("left");
        }
        // 调整容器高度
        coursesCon.setAttribute("style", `height: ${height + 50}px;`);
        // 记录切换的选项卡 ID
        lastActiveId = tabId;
        // 去除无用的 CSS 类名
        while (bar.classList.length > 1) {
            bar.classList.remove(bar.classList[0]);
        }
    }
}

// 在窗口加载完成后做的工作
const tabEventsBind = () => {
    // 一次性执行
    window.removeEventListener("scroll", tabEventsBind);

    // 获取课程区域各选项卡高度
    for (let i = 0; i < courses.length; i++) {
        tabHeight[i] = courses[i].clientHeight;
    }

    // 课程选项卡容器初始高度调整
    coursesCon.setAttribute("style", `height: ${tabHeight[0] + 50}px;`);

    // 为选项卡（标题）绑定点击事件
    for (let i = 0; i < tabs.length; i++) {
        tabs[i].addEventListener("click", activeBarSwitch(i));
    }
};
window.addEventListener("scroll", tabEventsBind);