/* Todo 列表项的单例数据对象 */

let todoItems = (function () {
    // 初始化数据成员
    let itemsList = {};
    let currentId = 0;
    let num = 0;
    // 获取 DOM
    let ongoingItemsDom = document.getElementById("ongoing-items");
    let completedItemsDom = document.getElementById("completed-items");
    // 生成新的 Item DOM
    let newItemDom = function (text, id) {
        let dom = document.createElement("div");
        dom.innerHTML = `<input type="checkbox" name="todo" id="todo-${id}"><label>${text}</label><span class="button delete-button"></span>`
        dom.getElementsByTagName("span")[0].addEventListener("click", () => todoItems.deleteItem(id));
        dom.getElementsByTagName("input")[0].addEventListener("change", () => {
            setTimeout(() => todoItems.completeItem(id), 100);
        });
        return dom;
    };
    // 添加 Todo 项目
    let addItem = function (text, id = currentId, isInit = false) {
        let dom = newItemDom(text, id);
        itemsList[id] = {
            text,
            dom,
            completed: false,
        };
        ongoingItemsDom.appendChild(dom);
        if (isInit) return;
        window.localStorage.setItem(id.toString(), JSON.stringify({
            text,
            completed: false,
        }));
        window.localStorage.setItem("count", id);
        currentId++;
        num++;
    };
    // 删除 Todo 项目
    let deleteItem = function (id) {
        if (itemsList[id].completed) {
            completedItemsDom.removeChild(itemsList[id].dom);
        } else {
            ongoingItemsDom.removeChild(itemsList[id].dom);
        }
        itemsList[id] = null;
        window.localStorage.removeItem(id.toString());
        num--;
        if (!num) {
            window.localStorage.removeItem("count");
        }
    };
    // 完成 Todo 项目
    let completeItem = function (id) {
        itemsList[id].completed = true;
        ongoingItemsDom.removeChild(itemsList[id].dom);
        itemsList[id].dom.getElementsByTagName("input")[0].setAttribute("disabled", "disabled");
        itemsList[id].dom.getElementsByTagName("input")[0].setAttribute("checked", "checked");
        itemsList[id].dom.getElementsByTagName("span")[0].classList.add("completed");
        completedItemsDom.appendChild(itemsList[id].dom);
        window.localStorage.setItem(id.toString(), JSON.stringify({
            text: itemsList[id].text,
            completed: itemsList[id].completed,
        }));
    };
    // 初始化：从 Local Storage 加载数据
    if (window.localStorage.getItem("count") !== null) {
        if (window.localStorage.length === 1) {
            window.localStorage.removeItem("count");
        } else {
            currentId = Number(window.localStorage.getItem("count")) + 1;
            for (let i = 0; i < currentId; i++) {
                let content = window.localStorage.getItem(i.toString());
                if (content) {
                    content = JSON.parse(content);
                    addItem(content.text, i, true);
                    num++;
                    if (content.completed) completeItem(i);
                }
            }
        }
    }
    // 返回单例对象
    return {
        addItem,
        deleteItem,
        completeItem
    };
})();