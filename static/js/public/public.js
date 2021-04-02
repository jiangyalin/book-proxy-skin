$(function () {

    //计算导航选中
    nav();

});

var server = {
    ip: '192.168.1.67',
    port: '8082',
    http: 'http://localhost:8082'
};

//计算导航选中
function nav() {
    var navHref;//面包屑的路径
    var status = true;
    if($(".breadcrumb").find("li").length > 2){
        navHref = $(".breadcrumb").find("li").eq(2).find("a").attr("href");
        status = true;
    }else{
        navHref = $(".breadcrumb").find("li").eq(1).find("a").attr("href");
        status = false;
    }
    navHref = navHref || "";
    for (var i = 0;i < $("#sidebar-menu").children("li").length;i++){
        var thisNav = $("#sidebar-menu").children("li").eq(i);
        var href = "";
        if(status){
            for (var j = 0;j < thisNav.find("li").length;j++){
                var thisNavs = thisNav.find("li").eq(j);
                href = thisNavs.children("a").attr("href");
                href = href || "";
                if(href == navHref){
                    thisNavs.addClass("active").siblings().removeClass("active").parents("li")
                        .addClass("active").siblings().removeClass("active");
                    return;
                }
            }
        }else{
            href = thisNav.children("a").attr("href");
            href = href || "";
            if(href == navHref){
                thisNav.addClass("active").siblings().removeClass("active").parents("li")
                    .addClass("active").siblings().removeClass("active");
                return;
            }
        }
    }
    //如果面包屑第三级比对不上所有的导航第三级，则退回一级比对
    navHref = $(".breadcrumb").find("li").eq(1).find("a").attr("href");
    // navHref = navHref.substring(navHref.lastIndexOf("/")+1);
    for (var i = 0;i < $("#sidebar-menu").children("li").length;i++){
        var thisNav = $("#sidebar-menu").children("li").eq(i);
        var href = "";
        href = thisNav.children("a").attr("href");
        href = href || "";
        if(href == navHref){
            thisNav.addClass("active").siblings().removeClass("active").parents("li")
                .addClass("active").siblings().removeClass("active");
            return;
        }
    }
}