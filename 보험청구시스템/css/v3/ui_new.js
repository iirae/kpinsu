//<![CDATA[
$(document).ready(function(){
	project.init();
});

var project = {
	init : function(){
		project.common();
		//project.main();
		//project.newMain();
		project.sub();
		project.stepProcess();
		project.placeHolder();
	},

	common : function(){
		//fixed header
		var $h = $("#header");
		if($("#top_Popup").is(":visible")){
			$h.removeClass("fixed");
		} else {
			$h.addClass("fixed");
			if($(".main-visual").is(":visible") == false){
				console.log("aa");
				$("#visual").css({"margin-top": "70px"});
			}
		}

		$(window).scroll(function(){
			var $wst = $(window).scrollTop(),
			$limitH = $("#top_Popup").outerHeight(),
			$h = $("#header");

			if($("#top_Popup").is(":visible")){
				if($wst > $limitH){
					$h.addClass("fixed");
					$("#header").css({"top":"0px"});
					if($("#top_Popup").is(":visible")){
						$("#visual").css({"margin-top": "70px"});
					};	
				} else {
					$h.removeClass("fixed");
					if($("#top_Popup").is(":visible")){
						$("#visual").css({"margin-top":"0px"});
					};
				};
			};

			if($wst > $limitH){
				$(".scrollTop").fadeIn();
			} else {
				$(".scrollTop").fadeOut();
			};
		});

		
		var $topPop = $("#top_Popup"),
		$closeTop = $topPop.find(".close");

		$closeTop.on("click", function(){
			$(this).parent().slideUp();
		});

		//gnb
		var $g = true,
		$s = true,
		$gnb = $(".gnb>li>a"),
		$sub = $(".sub"),
		$subBg = $(".subBg");
		
		$gnb.on("mouseover focus", function(){
			var $gnbOn  = $(".gnb .on"),
			$thisName = $(this).html();
			if($gnbOn.hasClass("on")){
				$gnbOn.removeClass("on");
				$gnbOn.removeClass("active");
				$gnbOn.parent().children(".sub").removeClass("show");
			};
			$(this).addClass("on");
			$(this).addClass("active");
			$(this).parent().children(".sub").addClass("show");
			if(!$(this).parent().find(".sub_depth").is(":visible")){
				$(this).parent().find(".subMenu").addClass("type");
				//$(this).parent().find(".subMenu li").append("<b></b>");
			}
		});

		function hideSub(){
			if($g && $s){
				var $gnbOn  = $(".gnb .on");
				if($gnbOn.hasClass("on")){
					$gnbOn.removeClass("on");
					$gnbOn.removeClass("active");
					$gnbOn.parent().children(".sub").removeClass("show");
				};
			};
		};

		$(".gnb").on("mouseleave", function(){
			$g = true;
			setTimeout(hideSub, 300);
		}).on("mouseenter", function(){
			$g = false;
		}).find(".subDepth").on("mouseleave", function(){
			$s = true;
			setTimeout(hideSub, 300);
		}).on("mouseenter", function(){
			$s = false;
		});
		
		var $firstMenu = $(".subMenu>li");

		//$firstMenu.eq(0).find("a").addClass("on");
		//$firstMenu.eq(0).find(".sub_depth").show();

		$(".subMenu>li>a").on("mouseover focus", function(){
			var $subMenu = $(this).parent().children(".sub_depth");
			if($(this).hasClass("on")){
				$(this).removeClass("on");
				$subMenu.removeClass("show");
			}
			$(".subMenu>li>a").removeClass("on");
			$(".sub_depth").removeClass("show");
			$(this).addClass("on");
			$subMenu.addClass("show");
		})
		
		$(".subMenu").on("mouseleave", function(){
			$(".subMenu>li>a").removeClass("on");
			$(".sub_depth").removeClass("show");
			$(">li",this).eq(0).find("a").addClass("on").parent().children(".sub_depth").addClass("show");
		});

		$(".myPage").on("mouseover", function(){
			$(this).find(".myList").slideDown();
		}).on("mouseleave", function(){
			$(this).find(".myList").stop(true, true).slideUp();
		});

		$(".btn_total").on("click", function(){
			$("#wrap").append("<div class='dimm'></div>");
			$(".totalMenu").addClass("show");
			$(".dimm").fadeIn(function(){
				$(this).on("click", function(){
					$(this).remove();
					$(".totalMenu").removeClass("show");
				});	
			});
		});

		$(".closeTotal").on("click", function(){
			$("#wrap").find(".dimm").remove();
			$(".totalMenu").removeClass("show");
			$(".dimm").fadeOut();
		});

		//inputPlaceHolder - datepicker
		$(".datePlace").find("input").each(function(){
			if($(window).width() < 750){
				$(this).attr("readonly", true);
			}

			if($(this).val() == ""){
				$(this).removeClass("on");
				$(this).siblings("label").show();
			} else {
				$(this).addClass("on");
				$(this).siblings("label").hide();
			};

			$(this).on("click focus", function(){
				if($(this).val() == ""){
					$(this).siblings("label").hide();
				}

				if($(window).width() < 750){
					$(this).on("click focus", function(){
						var $thisP = $(this).offset().top - 280;
						//console.log($(this));
						$("html, body").animate({"scrollTop":$thisP},300);
					});
				};
			});

			$(this).on("focusout", function(){
				if($(this).val() == ""){
					$(this).siblings("label").show();
				} else {
					$(this).siblings("label").hide();
				}
			});
		});

		//scrollTop
		var $qkTop = $(".scrollTop .top");

		$qkTop.on("click", function(){
			$("html, body").stop().animate({"scrollTop":0}, 300, "easeOutExpo");
		});

		//
		var $customS = $(".customSelect");

		$customS.find("p").on("click", function(){
			if($(this).hasClass("on") == false){
				$(this).addClass("on");
				$(this).next("ul").show();
			}
		});

		$customS.on("mouseleave", function(){
			if($(this).find("p").hasClass("on")){
				$(this).find("p").removeClass("on");
				$(this).find("ul").hide();
			}
		});
	},
	
	newMain : function(){
		//main_visual_slider
		var $mainSlider = $(".main-visual");
		$mainSlider.on('init', function(event, slick){
			var $bh = $("#top_Popup").height();
			var $hh = $("#header").height();
			var $wh = $(window).height();

			//$("#visual, .main-visual .slick-slide").height($wh);
			
			if($("#top_Popup").is(":visible")){
				$("#visual, .main-visual .slick-slide").height($wh - ($bh+$hh));
			} else {
				$("#visual, .main-visual .slick-slide").height($wh);
			}

			$(window).resize(function(){
				var $bh = $("#top_Popup").height();
				var $hh = $("#header").height();
				var $wh = $(window).height();
				//console.log($wh);
				//$("#visual, .main-visual .slick-slide").height($wh);

				if($("#top_Popup").is(":visible")){
					$("#visual, .main-visual .slick-slide").height($wh - ($bh+$hh));
				} else {
					$("#visual, .main-visual .slick-slide").height($wh);
				}
			});

			$(".slick-prev").text("PREV").delay(1000).animate({"left":"50px"}, 500, "easeOutQuart");
			$(".slick-next").text("NEXT").delay(1000).animate({"right":"50px"}, 500, "easeOutQuart");
			$(".scroll").delay(1000).animate({"bottom":"30px"}, 500, "easeOutQuart");
			$(".slick-arrow").append("<span></span>");
			$(".v-1").addClass("active");
		});

		$mainSlider.slick({
			autoplay: true,
			dots: false,
			infinite: true,
			speed: 500,
			slidesToShow: 1,
			adaptiveHeight: true
		});

		$mainSlider.find(".pause").on('click', function() {
			$mainSlider.slick('slickPause');
			//$(this).fadeOut();
			//$mainSlider.find(".play").fadeIn();
		});

		$mainSlider.find(".play").on('click', function() {
			$mainSlider.slick('slickPlay');
			//$(this).fadeOut();
			//$mainSlider.find(".pause").fadeIn();
		});

		$mainSlider.on('beforeChange', function(slider, event, slick, currentSlide, nextSlide){
			var nextPanel = $('[data-slick-index=' + currentSlide + ']');
			$(".slick-slide").removeClass("active");
			$(nextPanel).addClass('active');
		});
		
		function moving(){
			$("#visual .scroll img").animate({"top":"-5px"}, 600, "easeOutSine").animate({"top":"3px"}, 600, "easeOutSine", function(){moving();});
		};
		moving();

		//group_slider
		var _num = 0;
		var arr = [];
		var tyN = 3; //slide_Type
		var isN = 5; //slide obj length
		var $gP = 1000;

		var $groupSlider = $(".group_Slider");
		var objs = $(".group_Slider .obj");
		var $limits = objs.length;

		for(var i=0; i<$limits; i+=isN){
			objs.slice(i, i + isN).wrapAll("<div class='slide'></div>");
		};
		
		$(".slide").each(function(i){
			if(_num == tyN) _num=0;
				_num++;
				$(this).addClass("type_" + (_num-1));
				var obj = $(this).find(".obj"),
				objL = $(this).find(".obj").length;

			var x = 0;
			for(var a=0; a<objL; a++){
				if(x==isN) x=0;
				x++;
				obj.eq(x -1).addClass("obj_"+x);
			}
		});

		$groupSlider.slick({
			autoplay: false,
			dots: true,
			infinite: true,
			speed: 300,
			slidesToShow: 1,
			adaptiveHeight: true
		});
		
		//guage_init
		var o = $groupSlider.find(".guage").length;
		var arr = [];

		for(var a = 0; a<o; a++)
		arr.push(a);
		
		$.each(arr, function(){
			var $target = $groupSlider.find(".count").eq(this).find("b");
			var $val = $target.text();

			if($val == $gP){
				$groupSlider.find(".obj").eq(this).addClass("end");
				$groupSlider.find(".obj .info").eq(this).prepend("<div class='sticker'>모집성공</div>");
			} else {
				$groupSlider.find(".obj .info").eq(this).prepend("<div class='sticker'>모집중</div>");
			}
			if($val.length <= 2){
				var $v = $val.substring(0, 1);
				$target.css({"width":$v + "%"});
			}
		});

		$groupSlider.on('beforeChange', function(slider, event, slick, currentSlide, nextSlide){
			var nextPanel = $('[data-slick-index=' + currentSlide + ']');
			$(".slick-slide").removeClass("active");
			$(nextPanel).addClass('active');
			$(".guage b").css({"width":"0%"});
			var guageSlider = $(nextPanel);
			var o = guageSlider.find(".guage").length;
			var arr = [];

			for(var a = 0; a<o; a++)
			arr.push(a);
			
			$.each(arr, function(){
				var $target = guageSlider.find(".count").eq(this).find("b");
				var $val = $target.text();
				var $v = $val.substring(0, 2);

				$target.addClass("on");
				$target.css({"width":$v + "%"});
				if($val == $gP){
					$target.css({"width":"100%"});
				};
				if($val.length <= 2){
					var $v = $val.substring(0, 1);
					$target.css({"width":$v + "%"});
				}
			});
		});
		
		//serviceSlider
		var $serviceSlider = $(".service_Slider");
		$serviceSlider.slick({
			fade: false,
			autoplay: false,
			dots: true,
			infinite: true,
			speed: 150,
			easing: 'linear',
			slidesToShow: 1,
			adaptiveHeight: true
		});

		var controller = $.superscrollorama({
			triggerAtCenter: false
		});
		
		var controller = $.superscrollorama();
		var $target = $(".group_Slider");

		$("#contents").find(".sec-title").each(function(index){
			index++;
			var l = $(".sec-title").length;
			$(this).attr("id","title_"+ index);
			for(var e = 1; e<= l; e++){
				controller.addTween("#title_"+e, TweenMax.to( $("#title_"+e), 1, {css:{opacity:1}, ease:Quad.easeOut}));
			};
		});

		controller.addTween($groupSlider, TweenMax.to( $groupSlider, 1, {css:{"margin-top":"30px", opacity:1}, ease:Quad.easeOut, 
			onComplete: function(){
				$(".group_Slider").addClass("on");
				var guageSlider = $(".group_Slider.on");
				var o = guageSlider.find(".slick-current").find(".count").length;
				var arr = [];

				for(var a = 0; a<o; a++)
				arr.push(a);
				
				$.each(arr, function(){
					var $target = guageSlider.find(".slick-current").find(".count").eq(this).find("b");
					var $val = $target.text();
					var $v = $val.substring(0, 2);

					$target.addClass("on");
					$target.css({"width":$v + "%"});
					if($val == $gP){
						$target.css({"width":"100%"});
					};
					if($val.length <= 2){
						var $v = $val.substring(0, 1);
						$target.css({"width":$v + "%"});
					}
				});
			}
		}));

		controller.addTween( ".service_Slider", TweenMax.to( ".service_Slider", 1, {css:{"margin-top":"30px", opacity:1}, ease:Quad.easeOut}));

		//itemSlider
		var $itemSlider = $(".item_Slider");
		$itemSlider.slick({
			fade: false,
			autoplay: false,
			dots: true,
			dotsClass: "customPaging",
			infinite: true,
			speed: 100,
			slidesToShow: 2,
			variableWidth: true,
			adaptiveHeight: true,
			customPaging : function(slider, i){
				return (i+1);
			}
		});
		$(".item_Slider .customPaging>li").append("<span></span>");

		//bannerSlider
		var $bannerSlider = $(".banner_Slider");
		$bannerSlider.slick({
			fade: false,
			autoplay: false,
			dots: true,
			arrows: false,
			infinite: true,
			speed: 100,
			slidesToShow: 1,
			variableWidth: true,
			adaptiveHeight: true
		});

		var sta;
		var lista;
		var $notice = $(".controls, .notice-list")
		ntSlider = $('.notice-list'),
		slide = ntSlider.find("li");

		lista = slide.size();

		if(lista == 1){
			console.log(lista);
			clearInterval(sta);
			$(".controls").hide();
		} else {
			sta = setInterval(next, 2500);

			$('.up').click(function(){next();});
			prev();

			$notice.mouseenter(function(){
				clearInterval(sta);
			});

			$notice.mouseleave(function(){
				sta = setInterval(next, 2500);
			});
		};

		function next(){
			if(ntSlider.is(':animated') == false){
				ntSlider.stop().animate({'top':'-65px'}, 600, "easeOutCubic", function(){
					ntSlider.append($('.notice-list li:first'));
					ntSlider.css('top','0');
				});
			};
		};

		function prev(){
			$('.down').click(function(){
				if(ntSlider.is(':animated') == false){
					ntSlider.prepend($('.notice-list li:last'));
					ntSlider.css('top','-65px');
					ntSlider.stop().animate({'top':'0px'}, 600, "easeOutCubic");
				};
			});
		};
	},

	sub : function(){
		//scroll
		//$(".scroll").mCustomScrollbar();

		$('.aboutSlider').slick({
			autoplay: false,
			autoplaySpeed: 5000,
			dots: true,
			infinite: true,
			speed: 600,
			slidesToShow: 1,
			//slidesToScroll: 4,
			centerMode: true,
			variableWidth: true,
			cssEase: 'ease-in'
		});

		//subTab 
		var $subTab = $(".subTab li"),
			$subView =$(".subTab_view");

		$subTab.each(function(index){
			index++;
			$(this).children("a").attr("rel","#tab_"+index);
		});
		$subView.each(function(index){
			index++;
			$(this).attr("id","tab_"+index);
		});
		
		//option
		var $opt = $(".optionBox a");
		$opt.on("click", function(){
			if($(this).hasClass("on") == false){
				$opt.removeClass("on");
				$(this).addClass("on");
			} else {
				$(this).removeClass("on");
			};
			return false;
		});

		$(".subTab_view:not(" +$(".subTab li a.on").attr("rel") + ")").hide();
		$(".subTab>li").eq(0).find("a").addClass("on");
		$subView.eq(0).show();
		$(".subTab>li>a").on("click", function(){
			$(".subTab>li>a").removeClass("on");
			$(this).addClass("on");
			$(".subTab_view").hide();
			$(".dr_Tab>li>a").removeClass("on");
			$($(this).attr("rel")).fadeIn(function(){
				$(".dr_Tab li").each(function(index){
					index++;
					$(this).children("a").attr("rel","#dr_tab_"+index);
				});
				$(".dr_Tab_view").each(function(index){
					index++;
					$(this).attr("id","dr_tab_"+index);
				});
				
				$(".dr_Tab_view:not(" +$(".dr_Tab li a.on").attr("rel") + ")").hide();
				$(".dr_Tab>li").eq(0).find("a").addClass("on");
				$(".dr_Tab_view").eq(0).show();
				$(".dr_Tab>li>a").on("click", function(){
					$(".dr_Tab>li>a").removeClass("on");
					$(this).addClass("on");
					$(".dr_Tab_view").hide();
					$($(this).attr("rel")).show();
					return false;
				});
			});
			return false;
		});

		//infoB
		$(".input-zip>dt .info").on("mouseover", function(){
			$(this).next(".infoB").show();
		}).on("mouseleave", function(){
			$(this).next(".infoB").hide();
		});

		//faq
		var $q = $(".faq dt"),
		$a = $(".faq dd");

		$q.on("click", function(){
			var $this = $(this).next("dd");
			if($this.is(":visible")){
				$(this).removeClass("on");
				$this.slideUp(80);
			} else {
				$(".faq dt").removeClass("on");
				$(".faq dd").slideUp(80);
				$(this).addClass("on");
				$this.slideDown(80);
			}
		});
		
		//결제
		$(".pay-Area a").on("click", function(){
			$(".pay-Area a").removeClass("on");
			$(this).addClass("on");
		});
		
		//도움말
		$(".infoTip .open").on("click", function(){
			$(".info-Tip").fadeIn(200);
		});
		$(".info-Tip .close").on("click", function(){
			$(this).parent().fadeOut(200);
		});

		//리스트 카운트
		if($(".list-Block").is(":visible")){
			var $listB = $(".list-Block");
			$listB.eq(0).css({"margin-top":"0px"});
			$listB.each(function(){
				var $count = $(this).find(".list-Title>b"),
					$li_C = $(this).find(".item-List li").length;
				//console.log($li_C);
				$count.html($li_C);
			});
		};

		if($(".with-List").is(":visible")){
			var $count = $(".with-List li").length;
			
			$(".count_insu b").html($count);
		};

		//loginTab 
		var $subTab = $(".loginTab li"),
			$subView =$(".login-Box");

		$subTab.each(function(index){
			index++;
			$(this).children("a").attr("rel","#login_"+index);
		});
		$subView.each(function(index){
			index++;
			$(this).attr("id","login_"+index);
		});

		$(".login-Box:not(" +$(".loginTab li a.on").attr("rel") + ")").hide();
		$(".loginTab>li").eq(0).find("a").addClass("on");
		$subView.eq(0).show();
		$(".loginTab>li>a").on("click", function(){
			$(".loginTab>li>a").removeClass("on");
			$(this).addClass("on");
			$(".login-Box").hide();
			$($(this).attr("rel")).fadeIn();
			return false;
		});

		//customCheckbox
		$(".chkMdu").find("input:checkbox").each(function(){
			$(this).on("click",function(){
				if($(this).prop("checked")){
					$(this).parent().addClass("on");
				} else {
					$(this).parent().removeClass("on");
				};
			});
		});

		//sns connect
		$(".sns_Login div").find("span").each(function(){
			if($(this).hasClass("on")){
				$(this).html("연결됨");
			};
		});
	},
	
	stepProcess : function(){
		//sex checked
		var $sexTarget = $(".sexRadio div");
		$sexTarget.find("a").each(function(){
			$(this).on("click", function(){
				$(this).parent().siblings().removeClass("on");
				$(this).parent().addClass("on");
			});
		});

		$(".sexRadio.fix").find("a").off();

		//약관동의 체크
		$(".all").click(function(){
			if($(this).hasClass('on')) {
				$(this).removeClass("on");
				$(".chkCustom").removeClass('active');
			}
			else {
				$(this).addClass("on");
				$(".chkCustom").addClass('active');
				$(".chkZip .yes").removeClass("active");
			}
		});

		$(".terms-block").find("span.open").on("click", function(){
			var $t_s = $(this).parent().next(".terms-see");
			if($t_s.is(":visible")){
				$(this).removeClass("active");
				$t_s.hide();
			} else {
				$(this).addClass("active");
				$t_s.show();
			};
		});
		$(".terms-block.fix").find("span").off();

		$(".chkCustom, .chkCustomNo, .chkC").on("click", function(){
			if($(this).hasClass("active")){
				$(this).removeClass("active");
			} else {
				$(this).siblings().removeClass("active");
				$(this).addClass("active");
			};
		});
	},

	progressBar : function(){
		$(".group_List .group").each(function(){
			var $barValue = $(this).find(".p_bar .text>b").html();
			//console.log($barValue);
			$(this).find(".p_bar .bar>b").css({"width" : $barValue});
		});
	},
	
	placeHolder : function(){
		$(".inputPlace").find("input, textarea").each(function(){
			if($(this).val() == ""){
				$(this).removeClass("on");
				$(this).siblings("label").show();
			} else {
				$(this).addClass("on");
				$(this).siblings("label").hide();
			};

			$(this).on("click focus", function(){
				if($(this).val() == ""){
					$(this).addClass("on");
					$(this).siblings("label").hide();
				}
			});

			$(this).on("focusout", function(){
				if($(this).val() == ""){
					$(this).removeClass("on");
					$(this).siblings("label").show();
				} else {
					$(this).addClass("on");
					$(this).parent().removeClass("on");
				}
			});
		});
	},

	//join check
	join : function(){
		//datePicker
		$('.datepicker').on('click', function(){
			if(!$(this).parent().find(".cal-wrap").hasClass('show')){
				$(".cal-wrap").removeClass('show');
				$(this).parent().find(".cal-wrap").addClass('show');
			}else{
				$(this).parent().find(".cal-wrap").removeClass('show');
			}
		});

		$('.datepicker label').on('click', function(){
			if(!$(this).parent().parent().find(".cal-wrap").hasClass('show')){
				$(".cal-wrap").removeClass('show');
				$(this).parent().parent().find(".cal-wrap").addClass('show');
			}else{
				$(this).parent().parent().find(".cal-wrap").removeClass('show');
			}
		});

		$( "#datepicker_1" ).datepicker({
			  //closeText: "확인",
			  showOtherMonths: true,
			  selectOtherMonths: false,
			  currentText: "오늘",
			  minDate:0,
			  maxDate:"+3M",
			  yearRange: "2017:2100",
			  changeYear: false,
			  changeMonth: false,
			  dateFormat:"yy-mm-dd",
			  yearSuffix : "년",
			  showButtonPanel: false,
			  showMonthAfterYear:true,
			  dayNamesMin: ["일","월","화","수","목","금","토"],
			  monthNamesShort: ["1","2","3","4","5","6","7","8","9","10","11","12"],
			  monthNames: ["01월","02월","03월","04월","05월","06월","07월","08월","09월","10월","11월","12월"],
			  onSelect: function(selectedDate){
				  var $this = $(this).parent().parent(),
				  minDate = $(this).datepicker('getDate'),
				  newMin = new Date(minDate.setDate(minDate.getDate() + 1)),
				  newMax = new Date(minDate.setDate(minDate.getDate() + 89));

				  $this.find(".datepicker").children("input").addClass("on");
				  $this.find(".datepicker").children("label").hide();
				  $this.find(".datepicker").removeClass("on");
				  $('.cal-wrap').removeClass('show');
				  $(".dateVal_1").val(selectedDate);
				  $( "#datepicker_2" ).datepicker( "option", "minDate", newMin );
				  $( "#datepicker_2" ).datepicker( "option", "maxDate", newMax );
			  }
		});

		$( "#datepicker_2" ).datepicker({
			  //closeText: "확인",
			  showOtherMonths: true,
			  selectOtherMonths: false,
			  currentText: "오늘",
			  defaultDate: "+1w",
			  minDate:"+2d",
			  maxDate:"+90D",
			  yearRange: "2017:2100",
			  changeYear: false,
			  changeMonth: false,
			  dateFormat:"yy-mm-dd",
			  yearSuffix : "년",
			  showButtonPanel: false,
			  showMonthAfterYear:true,
			  dayNamesMin: ["일","월","화","수","목","금","토"],
			  monthNamesShort: ["1","2","3","4","5","6","7","8","9","10","11","12"],
			  monthNames: ["01월","02월","03월","04월","05월","06월","07월","08월","09월","10월","11월","12월"],
			  onSelect: function(selectedDate){
				  var $this = $(this).parent().parent();

				  $this.find(".datepicker").children("input").addClass("on");
				  $this.find(".datepicker").children("label").hide();
				  $this.find(".datepicker").removeClass("on");
				  $('.cal-wrap').removeClass('show');
				  $(".dateVal_2").val(selectedDate);
			  }
		});
		
		//한화유학생보험
		$( "#datepicker12_1" ).datepicker({
			  //closeText: "확인",
			  //defaultDate: startDate,
			  showOtherMonths: true,
			  selectOtherMonths: false,
			  //currentText: "오늘",
			  minDate:"+0d",
			  maxDate:"+3M",
			  //yearRange: "2017:2020",
			  changeYear: false,
			  changeMonth: false,
			  dateFormat:"yy-mm-dd",
			  yearSuffix : "년",
			  showButtonPanel: false,
			  showMonthAfterYear:true,
			  dayNamesMin: ["일","월","화","수","목","금","토"],
			  monthNamesShort: ["1","2","3","4","5","6","7","8","9","10","11","12"],
			  monthNames: ["01월","02월","03월","04월","05월","06월","07월","08월","09월","10월","11월","12월"],
			  onSelect: function(selectedDate){
				  var $this = $(this).parent().parent(),
				  minDate = $(this).datepicker('getDate'),
				  newMin = new Date(minDate.setDate(minDate.getDate() + 92)),
				  newMax = new Date(minDate.setDate(minDate.getDate() + 272));

				  $this.find(".datepicker").children("input").addClass("on");
				  $this.find(".datepicker").children("label").hide();
				  $this.find(".datepicker").removeClass("on");
				  $('.cal-wrap').removeClass('show');
				  $(".dateVal_1").val(selectedDate);
				  $( "#datepicker12_2" ).datepicker( "option", "minDate", newMin );
				  $( "#datepicker12_2" ).datepicker( "option", "maxDate", newMax );
			  }
		});
		
		$( "#datepicker12_2" ).datepicker({
			  //closeText: "확인",
			  showOtherMonths: true,
			  selectOtherMonths: false,
			  currentText: "오늘",
			  defaultDate: "+1w",
			  //minDate:"+2d",
			  //maxDate:"+90D",
			  //yearRange: "2017:2018",
			  changeYear: false,
			  changeMonth: false,
			  dateFormat:"yy-mm-dd",
			  yearSuffix : "년",
			  showButtonPanel: false,
			  showMonthAfterYear:true,
			  dayNamesMin: ["일","월","화","수","목","금","토"],
			  monthNamesShort: ["1","2","3","4","5","6","7","8","9","10","11","12"],
			  monthNames: ["01월","02월","03월","04월","05월","06월","07월","08월","09월","10월","11월","12월"],
			  onSelect: function(selectedDate){
				  var $this = $(this).parent().parent();

				  $this.find(".datepicker").children("input").addClass("on");
				  $this.find(".datepicker").children("label").hide();
				  $this.find(".datepicker").removeClass("on");
				  $('.cal-wrap').removeClass('show');
				  $(".dateVal_2").val(selectedDate);
			  }
		});

		$( "#datepicker_3" ).datepicker({
			  //closeText: "확인",
			  showOtherMonths: true,
			  selectOtherMonths: false,
			  currentText: "오늘",
			  minDate:0,
			  maxDate:"+3M",
			  yearRange: "2017:2020",
			  changeYear: false,
			  changeMonth: false,
			  dateFormat:"yy-mm-dd",
			  yearSuffix : "년",
			  showButtonPanel: false,
			  showMonthAfterYear:true,
			  dayNamesMin: ["일","월","화","수","목","금","토"],
			  monthNamesShort: ["1","2","3","4","5","6","7","8","9","10","11","12"],
			  monthNames: ["01월","02월","03월","04월","05월","06월","07월","08월","09월","10월","11월","12월"],
			  onSelect: function(selectedDate){
				  var $this = $(this).parent().parent(),
				  minDate = $(this).datepicker('getDate'),
				  newMin = new Date(minDate.setDate(minDate.getDate() + 1)),
				  newMax = new Date(minDate.setDate(minDate.getDate() + 89));

				  $this.find(".datepicker").children("input").addClass("on");
				  $this.find(".datepicker").children("label").hide();
				  $this.find(".datepicker").removeClass("on");
				  $('.cal-wrap').removeClass('show');
				  $(".dateVal_3").val(selectedDate);
				  $( "#datepicker_4" ).datepicker( "option", "minDate", newMin );
				  $( "#datepicker_4" ).datepicker( "option", "maxDate", newMax );
			  }
		});

		$( "#datepicker_4" ).datepicker({
			  //closeText: "확인",
			  showOtherMonths: true,
			  selectOtherMonths: false,
			  currentText: "오늘",
			  defaultDate: "+1w",
			  minDate:"+2d",
			  maxDate:"+90D",
			  yearRange: "2017:2018",
			  changeYear: false,
			  changeMonth: false,
			  dateFormat:"yy-mm-dd",
			  yearSuffix : "년",
			  showButtonPanel: false,
			  showMonthAfterYear:true,
			  dayNamesMin: ["일","월","화","수","목","금","토"],
			  monthNamesShort: ["1","2","3","4","5","6","7","8","9","10","11","12"],
			  monthNames: ["01월","02월","03월","04월","05월","06월","07월","08월","09월","10월","11월","12월"],
			  onSelect: function(selectedDate){
				  var $this = $(this).parent().parent();

				  $this.find(".datepicker").children("input").addClass("on");
				  $this.find(".datepicker").children("label").hide();
				  $this.find(".datepicker").removeClass("on");
				  $('.cal-wrap').removeClass('show');
				  $(".dateVal_4").val(selectedDate);
			  }
		});

		$( "#datepicker_21" ).datepicker({
			  closeText: "확인",
			  currentText: "오늘",
			  minDate:0,
			  maxDate:"+2M",
			  yearRange: "2017:2020",
			  changeYear: false,
			  changeMonth: false,
			  dateFormat:"yy-mm-dd",
			  yearSuffix : "년",
			  showButtonPanel: false,
			  showMonthAfterYear:true,
			  dayNamesMin: ["일","월","화","수","목","금","토"],
			  monthNamesShort: ["1","2","3","4","5","6","7","8","9","10","11","12"],
			  monthNames: ["01월","02월","03월","04월","05월","06월","07월","08월","09월","10월","11월","12월"],
			  onSelect: function(selectedDate){
				  var $this = $(this).parent().parent(),
				  minDate = $(this).datepicker('getDate'),
				  newMin = new Date(minDate.setDate(minDate.getDate() + 1));
				  newMax = new Date(minDate.setDate(minDate.getDate() + 59));
		
				  $this.find(".datepicker").children("label").hide();
				  $this.find(".datepicker").removeClass("on");
				  $('.cal-wrap').removeClass('show');
				  $(".dateVal_21").val(selectedDate);
				  $( "#datepicker_22" ).datepicker( "option", "minDate", newMin );
				  $( "#datepicker_22" ).datepicker( "option", "maxDate", newMax );
			  }
		});

		$( "#datepicker_22" ).datepicker({
			  closeText: "확인",
			  showOtherMonths: true,
			  selectOtherMonths: false,
			  currentText: "오늘",
			  defaultDate: "+1w",
			  minDate:"+2d",
			  maxDate:"+30D",
			  yearRange: "2017:2020",
			  changeYear: false,
			  changeMonth: false,
			  dateFormat:"yy-mm-dd",
			  yearSuffix : "년",
			  showButtonPanel: false,
			  showMonthAfterYear:true,
			  dayNamesMin: ["일","월","화","수","목","금","토"],
			  monthNamesShort: ["1","2","3","4","5","6","7","8","9","10","11","12"],
			  monthNames: ["01월","02월","03월","04월","05월","06월","07월","08월","09월","10월","11월","12월"],
			  onSelect: function(selectedDate){
				  var $this = $(this).parent().parent();
				  $this.find(".datepicker").children("label").hide();
				  $this.find(".datepicker").removeClass("on");
				  $('.cal-wrap').removeClass('show');
				  $(".dateVal_22").val(selectedDate);
			  }
		});

		$( "#pickupDate" ).datepicker({
			  //closeText: "확인",
			  showOtherMonths: true,
			  selectOtherMonths: false,
			  currentText: "오늘",
			  minDate:"+3d",
			  changeYear: false,
			  changeMonth: false,
			  dateFormat:"yy-mm-dd",
			  yearSuffix : "년",
			  showButtonPanel: false,
			  showMonthAfterYear:true,
			  dayNamesMin: ["일","월","화","수","목","금","토"],
			  monthNamesShort: ["1","2","3","4","5","6","7","8","9","10","11","12"],
			  monthNames: ["01월","02월","03월","04월","05월","06월","07월","08월","09월","10월","11월","12월"],
			  beforeShowDay: function(date){ //주말선택 안하기
				  var day = date.getDay();
				  return [(day != 0 && day != 6)];
			  },
			  onSelect: function(selectedDate){
				  var $this = $(this).parent().parent(),
				  minDate = $(this).datepicker('getDate'),
				  newMin = new Date(minDate.setDate(minDate.getDate() + 1)),
				  newMax = new Date(minDate.setDate(minDate.getDate() + 89));

				  $this.find(".datepicker").children("input").addClass("on");
				  $this.find(".datepicker").children("label").hide();
				  $this.find(".datepicker").removeClass("on");
				  $('.cal-wrap').removeClass('show');
				  $(".dateVal_1").val(selectedDate);
				  $( "#datepicker_2" ).datepicker( "option", "minDate", newMin );
				  $( "#datepicker_2" ).datepicker( "option", "maxDate", newMax );
			  }
		});
/*
		$("#submitBtn").click(function(){
			//var regex=/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;   

			if ($("#datePic_1").val() == "") {
				alert("출국 예정일을 꼭 선택하세요!");
				$("#datePic_1").focus();
				$("#datePic_1").parent().addClass("on");
				return false;
			} else if ($("#datePic_2").val() == "") {
				alert("입국 예정일을 꼭 선택하세요!");
				$("#datePic_2").focus();
				$("#datePic_2").parent().addClass("on");
				return false;
			} else if ($("#birth").val() == "") {
				alert("생년월일을 꼭 입력하세요!");
				$("#birth").focus();
				$("#birth").parent().addClass("on");
				return false;
			} else if ($("#name").val() == "") {
				alert("이름을 꼭 입력하세요!");
				$("#name").focus();
				$("#name").parent().addClass("on");
				return false;
			} else if ($("#engName").val() == "") {
				alert("영문이름을 꼭 입력하세요!");
				$("#engName").focus();
				$("#engName").parent().addClass("on");
				return false;
			} else if ($("#rrn1").val() == "") {
				alert("주민등록 앞자리를 꼭 입력하세요!");
				$("#rrn1").focus();
				$("#rrn1").parent().addClass("on");
				return false;
			} else if ($("#rrn2").val() == "") {
				alert("주민등록 뒷자리를 꼭 입력하세요!");
				$("#rrn2").focus();
				$("#rrn2").parent().addClass("on");
				return false;
			} else if ($("#phone").val() == "") {
				alert("핸드폰번호를 꼭 입력하세요!");
				$("#phone").focus();
				$("#phone").parent().addClass("on");
				return false;
			} else if ($("#email").val() == "") {
				alert("이메일을 꼭 입력하세요!");
				$("#email").focus();
				$("#email").parent().addClass("on");
				return false;
			} else if ($("#emailChk").val() == "") {
				alert("이메일확인을 꼭 입력하세요!");
				$("#emailChk").focus();
				$("#emailChk").parent().addClass("on");
				return ;
			}
		});
		*/
	},

	//add User
	addUser_ : function(){
		var $i = 0;
		$(".add_Btn").on("click", function(){
			var $userCount = $(".join-input").length,
			html = "";
			html += "<div class='join-input lineT'>";
			html += "<dl class='input-zip'>";
			html += "<h3 class='userTitle'>동반자 정보입력 <span class='delete' id='del_"+ $i +"'><img src='../../img/v3/btn/btn_userDel.png' alt='동행자 삭제' /></span></h3>";
			html += "<dt><label for='birth"+ $i +"'>생년월일</label></dt>";
			html += "<dd><div class='datepicker inputPlace'><label for='birth"+ $i +"'>생년월일 예:19901105</label><input type='tel' id='birth"+ $i +"' maxlength='8' class='user_name' name='user_birth[]' title='생년월일을 입력하세요'  /> </div>";
			html += "<div class='sexRadio' id='sex_"+ $i +"'>";
			html += "<div><a href='#self'>남</a></div>";
			html += "<div><a href='#self'>여</a></div>";
			html += "</div>";
			html += "</dd>";
			html += "</dl>";
			html += "</div>";

			/*
			if($userCount > 5){
				alert("최대 4명까지만 추가할수 있습니다.");
				return;
			};
			*/

			$(".insCheck-Box .in").append(html);
			project.placeHolder();

			//sex checked
			var $sexTarget = $("#sex_" + $i);
			$sexTarget.find("a").each(function(){
				$(this).on("click", function(){
					$sexTarget.find("div").removeClass("on");
					$(this).parent().addClass("on");
				});
			});

			$("#del_" + $i).on("click", function(){
				$(this).parent().parent().parent().remove();
			});
			++$i;	
		});
	},

	//add User
	addUser_ : function(){
		var $i = 0;
		$(".add_Btn").on("click", function(){
			var $userCount = $(".join-input").length,
			html = "";
			html += "<div class='join-input lineT'>";
			html += "<dl class='input-zip'>";
			html += "<h3 class='userTitle'>동행자 정보입력 <span class='delete' id='del_"+ $i +"'><img src='../../img/v3/btn/btn_userDel.png' alt='동행자 삭제' /></span></h3>";
			html += "<dt><label for='birth"+ $i +"'>생년월일</label></dt>";
			html += "<dd><div class='datepicker inputPlace'><label for='birth"+ $i +"'>생년월일 예:19901105</label><input type='tel' id='birth"+ $i +"' maxlength='8' class='user_name' name='user_birth[]' title='생년월일을 입력하세요'  /> </div>";
			html += "<div class='sexRadio' id='sex_"+ $i +"'>";
			html += "<div><a href='#self'>남</a></div>";
			html += "<div><a href='#self'>여</a></div>";
			html += "</div>";
			html += "</dd>";
			html += "</dl>";
			html += "</div>";

			/*
			if($userCount > 5){
				alert("최대 4명까지만 추가할수 있습니다.");
				return;
			};
			*/

			$(".insCheck-Box .in").append(html);
			project.placeHolder();

			//sex checked
			var $sexTarget = $("#sex_" + $i);
			$sexTarget.find("a").each(function(){
				$(this).on("click", function(){
					$sexTarget.find("div").removeClass("on");
					$(this).parent().addClass("on");
				});
			});

			$("#del_" + $i).on("click", function(){
				$(this).parent().parent().parent().remove();
			});
			++$i;	
		});
	},

	//add User
	addUser : function(){
		var $i = 0;
		$(".add_Btn").on("click", function(){
			var $userCount = $(".join-input").length,
			html = "";
			html += "<div class='join-input lineT'>";
			html += "<dl class='input-zip'>";
			html += "<h3 class='userTitle'>동행자 정보입력 <span class='delete' id='del_"+ $i +"'><img src='../../img/v3/btn/btn_userDel.png' alt='동행자 삭제' /></span></h3>";
			html += "<dt><label for='name"+ $i +"'>동행자 이름</label></dt>";
			html += "<dd><div class='input inputPlace'><label for='name"+ $i +"'>이름을 입력하세요.</label><input type='text' id='name"+ $i +"' class='user_name' name='user_name[]' title='이름을 입력하세요'  /> </div></dd>";
			html += "<dt><label for='engName"+ $i +"'>영문이름</label></dt>";
			html += "<dd><div class='input inputPlace'><label for='engName"+ $i +"'>여권에 기재된 영문으로 입력</label><input type='text' id='engName"+ $i +"' class='eng_name' name='eng_name[]' title='영문이름을 입력하세요' /> </div></dd>";
			html += "<dt><label for='rrn1"+ $i +"'>주민등록 번호</label></dt>";
			html += "<dd><div class='rrtInput inputPlace'><label for='rrn1"+ $i +"'>주민번호 앞자리</label><input type='tel' id='rrn1"+ $i +"' maxlength='6' class='jumin_1' name='jumin_1[]' title='주민등록번호 앞자리를 입력하세요' /> </div>";
			html += "<div class='rrtInput inputPlace'><label for='rrn2"+ $i +"'>주민번호 뒷자리</label><input type='password' id='rrn2"+ $i +"' class='numbersOnly jumin_2' maxlength='7' name='jumin_2[]' title='주민등록번호 뒷자리를 입력하세요' /> </div>";
			html += "</dd>";
			html += "<dt><label for='phone"+ $i +"'>휴대폰번호</label></dt>";
			html += "<dd><div class='input inputPlace'><label for='phone"+ $i +"'>휴대폰번호 입력</label><input type='tel' id='phone"+ $i +"' class='user_phone' name='user_phone[]' maxlength='11' title='휴대폰번호을 입력하세요' /> </div></dd>";
			html += "</dl>";
			html += "</div>";
			
			/*
			if($userCount > 5){
				alert("최대 4명까지만 추가할수 있습니다.");
				return;
			};
			*/

			$(".joinInput-Area .in").append(html);
			project.placeHolder();

			$("#del_" + $i).on("click", function(){
				$(this).parent().parent().parent().remove();
			});
			++$i;	
		});
	},

	//add User
	addUser2 : function(){
		var $i = 0;
		$(".add_Btn").on("click", function(){
			var $userCount = $(".join-input").length,
			html = "";
			html += "<div class='join-input lineT'>";
			html += "<dl class='input-zip'>";
			html += "<h3 class='userTitle'>동행자 정보입력 <span class='delete' id='del_"+ $i +"'><img src='../../img/v3/btn/btn_userDel.png' alt='동행자 삭제' /></span></h3>";
			html += "<dt><label for='name"+ $i +"'>동행자 이름</label></dt>";
			html += "<dd><div class='input inputPlace'><label for='name"+ $i +"'>이름을 입력하세요.</label><input type='text' id='name"+ $i +"' class='user_name' name='user_name[]' title='이름을 입력하세요'  /> </div></dd>";
			html += "<dt><label for='rrn1"+ $i +"'>주민등록 번호</label></dt>";
			html += "<dd><div class='rrtInput inputPlace'><label for='rrn1"+ $i +"'>주민번호 앞자리</label><input type='tel' id='rrn1"+ $i +"' maxlength='6' class='jumin_1' name='jumin_1[]' title='주민등록번호 앞자리를 입력하세요' /> </div>";
			html += "<div class='rrtInput inputPlace'><label for='rrn2"+ $i +"'>주민번호 뒷자리</label><input type='password' id='rrn2"+ $i +"' class='numbersOnly jumin_2' maxlength='7' name='jumin_2[]' title='주민등록번호 뒷자리를 입력하세요' /> </div>";
			html += "</dd>";
			html += "<dt><label for='phone"+ $i +"'>휴대폰번호</label></dt>";
			html += "<dd><div class='input inputPlace'><label for='phone"+ $i +"'>휴대폰번호 입력</label><input type='tel' id='phone"+ $i +"' class='user_phone' name='user_phone[]' maxlength='11' title='휴대폰번호을 입력하세요' /> </div></dd>";
			html += "</dl>";
			html += "</div>";
			
			/*
			if($userCount > 5){
				alert("최대 4명까지만 추가할수 있습니다.");
				return;
			};
			*/

			$(".joinInput-Area .in").append(html);
			project.placeHolder();

			$("#del_" + $i).on("click", function(){
				$(this).parent().parent().parent().remove();
			});
			++$i;	
		});
	},

	//add User 골프보험
	addUserGolf : function(){
		var $i = 0;
		$(".add_Btn2").on("click", function(){
			var $userCount = $(".join-input").length,
			html = "";
			html += "<div class='join-input lineT'>";
			html += "<dl class='input-zip'>";
			html += "<h3 class='userTitle'>동반자 정보입력 <span class='delete' id='del_"+ $i +"'><img src='../../img/v3/btn/btn_userDel.png' alt='동행자 삭제' /></span></h3>";
			html += "<dt><label for='name"+ $i +"'>동반자 이름</label></dt>";
			html += "<dd><div class='input inputPlace'><label for='name"+ $i +"'>이름을 입력하세요.</label><input type='text' id='name"+ $i +"' class='user_name' name='user_name[]' title='이름을 입력하세요'  /> </div>";
			html += "<span class='certiNumber certi_number_txt' name='certi_number_txt[]'></span><input type='hidden' class='certi_number' name='certi_number[]'>"; //골프보험 인증번호
			html += "</dd>";
			html += "<dt><label for='rrn1"+ $i +"'>주민등록 번호</label></dt>";
			html += "<dd><div class='rrtInput inputPlace'><label for='rrn1"+ $i +"'>주민번호 앞자리</label><input type='tel' id='rrn1"+ $i +"' maxlength='6' class='jumin_1' name='jumin_1[]' title='주민등록번호 앞자리를 입력하세요' /> </div>";
			html += "<div class='rrtInput inputPlace'><label for='rrn2"+ $i +"'>주민번호 뒷자리</label><input type='password' id='rrn2"+ $i +"' class='numbersOnly jumin_2' maxlength='7' name='jumin_2[]' title='주민등록번호 뒷자리를 입력하세요' /> </div>";
			html += "</dd>";
			html += "<dt><label for='phone"+ $i +"'>휴대폰번호</label></dt>";
			html += "<dd><div class='input inputPlace'><label for='phone"+ $i +"'>휴대폰번호 입력</label><input type='tel' id='phone"+ $i +"' class='user_phone' name='user_phone[]' maxlength='11' title='휴대폰번호을 입력하세요' /> </div></dd>";
			html += "</dl>";
			html += "</div>";
			
			if($userCount > 0){
				$("#chk-certi").css("display", "inline-block");
			};
			
			if($userCount > 3){
				alert("최대 3명까지만 추가할수 있습니다.");
				return;
			};

			$(".joinInput-Area .in").append(html);
			project.placeHolder();

			$("#del_" + $i).on("click", function(){
				if($(".join-input").length < 3){
					$("#chk-certi").css("display", "none");
				};
				$(this).parent().parent().parent().remove();
			});
			++$i;	
		});
	},
	
	layerPopup : function(){
		var $popBtn = $(".popup"),
		$layerP = $("#layer_Popup"),
		$targetP = $(".lyPopup"),
		$closeP = $targetP.find(".close");

		$popBtn.each(function(index){
			index++;
			$(this).attr("href","#pop_"+index);
		});

		$targetP.each(function(index){
			index++;
			$(this).attr("id","pop_"+index);
		});

		$popBtn.on("click", function(){
			$layerP.fadeIn();
			$($(this).attr("href")).show();
			if($(".scroll").is(":visible")){
				$(".scroll").mCustomScrollbar("update");
			};
			project.placeHolder();
			return false;
		});

		$closeP.on("click", function(){
			$layerP.fadeOut();
			$targetP.fadeOut();
			if($(".scroll").is(":visible")){
				$(".scroll").mCustomScrollbar("disable",true);
			};
		});
	},

	layerPopup_1 : function(){
		var $popBtn = $(".lyPop_btn"),
		$popClose = $(".close"),
		$lyPopup = $(".view_lyPopup"),
		$lyBg = $(".layer_bg");

		$popBtn.on("click", function(){
			var $imgW = $lyPopup.find(".pic img").width() / 2,
			$imgH = $lyPopup.find(".pic img").height()/2;

			if($lyPopup.find(".pic").height() >=700){
				$lyPopup.css({"margin-top":"-390px", "margin-left":-$imgW - 50});
				$(".scroll").mCustomScrollbar();
			} else {
				$lyPopup.css({"margin-top":-$imgH - 50, "margin-left":-$imgW - 50});
			}
			$lyPopup.css({"visibility":"visible"}).animate({"opacity":"1"},100);
			$lyBg.fadeIn("300");

				$(".dr_Tab li").each(function(index){
					index++;
					$(this).children("a").attr("rel","#dr_tab_"+index);
				});
				$(".dr_Tab_view").each(function(index){
					index++;
					$(this).attr("id","dr_tab_"+index);
				});
				
				$(".dr_Tab_view:not(" +$(".dr_Tab li a.on").attr("rel") + ")").hide();
				$(".dr_Tab>li").eq(0).find("a").addClass("on");
				$(".dr_Tab_view").eq(0).show();
				$(".dr_Tab>li>a").on("click", function(){
					$(".dr_Tab>li>a").removeClass("on");
					$(this).addClass("on");
					$(".dr_Tab_view").hide();
					$($(this).attr("rel")).show();
					return false;
				});
			return false;
		});
		$popClose.on("click", function(){
			$lyPopup.css({"margin-top":0, "margin-left":0});
			$(".view_lyPopup").css({"visibility":"hidden"}).animate({"opacity":"0"},100);
			$(".dr_Tab>li>a").removeClass("on");
			$(".dr_Tab_view").hide();
			$(".dr_Tab_view").eq(0).show();
			$lyBg.fadeOut("200");
		});
		$lyBg.on("click",function(){
			$lyPopup.css({"margin-top":0, "margin-left":0});
			$lyPopup.css({"visibility":"hidden"}).animate({"opacity":"0"},100);
			$(".dr_Tab>li>a").removeClass("on");
			$(".dr_Tab_view").hide();
			$(".dr_Tab_view").eq(0).show();
			$(this).fadeOut("200");
		});
	},

	qna : function(){
		var $qLength = $(".tableStyle .question").length,
		$qOpen = $(".tableStyle .question").find(".q_btn"),
		$answer = $(".tableStyle .answer").find(".a");
		
		$(".q_Count b").html($qLength);

		$answer.each(function(){
			//if($(this).find("span").text() != "" ){
			if($(this).find("span").text().replace(/(^\s*)|(\s*$)/g, "") != "" ){
				//console.log($(this).find("span"));
				$(".a").removeClass("on");
				$(this).find("span").addClass("on");
			};
		});

		$qOpen.each(function(){
			var $thisQ = $(this).parent().parent().next("tr").find(".answer");
			
			if($thisQ.find(".a span").hasClass("on")){
				$(this).addClass("on");
			};

			$(this).on("click", function(){
				if($thisQ.is(":visible")){
					$thisQ.hide();
				} else {
					$(".answer").hide();
					$thisQ.show();
					$answer.each(function(){
						if($(this).find("span").hasClass("on")){
							//console.log($(this))
							$(this).addClass("on");
						};
					});
				};
				return false;
			});
		});
	},

	inputFile : function(){
		var fileTarget = $('.filebox .upload-hidden'); 
		fileTarget.on('change', function(){ // 값이 변경되면 
			if(window.FileReader){ // modern browser 
			var filename = $(this)[0].files[0].name; } else { // old IE 
				var filename = $(this).val().split('/').pop().split('\\').pop(); // 파일명만 추출 
			} // 추출한 파일명 삽입 
			$(this).siblings('.upload-name').addClass("on").html(filename); 
		}); 
	},
	
	customRadio : function(){
		$(".radioModule").find("input:radio").each(function(index){
			//index++;
			//console.log($(this).parent().next("label").html());
			var $cloneLabel = $(this).parent().next("label").clone();
			$(this).attr("title", $(this).parent().next("label").html());
			$(this).parent("span").prepend($cloneLabel);

			if($(this).is(":checked")){
				$(this).parent().addClass("on");
			}
			$(this).on("click", function(){
				if($(this).prop("checked")){
					$(".radioModule").find("input:radio").parent().removeClass("on");
					$(".radioModule").find("input:radio").attr("checked", false);
					$(this).parent().find("input:radio").prop("checked", true);
					$(this).parent().addClass("on");
				};
			});
		});
	},

	calcLayer : function(){
		var $i = 1;
		var $calc = $(".calcPopup"),
		$calcLayer = $("#calcLayer"),
		$close = $calcLayer.find(".close");

		$calc.on("click", function(e){
			var $count = $(".birthBox").length,
			html = "";
			html += "<div class='birthBox'>";
			html += "<div class='inputPlace'><label for='birth0'>예 : 19901105</label><input type='tel' name='birthday[1]' id='birth0' class=' input' maxlength='8' title='생년월일을 입력하세요' />";
			html += "<input type='hidden' name='gender[1]' id='gender1' class='gender'  />";
			html += "</div>";
			html += "<div class='sexRadio'>";
			html += "<div><a href='#self' onclick='genderFunction('1','M')'>남</a></div>";
			html += "<div><a href='#self' onclick='genderFunction('1','F')'>여</a></div>";
			html += "</div>";
			html += "<div class='control'>";
			html += "<span class='del' id='del_0'>삭제</span>";
			html += "</div>";
			html += "</div>";
			
			$(".input-zip .mCSB_container").prepend(html);
			$("html, body").css({"position":"fixed","overflow":"hidden"});
			$calcLayer.addClass("show");

			$("#del_0").on("click", function(){
				$(this).parent().parent().remove();
			});

			project.stepProcess();
			project.placeHolder();

			e.preventDefault();
		});

		$close.on("click", function(){
			$("html, body").css({"position":"","overflow":""});
			$calcLayer.removeClass("show");
			$(".input-zip .mCSB_container").find(".birthBox").remove();
			console.log($calcLayer.find(".datepicker input").val());
			$calcLayer.find(".datepicker label").show();
			$calcLayer.find(".datepicker input").removeClass("on");
		});

		//$(".scroll").mCustomScrollbar();

		$(".add").on("click", function(){
			$(".inputPlace").find("input").each(function(){
				if($(this).val() == ""){
					$(this).siblings("label").show();
				} else {
					$(this).siblings("label").hide();
				};
			});

			var $count = $(".birthBox").length,
			html = "";
			html += "<div class='birthBox add_b'>";
			html += "<div class='inputPlace'><label for='birth"+ $i +"'>예 : 19901105</label><input type='tel' name='birthday[1]' id='birth"+ $i +"' class=' input' maxlength='8' title='생년월일을 입력하세요' />";
			html += "<input type='hidden' name='gender[1]' id='gender1' class='gender'  />";
			html += "</div>";
			html += "<div class='sexRadio'>";
			html += "<div><a href='#self' onclick='genderFunction('1','M')'>남</a></div>";
			html += "<div><a href='#self' onclick='genderFunction('1','F')'>여</a></div>";
			html += "</div>";
			html += "<div class='control'>";
			html += "<span class='del' id='del_"+ $i +"'>삭제</span>";
			html += "</div>";
			html += "</div>";

			$(".input-zip .birth-Area .mCSB_container").prepend(html);
			if($count > 1){
				$(".birth-Area").css({"height":"145px"});
			};
			project.stepProcess();
			project.placeHolder();

			$(".inputPlace").find("input, textarea").each(function(){
				if($(this).val() != ""){
					$(this).addClass("on");
					$(this).siblings("label").hide();
				};
			});

			$("#del_" + $i).on("click", function(){
				$(this).parent().parent().remove();
				if($(".birthBox").length < 3){
					$(".birth-Area").css({"height":""});
				}
			});
			$("#calcLayer .close").on("click", function(){
				$("#calcLayer .add_b").remove();
				$(".birth-Area").css({"height":"auto"});
			});
			++$i;	
		});
	},

	file : function(){
		$(".searchfile").on('change', function(){
			val = $(this).val().split("\\");
			f_name = val[val.length-1]; 
			s_name = f_name.substring(f_name.length-4, f_name.length);
			$(this).parent().siblings('.file_box').html("file : "+f_name);
		});
	},

	file_img : function(){
		$("#file_0").on('change', function(){
			val = $(this).val().split("\\");
			f_name = val[val.length-1]; 
			s_name = f_name.substring(f_name.length-4, f_name.length);
			$(this).parent().css({"opacity":"0"});
			$(this).parent().siblings('.file_box').html("file : "+f_name);
		});
	},

	corp : function(){
		var corpList = $(".corp_list>div"),
		hrefBtn = $("#hrefBtn");

		corpList.on("click", function(){
			var $this = $(this),
			$thisHref = $(this).attr("rel");
			if(!$this.hasClass("on")){
				corpList.removeClass("on");
				$this.addClass("on");
				hrefBtn.attr("href", $thisHref);
			} else {
				corpList.removeClass("on");
			}
		});
	}, 
	
	kakaopay : function(){
		var controller = $.superscrollorama({
			triggerAtCenter: true
		});
		
		//title
		var controller = $.superscrollorama();
		$(".with_kakao").find(".text").each(function(index){
			index++;
			var l = $(".text").length;
			$(this).attr("id","title_"+ index);
			for(var e = 1; e<= l; e++){
				controller.addTween("#title_"+e, TweenMax.to( $("#title_"+e), 1, {css:{left:"0px", opacity:1}, ease:Quad.easeOut}));
			};
		});
		//controller.addTween(".kakao-title", TweenMax.to( $(".kakao-title"), 1, {css:{top:"75px", opacity:1}, ease:Quad.easeOut}));
		//controller.addTween(".kakao-obj", TweenMax.to( $(".kakao-obj"), 1.5, {css:{bottom:"0px", opacity:1}, ease:Quad.easeOut}));
	},

	fileUpload_add : function(){
		/* fileUpload_add*/
		var _num = 0,
			arr = [],
			limit = 10
				
		var fnUpload = {
			init: function(){
				$(".addControl").on("click", function(){
					if(_num == limit - 1){
						alert("파일첨부는 10개 까지만 가능합니다.");
						 return false;
					} else {
						_num++;
						fnUpload.create();
					}
				});
				fnUpload.create();
			},

			create : function(){
				var obj = {};
				obj.num = _num;
				fnUpload.draw(obj);
			},

			draw : function(obj){
				var $html = "";
				$html += '';
				$html += '<div class="up_Box">';
				$html += '<select name="img_position['+ (obj.num - 1) +']" id="material_'+ (obj.num - 1) +'" class="select" title="이미지 위치를 선택하세요!">';
				$html += '<option value="">선택</option>';
				$html += '<option value="정면">정면</option>';
				$html += '<option value="후면">후면</option>';
				$html += '<option value="상세">상세</option>';
				$html += '<option value="사인포함">사인포함</option>';
				$html += '<option value="기타">기타</option>';
				$html += '</select>';
				$html += '<div class="file">';
				$html += '<div class="file_box"></div>';
				$html += '<div class="filebutton"><input type="file" name="file" id="file_'+ obj.num +'" class="searchfile files" title="파일 찾기"><label for="file_'+ obj.num +'" class="button">파일선택</label></div>';
				$html += '</div>';
				$html += '<div class="addControl">';
				$html += '<span class="del">삭제</span>';
				$html += '</div>';
				$html += '</div>';
				obj.ui = $($html);
				//console.log(obj.ui);
				$(".img_Upload").append(obj.ui);
				$(".img_Upload .up_Box").eq(0).css({"margin-top":"0px"});
				arr.push(obj);

				$("#file_"+ obj.num +"").on('change', function(){
					val = $(this).val().split("\\");
					f_name = val[val.length-1]; 
					s_name = f_name.substring(f_name.length-4, f_name.length);
					$(this).parent().css({"opacity":"0"});
					$(this).parent().siblings('.file_box').html("file : "+f_name);
				});

				fnUpload.file(obj);
				fnUpload.del(obj);
			},

			del : function(obj){
				obj.ui.find(".del").on("click", function(){
					if(_num <= 0){
						val = $(this).closest(".up_Box").find("input").val();
						//console.log(val);
						if(val == ""){
							alert("삭제가 불가능합니다.");
						} else {
							$(this).closest(".up_Box").find(".filebutton").css({"opacity":"1"});
							$(this).closest(".up_Box").find("input").remove();
							$(this).closest(".up_Box").find(".filebutton").prepend('<input type="file" name="file" id="file_'+ obj.num +'" class="searchfile files" title="파일 찾기">');
							fnUpload.file(obj);
							//console.log($(this).closest(".up_Box").find("input").val());
						}
					} else {
						obj.ui.remove();
						arr.splice(obj.num,1);
						fnUpload.reset(arr);
						_num--;
					}
				});

				fnUpload.reset(arr);
			},
	
			file : function(obj){
				$("#file_"+ obj.num +"").on('change', function(){
					val = $(this).val().split("\\");
					//console.log(val);
					f_name = val[val.length-1]; 
					s_name = f_name.substring(f_name.length-4, f_name.length);
					$(this).parent().css({"opacity":"0"});
					$(this).parent().siblings('.file_box').html("file : "+f_name);
				});
			},

			reset : function(arr){
				for(var i in arr){
					var obj = arr[i],
					select = obj.ui.find("select"),
					input = obj.ui.find(".filebutton input"),
					label = obj.ui.find(".filebutton label");

					obj.num = parseInt(i);
					//console.log(obj.num);
					select.attr("name", "img_position["+ obj.num +"]");
					select.attr("id", "material_"+ obj.num +"");
					input.attr("name", "file["+ obj.num +"]");
					input.attr("id", "file_" + obj.num +"");
					label.attr("for", "file_" + obj.num +"");
				}
			}
		};
		fnUpload.init();
	}
}
//]]>