// made kh
var pagination = (function() {

    // 비공개 변수
    var offset; // 한화면에 출력 될 데이터 갯수
    var totalCount; // 전체 데이터 갯수

    var page; // 현재 페이지 번호
    var pageCount; // 한화면에 출력 될 페이지 수
    var pageTotalCount; // 전체 페이지 수

    var tbody_id; // tbody tag id;
    var pages_id; // pagination tag id; 

    // private 함수

    function getPageHTML(startPage, endPage) {
        var html = "";
        // 이전버튼
        var prev_btn;
        var prev_page = startPage - 1;
        if(offset < startPage) {
            prev_btn = '<a page='+prev_page+' class="icon item" remake_pagination="true">\
                            <i class="left chevron icon"></i>\
                        </a>'; 
        } else {
            prev_btn = '<a class="icon item disabled">\
                            <i class="left chevron icon"></i>\
                        </a>'; 
        }
    
        // 페이지 버튼
        var page_btns = "";
        var current_page = page;
        console.warn("current_page", current_page, typeof current_page);
        for(var i = startPage; i <= endPage; i++){
            var page_num = i;
            console.log(page_num, typeof page_num);
            var btn_class = (current_page === page_num) ? 'item active' : 'item';
            console.warn('btn_class', btn_class);
            var page_html = '<a page='+page_num+' class="'+btn_class+'">'+page_num+'</a>'; 
            page_btns = page_btns.concat(page_html);
    
        }
    
        // 다음버튼
        var next_btn;
        var next_page = endPage + 1;
        if(endPage < pageTotalCount) {
            next_btn = '<a page='+next_page+' class="icon item" remake_pagination="true">\
                            <i class="right chevron icon"></i>\
                        </a>';
        } else {
            next_btn = '<a class="icon item disabled">\
                            <i class="right chevron icon"></i>\
                        </a>';  
        }
    
        html = html.concat(prev_btn);
        html = html.concat(page_btns);
        html = html.concat(next_btn);
        
        return html;
    
    }

    function setList(datas) {
        console.log(datas);
        
        alert("txlist count : "+datas.length);
    
        window.rows = $("#historyTable > tr");
    
        for(var i = 0; i < datas.length; i++) {
            var row = rows[i];
            var tds = $(row).children();
            
            var data = datas[i];
            var time = timeStampToString(data.timeStamp);
    
            var hash = data.hash ? data.hash.substring(0, 16) + '...' : data.hash;
            var from = data.from ? data.from.substring(0, 16) + '...' : data.from;
            var to = data.to ? data.to.substring(0, 16) + '...' : data.to;
    
            $(tds[0]).text(time);
            $(tds[1]).html('<a href="#'+data.hash+'">'+hash+'</a>');
            $(tds[2]).html('<a href="#'+data.from+'">'+from+'</a>');
            $(tds[3]).html('<a href="#'+data.to+'">'+to+'</a>');
            $(tds[4]).text(data.value);
            
        }
    
        for(var i = datas.length; i < rows.length; i++) {
            var row = rows[i];
            var tds = $(row).children();
            $(tds).html('<span style="color:white">-</span>');
        }
        
    }

    function getPageTotalCount() {
        var pageTotalCount = totalCount / offset;
        pageTotalCount = Math.ceil(pageTotalCount);
        console.log('pageTotalCount', pageTotalCount);
        return pageTotalCount;
    }

    function getStartPage() {
        console.log("****");
        var startPage = (page - 1) / pageCount;
        startPage = Math.floor(startPage);
        startPage = (startPage * pageCount) + 1;
        console.log("startPage", startPage, page, pageCount);
        return startPage;
    }

    function getEndPage(startPage) {
        var endPage = startPage + pageCount - 1;
        if(pageTotalCount  < endPage) {
            endPage = pageTotalCount;
        }
        return endPage;
    }

    // 공개 함수
    return {
        init: function(tbody, pages) {
            console.log('pagination init!!');

            offset = 2; // 한화면에 출력 될 데이터 갯수
            totalCount = 0; // 전체 데이터 갯수   

            page = 1; // 현재 페이지 번호
            pageCount = 5; // 한화면에 출력 될 페이지 수
            pageTotalCount = 0; // 전체 페이지 수

            tbody_id = tbody;
            pages_id = pages;
        },
        getCurrentPage: function() {
            return page;
        },
        getOffset: function() {
            return offset;
        },
        getTotalCount: function(){
            return totalCount;
        },
        setPages: function(count, callback) {
            totalCount = count;
            console.log("###", totalCount);
            pageTotalCount = getPageTotalCount(totalCount, offset);
        
            var startPage = getStartPage();
            var endPage = getEndPage(startPage);
        
            console.log('startPage', startPage);
            console.log('endPage', endPage);
        
            window.remake = this;

            var pageHTML = getPageHTML(startPage, endPage);
            $("#"+pages_id).html(pageHTML);
        
            $("#"+pages_id+" > a").click(function(e){
        
                $("#"+pages_id+" > a").removeClass('active')
        
                var page_num = parseInt($(this).attr('page'));
                console.log(page_num);
                if (page_num) {
        
                    page = page_num; 
                    
                    // page 다시 그릴 필요 체킹
                    var opt = $(this).attr('remake_pagination');
                    if(opt) {
                        // 페이지 다시 그리기
                        console.log("remake");
                        console.warn("*****", count);
                    } 

                    $(this).addClass('active');

                    // 페이지 데이터 받아오기...
                    //callback();
                    //getApiData(getHistoryListURL(page_num, offset), 'list', setList);
                    
                }
            });

         

        },
        setList: function() {

        },
    
    } 

})();