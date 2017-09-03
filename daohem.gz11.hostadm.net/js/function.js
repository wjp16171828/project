//关注专家
function attention(id)
{
    $.ajax
    ({
        url: "http://daohem.gz11.hostadm.net/js/expert_info.php?act=attention",
        type: "get",
        dataType: "json",
        data:{"id":id},
        success: function(res)
        {
            layer.alert(res['msg']);
        },
    });
}

//设为首页;
function SetHome(obj, url) {
    if (url == undefined) url = location.host;
    try {
        obj.style.behavior = "url(#default#homepage)";
        obj.SetHomePage(url);
    } catch (e) {
        if (window.netscape) {
            try {
                netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
            } catch (e) {
                alert("\u62B1\u6B49\uFF01\u60A8\u7684\u6D4F\u89C8\u5668\u4E0D\u652F\u6301\u76F4\u63A5\u8BBE\u4E3A\u9996\u9875\u3002\u8BF7\u5728\u6D4F\u89C8\u5668\u5730\u5740\u680F\u8F93\u5165\u201Cabout:config\u201D\u5E76\u56DE\u8F66\u7136\u540E\u5C06[signed.applets.codebase_principal_support]\u8BBE\u7F6E\u4E3A\u201Ctrue\u201D\uFF0C\u70B9\u51FB\u201C\u52A0\u5165\u6536\u85CF\u201D\u540E\u5FFD\u7565\u5B89\u5168\u63D0\u793A\uFF0C\u5373\u53EF\u8BBE\u7F6E\u6210\u529F\u3002");
            }
            var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);
            prefs.setCharPref("browser.startup.homepage", url);
        }
    }
}

// 加入收藏夹;
var addBookmark = function (title) {
    if (title == undefined) title = document.title;
    var url = window.location.href;

    try {
        //IE 
        window.external.addFavorite(url, title);
    } catch (e) {
        try {
            //Firefox;
            window.sidebar.addPanel(title, url, "");
        } catch (e) {
            alert("您的浏览器不支持自动加入收藏，请手动设置！", "提示信息");
        }
    }

}
/*js电话验证*/
function is_tel(tel){
    var reg = /^([0-9]{3,4}-)?[0-9]{7,8}$/;
    if(!reg.test(tel)){
        return false;
    }
    return true;
}


/*js手机验证*/
function is_phone(phone){
    var reg = /^1[3|4|5|7|8]\d{9}$/;
    if(!reg.test(phone)){
        return false;
    }
    return true;
}


/*js邮箱验证*/
function is_email(email){
    var reg = /^([a-z0-9+_]|-|.)+@(([a-z0-9_]|-)+.)+[a-z]{2,6}$/i;
    if(!reg.test(email)){
        return false;
    }
    return true;
}


/*qq邮箱验证*/
function is_qq(qq){
    var reg = /^[1-9]{1}[0-9]{4,8}$/;
    if(!reg.test(qq)){
        return false;
    }
    return true;
}
