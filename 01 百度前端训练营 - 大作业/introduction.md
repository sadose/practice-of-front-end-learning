# 工作内容

## 工作内容概述

- [x] 页面和布局
    - [x] 导航栏
    - [x] 头图
    - [x] 报名表单
    - [x] 页面主要内容
    - [x] 页脚
- [x] 报名表单
    - [x] 数据准备
    - [x] 二级级联选择菜单组件的封装
    - [x] 表单验证
    - [x] 消息框
- [x] “我们的宗旨”栏目展示
    - [x] 动画
- [x] “课程安排”选项卡
    - [x] 动画
- [x] 其他
    - [x] 页面内容进入动画
    - [x] “返回顶部”按钮

## 文件目录

- `static` - 静态资源文件夹
    - `css` - CSS文件目录
        - `selector.css` - 二级级联选择菜单的CSS样式
        - `style.css` - 页面CSS文件
    - `img` - 图片资源目录
        - `courses` - 课程封面图片目录
    - `js` - Javascript源文件目录
        - `events.js` - 页面事件相关
        - `load_data.js` - 页面数据加载相关
        - `scroll.js` - 页面内容进入动画相关
        - `selector.js` - 封装的二级级联选择菜单
        - `tab.js` - 选项卡切换相关
    - `json` - 数据文件目录
        - `courses.json` - 课程数据文件
        - `schools.json` - 全国高校数据文件
- `index.html` - 主页
- `introduction.md` - 介绍文档


# 快速开始

- 本地预览：将仓库 clone 到本地，在根目录下运行静态页面服务。可使用 VSCode 的 live server 插件，或使用 npm 安装 live-server 工具。

- 在线预览：[http://www.dasenbuling.cn/baidu/last/](http://www.dasenbuling.cn/baidu/last/)


# 动画

## 页面内容进入动画

### 原理与实现

类似于图片懒加载的原理，在页面元素进入视口时，为其添加进入动画。

实现步骤：

1. 为所有需要添加动画的页面元素设置类名`hidden`，通过CSS使它们初始为`opacity: 0;`。

2. 为窗口绑定`load`事件，在窗口加载完毕时执行以下过程：

    - 通过`document.getElementsByClassName("hidden")`获取所有需要添加进入动画的页面元素DOM。
    - 定义懒加载函数并绑定到窗口的`scroll`事件上，使得在每次滚屏时依次判断所有的具有`hidden`类名的页面元素是否进入视口，为进入视口的元素移除`hidden`类名，并添加`animated``fadeInUp`类名。

3. `animated`和`fadeInUp`类名通过CSS定义了进入动画。

### 主要代码

`animated`和`fadeInUp`类名定义的CSS动画：

``` css
:root {
    --animate-duration: 800ms;
    --animate-delay: 1s;
    --animate-repeat: 1;
}
.animated {
    -webkit-animation-duration: var(--animate-duration);
    animation-duration: var(--animate-duration);
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
}
.fadeInUp {
    -webkit-animation-name: fadeInUp;
    animation-name: fadeInUp;
}
@-webkit-keyframes fadeInUp {
    0% {
        opacity: 0;
        -webkit-transform: translate3d(0, 100%, 0);
        transform: translate3d(0, 100%, 0);
    }

    to {
        opacity: 1;
        -webkit-transform: translateZ(0);
        transform: translateZ(0);
    }
}
@keyframes fadeInUp {
    0% {
        opacity: 0;
        -webkit-transform: translate3d(0, 100%, 0);
        transform: translate3d(0, 100%, 0);
    }

    to {
        opacity: 1;
        -webkit-transform: translateZ(0);
        transform: translateZ(0);
    }
}
```

懒加载原理实现的动态添加进入动画：

``` js
// 懒加载原理
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
```

### 效果

![页面内容进入动画效果](images/Animation-1.gif)

## “我们的宗旨”栏目介绍展示动画

### 原理与实现

通过在图片的上方使用一个绝对定位的标签来实现，该标签覆盖在图片的上方，宽度为图片的100%，但初始设置`padding-top: calc(100% + 20px);`（由于图片为宽高比1:1，因此宽度的100%也为高度的100%），即使用`padding-top`来将文字挤出容器标签的区域，并对容器标签设置`overflow: hidden;`来隐藏超出的部分。

当鼠标移动到标签上时，改变其`padding-top`和`background-color`，利用`transition`来实现补间动画。

### 主要代码

``` css
.hover-img {
    position: relative;
    overflow: hidden;
}
.hover-text {
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 100%;
    /* …… 省略关于字体的部分 */
    padding-top: calc(100% + 20px);
    padding-left: 20px;
    padding-right: 20px;
    transition: all 300ms linear;
}
.hover-text:hover {
    padding-top: 20px;
    background-color: rgb(0, 0, 0, 60%);
}
```

### 效果

![“我们的宗旨”栏目介绍展示动画效果](images/Animation-2.gif)

## “课程安排”选项卡切换动画

### 原理与实现

### 主要代码

### 效果

![“课程安排”选项卡切换动画效果](images/Animation-3.gif)


# 报名表单

## 数据准备

## 二级级联选择菜单组件

## 表单验证


# 二级级联选择菜单组件

## 引入

## 接口与方法

## 最佳实践

