window.onload = function () {
    /* 切换标签离开当前页面时改变title提示 */
    document.addEventListener('visibilitychange', function () {
        if (document.visibilityState === 'hidden') {
            normal_title = document.title;
            document.title = '客官请留步...';
        } else {
            document.title = normal_title;
        }
    });

    browserRedirect();

};

function browserRedirect() {
    var sUserAgent = navigator.userAgent.toLowerCase();
    if (/ipad|iphone|midp|rv:1.2.3.4|ucweb|android|windows ce|windows mobile/.test(sUserAgent)) {
        console.log("移动端")
    } else {
        //跳转pc端页面
        console.log("PC端");
        loadHitokoto();
        loadSearch();
    }
}

/* 搜索XML */
function loadSearch() {
    console.log("加载搜索功能···");
    //const path = "http://localhost:4000/search.xml";
    const path = "/search.xml";
    let $input = document.getElementById('local-search-input');
    let $resultContent = document.getElementById('local-search-result');
    if ($input != null && $resultContent != null) {
        searchFunc(path, $input, $resultContent);
    }
}

/* 每日一言API */
function loadHitokoto() {
    /*
     console.log("加载每日一言···");
    const xhr = new XMLHttpRequest();
    xhr.open('get', 'https://v1.hitokoto.cn?c=a&c=b&c=c&c=d&c=f&c=g&c=h&c=j&c=k');
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            const data = JSON.parse(xhr.responseText);
            let text ="";
            if(data.from_who != null && data.from_who !== "null"){
                text += data.from_who+" ◎ ";
            }
            if(data.from != null && data.from !== "null"){
                text += data.from+" ◎ ";
            }
            if(data.hitokoto != null && data.hitokoto !== "null"){
                text += data.hitokoto;
            }
            $('#header').attr('bg-text',text);
        }
    };
    xhr.send();
    */
}