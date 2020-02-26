// 渲染列表
(function (window, document) {
    var pdcDom = document.getElementsByClassName('pdc-list')[0];

    // 不是产品页面
    if (!pdcDom) return;

    var produce = produceData,
        produceShow = [],
        // nav.js要先执行
        index = window.navObj.index;
    var html = [];

    // 根据导航显示哪些内容
    if (index == -1) {
        produce.forEach(function (item) {
            var children = item.children;
            if (children) {
                children.forEach(function (citem) {
                    produceShow.push(citem);
                });
            }

        });
    } else if (produce[index]) {
        produceShow = produce[index].children;
    } else {
        location.href = './index.html';
    }
    produceShow.forEach(function (item, index) {
        if (item.type == 1) {
            html.push(
                "<li data-index='" + index + "'>" +
                "<a href='javascript:void(0)' class='cSkip' title='" + item.title + "'>" +
                " <figure class='pdc-dynamic'>" +
                " <mark class='pdc-mask'></mark>" +
                "<img src='" + item.image + "' alt='" + item.title + "'>" +
                "<figcaption class='text-color-2'>" + item.title + "</figcaption>" +
                "</figure>" +
                " </a>" +
                "</li>"
            );
        };
    });
    pdcDom.innerHTML = html.join('').trim();

    // 点击跳转
    function cSkip() {
        // a集合
        var as = document.getElementsByClassName('cSkip');
        var ecallback = {
            handleEvent(e) {
                switch (e.type) {
                    case 'click':
                        e.preventDefault();
                        e.stopPropagation();
                        var current = e.currentTarget;
                        var cindex = current.parentElement.dataset.index;
                        window.sessionStorage.setItem('produceIndex', cindex);
                        window.location.href = './pinfo.html?nav=' + index;
                        break;
                }
            }
        }
        for (var i = 0, length = as.length; i < length; i++) {
            as[i].addEventListener('click', ecallback, {
                capture: false,
                once: false,
                passive: false,
            });
        }
    }
    cSkip();

})(window, document);



!function (window, document) {

    // 生成轮播图
    var wrapper = document.getElementsByClassName('aside-banner')[0].querySelector('.swiper-wrapper');
    var produce = produceData,
        produceShow = [];
    // nav.js要先执行
    var html = [];
    produce.forEach(function (item) {
        var children = item.children;
        if (children) {
            children.forEach(function (citem) {
                produceShow.push(citem);
            });
        }

    });
    produceShow.forEach(function (item, index) {
        if (item.type == 1) {
            html.push(
                "<li data-index='" + index + "' class='swiper-slide'>" +
                "<a href='javascript:void(0)' class='icSkip' title='" + item.title + "'>" +
                " <figure class='pdci-dynamic'>" +
                " <mark class='pdci-mask'></mark>" +
                "<img src='" + item.image + "' alt='" + item.title + "'>" +
                "<figcaption class='text-color-2'>" + item.title + "</figcaption>" +
                "</figure>" +
                " </a>" +
                "</li>",
                "<li data-index='" + index + "' class='swiper-slide'>" +
                "<a href='javascript:void(0)' class='icSkip' title='" + item.title + "'>" +
                " <figure class='pdci-dynamic'>" +
                " <mark class='pdci-mask'></mark>" +
                "<img src='" + item.image + "' alt='" + item.title + "'>" +
                "<figcaption class='text-color-2'>" + item.title + "</figcaption>" +
                "</figure>" +
                " </a>" +
                "</li>",
                "<li data-index='" + index + "' class='swiper-slide'>" +
                "<a href='javascript:void(0)' class='icSkip' title='" + item.title + "'>" +
                " <figure class='pdci-dynamic'>" +
                " <mark class='pdci-mask'></mark>" +
                "<img src='" + item.image + "' alt='" + item.title + "'>" +
                "<figcaption class='text-color-2'>" + item.title + "</figcaption>" +
                "</figure>" +
                " </a>" +
                "</li>",
                "<li data-index='" + index + "' class='swiper-slide'>" +
                "<a href='javascript:void(0)' class='icSkip' title='" + item.title + "'>" +
                " <figure class='pdci-dynamic'>" +
                " <mark class='pdci-mask'></mark>" +
                "<img src='" + item.image + "' alt='" + item.title + "'>" +
                "<figcaption class='text-color-2'>" + item.title + "</figcaption>" +
                "</figure>" +
                " </a>" +
                "</li>",
                "<li data-index='" + index + "' class='swiper-slide'>" +
                "<a href='javascript:void(0)' class='icSkip' title='" + item.title + "'>" +
                " <figure class='pdci-dynamic'>" +
                " <mark class='pdci-mask'></mark>" +
                "<img src='" + item.image + "' alt='" + item.title + "'>" +
                "<figcaption class='text-color-2'>" + item.title + "</figcaption>" +
                "</figure>" +
                " </a>" +
                "</li>",
                "<li data-index='" + index + "' class='swiper-slide'>" +
                "<a href='javascript:void(0)' class='icSkip' title='" + item.title + "'>" +
                " <figure class='pdci-dynamic'>" +
                " <mark class='pdci-mask'></mark>" +
                "<img src='" + item.image + "' alt='" + item.title + "'>" +
                "<figcaption class='text-color-2'>" + item.title + "</figcaption>" +
                "</figure>" +
                " </a>" +
                "</li>",
                "<li data-index='" + index + "' class='swiper-slide'>" +
                "<a href='javascript:void(0)' class='icSkip' title='" + item.title + "'>" +
                " <figure class='pdci-dynamic'>" +
                " <mark class='pdci-mask'></mark>" +
                "<img src='" + item.image + "' alt='" + item.title + "'>" +
                "<figcaption class='text-color-2'>" + item.title + "</figcaption>" +
                "</figure>" +
                " </a>" +
                "</li>",
                "<li data-index='" + index + "' class='swiper-slide'>" +
                "<a href='javascript:void(0)' class='icSkip' title='" + item.title + "'>" +
                " <figure class='pdci-dynamic'>" +
                " <mark class='pdci-mask'></mark>" +
                "<img src='" + item.image + "' alt='" + item.title + "'>" +
                "<figcaption class='text-color-2'>" + item.title + "</figcaption>" +
                "</figure>" +
                " </a>" +
                "</li>"
            );
        };
    });
    wrapper.insertAdjacentHTML("afterbegin", html.join('').trim());

    // 产品详情
    var right = document.getElementsByClassName('pdci-right')[0];
    if (!right) return;
    var produceIndex = window.sessionStorage.getItem('produceIndex');
    var content = produceShow[produceIndex];
    var contentHtml = [];
    // 如果后面没有菜单 那么隐藏菜单 可以判断值是否为空然后 设置隐藏
    if (content.type == 1) {
        //  一级菜单以及图片
        contentHtml.push(
            "<h1 class='pdci-title1 text-color-1' title='" + content.title + "'>" + content.title + "</h1>" +
            "<div class='pdci-content-img'>" +
            "<h3 class='pdci-title2 text-color-1' title='" + content.title + "'>产品图片</h3>" +
            "<img src='" + content.image + "' alt='" + content.title + "' title='" + content.title + "'>" +
            "</div>" +
            "<ul class='pdci-feature'>"
        );
        // 要素以及二级菜单 
        var feature = content.feature;
        feature.forEach(function (item) {
            contentHtml.push(
                "<li>" +
                "<h3 class='pdci-title2 text-color-1'>" + item.title + "</h3>" +
                "<ul>"
            );
            // 三级菜单
            var content = item.content;
            content.forEach(function (item) {
                contentHtml.push(
                    "<li>" +
                    "<h4 class='pdci-title3  text-color-2'>" + item.title + "</h4>" +
                    "<div class='pdci-content'>"
                );
                var list = item.list;
                // 内容
                list.forEach(function (item) {
                    contentHtml.push(
                        "<p class='text-color-2'>" + item + "</p>"
                    )
                });
                contentHtml.push(
                    "</div>" +
                    "</li>"
                )
            })
            contentHtml.push(
                "</ul></li>"
            )
        });
        contentHtml.push(
            "</ul>"
        );

        // 参数
        var parameter = content.parameter;
        contentHtml.push(
            "<div class='pdci-table'>" +
            "<h3 class='pdci-title2 text-color-1'>" + parameter.title + "</h3>"
        );
        // 表格标题
        var caption = parameter.caption;
        contentHtml.push(
            "<table>" +
            "<caption class='text-color-2'>" + caption.name + ":" + caption.value + "</caption>" +
            "<thead class='text-color-2'><tr>"
        );
        // 表格头部
        var thead = parameter.thead;
        thead.forEach(function (item) {
            contentHtml.push(
                "<th class='pdci-chead'>" + item.value + "</th>"
            );
        });
        contentHtml.push(
            "</tr>" +
            "</thead>" +
            "<tbody class='text-color-2'>"
        );
        // 表格身体
        var tbody = parameter.tbody;
        // 格式以固定 没有做任何判断
        tbody.forEach(function (item) {
            var rowspan = item.rowspan;
            var children = item.children;
            var value = item.value;
            children.forEach(function (citem, index) {
                var cchildren = citem.children;
                if (index == 0) {
                    // 第三项也没做判断 默认只有一行和第二行数相同
                    contentHtml.push(
                        "<tr>" +
                        "<td rowspan='" + rowspan + "' class='pdci-rhead'>" + value + "</td>" +
                        "<td class='pdci-rcontent1'>" + citem.value + "</td>" +
                        "<td class='pdci-rcontent2'>" + cchildren[0].value + "</td>" +
                        "</tr>"
                    )
                } else {
                    contentHtml.push(
                        "<tr>" +
                        "<td class='pdci-rcontent1'>" + citem.value + "</td>" +
                        "<td class='pdci-rcontent2'>" + cchildren[0].value + "</td>" +
                        "</tr>"
                    )
                }
            });

        });
        contentHtml.push(
            "</tbody>" +
            "</table>" +
            "</div>"
        )

    }
    right.insertAdjacentHTML('afterbegin',contentHtml.join('').trim());

}(window, document);


