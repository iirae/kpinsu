//<![CDATA[
//user-scalable off
document.documentElement.addEventListener('touchstart', function (event) {
	if (event.touches.length > 1) {
		event.preventDefault(); 
	} 
}, false);

//ios safari cash delete
$(window).bind("pageshow", function(event) {
	if(event.originalEvent.persisted){
		window.location.reload()
	}
});

$(document).ready(function(){
	project.init();
	
});

var project = {
	init : function(){
		project.common();
		project.main();
		project.sub();
		project.stepProcess();
		project.placeHolder();
	},

	common : function(){
		//fixed header
		$(window).scroll(function(){
			var $wst = $(window).scrollTop(),
			$limitH = $("#visual").offset().top,
			$h = $("#header");
			
			if($wst > $limitH){
				$h.addClass("fixed");
				$("#wrap").addClass("fix");
				$(".scrollTop").fadeIn();
				if($(".viewFixed").is(":visible")){
					$(".scrollTop").css({"bottom":"60px"});
					$(".viewFixed").addClass("fixed");
				};
			} else {
				$h.removeClass("fixed");
				$("#wrap").removeClass("fix");
				$(".scrollTop").hide();
				if($(".viewFixed").is(":visible")){
					$(".scrollTop").css({"bottom":"0px"});
					$(".viewFixed").removeClass("fixed");
				};
			};
		});
		
		//aside gnb
		var $body = $('body'), 
		$html = $('html'),
		$openAside = $(".gnbBtn"),
		$aside = $("#aside"),
		$gnb = $(".gnb>li>a"),
		$scroll;

		$openAside.click(function(){
			$(".gnb>li").eq(0).children("a").addClass("on");
			$(".gnb>li").eq(0).children().addClass("show");
			if($(".gnb>li>a").hasClass("active")){
				$(".gnb>li>a").removeClass("on");
				$(".sub").removeClass("show");
			};
			$(".gnb>li>a.active").parent().children().addClass("show");
			TweenMax.to($aside, .5, {"right" :"0%", ease: Power3.easeInOut});
			$(".bg").fadeIn();
			$scroll = window.pageYOffset;
			$html.css({"overflow": "hidden"});
			$body.css({"position":"fixed", "top": -$scroll});
		});
		
		//$(".gnb>li").eq(0).children("a").addClass("on");
		//$(".gnb>li").eq(0).children().addClass("show");
		
		$gnb.on("click", function(){
			var $sub = $(this).next(".sub");
			if($sub.is(":visible")){
				$gnb.removeClass("on").parent().children().removeClass("show");
				$(this).addClass("on").parent().children().addClass("show");
			} else {
				$gnb.removeClass("on").parent().children().removeClass("show");
				$(this).addClass("on");
				$(".sub").removeClass("show");
			}
		});

		$aside.find(".asideClose").click(function(){
			TweenMax.to($aside, .5, {"right" :"-100%", ease: Power3.easeInOut});
			$html.css({"overflow":"auto" });
			$body.css({"position":"", "top":""});
			window.scrollTo(0, $scroll);
			$gnb.removeClass("on").parent().children().removeClass("show");
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
						var $thisP = $(this).offset().top - 480;
						console.log($thisP);
						//$("html, body").animate({"scrollTop":$thisP},300);
					});
				};
			});

			$(this).on("focusout", function(){
				if($(this).val() == ""){
					$(this).siblings("label").show();
				}
			});
		});

		//scrollTop
		var $qkTop = $(".scrollTop>.scroll_top");

		$qkTop.on("click", function(){
			$("html, body").stop().animate({"scrollTop":0}, 300);
		});
	},

	main : function(){

		//main visual
		$('.main-Slider').bxSlider({
			mode: 'fade',//'horizontal', 'vertical', 'fade'
			auto:true,
			pause:5000,
			speed:1000,
			autoDelay: 0,
			pager:true,
			controls:false,
			touchEnabled: true,
			onSliderLoad: function(currentIndex) {
				//console.log(currentIndex);
				$(".main-Slider").children().eq(currentIndex).addClass('active-slide');
			},
			onSlideAfter: function($slideElement){
				$(".main-Slider").children().removeClass('active-slide');
				$slideElement.addClass('active-slide');
			}
		});

		var controller = $.superscrollorama({
			triggerAtCenter: true
		});

		var controller = $.superscrollorama();
		$("#contents").find(".h3_title").each(function(index){
			index++;
			var l = $(".h3_title").length;
			$(this).attr("id","title_"+ index);
			for(var e = 1; e<= l; e++){
				controller.addTween("#title_"+e, TweenMax.to( $("#title_"+e), 1, {css:{"top":"0", opacity:1}, ease:Quad.easeOut}));
			};
		});
		controller.addTween(".inSlider", TweenMax.to( $(".inSlider"), 1, {css:{"top":"0", opacity:1}, ease:Quad.easeOut}));

		var target = $(".about-Box");
		target.find("div").each(function(index){
			index++;
			var l = $(".about-Box div").length;
			$(this).attr("id","obj_"+ index);
			for(var e = 1; e<= l; e++){
				controller.addTween(".about-Box #obj_"+e, TweenMax.to( $(".about-Box #obj_"+e), e * .6, {css:{top:"0", opacity:1}, ease:Quad.OutCirc}));
			};
		});

		var target_1 = $(".news-Box");
		target_1.find("div").each(function(index){
			index++;
			var l = $(".news-Box div").length;
			$(this).attr("id","obj_1_"+ index);
			for(var e = 1; e<= l; e++){
				controller.addTween(".news-Box #obj_1_"+e, TweenMax.to( $(".news-Box #obj_1_"+e), e * .3, {css:{top:"0", opacity:1}, ease:Quad.OutCirc}));
			};
		});

		var target_2 = $(".b2b-Box");
		target_2.find("div").each(function(index){
			index++;
			var l = $(".b2b-Box div").length;
			$(this).attr("id","obj_2_"+ index);
			for(var e = 1; e<= l; e++){
				controller.addTween(".b2b-Box #obj_2_"+e, TweenMax.to( $(".b2b-Box #obj_2_"+e), e * .6, {css:{top:"0", opacity:1}, ease:Quad.OutCirc}));
			};
		});

		$('.insurans_slider').slick({
			autoplay: false,
			autoplaySpeed: 5000,
			dots: true,
			infinite: true,
			speed: 600,
			slidesToShow: 2,
			//slidesToScroll: 4,
			centerMode: true,
			variableWidth: true,
			cssEase: 'ease-in'
		});

		$('.aboutSlider').slick({
			autoplay: false,
			autoplaySpeed: 5000,
			dots: true,
			infinite: true,
			speed: 600,
			centerMode: false,
			variableWidth: false,
			cssEase: 'ease-in'
		});
		//
		var $customS = $(".customSelect");

		$customS.find("p").on("click", function(){
			if($(this).hasClass("on") == false){
				$(this).addClass("on");
				$(this).next("ul").slideDown();
			}
		});

		$customS.on("mouseleave", function(){
			if($(this).find("p").hasClass("on")){
				$(this).find("p").removeClass("on");
				$(this).find("ul").slideUp();
			}
		});
	},

	sub : function(){
		//scroll
		$(".scroll").mCustomScrollbar();
		$('img[usemap]').rwdImageMaps();

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
				$('img[usemap]').rwdImageMaps();

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
					$('img[usemap]').rwdImageMaps();
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
	onlyNumber : function(){
		//숫자만 입력
		//alert();
		$('.numbersOnly').keyup(function () { 
			this.value = this.value.replace(/[^0-9]/g,'');
		});

		var agent = navigator.userAgent; 
		if (agent.match(/iPhone/) != null || agent.match(/iPod/) != null || agent.match(/Windows CE/) != null) { 
			//console.log("table,mobile");
			$(".numbersOnly").attr("type","tel");
		} else if (agent.match(/Android/) != null ) { 
			//console.log("table,mobile");
			$(".numbersOnly").attr("type","number");
		} else {
			//console.log("pc");
			$(".numbersOnly").attr("type","password");
		}
	},

	join : function(){
		project.onlyNumber();

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
				return false;
			}
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

			$(".joinInput-Area .in").append(html);
			project.onlyNumber();
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
			project.onlyNumber();
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
			project.onlyNumber();
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
				$(".chk-ok").css("width", "calc(100%/2)");
			};
			
			if($userCount > 4){
				alert("최대 3명까지만 추가할수 있습니다.");
				return;
			};

			$(".joinInput-Area .in").append(html);
			project.onlyNumber();
			project.placeHolder();

			$("#del_" + $i).on("click", function(){
				console.log($(".join-input").length);
				if($(".join-input").length <4){
					$("#chk-certi").css("display", "none");
					$(".chk-ok").css("width", "100%");
				};
				$(this).parent().parent().parent().remove();
			});
			++$i;	
		});
	},

	//add User 생활체육
	addUserSports : function(){
		var $i = 0;
		$(".add_Btn").on("click", function(){
			var $userCount = $(".join-input").length,
			html = "";
			html += "<div class='join-input lineT'>";
			html += "<dl class='input-zip'>";
			html += "<h3 class='userTitle'>동반자 정보입력 <span class='delete' id='del_"+ $i +"'><img src='../../img/v3/btn/btn_userDel.png' alt='동행자 삭제' /></span></h3>";
			html += "<dt><label for='name"+ $i +"'>동반자 이름</label></dt>";
			html += "<dd><div class='input inputPlace'><label for='name"+ $i +"'>이름을 입력하세요.</label><input type='text' id='name"+ $i +"' class='user_name' name='user_name[]' title='이름을 입력하세요'  /> </div>";
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
				$(".chk-ok").css("width", "calc(100%/2)");
			};
			
			if($userCount > 4){
				alert("최대 3명까지만 추가할수 있습니다.");
				return;
			};

			$(".joinInput-Area .in").append(html);
			project.onlyNumber();
			project.placeHolder();

			$("#del_" + $i).on("click", function(){
				console.log($(".join-input").length);
				if($(".join-input").length <4){
					$("#chk-certi").css("display", "none");
					$(".chk-ok").css("width", "100%");
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
		//$("img").load(function(){
			var $popBtn = $(".lyPop_btn"),
			$popClose = $(".close"),
			$lyPopup = $(".view_lyPopup"),
			$lyBg = $(".layer_bg"),
			$body = $('body'), 
			$html = $('html'),
			$scroll;

			$popBtn.on("click", function(){
				var $imgW = $lyPopup.find(".pic img").width() / 2,
				$imgH = $lyPopup.find(".pic img").height()/2;
			
				if($lyPopup.find(".pic").height() >= 450){
					$(".scroll").mCustomScrollbar();
				} else {
					//$lyPopup.css({"margin-top":-$imgH - 50, "margin-left":-$imgW - 50});
				}
				$lyPopup.css({"visibility":"visible"}).animate({"opacity":"1"},100);
				$scroll = window.pageYOffset;
				$html.css({"overflow": "hidden"});
				$body.css({"position":"fixed", "top": -$scroll});
				$('img[usemap]').rwdImageMaps();

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
					$('img[usemap]').rwdImageMaps();
					return false;
				});
				$lyBg.fadeIn("300");
				return false;
			});

			$popClose.on("click", function(){
				//$lyPopup.css({"margin-top":0, "margin-left":0});
				$(".view_lyPopup").css({"visibility":"hidden"}).animate({"opacity":"0"},100);
				$html.css({"overflow":"auto" });
				$body.css({"position":"", "top":""});
				window.scrollTo(0, $scroll);
			$(".dr_Tab>li>a").removeClass("on");
			$(".dr_Tab_view").hide();
			$(".dr_Tab_view").eq(0).show();
				$lyBg.fadeOut("200");
			});
			$lyBg.on("click",function(){
				//$lyPopup.css({"margin-top":0, "margin-left":0});
				$lyPopup.css({"visibility":"hidden"}).animate({"opacity":"0"},100);
				$html.css({"overflow":"auto" });
				$body.css({"position":"", "top":""});
				window.scrollTo(0, $scroll);
			$(".dr_Tab>li>a").removeClass("on");
			$(".dr_Tab_view").hide();
			$(".dr_Tab_view").eq(0).show();
				$(this).fadeOut("200");
			});
		//});
	},

	qua_layerPopup : function(){
		$("img").load(function(){
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
				return false;
			});
			$popClose.on("click", function(){
				$lyPopup.css({"margin-top":0, "margin-left":0});
				$(".view_lyPopup").css({"visibility":"hidden"}).animate({"opacity":"0"},100);
				$lyBg.fadeOut("200");
			});
			$lyBg.on("click",function(){
				$lyPopup.css({"margin-top":0, "margin-left":0});
				$lyPopup.css({"visibility":"hidden"}).animate({"opacity":"0"},100);
				$(this).fadeOut("200");
			});
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
					$(this).parent().removeClass("on");
				} else {
					$(".answer").hide();
					$thisQ.show();
					$qOpen.parent().removeClass("on");
					$(this).parent().addClass("on");
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
	
	fixedBtn : function(){
		// 하단 고정메뉴
		var didScroll;
		var lastScrollTop = 0;
		var delta = 1;
		var navbarHeight = $('.fx_bottom').outerHeight();

		$(window).scroll(function(event){
			didScroll = true;
		});

		setInterval(function() {
			if (didScroll) {
				hasScrolled();
				didScroll = false;
			}
		}, 250);

		function hasScrolled() {
			var st = $(this).scrollTop();
			
			if(Math.abs(lastScrollTop - st) <= delta)
				return;
			
			if (st > lastScrollTop && st > navbarHeight){
				// Scroll Down
				$('.scrollTop').css({'bottom':'60px'});
				$('.fixed_Btn').css({'bottom':'0%'});
			} else {
				// Scroll Up
				if(st + $(window).height() < $(document).height()) {
					$('.fixed_Btn').css({'bottom':"-50%"});
					
				}
			}
			
			lastScrollTop = st;
		}
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

	file : function(){
		$(".searchfile").on('change', function(){
			val = $(this).val().split("\\");
			f_name = val[val.length-1]; 
			s_name = f_name.substring(f_name.length-4, f_name.length);
			$(this).parent().siblings('div').html("file : "+f_name);
		});
	}
}
//]]>