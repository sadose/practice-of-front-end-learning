/* 二级级联选择器 */

class SelectorDasen {
    // 构造函数
    constructor(root, data, placeholder, size) {
        let tempDom;

        // 创建根标签
        let selectorRoot = document.createElement("div");
        selectorRoot.classList.add("dasen-selector");
        this.selectorRoot = selectorRoot;

        // 创建选择框标签
        tempDom = document.createElement("div");
        tempDom.classList.add("pointer");
        tempDom.addEventListener("click", () => SelectorDasen.switchActive(this.selectorRoot));
        let selectedLabel = document.createElement("label");
        this.placeholder = placeholder ? placeholder : "请选择";
        selectedLabel.innerHTML = this.placeholder;
        tempDom.appendChild(selectedLabel);
        selectorRoot.appendChild(tempDom);
        this.selectedLabel = selectedLabel;

        // 创建选项框标签
        let selectorOptions = document.createElement("div");
        selectorOptions.classList.add("options");
        selectorOptions.classList.add(size ? size : "middle");
        selectorRoot.appendChild(selectorOptions);
        this.selectorOptions = selectorOptions;

        // 创建一级选项标签
        let leftDom = document.createElement("div");
        leftDom.classList.add("left");
        selectorOptions.appendChild(leftDom);

        // 创建二级选项标签
        let rightDom = document.createElement("div");
        rightDom.classList.add("right");
        selectorOptions.appendChild(rightDom);

        // 创建关闭按钮
        let cancelBtn = document.createElement("div");
        cancelBtn.classList.add("cancel");
        cancelBtn.addEventListener("click", () => this.close());
        selectorOptions.appendChild(cancelBtn);

        // 创建每个一级选项及其下级内容
        this.supItems = [];
        this.subItems = [];
        let cnt = 0;
        for (const key in data) {
            let superTag = document.createElement("div");
            superTag.innerText = key;
            superTag.setAttribute("data-index", cnt.toString());
            superTag.addEventListener("click", (e) => SelectorDasen.tagClick(e, this));
            let subTagCon = document.createElement("div");
            subTagCon.classList.add("right-con");
            this.supItems.push(superTag);
            this.subItems.push({
                con: subTagCon,
                items: []
            });
            for (const index in data[key]) {
                let subTag = document.createElement("div");
                subTag.innerText = data[key][index];
                subTag.setAttribute("data-index", cnt.toString() + "-" + index.toString());
                subTag.addEventListener("click", (e) => SelectorDasen.tagClick(e, this));
                this.subItems[cnt].items.push(subTag);
                subTagCon.appendChild(subTag);
            }
            this.supItems[0].classList.add("active");
            this.subItems[0].con.classList.add("active");
            leftDom.appendChild(superTag);
            rightDom.appendChild(subTagCon);
            cnt++;
        }
        this.lastSupItemId = "0";
        this.lastSubItemId = "-";
        this.selectedId = "";
        this.selectedValue = "";

        // 挂载到页面
        document.getElementById(root).appendChild(selectorRoot);
        this.documentRootId = root;
    }
    // 原型方法
    select(id, value) {
        // 当用户选择了某一项时调用
        this.lastSubItemId = id;
        this.selectedValue = value;
        this.selectedId = id;
        this.selectedLabel.innerText = value;
        this.close();
    }
    resetScroll() {
        // 重置选择面板为当前选择的项
        let selectid = this.selectedId.split("-")[0];
        if (this.lastSupItemId !== selectid && selectid) {
            SelectorDasen.switchActive(this.supItems[this.lastSupItemId], this.supItems[selectid]);
            SelectorDasen.switchActive(this.subItems[this.lastSupItemId].con, this.subItems[selectid].con);
            this.lastSupItemId = selectid;
        }
        if (selectid) {
            this.selectorOptions.firstChild.scrollTop = this.supItems[selectid].offsetTop - 5;
        }
    }
    open() {
        // public: 打开选择面板
        this.selectorRoot.classList.add("active");
    }
    close() {
        // public: 关闭选择面板
        this.selectorRoot.classList.remove("active");
        this.resetScroll();
    }
    getValue() {
        // public: 获取当前选择的值
        return this.selectedValue;
    }
    getTag() {
        // public: 获取当前选择的值所属的一级标签
        let selectid = this.selectedId.split("-")[0];
        if (selectid) {
            return this.supItems[selectid].innerText;
        } else {
            return "";
        }
    }
    reset() {
        // public: 重置选择值
        if (this.selectedId) {
            let selectid = this.selectedId.split("-");
            SelectorDasen.switchActive(this.supItems[0], this.supItems[selectid[0]]);
            SelectorDasen.switchActive(this.subItems[0].con, this.subItems[selectid[0]].con);
            SelectorDasen.switchActive(this.subItems[selectid[0]].items[selectid[1]]);
            this.lastSupItemId = "0";
            this.lastSubItemId = "-";
            this.selectedId = "";
            this.selectedValue = "";
            this.selectedLabel.innerText = this.placeholder;
            this.selectorOptions.firstChild.scrollTop = 0;
        }
    }
    // 静态方法
    static tagClick(e, selector) {
        // 标签点击事件处理函数
        let supid = e.target.getAttribute("data-index");
        if (supid.indexOf("-") >= 0) {
            // 当点击的是二级标签
            if (selector.lastSubItemId !== supid) {
                let curid = supid;
                let subid = supid.split("-");
                let lastid = selector.lastSubItemId.split("-");
                supid = parseInt(subid[0]);
                subid = parseInt(subid[1]);
                if (lastid[0]) {
                    SelectorDasen.switchActive(
                        selector.subItems[supid].items[subid],
                        selector.subItems[parseInt(lastid[0])].items[parseInt(lastid[1])]
                    );
                } else {
                    SelectorDasen.switchActive(
                        selector.subItems[supid].items[subid]
                    );
                }
                selector.select(curid, e.target.innerText);
            }
        } else {
            // 当点击的是一级标签
            if (selector.lastSupItemId !== supid) {
                supid = parseInt(supid);
                SelectorDasen.switchActive(selector.supItems[selector.lastSupItemId], selector.supItems[supid]);
                SelectorDasen.switchActive(selector.subItems[selector.lastSupItemId].con, selector.subItems[supid].con);
                selector.lastSupItemId = supid;
            }
        }
    }
    static switchActive(dom, dom2) {
        // 切换 DOM 的 active 类名
        if (dom.classList.contains("active")) {
            dom.classList.remove("active");
        } else {
            dom.classList.add("active");
        }
        if (dom2) {
            SelectorDasen.switchActive(dom2);
        }
    }
}

// 代理，使得组件的属性和方法成为只读的，无法修改，修改静默失败
class Selector {
    constructor(root, data, placeholder, size) {
        let rawSelector = new SelectorDasen(root, data, placeholder, size);
        let proxy = new Proxy(rawSelector, {
            get(t, p) {
                let allowFun = ["open", "close", "getValue", "getTag", "reset"];
                if (allowFun.indexOf(p) >= 0) {
                    return t[p].bind(t);
                }
                return undefined;
            },
            set() {
                return false;
            }
        });
        return proxy;
    }
}