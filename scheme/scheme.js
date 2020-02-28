// 渲染列表
!function (window, document) {
    var nIndex = window.navObj.index;
    // 显示指定导航的解决方案
    var schemeDataShow = schemeData[nIndex].children;

    // 定义模板
    var templateA = function (data) {
        var html = [];
        html.push(
            "<li class='scm-a' title='" + data.title + "'>" +
            "<div class='center'>" +
            "<h2 class='scm-title1 text-color-1'>" + data.title + "</h2>" +
            "<div class='scm-content'>" +
            "<div class='scm-a-tl'>" +
            "<h4 title='方案介绍' class='scm-title2 text-color-1'>方案介绍</h4>" +
            "<div class='text-color-2'>" + data.introduceText + "</div>" +
            "</div>" +
            "<div class='scm-a-tr'>" +
            "<img src='" + data.images[0] + "' alt='" + data.title + "' title='" + data.title + "' />" +
            "</div>" +
            "<div class='scm-a-bl'>" +
            "<img src='" + data.images[1] + "' alt='" + data.title + "' title='" + data.title + "' />" +
            "</div>" +
            "<div class='scm-a-br'>" +
            "<h4 title='系统功能' class='scm-title2 text-color-1'>系统功能</h4>" +
            "<img src='" + data.images[2] + "' alt='" + data.title + "' title='" + data.title + "' />" +
            "<div class='text-color-2'>" + data.functionText + "</div>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "</li>"
        );
        return html.join('').trim();
    };
    var templateB = function (data) {
        var html = [];
        html.push(
            "<li class='scm-b' title='" + data.title + "'>" +
            "<div class='center'>" +
            "<h2 class='scm-title1 text-color-1'>" + data.title + "</h2>" +
            "<div class='scm-content'>" +
            "<div class='scm-b-tl'>" +
            "<h4 title='方案介绍' class='scm-title2 text-color-1'>方案介绍</h4>" +
            "<div class='text-color-2'>" + data.introduceText + "</div>" +
            "</div>" +
            "<div class='scm-b-tr'>" +
            "<img src='" + data.images[0] + "' alt='" + data.title + "' title='" + data.title + "' />" +
            "</div>" +
            "<div class='scm-b-bl'>" +
            "<img src='" + data.images[1] + "' alt='" + data.title + "' title='" + data.title + "' />" +
            "</div>" +
            "<div class='scm-b-br'>" +
            "<h4 title='系统功能' class='scm-title2 text-color-1'>系统功能</h4>" +
            "<div class='text-color-2'>" + data.functionText + "</div>" +
            "<span>" +
            "<img src='" + data.images[2] + "' alt='" + data.title + "' title='" + data.title + "' />" +
            "</span>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "</li>"
        );
        return html.join('').trim();
    };

    var html = [];
    for (var ci = 0, clenght = schemeDataShow.length; ci < clenght; ci++) {
        if (ci % 2 == 0) {
            // 为偶数包含0 模板a
            html.push(templateA(schemeDataShow[ci]));
        } else {
            // 为奇数 模b
            html.push(templateB(schemeDataShow[ci]));
        }
    }
    document.getElementsByClassName('scm-list')[0].insertAdjacentHTML("afterbegin",html.join('').trim());

}(window, document);

















// // 侧边栏 解决方案
// (function (window, document) {
//     var aside = document.getElementsByClassName('aside-nav')[0];
//     var content = document.getElementsByClassName('content-nav')[0];
//     if (aside) {
//         aside.addEventListener('click', function (e) {
//             var active = e.target,
//                 current = e.currentTarget,
//                 lis = current.children,
//                 index,
//                 beforeIndex = 0;
//             // 如果不是target不是li
//             if (active.nodeName.toLowerCase() !== 'li') active = active.parentElement;
//             for (var i = 0, length = lis.length; i < length; i++) {
//                 // 记录上一次的index和当前的index
//                 if (lis[i].classList.contains('active')) beforeIndex = i;
//                 if (lis[i] == active) {
//                     index = i;
//                 }
//             };
//             if (index != undefined) {
//                 // 切换active
//                 lis[beforeIndex].classList.remove('active');
//                 active.classList.add('active');
//                 // 操作内容
//                 var contents = content.querySelectorAll('ul');
//                 contents[beforeIndex].classList.remove('active');
//                 contents[index].classList.add('active');
//                 // 选中导航
//                 window.navSelected({
//                     fileName: window.navObj.fileName,
//                     index: index,
//                     beforeIndex: beforeIndex,
//                 })

//             }
//         })
//         // 导航栏处于点击状态
//         aside.children[window.navObj.index].click();
//     }
// })(window, document)