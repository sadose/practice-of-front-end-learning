/* 通过懒加载实现滚屏到 DOM 位置显示 DOM 的进入动画 */

window.addEventListener("load", function () {
    // 获取回到顶部按钮的 DOM
    let toTop = document.getElementById("to-top");
    // 获取所有需要动画的 DOM
    let hiddenDoms = document.getElementsByClassName("hidden");

    // 获取 DOM 到浏览器顶部距离的的函数
    let getTop = (dom) => dom.offsetTop;

    // 懒加载
    function lazyload(doms) {
        // 可视区域高度
        let viewHeight = window.innerHeight;
        // 滚动区域高度
        let scrollHeight = document.documentElement.scrollTop || document.body.scrollTop;
        // 遍历 DOM
        for (let i = 0; i < doms.length; i++) {
            if (viewHeight + scrollHeight > getTop(doms[i])) {
                // 延迟 0.5s 加载
                setTimeout(function () {
                    if (doms[i]) {
                        doms[i].classList.add("animated", "fadeInUp");
                        doms[i].classList.remove("hidden");
                        lazyload(hiddenDoms);
                    }
                }, 500);
                return;
            }
        }
    }

    // 初始加载
    lazyload(hiddenDoms);

    // 绑定滚屏函数
    window.addEventListener("scroll", function () {
        lazyload(hiddenDoms);
        // 更改回到顶部按钮状态
        let scrollHeight = document.documentElement.scrollTop || document.body.scrollTop;
        if (scrollHeight) {
            toTop.classList.remove("out");
        } else {
            toTop.classList.add("out");
        }
    });
});