$(function () {

    //查询所有标签
    FindAllLabel();

    //声名富文本
    var toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],        // 加粗/斜体/下划线/删除线
        ['blockquote', 'code-block'],                     //底纹

        [{ 'header': 1 }, { 'header': 2 }],               // 标题大小
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],     //序号
        [{ 'script': 'sub'}, { 'script': 'super' }],      // 上标，角标
        [{ 'indent': '-1'}, { 'indent': '+1' }],          // 文本方向
        [{ 'direction': 'rtl' }],                         // 行方向

        [{ 'size': ['small', false, 'large', 'huge'] }],// 字体大小
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],      //标题分级

        [{ 'color': [] }, { 'background': [] }],        // 字体颜色，底色
        [{ 'align': [] }],
        [ 'link', 'image' ],                            //超链接/图片/视频/公式
        ['clean']                                       // 清楚格式
    ];
    var quill = new Quill('.j-text', {
        modules: {
            toolbar: toolbarOptions
        },
        theme: 'snow'
    });

    //提交数据
    $(".j-submit").click(function () {
        var id = $(".j-box").attr("data-id");
        var content = quill.getContents();
        var title = $("#input-title").val();
        var description = $("#input-description").val();
        var label = $("#input-label").select2('val');
        if (id == ''){
            //添加
            AddArticle(title, description, content, label);
        } else{
            //修改
            EditArticle(id, title, description, content, label);
        }
    });

    FindData($(".j-box").attr("data-id"),quill);
    
    //取消
    $(".j-btn-cancel").click(function () {
        window.history.go(-1);
    });

    $(".j-click").click(function () {
        console.log($("#input-label").select2('val'))
    });

});

//查询所有标签
function FindAllLabel() {
    $.ajax({
        url : server.http+'/label/findAllLabel',
        type: 'get',
        dataType: 'json',
        async: false,
        success: function(data){
            for (var i = 0;i<data.length;i++) {
                $("#input-label").append('<option value="'+data[i].id+'">'+data[i].name+'</option>');
            }
        },
        error: function(jqXHR, textStatus, errorThrown){
            console.log('error ' + textStatus + " " + errorThrown);
        }
    });
}

//查询数据
function FindData(id,quill) {
    if (id){
        $.ajax({
            url : server.http+'/article/article-add/findArticle',
            data : {'id' : id},
            type: 'get',
            dataType: 'json',
            success: function(data){
                if (data.label.length) {
                    for (var i = 0; i<data.label.length; i++) {
                        $("#input-label").find("option[value='"+data.label[i]._id+"']").attr("selected",true);
                    }
                }
                //声明选择器
                $("#input-label").select2({
                    language: "zh-CN"
                });
                $("#input-title").val(data.title);
                $("#input-description").val(data.description);
                quill.setContents(JSON.parse(data.content));
            },
            error: function(jqXHR, textStatus, errorThrown){
                console.log('error ' + textStatus + " " + errorThrown);
            }
        });
    } else {
        $("#input-label").select2({
            language: "zh-CN"
        });
    }
}

//添加数据
function AddArticle(title, description, content, label) {
    $.ajax({
        url : server.http+'/article/article-add/addArticle',
        data : {'title' : title, 'description' : description, 'content' : JSON.stringify(content), 'label': label},
        type: 'post',
        dataType: 'json',
        success: function(data){
            if (JSON.parse(data) == 'success'){
                $.alert({
                    title: '保存成功',
                    confirmButton: '关闭',
                    content: '',
                    confirm: function(){
                        window.location.href = '/article';
                    }
                });
            }
        },
        error: function(jqXHR, textStatus, errorThrown){
            console.log('error ' + textStatus + " " + errorThrown);
        }
    });
}

//修改数据
function EditArticle(id, title, description, content, label) {
    $.ajax({
        url : server.http+'/article/article-add/editArticle',
        data : {'id': id, 'title': title, 'description': description, 'content': JSON.stringify(content), 'label': label},
        type: 'post',
        dataType: 'json',
        success: function(data){
            if (JSON.parse(data) == 'success'){
                $.alert({
                    title: '保存成功',
                    confirmButton: '关闭',
                    content: '',
                    confirm: function(){
                        window.location.href = '/article';
                    }
                });
            }
        },
        error: function(jqXHR, textStatus, errorThrown){
            console.log('error ' + textStatus + " " + errorThrown);
        }
    });
}