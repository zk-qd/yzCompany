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
                    title: '资质荣誉',
                    url: './about.html?nav=2',
                },
                {
                    title: '合作伙伴',
                    url: './about.html?nav=3',
                },
                {
                    title: '员工风采',
                    url: './about.html?nav=4',
                },
            ]
        },
        {
            className: 'hd-produce',
            title: '产品中心',
            url: './produce.html?nav=0',
            children: [
                {
                    title: '云服务',
                    url: './produce.html?nav=0',
                },
                {
                    title: '人工智能',
                    url: './produce.html?nav=1',
                },
            ]
        },
        {
            className: 'hd-scheme',
            title: '解决方案',
            url: './scheme.html?nav=0',
            children: [
                {
                    title: '云服务',
                    url: './scheme.html?nav=0',
                },
                {
                    title: '人工智能',
                    url: './scheme.html?nav=1',
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
            className: 'hd-recruitment',
            title: '招贤纳士',
            url: './recruitment.html',
        },
        {
            className: 'hd-contact',
            title: '联系我们',
            url: './contact.html?nav=0',
            children: [
                {
                    title: '联系方式',
                    url: './contact.html?nav=0',
                },
                {
                    title: '在线留言',
                    url: './contact.html?nav=1',
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
                    "<a class='text-color-2' href='" + item.url + "' title='" + item.title + "'>" + item.title + "</a>" +
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
            switch(e.type) {
                case 'mouseenter':
                if(ul) {
                    var count = ul.childElementCount;
                    ul.style.height = count * 30 + 'px';
                }
                break;
                case 'mouseleave':
                    if(ul) {
                        var count = ul.childElementCount;
                        ul.style.height = 0 + 'px';
                    }
                break;
            }
        }
    };
    Array.prototype.forEach.call(lis,function(item,index) {
        item.addEventListener('mouseenter',handle);
        item.addEventListener('mouseleave',handle);
    });
   }
   liMouseEvent();


    //  li标签选中事件
   function liSelected() {
       
   }
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
                        <li><span class='iconfont icon-phone1'></span>电话:&nbsp;&nbsp;<em>020-38330668</em></li>
                        <li><span class='iconfont icon-phone1'></span>销售电话:&nbsp;&nbsp;<em>020-38330668</em></li>
                        <li><span style='font-size: 16px;' class='iconfont icon-phone'></span>服务热线:&nbsp;&nbsp;<em>020-38330668</em></li>
                        <li><span class='iconfont icon-emailFilled
                        '></span>技术支持邮箱:&nbsp;&nbsp;<em>020-38330668</em></li>
                        <li><span class='iconfont icon-adress'></span>地址:&nbsp;&nbsp;<em>020-38330668</em></li>
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
                beforeIndex;
                if(active.nodeName.toLowerCase() !== 'li') active = active.parentElement; 
            for (var i = 0, length = lis.length; i < length; i++) {
                // 记录上一次的active
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
            }
        })

        // 导航栏处于点击状态
        function active() {
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
            }
            aside.children[nav].click();
        }
        active();
    }
})(window, document)