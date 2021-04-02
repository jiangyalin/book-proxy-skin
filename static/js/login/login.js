$(document).ready(function(){
    $(".he_logo").css("top",($(".header").height()-60)/2+"px");//计算logo的位置

    //得到焦点动效
    $(".my_input").focus(function(){
        $(this).css("border-right-width","5px");
    });
    //失去焦点动效
    $(".my_input").blur(function(){
        $(this).css("border-right-width","0px");
    });

    //登陆
    $(".input_submit").click(function () {
        var name = $(".j-input-name").val();
        var pwd = $(".j-input-pwd").val();
        Login(name,pwd)
    });
    $(".j-input-name").keyup(function (event) {
        var name = $(".j-input-name").val();
        var pwd = $(".j-input-pwd").val();
        if (event.keyCode == 13){
            Login(name,pwd);
        }
    });
    $(".j-input-pwd").keyup(function (event) {
        var name = $(".j-input-name").val();
        var pwd = $(".j-input-pwd").val();
        if (event.keyCode == 13){
            Login(name,pwd);
        }
    });

});

function Login(name,pwd) {
    $.ajax({
        url: '/login/signIn',
        data:{'name':name,'pwd':pwd},
        type: 'post',
        dataType: 'json',
        success: function (data) {
            window.location.href = JSON.parse(data);
        },
        error: function(jqXHR, textStatus, errorThrown){
            alert('error ' + textStatus + " " + errorThrown);
        }
    })
}
