// 渲染列表
(function (window, document) {
    var pdcDom = document.getElementsByClassName('pdc-list')[0];

    // 不是产品页面
    if (!pdcDom) return;
    // 两个页面使用 produce和scheme除了数据不一样都是一样的
    var produce = produceData,
        produceShow = [],
        // nav.js要先执行
        index = window.navObj.index;
    var html = [];

    // 根据导航显示哪些内容
    if (index == -1) {
        produceShow = produce;
    } else if (produce[index]) {
        produceShow = [produce[index]];
    } else {
        location.href = './index.html';
    }
    produceShow.forEach(function (item, index) {
        var children = item.children;
        html.push(
            "<h2>" + item.title + "</h2>" +
            "<ul class='clearfix'>"
        )
        children.forEach(function (item, index) {
            if (item.type == 1) {

                html.push(
                    "<li data-index='" + index + "'>" +
                    "<a href='javascript:void(0)' class='cSkip' title='" + item.title + "'>" +
                    " <figure class='pdc-dynamic'>" +
                    " <mark class='pdc-mask'></mark>" +
                    "<img src='" + item.img + "' alt='" + item.title + "' title='" + item.title + "'>" +
                    "<figcaption class='text-color-2'>" + item.title + "</figcaption>" +
                    "</figure>" +
                    " </a>" +
                    "</li>"
                );
            };

        })
        html.push(
            "</ul>"
        )
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
                        window.location.href = infoHref + index;
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


// 详情页
!function (window, document) {

    // 生成轮播图
    var banner = document.getElementsByClassName('aside-banner')[0]
    // 非pinfo页面
    if (!banner) return;
    var wrapper = banner.querySelector('.swiper-wrapper');
    var produce = produceData,
        produceShow = [];
    // nav.js要先执行
    var html = [];
    var nIndex = window.navObj.index;
    if (nIndex == -1) {
        produce.forEach(function (item) {
            var children = item.children;
            if (children) {
                children.forEach(function (citem) {
                    produceShow.push(citem);
                });
            }

        });
    } else {
        // nindex必定存在对应的内容
        produceShow = produce[nIndex].children;
    }

    produceShow.forEach(function (item, index) {
        // 类型为1的数据 左边渲染方式
        if (item.type == 1) {
            html.push(
                "<li data-index='" + index + "' class='swiper-slide'>" +
                "<a href='javascript:void(0)' data-mark='assign' class='nextPrevA' title='" + item.title + "'>" +
                " <figure class='pdci-dynamic'>" +
                " <mark class='pdci-mask'></mark>" +
                "<img src='" + item.img + "' alt='" + item.title + "' title='" + item.title + "'>" +
                "<figcaption class='text-color-2'>" + window.omission(item.title, 9) + "</figcaption>" +
                "</figure>" +
                " </a>" +
                "</li>",
            );
        };
    });
    // 保存produceShow的长度 进而判断轮播slidesPreView
    window.produceShowLength = produceShow.length;
    wrapper.insertAdjacentHTML("afterbegin", html.join('').trim());




    // 产品详情
    var right = document.getElementsByClassName('pdci-right')[0];
    if (!right) return;
    // 当前导航产品的索引
    var produceIndex = window.sessionStorage.getItem('produceIndex');
    var content = produceShow[produceIndex];
    var contentHtml = [];
    // 如果后面没有菜单 那么隐藏菜单 可以判断值是否为空然后 设置隐藏
    // 类型为1的右边渲染方式
    if (content.type == 1) {
        //  一级菜单以及图片
        var imgSrc = [];
        var imgSum = content.image.length;
        if (imgSum == 1) imgSum = 5 / 3;
        if (imgSum == 2) imgSum = 5 / 2;
        content.image.forEach(function (img, index) {
            imgSrc.push(
                "<img class='equalHeight' src='" + img + "' style='width: calc(100% / " + imgSum + ")' alt='" + content.title + "' title='" + content.title + "'>"
            )
        });
        imgSrc = imgSrc.join('').trim();
        contentHtml.push(
            "<h1 class='pdci-title1 text-color-1' title='" + content.title + "'>" + content.title + "</h1>" +
            "<div class='pdci-content-img segment'>" +
            "<h3 class='pdci-title2 text-color-1' title='" + content.title + "'>产品图片</h3>" +
            imgSrc +
            "</div>"
        );
        // 要素以及二级菜单 
        var feature = content.feature;
        if (feature) {
            feature.forEach(function (item) {
                contentHtml.push(
                    "<ul class='pdci-feature segment'>"
                )
                contentHtml.push(
                    "<li>" +
                    "<h3 class='pdci-title2 text-color-1'>" + item.title + "</h3>" +
                    "<ul>"
                );
                // 三级菜单
                var content = item.content;
                content.forEach(function (item) {
                    var h4 = '';
                    if (item.title)
                        h4 = "<h4 class='pdci-title3  text-color-2'>" + item.title + "</h4>"
                    contentHtml.push(
                        "<li>" +
                        h4 +
                        "<div class='pdci-content'>"
                    );

                    var list = item.list;
                    var indent = item.indent;
                    // var spacing = item.spacing;
                    // 内容
                    list.forEach(function (item) {
                        contentHtml.push(
                            "<p class='text-color-2' " + (indent ? "style='text-indent: " + indent * 16 + 'px' + ";" : '') + "'>" + item + "</p>"
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
                contentHtml.push(
                    "</ul>"
                );
            });

        }
        // 参数
        var parameter = content.parameter;
        if (parameter) {
            parameter.forEach(function (item) {
                contentHtml.push(
                    "<div class='pdci-table segment'>" +
                    "<h3 class='pdci-title2 text-color-1'>" + item.title + "</h3>"
                );
                contentHtml.push(
                    "<table>"
                );
                // 表格标题
                var caption = item.caption;
                if (caption) {
                    contentHtml.push(
                        "<caption class='text-color-2'>" + caption.name + ":" + caption.value + "</caption>"
                    );
                }
                contentHtml.push(
                    "<thead class='text-color-2'><tr>"
                );
                // 表格头部
                var thead = item.thead;
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
                var tbody = item.tbody;
                // 格式以固定 没有做任何判断
                tbody.forEach(function (item) {
                    var rowspan = item.rowspan;
                    var children = item.children;
                    var value = item.value;
                    children.forEach(function (citem, index) {
                        var cchildren = citem.children;
                        if (cchildren) {
                            // 如果有第四行 当然默认行数和23行相同 暂时这样以后再改 
                            var cc_chidren = cchildren[0].children;
                            if (rowspan && rowspan > 1) {
                                if (index == 0) {
                                    // 第三项也没做判断 默认只有一行和第二行数相同
                                    contentHtml.push(
                                        "<tr>" +
                                        "<td rowspan='" + rowspan + "' class='pdci-rhead'>" + value + "</td>" +
                                        "<td class='pdci-rcontent1'>" + citem.value + "</td>" +
                                        "<td class='pdci-rcontent2'>" + cchildren[0].value + "</td>"
                                    );
                                    if (cc_chidren)
                                        contentHtml.push(
                                            "<td class='pdci-rcontent2'>" + cc_chidren[0].value + "</td>"
                                        )
                                    contentHtml.push(
                                        "</tr>"
                                    )
                                } else {
                                    contentHtml.push(
                                        "<tr>" +
                                        "<td class='pdci-rcontent1'>" + citem.value + "</td>" +
                                        "<td class='pdci-rcontent2'>" + cchildren[0].value + "</td>"
                                    )
                                    if (cc_chidren)
                                        contentHtml.push(
                                            "<td class='pdci-rcontent2'>" + cc_chidren[0].value + "</td>"
                                        )
                                    contentHtml.push(
                                        "</tr>"
                                    )
                                }
                            } else {
                                contentHtml.push(
                                    "<tr>" +
                                    "<td class='pdci-rhead'>" + value + "</td>" +
                                    "<td class='pdci-rcontent1'>" + citem.value + "</td>" +
                                    "<td class='pdci-rcontent2'>" + cchildren[0].value + "</td>"
                                )
                                if (cc_chidren)
                                    contentHtml.push(
                                        "<td class='pdci-rcontent2'>" + cc_chidren[0].value + "</td>"
                                    )
                                contentHtml.push(
                                    "</tr>"
                                )
                            }
                        } else {
                            if (rowspan && rowspan > 1) {
                                if (index == 0) {
                                    // 第三项也没做判断 默认只有一行和第二行数相同
                                    contentHtml.push(
                                        "<tr>" +
                                        "<td rowspan='" + rowspan + "' class='pdci-rhead'>" + value + "</td>" +
                                        "<td class='pdci-rcontent1'>" + citem.value + "</td>"
                                    );
                                    contentHtml.push(
                                        "</tr>"
                                    )
                                } else {
                                    contentHtml.push(
                                        "<tr>" +
                                        "<td class='pdci-rcontent1'>" + citem.value + "</td>"
                                    )
                                    contentHtml.push(
                                        "</tr>"
                                    )
                                }
                            } else {
                                contentHtml.push(
                                    "<tr>" +
                                    "<td class='pdci-rhead'>" + value + "</td>" +
                                    "<td class='pdci-rcontent1'>" + citem.value + "</td>"
                                )
                                contentHtml.push(
                                    "</tr>"
                                )
                            }
                        }

                    });

                });
                contentHtml.push(
                    "</tbody>" +
                    "</table>" +
                    "</div>"
                )
            });
        }
    }
    // 上下页
    if (produceShowLength >= 2) {
        contentHtml.push(
            "<div class='pdci-nextPrev clearfix'>"
        )
        if (produceIndex == 0) {
            // 没有上一页 只显示下一页
            contentHtml.push(
                "<div class='pdci-nextPrev-right'>" +
                "<span  class='text-color-1' title='" + produceShow[produceIndex - 0 + 1].title + "'>" + produceShow[produceIndex - 0 + 1].title +
                "</span><a href='javascript:void(0);' data-mark='next' title='" + produceShow[produceIndex - 0 + 1].title + "' class='nextPrevA text-color-3'>下一篇&gt;</a>" +
                "</div>"
            )
        } else if (produceIndex == produceShowLength - 1) {
            // 没有下一页 只显示上一页
            contentHtml.push(
                "<div class='pdci-nextPrev-left'>" +
                "<a href='javascript:void(0);' data-mark='prev' title='" + produceShow[produceIndex - 1].title +
                "' class='nextPrevA text-color-3'>&lt;上一篇</a><span  class='text-color-1' title='" + produceShow[produceIndex - 1].title + "'>" + produceShow[produceIndex - 1].title + "</span>" +
                "</div>"
            )
        } else {
            // 有上一页也有下一页
            contentHtml.push(
                "<div class='pdci-nextPrev-left'>" +
                "<a href='javascript:void(0);' data-mark='prev' title='" + produceShow[produceIndex - 1].title +
                "' class='nextPrevA text-color-3'>&lt;上一篇</a><span  class='text-color-1' title='" + produceShow[produceIndex - 1].title + "'>" + produceShow[produceIndex - 1].title + "</span>" +
                "</div>",
                "<div class='pdci-nextPrev-right'>" +
                "<span  class='text-color-1' title='" + produceShow[produceIndex - 0 + 1].title + "'>" + produceShow[produceIndex - 0 + 1].title +
                "</span><a href='javascript:void(0);' data-mark='next' title='" + produceShow[produceIndex - 0 + 1].title + "' class='nextPrevA text-color-3'>下一篇&gt;</a>" +
                "</div>"
            )
        }
        contentHtml.push(
            "</div>"
        )
    } else {
        // 没有上一页也没有下一页 什么都不显示
    }
    right.insertAdjacentHTML('afterbegin', contentHtml.join('').trim());
    // 图片等高操作 由于图片没有加载完成 所以获取的高度为0
    // var equalHeightDom = document.querySelectorAll('.equalHeight');
    // var equalHeight = [];
    // for(var ehi=0,ehlength=equalHeightDom.length;ehi<ehlength;ehi++) {
    //     equalHeight.push(parseInt(window.getComputedStyle(equalHeightDom[ehi],null).getPropertyValue('height')));
    // }
    // // 取最大高度
    // var maxImgHeight = Math.max.apply(null,equalHeight);
    // Array.prototype.forEach.call(equalHeightDom,function(item){
    //     item.style.height = maxImgHeight + 'px';
    // }); 
    // 绑定上下页 以及轮播a标签
    var nextPrevAHandle = {
        handleEvent(e) {
            switch (e.type) {
                case 'click':
                    e.stopPropagation();
                    e.preventDefault();
                    var current = e.currentTarget;
                    // 上一页
                    var mark = current.dataset.mark;
                    if (mark == 'next') {
                        window.sessionStorage.setItem('produceIndex', produceIndex - 0 + 1)
                    } else if (mark == 'prev') {
                        window.sessionStorage.setItem('produceIndex', produceIndex - 0 - 1)
                    } else if (mark == 'assign') {
                        // 点击轮播跳转
                        window.sessionStorage.setItem('produceIndex', current.parentElement.dataset.index);
                    }
                    location.href = infoHref + nIndex;
                    break;
            }
        }
    }
    var nextPrevA = document.querySelectorAll('.nextPrevA');
    for (var np = 0, npLength = nextPrevA.length; np < npLength; np++) {
        nextPrevA[np].addEventListener('click', nextPrevAHandle, {
            capture: false,
            once: false,
            passive: false,
        })
    }
}(window, document);


