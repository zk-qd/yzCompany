// 新闻
(function (window, document) {
    var aside = document.getElementsByClassName('aside-nav')[0];
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
                // 渲染数据 第一页的数据
                createPage(index, 1);
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
})(window, document);
