$(document).ready(function() {
	var $html=$('html');
	var $window=$(window);
	function page(pageele){
		var htmlfont=$(pageele).width()/840*100+'px';
		$html.css('font-size',htmlfont);
		$(pageele).css('opacity',1);
		$window.resize(function () {
				htmlfont=$(pageele).width()/840*100+'px';
				$html.css('font-size',htmlfont)
		})//页面rem单位初始化适应
	};
	page('#page');
	

	
});

var myScroll;
function loaded () {
	myScroll = new IScroll('#wrapper', { eventPassthrough:true, scrollX:true, scrollY:false, preventDefault:false });
}
$(window).load(function(){
	var nwW = 0;
	$('#wrapper li').each(function(){
		var x =$(this).outerWidth(true);
		nwW = nwW+x;
		return nwW;
	});
	$('#wrapper #scroller').width(nwW);
})

$(function() {
	var Accordion = function(el, multiple) {
		this.el = el || {};
		this.multiple = multiple || false;

		// Variables privadas
		var links = this.el.find('.link');
		// Evento
		links.on('click', {el: this.el, multiple: this.multiple}, this.dropdown)
	}

	Accordion.prototype.dropdown = function(e) {
		var $el = e.data.el;
			$this = $(this),
			$next = $this.next();

		$next.slideToggle();
		$this.parent().toggleClass('open');

		if (!e.data.multiple) {
			$el.find('.submenu').not($next).slideUp().parent().removeClass('open');
		};
	}	

	var accordion = new Accordion($('#accordion'), false);
});

$(document).ready(function(){
  
	// $(".zan").click(function () {
	// 	 $(this).toggleClass("on");
	// });
  
	// $("http://daohem.gz11.hostadm.net/js/.spxq .bgf .p1 a.a2").click(function () {
	// 	 $(this).toggleClass("on");
	// });
	
 //   $(".checkAll").click(function() {
	// 	$('.subBox').attr("checked",this.checked); 
	// });
	var $subBox = $(".subBox");
	$subBox.click(function(){
		$(".checkAll").attr("checked",$subBox.length == $(".subBox:checked").length ? true : false);
	});
	
	$(".qdjl table a").click(function(){
		$(this).addClass("on");
	});
	
	$(".cnm p").click(function(){
	$(this).next("dl").slideToggle(300).siblings("dl").slideUp("slow");
	//$(this).siblings().removeClass("on2");
	});
})

//alert($);
// (function (window, undefined) {
// var MyJQuery = function () {
// window.MyjQuery = window.$ = jQuery; window.$ = MyJQuery;
// };
// })(window);
// alert($);

$.fn.ImgZoomIn = function () {

bgstr = '<div id="ImgZoomInBG" style=" background:#000000; filter:Alpha(Opacity=70); opacity:0.7; position:fixed; left:0; top:0; z-index:10000; width:100%; height:100%; display:none;"><iframe src="about:blank" frameborder="0" scrolling="yes" style="width:100%; height:100%;"></iframe></div>';
//alert($(this).attr('src'));
imgstr = '<img id="ImgZoomInImage" src="' + $(this).attr('src')+'" onclick=$(\'#ImgZoomInImage\').hide();$(\'#ImgZoomInBG\').hide(); style="cursor:pointer; display:none; position:absolute; z-index:10001;" />';
if ($('#ImgZoomInBG').length < 1) {
$('body').append(bgstr);
}
if ($('#ImgZoomInImage').length < 1) {
$('body').append(imgstr);
}
else {
$('#ImgZoomInImage').attr('src', $(this).attr('src'));
}
//alert($(window).scrollLeft());
//alert( $(window).scrollTop());
$('#ImgZoomInImage').css('left', $(window).scrollLeft() + ($(window).width() - $('#ImgZoomInImage').width()) / 2);
$('#ImgZoomInImage').css('top', $(window).scrollTop() + ($(window).height() - $('#ImgZoomInImage').height()) / 2);
$('#ImgZoomInBG').show();
$('#ImgZoomInImage').show();
};

$(document).ready(function () {
$("#imgTest").bind("click", function () {
$(this).ImgZoomIn();
});
});



$(function(){
	$('#wocaobut').bind('change',function(){
		var self = $(this);
		var files = this.files, file;
		if (files && files.length > 0) {
			// 获取目前上传的文件
			file = files[0];
			//读取图片信息
			var reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = function(e){
			   	$('http://daohem.gz11.hostadm.net/js/.wocao .obm').before('<div class="li"><img src="'+ this.result +'"/><input type="button" class="guan" value="&#215;" /></div>');
			}
		}
		if($('http://daohem.gz11.hostadm.net/js/.wocao .li').length ==4){ //限制9个
			self.hide()
			$('.obm').hide()
		}
		$('http://daohem.gz11.hostadm.net/js/.wocao .li .guan').live('click',function(){
			$(this).parents('.li').remove();
			self.show();
			$('.obm').show();
				
		});
	});

})

$(window).load(function(){
	$('http://daohem.gz11.hostadm.net/js/.lachu li .con').each(function(){
		var i =$(this).index();
		console.log(i);
		var unlock_btn = $(this)[i];
		unlock_btn.addEventListener('touchstart', tstart);
		unlock_btn.addEventListener('touchmove', tsmove);
		unlock_btn.addEventListener('touchend', tsend);
	});

	// $('http://daohem.gz11.hostadm.net/js/.lachu li .del').click(function(){
	// 	$(this).parents('li').hide();
	// });
});
var down= 0;
var up=0;
function tsmove(event)
{
	event.preventDefault();
	console.log('move');
}
function tstart(event)
{
	down=event.changedTouches[0].pageX;
	console.log('tart');
}
function tsend(event)
{
	up=event.changedTouches[0].pageX;
	var downj=down-up;
	if(downj<-30)
	{
		this.className= "con";
		console.log('end');
	}else if(downj>30)
	{
		this.className= "con on";
		console.log('end2');
	}
}
