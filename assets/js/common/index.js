// 首页 渲染列表
function indexListRender(data,info) {
    var container = document.getElementsByClassName('pdc-list')[0];
    show = [];
    var html = [];
    data.forEach(function(item,index) {
        // 随机每个子项放一个
        var content = item.children[Math.floor(item.children.length*Math.random())];
        show.push(content);
    });
    html.push(
        "<h2 title='"+info.title+"'>" + info.title + "</h2>" +
        "<h3 title='"+info.subtext+"'>" + info.subtext + "</h3>" +
        "<ul class='clearfix'>"
    )
    show.forEach(function (item, index) {
            if (item.type == 1) {
                html.push(
                    "<li data-index='" + index + "'>" +
                    "<a href='javascript:void(0)' class='cSkip' title='" + item.title + "'>" +
                    "<figure class='pdc-dynamic'>" +
                    "<mark class='pdc-mask'>"+item.title+"</mark>" +
                    "<img src='" + item.img + "' alt='" + item.title + "' title='" + item.title + "'>" +
                    "<figcaption class='text-color-2' title='"+ item.summary +"'>" + window.omission(item.summary,40) + "</figcaption>" +
                    "</figure>" +
                    " </a>" +
                    "</li>"
                );
            };
    });
    html.push(
        "</ul>"
    )
    if(info.more)
    html.push(
        "<div class='pdc-more'>" + 
        "<a class='pdc-more-a' href='javascript:void(0) title='查看更多'>查看更多</a>" + 
        "</div>"
    )
    container.insertAdjacentHTML("afterbegin",html.join('').trim());
    
    // 点击查看更多跳转
    function lookMore() {
        var as = document.querySelectorAll('.pdc-more-a');
        var ecallback = {
            handleEvent(e) {
                switch(e.type) {
                    case 'click':
                        e.preventDefault();
                        e.stopPropagation();
                        window.location.href = info.moreUrl;
                        break;
                }
            }
        };
        for(var i=0,length=as.length;i<length;i++) {
            as[i].addEventListener('click',ecallback,{
                capture: false,
                once: false,
                passive: false,
            })
        }
    };
    if(info.more)
    lookMore();
    

    // 点击单个跳转跳转
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
                        // nav强制等于-1显示所有 因为是从首页跳转的
                        window.location.href = info.url + info.index;
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

