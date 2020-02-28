
// 初始化分页业务 分页核心方法
function initialPage(options) {
    // 页码
    var nums = options.nums ? options.nums : 5;
    function html() {
        // 是否有点 以及什么点
        var ellipsis = options.ellipsis !== undefined ? options.ellipsis : '...';
        // 容器选择器
        var container = options.container;
        var html = [];
        var show = 'none';
        html.push(
            "<div id='page-serial-a'>" +
            "<ul class='page-wrapper' data-index='1' data-rows='35' data-pages='7'>" +
            "<li class='page-prev page-equal page-disabled'>上一页</li>"
        );
        // 首页
        html.push(
            "<li style='display: " + show + ";' class='page-first page-equal' data-index='1'>1</li>"
        )
        if (ellipsis) {
            html.push(
                "<li style='display: " + show + ";' class='page-ellipsis-left page-equal'>" + ellipsis + "</li>"
            );
        }
        for (var i = 1; i <= nums; i++) {
            var activeClass = ' page-active';
            if (i !== 1) activeClass = '';
            html.push(
                "<li class='page-num page-equal" + activeClass + "' data-index='" + i + "'>" + i + "</li>"
            );
        };
        if (ellipsis) {
            html.push(
                "<li style='display: " + show + ";' class='page-ellipsis-right page-equal'>" + ellipsis + "</li>"
            );
        }
        // 尾页
        html.push(
            "<li style='display: " + show + ";' class='page-last page-equal' data-index='7'>7</li>"
        )
        html.push(
            "<li class='page-next page-equal'>下一页</li>" +
            "</ul>" +
            "</div>"
        );
        document.querySelector(container).innerHTML = html.join('').trim();
    }
    html();
    var callback = options.callback;
    // option必须是数字
    var count = isNaN(options.count) && options.count ? Number(options.count) : 5;
    function js() {
        var pageDom = document.getElementById('page-serial-a');
        // 首页
        var firstDom = pageDom.querySelector('.page-first');
        // 尾页
        var lastDom = pageDom.querySelector('.page-last');
        // 上一页
        var prevDom = pageDom.querySelector('.page-prev');
        // 下一页
        var nextDom = pageDom.querySelector('.page-next');
        // 页标
        var numLabel = pageDom.querySelectorAll('.page-num');
        // 父元素
        var wrapperDom = pageDom.querySelector('.page-wrapper');
        // 内聚
        var handle = {
            handleEvent(e) {
                var current = e.currentTarget;
                // 获取当前页
                var index = Number(wrapperDom.dataset.index);
                // 总页数
                var pages = wrapperDom.dataset.pages;
                if (current.classList.contains('page-prev')) {
                    if (index == 1) return;
                    callback({
                        index: index - 1,
                        count: count,
                        nums: nums,
                    });
                } else if (current.classList.contains('page-next')) {
                    if (index == pages) return;
                    callback({
                        index: index + 1,
                        count: count,
                        nums: nums,
                    });
                } else if (current.classList.contains('page-num')) {
                    // 获取页标数字
                    var label = Number(current.dataset.index);
                    if (label == index) return;
                    callback({
                        index: label,
                        count: count,
                        nums: nums,
                    });
                } else if (current.classList.contains('page-first')) {
                    var label = Number(current.dataset.index);
                    if (label == index) return;
                    callback({
                        index: label,
                        count: count,
                        nums: nums,
                    });
                } else if (current.classList.contains('page-last')) {
                    var label = Number(current.dataset.index);
                    if (label == index) return;
                    callback({
                        index: label,
                        count: count,
                        nums: nums,
                    });
                };
            },
            configurate: {
                once: false,
                capture: false,
                passive: false,
            }
        };
        firstDom.addEventListener('click', handle, handle.configurate);
        lastDom.addEventListener('click', handle, handle.configurate);
        prevDom.addEventListener('click', handle, handle.configurate);
        nextDom.addEventListener('click', handle, handle.configurate);
        Array.prototype.forEach.call(numLabel, function (item) {
            item.addEventListener('click', handle, handle.configurate);
        });
    }
    js();
    callback({
        index: 1,
        count: count,
        nums: nums,
    });
}

// 分页渲染业务 分页核心方法
function pageRender(data) {
    var index = data.index,
        count = data.count,
        rows = data.rows,
        pages = data.pages,
        nums = data.nums;
    var pageDom = document.getElementById('page-serial-a');
    // 首页
    var firstDom = pageDom.querySelector('.page-first');
    // 尾页
    var lastDom = pageDom.querySelector('.page-last');
    // 上一页
    var prevDom = pageDom.querySelector('.page-prev');
    // 下一页
    var nextDom = pageDom.querySelector('.page-next');
    // 页标
    var numLabel = pageDom.querySelectorAll('.page-num');
    // 父元素
    var wrapperDom = pageDom.querySelector('.page-wrapper');
    // ellipsis 省略号
    var ellipsisLeftDom = pageDom.querySelector('.page-ellipsis-left');
    var ellipsisRightDom = pageDom.querySelector('.page-ellipsis-right');
    // 中间数 nums的中间
    var mid,
        // 视口的最大页标和最小页标
        max,
        min;
    if (nums >= pages) {
        Array.prototype.forEach.call(numLabel, function (item, index) {
            index = index + 1;
            if (index <= pages) {
                item.dataset.index = index;
                item.textContent = index;
            } else {
                item.style.display = 'none';
            }
            hideLeft()
            hideRight();
        });

    } else {
        if (nums % 2 == 0) {
            // 偶数
            mid = nums / 2;
            min = index - mid + 1;
            max = index + mid;
        } else {
            // 奇数
            mid = Math.ceil(nums / 2);
            min = index - mid + 1;
            max = index + mid - 1;
        }
        // 求得最小值和最大值
        if (min <= 1) {
            min = 1;
            hideLeft();
            showRight();
            // 如果最小值为1 以最小值为准
            Array.prototype.forEach.call(numLabel, function (item, index) {
                index = min + index;
                item.dataset.index = index;
                item.textContent = index;
            });
        } else if (max >= pages) {
            max = pages;
            hideRight();
            showLeft();
            // 如果最大值为pages 以最大值为准
            Array.prototype.forEach.call(numLabel, function (item, index) {
                index = max - nums + index + 1;
                item.dataset.index = index;
                item.textContent = index;
            });
        } else {
            // 不可能同时满足上面两个条件 因为pages>nums
            showLeft();
            showRight();
            Array.prototype.forEach.call(numLabel, function (item, index) {
                index = min + index;
                item.dataset.index = index;
                item.textContent = index;
            });
        }
    }
    // wrap赋值
    wrapperDom.dataset.index = index;
    wrapperDom.dataset.rows = rows;
    wrapperDom.dataset.count = count;
    wrapperDom.dataset.pages = pages;
    // disabled
    prevDom.classList.remove('page-disabled');
    nextDom.classList.remove('page-disabled');
    if (index == 1) {
        prevDom.classList.add('page-disabled');
    }
    if (index == pages) {
        nextDom.classList.add('page-disabled');
    }
    // active
    Array.prototype.forEach.call(numLabel, function (item) {
        var cindex = item.dataset.index;
        if (cindex == index) item.classList.add('page-active');
        else item.classList.remove('page-active');
    });
    function hideLeft() {
        ellipsisLeftDom.style.display = 'none';
        firstDom.style.display = 'none';
    }
    function showLeft() {
        ellipsisLeftDom.style.display = 'block';
        firstDom.style.display = 'block';
        // 设置值
        firstDom.dataset.index = 1;
        firstDom.textContent = 1;
    }
    function hideRight() {
        ellipsisRightDom.style.display = 'none';
        lastDom.style.display = 'none';
    }
    function showRight() {
        ellipsisRightDom.style.display = 'block';
        lastDom.style.display = 'block';
        lastDom.dataset.index = pages;
        lastDom.textContent = pages;
    }
}

// 接口业务
function getNewData(nIndex, request) {
    var data = newsData[nIndex].children;
    // 传进来的
    var index = request.index,
        count = request.count,
        nums = request.nums,
        // 计算的出的
        rows = data.length,
        pages = Math.ceil(rows / count);
    if (index == 0) index = 1;
    // 返回数据
    return {
        datas: data.slice((index - 1) * count, index * count >= rows ? rows : index * count),
        index: index,
        count: count,
        rows: rows,
        pages: pages,
        nums: nums,
    }
}

// 内容渲染业务
function contentRender(data) {
    // 内容容器
    var container = document.getElementsByClassName('news-content')[0];
    var content = data.datas;
    var html = [];
    var template = function (item) {
        return "<li class='clearfix'>" +
            "<img class='news-content-left' src='" + item.image + "' title='" + item.title + "' alt='" + item.title + "'>" +
            "<div class='news-content-right'>" +
            "<h3 title='" + item.title + "'>" + item.title + "</h3>" +
            "<h4 title='" + item.time + "'>" + item.time + "</h4>" +
            "<div title='" + item.text + "'>" + window.omission(item.text,80) + "</div>" +
            "<p>" +
            "<a href='javascript:void(0)' class='newsSkip' title='查看详情'>查看详情</a>" +
            "</p>" +
            "</div>" +
            "</li>";
    };
    html.push(
        "<ul>"
    );
    for (var ci = 0, clength = content.length; ci < clength; ci++) {
        html.push(template(content[ci]));
    }
    html.push(
        "</ul>"
    );
    container.innerHTML = html.join('').trim();
}

// 总业务
function createPage(nIndex) {
    // 点击模块初始化一次
    initialPage({
        nums: 5,
        ellipsis: '...',
        container: '.news-page',
        count: 8,
        // 扩展方式
        callback: function (page) {
            // 由于这里仅仅是本地数据 所以不需要异步
            var data = getNewData(nIndex, page);
            // 渲染内容
            contentRender(data);
            // 渲染分页
            pageRender(data);
        },
    });
}



/*
    限制：
        index不能为0

    事件：
        1. 只需要触发把分页信息传进来，以及简单判断是否可以点击
        2. active以及disabled 写错了这里应该交给数据那边控制 因为如果数据加载失败就不改变
        3. 还有一点因为index是变化的但是元素不会改变 所有这里不能添加active

    数据渲染
        1. 数据渲染 要将index rows pages全部放到wrapper上
        2. 页标index和内容要改变
*/