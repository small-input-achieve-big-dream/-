$(function() {
	$(".toolbar-l .toolbar-li").mouseover(function(){
		$(this).addClass("active");
		});
	$(".toolbar-l .toolbar-li").mouseleave(function(){
		$(this).removeClass("active");
		});
})//toolbar-l li show



function isPlaceholer() {
    var input = document.createElement('input');
    return "placeholder" in input;
  }
$(function() {
	 if (!isPlaceholer()&&$(".search-text .text").val()==""){
		 $(".search-text .text-placeholder").show();
		$(".search-text").click(function(){
			$(".search-text .text").focus();
			$(".search-text .text-placeholder").hide();
		});
		$(".search-text .text").blur(function(){
			var temp=$(this).val();
			temp=temp.replace(/[ ]/g,"")
			if(temp.length==0){
				$(".search-text .text-placeholder").show();
				}
			});
		 }
		 else{
			 $(".search-text .text-placeholder").hide();
			 }	
		
})//header-search text-placeholder 



$(function() {
	$(".user-person").mouseover(function(){
		$(this).addClass("active");
		});
	$(".user-person").mouseleave(function(){
		$(this).removeClass("active");
		});
})//user-person



$(function() {
	$(".slide-nav").mouseover(function(){
		$(this).find(".slide-nav-main").show();
		});
	$(".slide-nav").mouseleave(function(){
		$(this).find(".slide-nav-main").hide();
		});
})//slide-nav


function scroll_gotop(){
	h = $(window).height();
	t = $(document).scrollTop();
	if(t > h){
		$('.mod-gotop').show();
	}else{
		$('.mod-gotop').hide();
	}
}

$(document).ready(function(e) {
	scroll_gotop();
	$('.mod-gotop').click(function(){
		$('body,html').animate({ scrollTop: 0 }, 500); 
	})
	
});

$(window).scroll(function(e){
	scroll_gotop();		
})//gotop



function AddFavorite(title, url) {
    try {
        window.external.addFavorite(url, title);
    }
    catch (e) {
        try {
            window.sidebar.addPanel(title, url, "");
        }
        catch (e) {
            alert("抱歉，您所使用的浏览器无法完成此操作。\n\n加入收藏失败，请使用Ctrl+D进行添加");
        }
    }
}//Favorite

$(document).ready(function(e) {
    var contentHeight=$(".zixun-content").height();
	var sidebarHeight=$(".zixun-sidebar").height();
	if(contentHeight<sidebarHeight){
		$(".cc-content .grid-inner").height(sidebarHeight+40);
			}
});//zixun weixin


$(function() {
	/* 控制头部挂公告显示和隐藏 */
	var notifyData = localStorageGet('notify',1000*60*60*24*3);
	//console.log(notifyData);
	if(notifyData == 4){
		$(".cc-topbanner").slideDown("slow");
	}else{
		$('.cc-topbanner').hide();
	}
	$(".close-banner").click(function(){
		localStorageSet('notify',3);
		$(".cc-topbanner").slideUp("slow");
	})
});

//封装过期控制代码
function localStorageSet(key,value){
    var curTime = new Date().getTime();
    localStorage.setItem(key,JSON.stringify({data:value,time:curTime}));
}

function localStorageGet(key,exp){

    var data = localStorage.getItem(key);
    if(typeof data == 'undefined' || data == '' || data == null){
    	return 4;
    }
    var dataObj = JSON.parse(data);
    if (new Date().getTime() - dataObj.time>exp) {
        //console.log('信息已过期');
        return 4;
    }else{
        var dataObjDatatoJson = JSON.parse(dataObj.data);
        return dataObjDatatoJson;
    }
}


$(function(){
	
	$(".nav-mod-bd .category-li").hover(function() {
		$(this).find(".category-main").show();
	}, function() {
		$(this).find(".category-main").hide();
	});

})//old menu



