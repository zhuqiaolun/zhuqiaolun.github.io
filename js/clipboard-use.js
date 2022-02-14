$('.highlight').each(function (i, e) {
    const $wrap = $('<div>').addClass('highlight-wrap');
    $(e).after($wrap);
    $wrap.append($('<button>').addClass('copy-btn').append('复制').on('click', function (e) {
        const code = $(this).parent().find('.code').find('.line').map(function (i, e) {
            return $(e).text()
        }).toArray().join('\n');
        const ta = document.createElement('textarea');
        document.body.appendChild(ta);
        ta.style.position = 'absolute';
        ta.style.top = '0px';
        ta.style.left = '0px';
        ta.value = code;
        ta.select();
        ta.focus();
        const result = document.execCommand('copy');
        document.body.removeChild(ta);
        if(result){
            $(this).text('复制成功')
        }else {
            $(this).text('复制失败')
        }
        $(this).blur()
    })).on('mouseleave', function (e) {
        const $b = $(this).find('.copy-btn');
        setTimeout(function () {
            $b.text('复制')
        }, 300)
    }).append(e)
});