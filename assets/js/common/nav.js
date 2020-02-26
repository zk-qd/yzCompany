

// 获取头部导航信息
!function () {
    var href = location.href,
        nav = 0,
        hrefs = href.split('?');
    if (hrefs.length == 1) {
        nav = 0;
    } else {
        // 人为改变时
        try {
            var search = hrefs[1].split('=');
            if (search[0] !== 'nav') throw new URIError('');
            nav = search[1];
            if (!nav || isNaN(nav)) throw new URIError('');
        } catch (e) {
            nav = 0;
        }
    };
    var fileName = href.match(/\w+(?=.html)/)[0];
    // 判断是否是详情页
    if(fileName == 'pinfo') fileName = 'produce';
    window.navObj = {
        index: nav,
        beforeIndex: 0,
        fileName: fileName,
    }
}();

//  导航栏选中
window.navSelected = function (navObj) {
    if(!navObj) navObj = window.navObj;
    var className = 'hd-' + navObj.fileName,
        index = navObj.index,
        beforeIndex = navObj.beforeIndex,
        pli = document.querySelector('nav.hd-nav').querySelector('.' + className);
    var clis = pli.querySelectorAll('li');
    if(index == -1) {
        // 只选中头部
        clis[beforeIndex]&&clis[beforeIndex].classList.remove('active');
        pli.classList.add('active');
    } else if (clis.length) {
        // 删除之前的
        clis[beforeIndex]&&clis[beforeIndex].classList.remove('active');
        pli.classList.add('active');
        clis[index].classList.add('active');
    } else {
        pli.classList.add('active');
    }
    
};


// 顶部导航
(function (window, document) {
    // 渲染导航
    var nav = [
        {
            className: 'hd-index',
            title: '亚哲首页',
            url: './index.html',
        },
        {
            className: 'hd-about',
            title: '关于亚哲',
            url: './about.html?nav=0',
            children: [
                {
                    title: '企业简介',
                    url: './about.html?nav=0',
                },
                {
                    title: '企业文化',
                    url: './about.html?nav=1',
                },
                {
                    title: '组织架构',
                    url: './about.html?nav=2',
                },
                {
                    title: '资质荣誉',
                    url: './about.html?nav=3',
                },
            ]
        },
        {
            className: 'hd-produce',
            title: '产品中心',
            url: './produce.html?nav=-1',
            children: [
                {
                    title: '公交设配',
                    url: './produce.html?nav=0',
                },
                {
                    title: '出租/约租设备',
                    url: './produce.html?nav=1',
                },
                {
                    title: '人脸识别系统',
                    url: './produce.html?nav=2',
                },
                {
                    title: '辅助驾驶设备',
                    url: './produce.html?nav=3',
                },
                {
                    title: '军队产品',
                    url: './produce.html?nav=4',
                },
            ]
        },
        {
            className: 'hd-scheme',
            title: '解决方案',
            url: './scheme.html?nav=0',
            children: [
                {
                    title: '交通行业',
                    url: './scheme.html?nav=0',
                },
                {
                    title: '军队行业',
                    url: './scheme.html?nav=1',
                },
                {
                    title: '教育行业',
                    url: './scheme.html?nav=2',
                },
            ]
        },
        {
            className: 'hd-news',
            title: '新闻资讯',
            url: './news.html?nav=0',
            children: [
                {
                    title: '热点新闻',
                    url: './news.html?nav=0',
                },
                {
                    title: '企业动向',
                    url: './news.html?nav=1',
                },
                {
                    title: '行业新闻',
                    url: './news.html?nav=2',
                },
            ]
        },
        {
            className: 'hd-contact',
            title: '联系我们',
            url: './contact.html?nav=0',
            children: [
                {
                    title: '公司地图',
                    url: './contact.html?nav=0',
                },
                {
                    title: '联系方式',
                    url: './contact.html?nav=1',
                },
                {
                    title: '在线留言',
                    url: './contact.html?nav=3',
                },
                {
                    title: '在线留言',
                    url: './contact.html?nav=4',
                },
            ]
        },
    ];
    var html = [];
    html.push("<ul class='hd-navp'>");
    for (var i = 0, length = nav.length; i < length; i++) {
        var parent = nav[i];
        html.push(
            "<li class='" + parent.className + "'>" +
            "<h3 title='" + parent.title + "'>" +
            "<a class='text-color-1' href='" + parent.url + "' title='" + parent.title + "'>" + parent.title + "</a>" +
            "</h3>"
        );
        if (parent.children) {
            var children = parent.children;
            html.push("<ul>");
            for (var j = 0, jLength = children.length; j < jLength; j++) {
                var item = children[j];
                html.push(
                    "<li class='" + item.className + "'>" +
                    "<h3 title='" + item.title + "'>" +
                    "<a class='text-color-1' href='" + item.url + "' title='" + item.title + "'>" + item.title + "</a>" +
                    "</h3>" +
                    "</li>"
                );
            }
            html.push("</ul>")
        }
        html.push("</li>")
    }
    html.push("</ul>");
    var navDom = document.querySelector('nav.hd-nav');
    navDom.innerHTML = html.join('').trim();

    // li标签绑定鼠标悬停事件 子菜单下拉
    function liMouseEvent() {
        var lis = document.getElementsByClassName('hd-navp')[0].querySelectorAll('li');
        var handle = {
            handleEvent(e) {
                var current = e.currentTarget,
                    ul = current.querySelector('ul');
                switch (e.type) {
                    case 'mouseenter':
                        if (ul) {
                            var count = ul.childElementCount;
                            ul.style.height = count * 40 + 'px';
                        }
                        break;
                    case 'mouseleave':
                        if (ul) {
                            var count = ul.childElementCount;
                            ul.style.height = 0 + 'px';
                        }
                        break;
                }
            }
        };
        Array.prototype.forEach.call(lis, function (item, index) {
            item.addEventListener('mouseenter', handle);
            item.addEventListener('mouseleave', handle);
        });
    }
    liMouseEvent();
    // 初始化选中
    window.navSelected();
})(window, document);




// 底部导航
(function (window, document) {
    var footer = document.getElementsByClassName('footer')[0];
    footer.innerHTML =
        `<div class='center'>
            <ul class='ft-top clearfix'>
                <div class='ft-left'>
                    <ul class='ft-about'>
                        <li>
                            <h3><span class='ft-border'>关于</span>亚哲</h3>
                        </li>
                        <li>
                            <a href='#' title='企业简介' alt='企业简介'>企业简介</a>
                        </li>
                        <li>
                            <a href='#' title='企业简介' alt='企业简介'>企业简介</a>
                        </li>
                        <li>
                            <a href='#' title='企业简介' alt='企业简介'>企业简介</a>
                        </li>
                        <li>
                            <a href='#' title='企业简介' alt='企业简介'>企业简介</a>
                        </li>
                        <li>
                            <a href='#' title='企业简介' alt='企业简介'>企业简介</a>
                        </li>
                    </ul>
                    <ul class='ft-produce'>
                        <li>
                            <h3><span class='ft-border'>关于</span>亚哲</h3>
                        </li>
                        <li>
                            <a href='#' title='企业简介' alt='企业简介'>企业简介</a>
                        </li>
                        <li>
                            <a href='#' title='企业简介' alt='企业简介'>企业简介</a>
                        </li>
                        <li>
                            <a href='#' title='企业简介' alt='企业简介'>企业简介</a>
                        </li>
                        <li>
                            <a href='#' title='企业简介' alt='企业简介'>企业简介</a>
                        </li>
                        <li>
                            <a href='#' title='企业简介' alt='企业简介'>企业简介</a>
                        </li>
                    </ul>
                    <ul class='ft-news'>
                        <li>
                            <h3><span class='ft-border'>关于</span>亚哲</h3>
                        </li>
                        <li>
                            <a href='#' title='企业简介' alt='企业简介'>企业简介</a>
                        </li>
                        <li>
                            <a href='#' title='企业简介' alt='企业简介'>企业简介</a>
                        </li>
                        <li>
                            <a href='#' title='企业简介' alt='企业简介'>企业简介</a>
                        </li>
                        <li>
                            <a href='#' title='企业简介' alt='企业简介'>企业简介</a>
                        </li>
                        <li>
                            <a href='#' title='企业简介' alt='企业简介'>企业简介</a>
                        </li>
                    </ul>
                </div>
                <div class='ft-right clearfix'>
                    <ul>
                        <li><span class='iconfont icon-phone1'></span>电话:&nbsp;&nbsp;<em>020-89857781</em></li>
                        <li><span class='iconfont icon-phone1'></span>销售电话:&nbsp;&nbsp;<em>020-38330668</em></li>
                        <li><span style='font-size: 16px;' class='iconfont icon-phone'></span>服务热线:&nbsp;&nbsp;<em>020-38330668</em></li>
                        <li><span class='iconfont icon-emailFilled
                        '></span>技术支持邮箱:&nbsp;&nbsp;<em>020-38330668</em></li>
                        <li><span class='iconfont icon-adress'></span>地址:&nbsp;&nbsp;<em>广州市黄埔区科学大道50号绿地中央广场A3栋1806</em></li>
                    </ul>
                    <div>
                        <img src="" alt="">
                        <p>关注亚哲官方微信</p>
                    </div>
                    <div>
                        <img src="" alt="">
                        <p>关注亚哲官方微信</p>
                    </div>
                </div>
            </ul>
        </div>
        <div class='ft-bottom'>
        COPYRIGHT© 2017-2021 © 广东亚哲科技股份有限公司 | 粤ICP备16104266号-1
        </div>
    `
})(window, document);

// 返回顶层
(function (window, document) {
    var body = document.body;
    body.setAttribute('id', 'anchor-top');
    body.insertAdjacentHTML('beforeend',
        "<a href='#anchor-top' class='anchor-top'>" +
        "<img src='http://200.300.cn/xyx/img/topback0.gif'>" +
        "</a>");
    var anchor = document.getElementsByClassName('anchor-top')[0];
    window.addEventListener('scroll', function (e) {
        var y = e.currentTarget.scrollY;
        if (y == 0) anchor.style.display = 'none';
        else anchor.style.display = 'block';
    });
})(window, document);



// 侧边栏
(function (window, document) {
    var aside = document.getElementsByClassName('aside-nav')[0];
    var content = document.getElementsByClassName('content-nav')[0];
    if (aside) {
        aside.addEventListener('click', function (e) {
            var active = e.target,
                current = e.currentTarget,
                lis = current.children,
                index,
                beforeIndex = 0;
            // 如果不是target不是li
            if (active.nodeName.toLowerCase() !== 'li') active = active.parentElement;
            for (var i = 0, length = lis.length; i < length; i++) {
                // 记录上一次的index和当前的index
                if (lis[i].classList.contains('active')) beforeIndex = i;
                if (lis[i] == active) {
                    index = i;
                }
            };
            if (index != undefined) {
                // 切换active
                lis[beforeIndex].classList.remove('active');
                active.classList.add('active');
                var contents = content.querySelectorAll('ul');
                contents[beforeIndex].classList.remove('active');
                contents[index].classList.add('active');
                // 选中导航
                window.navSelected({
                    fileName: window.navObj.fileName,
                    index: index,
                    beforeIndex: beforeIndex,
                })

            }
        })
        // 导航栏处于点击状态
        aside.children[window.navObj.index].click();
    }
})(window, document)