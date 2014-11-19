$(document).ready(function () {
    var wind=$(window);
    var docu=$(document);
    var body = $('body');
    var header = $('header');
    var toTop = $('#toTop');
    
    var h = header.height();
    var className = 'scrolled';
    
    /*
    点击事件*/
    toTop.on('click',function(){
        docu.scrollTop(0);
    })

    /*滚动条事件*/
    docu.scroll(function () {
        /*
        给body添加删除类*/
        var top = docu.scrollTop();
        if (top > h) {
            body.addClass(className);
        } else if (top < h / 2) {
            if (body.hasClass(className)) {
                body.removeClass(className);
            }
        }

        /*
        回到顶部*/
        var screenH = wind.height();
        console.log(screenH);
        if (top > screenH / 2) {
            toTop.removeClass('hidden');
        } else {
            toTop.addClass('hidden');
        }

    })
})