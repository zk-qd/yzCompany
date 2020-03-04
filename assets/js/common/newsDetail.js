// 新闻详情页

function renderNewsDetail(data) {
    var nindex = window.navObj.index;
    // 获取索引
    var cindex = window.sessionStorage.getItem('cindex');
    data = data[nindex].children;
    // 当前页数据
    var currentData = data[cindex];
    var html = [];
    var template = function (data) {
        html.push("<h1 title='" + data.title + "'>" + data.title + "</h1>");
        html.push("<h3>");
        var declared = data.declared;
        declared.forEach(function (item) {
            html.push("<span>" + item.name + "</span>:<em>" + item.value + "</em>");
        });
        html.push("<span>" + data.time + "</span>");
        html.push("</h3>");
        var content = data.content;
        content.forEach(function (item) {
            if (item.type == 'text') {
                html.push("<div class='newsi-main'>");
                if(item.title) html.push( "<h4>"+item.title+"</h4>");
                item.text.forEach(function(item) {
                    html.push("<p title='"+item+"'>"+item+"</p>")
                });
                html.push("</div>");
            } else if (item.type == 'image') {
                html.push("<div class='newsi-img'>",
                    "<div>");
                item.image.forEach(function(item){
                   html.push("<img src='"+item+"' alt='" + data.title + "' title='" + data.title + "'>");
                })
                if(item.explanation) html.push("<p>" + item.explanation + "</p>");
                html.push("</div></div>");
            }
        });
        return html;
    };
    var container = document.getElementsByClassName('newsi')[0];
    template(currentData);
    // 添加上下页
     // 上下页
    //  至少两条新闻才能显示上下页
     if (data.length >= 2) {
        html.push(
            "<div class='pdci-nextPrev clearfix'>"
        )
        if (cindex == 0) {
            // 没有上一页 只显示下一页
            html.push(
                "<div class='pdci-nextPrev-right'>" +
                "<span  class='text-color-1' title='" + data[1].title + "'>" + data[1].title +
                "</span><a href='javascript:void(0);' data-mark='next' title='" + data[1].title + "' class='nextPrevA text-color-3'>下一篇&gt;</a>" +
                "</div>"
            )
        } else if (cindex == data.length - 1) {
            // 没有下一页 只显示上一页
            html.push(
                "<div class='pdci-nextPrev-left'>" +
                "<a href='javascript:void(0);' data-mark='prev' title='" + data[cindex - 1].title +
                "' class='nextPrevA text-color-3'>&lt;上一篇</a><span  class='text-color-1' title='" + data[cindex - 1].title + "'>" + data[cindex - 1].title + "</span>" +
                "</div>"
            )
        } else {
            // 有上一页也有下一页
            html.push(
                "<div class='pdci-nextPrev-left'>" +
                "<a href='javascript:void(0);' data-mark='prev' title='" + data[cindex - 1].title +
                "' class='nextPrevA text-color-3'>&lt;上一篇</a><span  class='text-color-1' title='" + data[cindex - 1].title + "'>" + data[cindex - 1].title + "</span>" +
                "</div>",
                "<div class='pdci-nextPrev-right'>" +
                "<span  class='text-color-1' title='" + data[cindex - 0 + 1].title + "'>" + data[cindex - 0 + 1].title +
                "</span><a href='javascript:void(0);' data-mark='next' title='" + data[cindex - 0 + 1].title + "' class='nextPrevA text-color-3'>下一篇&gt;</a>" +
                "</div>"
            )
        }
        html.push(
            "</div>"
        )
    } else {
        // 没有上一页也没有下一页 什么都不显示
    }

    container.innerHTML = html.join('').trim();

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
                        window.sessionStorage.setItem('cindex', cindex - 0 + 1)
                    } else if (mark == 'prev') {
                        window.sessionStorage.setItem('cindex', cindex - 0 - 1)
                    }
                    window.location.href = './ninfo.html?nav=0';
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
}