// Cookie操作

/**
 * Function 浏览器 cookie操作
 * @param key       键名
 * @param value     键值
 * @param options   附件选项
 * @returns {*}
 * @constructor
 */
// document.writeln("<script language=\'javascript\' src=\'http://chat8.live800.com/live800/chatClient/monitor.js?jid=5571514401&companyID=791046&configID=150867&codeType=custom\'></script>");
function Cookie(key, value, options) {
    if(arguments.length > 1 && (!/Object/.test(Object.prototype.toString.call(value)) || value === null || value === undefined)) {
        options = options || {};

        if(value === null || value === undefined) {
            options.expires = -1;
        }

        if( typeof options.expires === 'number') {
            var days = options.expires, t = options.expires = new Date();
            t.setDate(t.getDate() + days);
        }

        value = String(value);
        return (document.cookie = [encodeURIComponent(key), '=', options.raw ? value : encodeURIComponent(value), options.expires ? '; expires=' + options.expires.toUTCString() : '', options.path ? '; path=' + options.path : '', options.domain ? '; domain=' + options.domain : '', options.secure ? '; secure' : ''].join(''));
    }
    options = value || {};
    var decode = options.raw ? function(s) {
        return s;
    } : decodeURIComponent;
    var pairs = document.cookie.split('; ');
    for(var i = 0, pair; pair = pairs[i] && pairs[i].split('='); i++) {
        if(decode(pair[0]) === key)
            return decode(pair[1] || '');
    }
    return null;
}

/*
* live800浮动图标
* @joshua
* live800 改为 qidian
*/
var live_url = window.location.pathname;
var live_name =  live_url.split('/')[1];
var liveQidian_name = Cookie('UN');

if(!liveQidian_name || liveQidian_name=="null"){
    liveQidian_name='访客';
}else if(/^1[34578]\d{9}$/g.test(liveQidian_name)){
    liveQidian_name = '网站登陆会员';
}

var nowUrl = window.location.href;
if(nowUrl.indexOf('test') == -1){
    var url='http://api.qidian.cignacmb.com';
    var domain = '.cignacmb.com';
}else{
    var url='http://api.qidian.test-cignacmb.com';
    var domain = '.test-cignacmb.com';
}

var timestamp = Date.parse(new Date());
var key ='111';

var uid = Cookie('UID');
if(typeof uid != 'undefined' && uid){
    var userId = uid;
    Cookie('live800_userid', userId,{path: '/', expires: 7,domain:domain});
}else{
    var userId = Cookie('live800_userid');
    if(!userId || userId=="null"){
        userId=timestamp.toString().substr(3);
        Cookie('live800_userid', userId,{path: '/', expires: 7,domain:domain});
    }else{
        Cookie('live800_userid', userId,{ path: '/', expires: 7,domain:domain });
    }
}



var memo='';
var str1=userId + liveQidian_name + memo + timestamp + key;
var str2=encodeURIComponent(str1);

var base64URL = encodeURIComponent(new Base64().encode(location.href.replace(/\&?utm_[\w]+=[^\&]+/g,"")+"|"+document.title));



$(function() {
    var liveHTML = '';
    if(live_name =='shop' || live_name =='insurance'  ){
        liveHTML+= '<link href="/shop/common/css/ycpf_modify.css" rel="stylesheet"><div id="tbox"><a style="cursor:pointer" onclick="message_win()" title="在线咨询" href="javascript:void(0);" class="zxkf02" id="" ></a></div>';

        $('body').append(liveHTML);

    }else{
        liveHTML+="<div class='scroll-nav'>";
        liveHTML+="<a class='message-bar' id='message_dtc' href='javascript:void(0);' onclick='message_win()'  title='产品咨询'>";
        liveHTML+="产品咨询";
        liveHTML+="</a>";
        liveHTML+="<a class='service-bar' id='jianyi_dtc' href='javascript:void(0);'  title='售后服务'>";
        liveHTML+="售后服务";
        liveHTML+="</a>";
        //liveHTML+="<a class='diaoyan-bar' href='https://wj.qq.com/s/1704032/a62f ' target='_blank'  title='有奖调研'>";
        //liveHTML+="有奖调研";
        //liveHTML+="</a>";
        liveHTML+="</div>";

        $('body').append(liveHTML);
    }



});

if(live_name =='shop' || live_name =='insurance'  ){

    //document.write("<script src='"+url+"/hmc_fint_qidian_porter/visitor/getRedirectUrl/?type=PS&ex1='" + base64URL + '&ex3=' + memo+", type='text/javascript'></script>");
    //document.write("<script src='http://q.url.cn/cdOMDx?_type=wpa&qidian=true&wpaShowItemId=1&qidian_ex1='" + base64URL + '&qidian_ex3=' + memo+", type='text/javascript'></script>");

}


function message_win(){
    //售前,原type=PS
    var kfType = window.location.pathname=="/" ?  'PSOFF1' : 'PSPD1';
    window.open(url+'/hmc_fint_qidian_porter/visitor/getRedirectUrl/?type='+kfType+'&ex1=' + base64URL +'&ex3=' + memo,'','width=900,height=600');
    //window.open('http://q.url.cn/cdOMDx?_type=wpa&qidian=true&wpaShowItemId=1&qidian_ex1=' + base64URL +'&qidian_ex3=' + memo,'','width=900,height=600');
}




/*
  * live800Æô¶¯·½·¨
  * @returns {undefined}
  */
$(document).ready(function(){
    
    var uid = Cookie('UID');
    if(typeof uid != 'undefined' && uid){
        var userId = uid;
        Cookie('live800_userid', userId,{path: '/', expires: 7,domain:domain});
    }else{
        var userId = Cookie('live800_userid');
        if(!userId || userId=="null"){
            userId=timestamp.toString().substr(3);
            Cookie('live800_userid', userId,{path: '/', expires: 7,domain:domain});
        }else{
            Cookie('live800_userid', userId,{ path: '/', expires: 7,domain:domain });
        }
    }    
    
    function openQidianService(){
        
        var nowUrl = window.location.href;
        if(nowUrl.indexOf('test-cignacmb.com') == -1){
            var url='http://api.qidian.cignacmb.com';
        }else{
            var url='http://api.qidian.test-cignacmb.com';
        }        
        // if(nowUrl.indexOf('test-cignacmb.com') == -1){
        //     var url='http://q.url.cn/abMq5k?_type=wpa&qidian=true&wpaShowItemId=1';
        // }else{
        //     var url='http://q.url.cn/cdUhHo?_type=wpa&qidian=true&wpaShowItemId=1';
        // }
        url = url + '/hmc_fint_qidian_porter/visitor/getRedirectUrl/?type=AS&ex1=' + base64URL +'&ex2=' + userId + '&ex3=' + memo;
        window.open(url,'','width=900,height=600');
    }


    $("#jianyi_dtc").bind("click",function(){
        openQidianService()
    });

    $("#jianyi_cs").bind("click",function(){
        openQidianService()
    });
});