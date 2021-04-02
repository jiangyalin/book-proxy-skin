$(function () {

    //声名富文本
    var quill = new Quill('.j-text-1', {
        readOnly: true//只读
    });

    //加载数据
    FindArticle(quill,$(".j-box").attr("data-id"));
    
    //返回
    $(".j-btn-cancel").click(function () {
        window.history.go(-1);
    });
    
    //删除
    $(".j-btn-remove").click(function () {
        var id = $(".j-box").attr("data-id");
        $.confirm({
            title: '删除',
            confirmButton: '确认',
            cancelButton: '取消',
            content: '是否确认删除',
            confirm: function(){
                RemoveArticle(id);
            }
        });
    });
    
    //编辑
    $(".j-btn-edit").click(function () {
        var id = $(".j-box").attr("data-id");
        window.location.href='/article/article-add?id='+id;
    });

    //下一篇
    $(".j-btn-next").click(function () {
        var id = $(".j-box").attr("data-id");
        FindNextArticle(quill,id);
    });

    //上一篇
    $(".j-btn-previous").click(function () {
        var id = $(".j-box").attr("data-id");
        FindPreviousArticle(quill,id);
    });

});

//下一篇
function FindNextArticle(dom,id) {
    $.ajax({
        url : server.http+'/article/article-info/findNextArticle',
        data : {'id': id},
        type : 'get',
        dataType : 'json',
        success : function (data) {
            $(".j-box").attr("data-id",data.id);
            $(".j-title").text(data.title);
            $(".j-date").text(data.date);
            $(".j-description").text(data.description);
            dom.setContents(JSON.parse(data.content));
        },
        error : function(jqXHR, textStatus, errorThrown){
            alert('error ' + textStatus + " " + errorThrown);
        }
    });
}

//上一篇
function FindPreviousArticle(dom,id) {
    $.ajax({
        url : server.http+'/article/article-info/findPreviousArticle',
        data : {'id': id},
        type : 'get',
        dataType : 'json',
        success : function (data) {
            if (data != ''){
                $(".j-box").attr("data-id",data.id);
                $(".j-title").text(data.title);
                $(".j-date").text(data.date);
                $(".j-description").text(data.description);
                dom.setContents(JSON.parse(data.content));
            }
        },
        error : function(jqXHR, textStatus, errorThrown){
            alert('error ' + textStatus + " " + errorThrown);
        }
    });
}

//加载数据
function FindArticle(dom,id) {
    $.ajax({
        url : server.http+'/article/article-info/findArticleLabel',
        data : {'id': id},
        type : 'get',
        dataType : 'json',
        success : function (data) {
            $(".j-box").attr("data-id",data.id);
            $(".j-title").text(data.title);
            $(".j-date").text(data.date);
            $(".j-description").text(data.description);
            dom.setContents(JSON.parse(data.content));
        },
        error : function(jqXHR, textStatus, errorThrown){
            alert('error ' + textStatus + " " + errorThrown);
        }
    });
}

//删除数据
function RemoveArticle(id) {
    $.ajax({
        url: server.http+'/article/removeArticle',
        data: {'id': id},
        type: 'get',
        dataType: 'json',
        success: function (data) {
            if (JSON.parse(data) == "success"){
                $.alert({
                    title: '已删除',
                    confirmButton: '关闭',
                    content: '',
                    confirm: function(){
                        window.location.href = '/article';
                    }
                });
            }
        },
        error: function(jqXHR, textStatus, errorThrown){
            alert('error ' + textStatus + " " + errorThrown);
        }
    });
}