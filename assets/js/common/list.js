// 首页 产品 解决 渲染列表
function listRender(data, config) {
    var container = document.querySelector(config.container);
    show = [];
    var html = [];
    if (config.category == 'index') {
        var countLength = 0;
        data.forEach(function (item, index) {
            // 获取子项的cindex
            var cindex = Math.floor(item.children.length * Math.random());
             // 随机每个子项放一个
            var content = item.children[cindex];
            // 将cindex保存到content中去
            content.cindex = cindex + countLength;
            countLength +=item.children.length;
            show.push(content);
        });
        html.push(
            "<h2 title='" + config.title + "'>" + config.title + "</h2>" +
            "<h3 title='" + config.subtext + "'>" + config.subtext + "</h3>" +
            "<ul class='clearfix'>"
        );
        show.forEach(function (item) {
            if (item.type == 1) {
                // 保证点击详情找到正确的
                html.push(litemplate(item,item.cindex,config.cname));
            } else if(item.type == 2) {
                html.push(litemplate(item,item.cindex,config.cname));
            };
        });
    } else if (config.category == 'produce' || config.category == 'scheme') {
        if(config.nindex==-1) show = data;
        else if(data[config.nindex]) show = [data[config.nindex]];
        else window.location.href = './index.html';
        var countIndex = -1;
        show.forEach(function (item, index) {
            var children = item.children;
            html.push(
                "<h2 title='" + item.title + "'>" + item.title + "</h2>" +
                "<h3 title='" + item.subtext + "'>" + item.subtext + "</h3>" +
                "<ul class='clearfix'>"
            )
            children.forEach(function (item, index) {
                countIndex++;
                if (item.type == 1) {
                    html.push(litemplate(item,countIndex));
                };
            })
            html.push(
                "</ul>"
            )
        });
    } else if(config.category == 'special') {
        var countLength = 0;
        data.forEach(function (item, index) {
            // 获取子项的cindex
            var cindex = 0;
             // 随机每个子项放一个
            var content = item.children[cindex];
            // 将cindex保存到content中去
            content.cindex = cindex + countLength;
            countLength +=item.children.length;
            if(index==0) {
                content.title = '交通行业解决方案'
                content.summary = '交通行业解决方案'
            }
            if(index==1) {
                content.title = '军队行业解决方案'
                content.summary = '军队行业解决方案'
            }
            if(index==2) {
                content.title = '教育行业解决方案'
                content.summary = '教育行业解决方案'
            }
            show.push(content);
        });
        html.push(
            "<h2 title='" + config.title + "'>" + config.title + "</h2>" +
            "<h3 title='" + config.subtext + "'>" + config.subtext + "</h3>" +
            "<ul class='clearfix'>"
        );
        show.forEach(function (item) {
            if (item.type == 1) {
                // 保证点击详情找到正确的
                html.push(litemplate(item,item.cindex,config.cname));
            } else if(item.type == 2) {
                html.push(litemplate(item,item.cindex,config.cname));
            };
        });
    }
    html.push(
        "</ul>"
    )
    if (config.more)
        html.push(
            "<div class='pdc-more'>" +
            "<a class='pdc-more-a "+config.moreCName+"'  href='javascript:void(0) title='查看更多'>查看更多</a>" +
            "</div>"
        );
    container.insertAdjacentHTML("afterbegin", html.join('').trim());

    // li结构
    function litemplate(item,index,cname) {
        if(!cname) cname = 'cSkip'
           return "<li data-index='" + index + "'>" +
            "<a href='javascript:void(0)' class='"+cname+"' title='" + item.title + "' data-title='"+item.title+"'>" +
            "<figure class='pdc-dynamic'>" +
            "<mark class='pdc-mask'>" + item.title + "</mark>" +
            "<img src='" + item.img + "' alt='" + item.title + "' title='" + item.title + "'>" +
            "<figcaption class='text-color-2' title='" + item.summary + "'>" + window.omission(item.summary, 40) + "</figcaption>" +
            "</figure>" +
            " </a>" +
            "</li>"
    }
    // 点击查看更多跳转
    function lookMore() {
        var moreCName = config.moreCName;
        var as = document.querySelectorAll("."+moreCName);
        var ecallback = {
            handleEvent(e) {
                switch (e.type) {
                    case 'click':
                        e.preventDefault();
                        e.stopPropagation();
                        window.location.href = config.moreUrl;
                        break;
                }
            }
        };
        for (var i = 0, length = as.length; i < length; i++) {
            as[i].addEventListener('click', ecallback, {
                capture: false,
                once: false,
                passive: false,
            })
        }
    };
    if (config.more)
        lookMore();

    // 点击单个跳转跳转
    function cSkip() {
        // a集合
        var cname = config.cname;
        if(!cname) cname='cSkip'
        var as = document.getElementsByClassName(cname);
        var ecallback = {
            handleEvent(e) {
                switch (e.type) {
                    case 'click':
                        e.preventDefault();
                        e.stopPropagation();
                        var current = e.currentTarget;
                        var cindex = current.parentElement.dataset.index;
                        window.sessionStorage.setItem('cindex', cindex);
                        // nav强制等于-1显示所有 因为是从首页跳转的
                        console.log(config.url)
                        if(config.category == 'special') {
                            var title = current.dataset.title;
                            if(title == '交通行业解决方案') {
                                window.location.href = './scheme.html?nav=0';
                            } else if(title == '军队行业解决方案') {
                                window.location.href = './scheme.html?nav=1';
                            } else if(title == '教育行业解决方案') {
                                window.location.href = './scheme.html?nav=2';
                            }
                        } else {
                            window.location.href = config.url + config.nindex;
                        }
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
};


