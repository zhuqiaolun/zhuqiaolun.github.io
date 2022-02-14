const searchFunc = function (path, $input, $resultContent) {
    'use strict'; //使用严格模式
    $.ajax({
        url: path,
        dataType: "xml",
        success: function (xmlResponse) {
            // 从xml中获取相应的标题等数据
            let datas = $("entry", xmlResponse).map(function () {
                return {
                    title: $("title", this).text(),
                    content: $("content", this).text(),
                    url: $("url", this).text()
                };
            }).get();
            //ID选择器
          /*  let $input = document.getElementById(search_id);
            let $resultContent = document.getElementById(content_id);*/
            $input.addEventListener('input', function () {
                console.log("开始搜索···");
                let str = '<ul class=\"search-result-list\" >';
                const keywords = this.value.trim().toLowerCase().split(/[\s\-]+/);
                $resultContent.innerHTML = "";
                if (this.value.trim().length <= 0) {
                    return;
                }
                // 本地搜索主要部分
                datas.forEach(function (data) {
                    let isMatch = true;
                    let data_title = data.title.trim().toLowerCase();
                    let data_content = data.content.trim().replace(/<[^>]+>/g, "").toLowerCase();
                    let data_url = data.url;
                    let index_title = -1;
                    let index_content = -1;
                    let first_occur = -1;
                    // 只匹配非空文章
                    if (data_title !== '' && data_content !== '') {
                        keywords.forEach(function (keyword, i) {
                            index_title = data_title.indexOf(keyword);
                            index_content = data_content.indexOf(keyword);
                            if (index_title < 0 && index_content < 0) {
                                isMatch = false;
                            } else {
                                if (index_content < 0) {
                                    index_content = 0;
                                }
                                if (i === 0) {
                                    first_occur = index_content;
                                }
                            }
                        });
                    }
                    // 返回搜索结果
                    if (isMatch) {
                        //结果标签
                        str += "<li><a href='" + data_url + "' class='search-result-title' target='_self'>" + "> " + data_title + "</a>";
                        let content = data.content.trim().replace(/<[^>]+>/g, "");
                        if (first_occur >= 0) {
                            // 拿出含有搜索字的部分
                            let start = first_occur - 6;
                            let end = first_occur + 6;
                            if (start < 0) {
                                start = 0;
                            }
                            if (start === 0) {
                                end = 10;
                            }
                            if (end > content.length) {
                                end = content.length;
                            }
                            let match_content = content.substr(start, end);
                            // 列出搜索关键字，定义class加高亮
                            keywords.forEach(function (keyword) {
                                const regS = new RegExp(keyword, "gi");
                                match_content = match_content.replace(regS, "<em class=\"search-keyword\">" + keyword + "</em>");
                            });
                            str += "<p class=\"search-result\">" + match_content + "...</p>"
                        }
                    }
                });
                $resultContent.innerHTML = str;
            })
        }
    })
};

