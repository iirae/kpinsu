//<![CDATA[
	$(document).ready(function(){
		var $footerH = $("#inbyuFooter").innerHeight();
		//console.log($footerH);
		//$("#inbyuContents").css("padding-bottom",$footerH);

		project.init();
	});

	var project = {
		init : function(){
			project.sub();
			project.fixedBtn();
			project.customRadio();
			project.customChk();
			project.stepProcess();
			project.placeHolder();
		},
		
		intro : function(){
			var $wh = $(window).height() - 40;
			$(".main_visual").height($wh);
			$(window).resize(function(){
				var $wh = $(window).height() - 40;
				$(".main_visual").height($wh);
			});
			
			/*
			if($(".intro").is(":visible")){
				$("#inbyuContents").css({"padding-bottom":"0px"});
				$("#inbyuFooter").css({"position":"relative"});
				$("#inbyuFooter .top").show();
			};
			*/

			slider = $('.main_visual').bxSlider({
				mode: 'horizontal',//'horizontal', 'vertical', 'fade'
				auto:false,
				pause:5500,
				speed:500,
				pager:true,
				controls:true,
				touchEnabled: true,
				swipeThreshold: 70,
				onSliderLoad: function(currentIndex) {
					$(".main_visual").children().eq(currentIndex).addClass('active-slide');
					var v_1 = $(".main_visual>.v_1");
					if (currentIndex == 0){
						var a = new TimelineMax({});
						a.add(TweenMax.to(".v_1 .action_text .txt_1", .3, {
							delay:.7,
							opacity:1,
							scale: 1,
							ease: Back.easeOut
						})).add(TweenMax.to(".v_1 .action_text .txt_2", .3, {
							opacity:1,
							scale: 1,
							ease: Back.easeOut
						})).add(TweenMax.to(".v_1 .action_text .txt_3", .3, {
							opacity:1,
							scale: 1,
							ease: Back.easeOut
						})).add(TweenMax.to(".v_1 .action_box .on_1", .3, {
							opacity:1,
							scale: 1,
							ease: Back.easeOut
						})).add(TweenMax.to(".v_1 .action_box .on_1", .3, {
							delay:.2,
							opacity:0,
							scale: 0,
							ease: Back.easeIn
						})).add(TweenMax.to(".v_1 .action_box .on_2", .4, {
							opacity:1,
							scale: 1,
							ease: Back.easeOut
						})).add(TweenMax.to(".v_1 .action_box .on_2", .4, {
							delay:.2,
							opacity:0,
							scale: 0,
							ease: Back.easeIn
						})).add(TweenMax.to(".v_1 .action_box .on_3", .4, {
							opacity:1,
							scale: 1,
							ease: Back.easeOut
						}))
					}
				},
				onSlideAfter: function($slideElement){
					$(".main_visual").children().removeClass('active-slide');
					$slideElement.addClass('active-slide');
					//console.log(slider.getCurrentSlide())
					//console.log($slideElement)

					if($slideElement.hasClass("active-slide")){
						//alert();
					}

					//reset
					TweenMax.killTweensOf(".main_visual>div .action_text .txt");
					TweenMax.killTweensOf(".main_visual>div .action_box>span img");

					TweenMax.to(".main_visual .action_text .txt", 0, {opacity:0, scale: 0})
					TweenMax.to(".main_visual .action_box>span img", 0, {opacity:0, scale: 0, "visibility":"visible"})
					TweenMax.to(".main_visual .action_box .on_3", 0, {opacity:0, scale: 0, "visibility":"visible"})

					var v_1 = $(".main_visual>.v_1"),
					v_2 = $(".main_visual>.v_2"),
					v_3 = $(".main_visual>.v_3");

					if (v_1.hasClass("active-slide")){
						var a = new TimelineMax({});
						a.add(TweenMax.to(v_1.find(".action_text .txt_1"), .3, {
							opacity:1,
							scale: 1,
							ease: Back.easeOut
						})).add(TweenMax.to(v_1.find(".action_text .txt_2"), .3, {
							opacity:1,
							scale: 1,
							ease: Back.easeOut
						})).add(TweenMax.to(v_1.find(".action_text .txt_3"), .3, {
							opacity:1,
							scale: 1,
							ease: Back.easeOut
						})).add(TweenMax.to(v_1.find(".action_box .on_1"), .3, {
							opacity:1,
							scale: 1,
							ease: Back.easeOut
						})).add(TweenMax.to(v_1.find(".action_box .on_1"), .3, {
							delay:.2,
							opacity:0,
							scale: 0,
							ease: Back.easeIn
						})).add(TweenMax.to(v_1.find(".action_box .on_2"), .4, {
							opacity:1,
							scale: 1,
							ease: Back.easeOut
						})).add(TweenMax.to(v_1.find(".action_box .on_2"), .4, {
							delay:.2,
							opacity:0,
							scale: 0,
							ease: Back.easeIn
						})).add(TweenMax.to(v_1.find(".action_box .on_3"), .4, {
							opacity:1,
							scale: 1,
							ease: Back.easeOut
						}))
					}

					if (v_2.hasClass("active-slide")){
						var b = new TimelineMax({});
						b.add(TweenMax.to(v_2.find(".action_text .txt_1"), .3, {
							opacity:1,
							scale: 1,
							ease: Back.easeOut
						})).add(TweenMax.to(v_2.find(".action_text .txt_2"), .3, {
							opacity:1,
							scale: 1,
							ease: Back.easeOut
						})).add(TweenMax.to(v_2.find(".action_text .txt_3"), .3, {
							opacity:1,
							scale: 1,
							ease: Back.easeOut
						})).add(TweenMax.to(v_2.find(".action_box .on_1"), .3, {
							opacity:1,
							scale: 1,
							ease: Back.easeOut
						})).add(TweenMax.to(v_2.find(".action_box .on_1"), .3, {
							delay:.2,
							opacity:0,
							scale: 0,
							ease: Back.easeIn
						})).add(TweenMax.to(v_2.find(".action_box .on_2"), .4, {
							opacity:1,
							scale: 1,
							ease: Back.easeOut
						})).add(TweenMax.to(v_2.find(".action_box .on_2"), .4, {
							delay:.2,
							opacity:0,
							scale: 0,
							ease: Back.easeIn
						})).add(TweenMax.to(v_2.find(".action_box .on_3"), .4, {
							opacity:1,
							scale: 1,
							ease: Back.easeOut
						})).add(TweenMax.to(v_2.find(".action_box .on_3"), .4, {
							delay:.2,
							opacity:0,
							scale: 0,
							ease: Back.easeIn
						})).add(TweenMax.to(v_2.find(".action_box .on_4"), .4, {
							opacity:1,
							scale: 1,
							ease: Back.easeOut
						}))
					}

					if (v_3.hasClass("active-slide")){
						var c = new TimelineMax({});
						c.add(TweenMax.to(v_3.find(".action_box .on_1"), .4, {
							opacity:1,
							scale: 1,
							ease: Back.easeOut
						}))
					}
				}
			});
		},

		sub : function(){
			$("#inbyuContents .in_box").eq(0).css({"border-top":"none"});
			$("#inbyuContents .in_box:last").css({"margin-bottom":"0", "border-bottom":"none"});

			$(".insu_item>li>a.insu").on("click", function(){
				$(".insu_item>li").removeClass("on");
				$(this).parent().addClass("on");
			});

			//var $tw = $(".insu_item li").width() + 20;
			//$(".insu_item li").height($tw);

			$(".choiceChk").on("click", function(){
				if($(this).hasClass("on")){
					$(this).removeClass("on");
					$(".chk-hidden-box").hide();
				} else { 
					$(this).addClass("on");
					$(".chk-hidden-box").show();
				}
			});

			var $q = $(".myBox .top"),
			$a = $(".myBox .bottom");

			$q.on("click", function(){
				var $this = $(this).next("div");
				if($this.is(":visible")){
					$(this).removeClass("on");
					$this.hide();
				} else {
					$(".myBox .top").removeClass("on");
					$(".myBox .bottom").hide();
					$(this).addClass("on");
					$this.show();
				}
			});

			$(".planTab>dd").hide();
			if($(".planTab>dt>a").hasClass("on")){
				$(".planTab>dt>a.on").parent().next("dd").show();
			};
			$(".planTab>dt>a").on("click focus", function(){
				$(".planTab>dt>a").removeClass("on");
				$(this).addClass("on");
				$(".planTab>dd").hide();
				$($(this).parent().next("dd")).show();
				return false;
			});
		},

		fixedBtn : function(){
			var pageY          = getScrollOffsets().y + 75;
			if(pageY + $(window).height() > $(document).height() - pageY ){
				$(".fixed_Btn").css({"position":"relative"});
			}
			$(window).scroll(function(){
				var $fixedBtn = $(".fixed_Btn"),
				footerH 	= $("#inbyuFooter").height() + 40;
				pageY          = getScrollOffsets().y + 75;
				
				if(pageY + $(window).height() > $(document).height() - pageY ){
					$fixedBtn.css({"position":"relative"});
					$fixedBtn.show();

				}
				if(pageY < $(document).height() - footerH - $(window).height()){
					$fixedBtn.css({"position":"fixed"});
				}
			});
			
			$(".inputPlace input").on("focus", function(){
				//$(this).css("border-color","red");
				$(".fixed_Btn").hide();
			});
			
			$(".inputPlace input").on("focusout", function(){
				$(".fixed_Btn").show();
			});

			$(window).resize(function(){
				$(".fixed_Btn").show();
			});

			function getScrollOffsets(w) {
				w = w || window;

				if (w.pageXOffset != null) return {
					x: w.pageXOffset, 
					y:w.pageYOffset
				};

				var d = w.document;
				if (document.compatMode == "CSS1Compat") {
					return { 
						x:d.documentElement.scrollLeft, 
						y:d.documentElement.scrollTop
					};
				}

				return { 
					x: d.body.scrollLeft, 
					y: d.body.scrollTop 
				}; 
			};

			if($(".claim-progress").is(":visible")){
				$(".claim-progress li").each(function(){
					var $this = $(this);
					var $class = $this.attr("class");
					switch ($class){
						case "end" : //완료
							$this.find("span").text("완료");
						break;
						case "ing" : //진행중
							$this.find("span").text("진행중");
						break;
						default : //대기
							//console.log("empty");
							$this.find("span").text("대기");
						break;
						}
				});
			};
		},
		
		customRadio : function(){
			var $opt = $(".opt_Box .radioMdu"),
			$radio = $(".radioMdu p"),
			$r_1 = [],
			$r_2 = [];
	
			for(var a = 0; a<=$radio.length; a++)
			$r_1.push(a);

			$.each($r_1, function(){
				$radio.eq(this).find("input").attr("name", "lv_"+this);
			});

			for(var b = 0; b<=$radio.length; b++)
			$r_2.push(b);

			$.each($r_2, function(){
				$radio.eq(this).find("input").attr("id", "radio_" + this);
				$radio.eq(this).find("label").attr("for", "radio_" + this);
			});

			$(".radioMdu").find("input:radio").each(function(){
				if($(this).prop("checked")){
					$(this).parent().addClass("on");
					$(this).prop("checked", true);
				};

				$(this).on("click",function(){
					if($(this).prop("checked")){
						$(this).closest(".radioMdu").find("input").parent().removeClass("on");
						$(this).parent().addClass("on");
						$(this).closest(".radioMdu").find("input:radio").prop("checked", false);
						$(this).prop("checked", true);
					};
				});

				$(this).on("focus", function(){
					console.log("a");
					$(this).closest(".radioMdu").find("input").parent().removeClass("focus");
					$(this).parent().addClass("focus");
				})

				$(this).on("focusout", function(){
					if($(this).hasClass("last")){
						$(this).parent().removeClass("focus");
					}
				})
			});

			//checkbox check
			$("#count_check").click(function() {
				  //alert($("input[name=chk]:checkbox:checked").length);
				  //alert($("input:radio:checked").length);
				  //alert($("input[name=total]:checkbox:checked").length);
				  //alert($("input[name=no]:checkbox:checked").length);
				  alert($("input:radio:checked").length);
				  //alert($("input[name=chk]:checkbox:checked").length);
			});
		},

		customChk : function(){
			//total
			$("#total").on("click", function(){
				if($("#total").prop("checked")) {
					$(this).parent().addClass("on");
					$(".chk_Mdu .open").addClass('on');
					$("input[name=chk]:checkbox").prop("checked", true);
					$("input[name=no]:checkbox").prop("checked", true).parent().addClass("on");
					$("input[name=yes]:checkbox").prop("checked", false).parent().removeClass("on");
				} else {
					$(this).parent().removeClass("on");
					$(".chk_Mdu .open").removeClass('on');
					$("input[name=chk]:checkbox").prop("checked", false);
					$("input[name=no]:checkbox").prop("checked", false).parent().removeClass("on");
				}
			});

			$("#total").on("focus", function(){
				$(this).parent().addClass("focus");
			});
			$("#total").on("focusout", function(){
				$(this).parent().removeClass("focus");
			});

			//checkbox
			$(".terms-box, .chk-hidden-box").each(function(){
				var $target = $(".terms-block .terms-box"),
				$this = $(this),
				$length = $this.parent().find(".terms-box input").length,
				$t_s = $(this).find(".terms-see");

				for(var a = 0; a<=$length; a++){
					$target.eq(a).find("input[name=chk]:checkbox").attr("id","chk_" + a).closest(".terms-box").find("label").attr("for","chk_" + a);
					$target.eq(a).find("input[name=yes]:checkbox").attr("id","yes_" + a).siblings("label").attr("for","yes_" + a);
					$target.eq(a).find("input[name=no]:checkbox").attr("id","no_" + a).siblings("label").attr("for","no_" + a);
				};

				$this.find("input[name=chk]:checkbox").each(function(){
					if($(this).prop("checked")){
						$(this).parent().addClass("on");
					}
					//console.log($length);
					
					$(this).on("click",function(){
						if($(this).prop("checked")){
							$(this).parent().addClass("on");
							$(this).prop("checked", true);
						} else {
							$(this).parent().removeClass("on");
							$(this).prop("checked", false);
						};

						if($("input[name=chk]:checkbox:checked").length == $length){
							$(".total>span").addClass("on");
						} else {
							$(".total>span").removeClass("on");
						};
					});

					//console.log($("input[name=chk]:checkbox:checked").length);

					if($("input[name=chk]:checkbox:checked").length == $length){
						$(".total>span").addClass("on");
					}

					$(this).on("focus",function(){
						$(this).closest(".terms-block").find("input").parent().removeClass("focus");
						$(this).closest(".chk-hidden-box").find("input").parent().removeClass("focus");
						$(this).parent().addClass("focus");
					});

					$(this).on("focusout", function(){
						if($(this).hasClass("last")){
							$(this).parent().removeClass("focus");
						}
						$(this).parent().removeClass("focus");
					})
				});
			});
		},

		kakaoTab : function(){
			//alert();
			var $age = $(".age_Tab li"),
			$ageBox = $(".opt_Box"),
			$a = [];

			for(var i = 0; i<$age.length; i++)
			$a.push(i);
			console.log(i);
			
			$.each($a, function(){
				$age.eq(this).children("a").attr("href","#tab_"+ this);
				$ageBox.eq(this).attr("id","tab_"+ this);
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

			//계약전 체크
			$(".terms-block.fix").find("span").off();

			$(".terms-block .terms-box").each(function(){
				var $this = $(this),
				$length = $(".chkZip .no").length;

				$this.find(".chkZip input[type=checkbox]").on("click", function(){
					var $length = $("input[name=no]:checkbox").length;
					
					if($(this).prop("checked")){
						$(this).parent().addClass("on");
						$(this).parent().siblings().removeClass("on");
						$(this).parent().siblings().find("input").prop("checked", false);
					} else {
						$(this).parent().removeClass("on");
						$(this).prop("checked", false);
					};

					if($("input[name=no]:checkbox:checked").length == $length){
						$(".total-Chk .all_Mdu>span").addClass("on");
						$(".total-Chk .all_Mdu>span input").prop("checked", true);
					} else {
						$(".total-Chk .all_Mdu>span").removeClass("on");
						$(".total-Chk .all_Mdu>span input").prop("checked", false);
					}
				});
				$this.find(".chkZip input[type=checkbox]").on("focus", function(){
					$(this).parent().addClass("focus");
					$(this).parent().siblings().removeClass("focus");
				});
				$this.find(".chkZip input[type=checkbox]").on("focusout", function(){
					$(this).parent().removeClass("focus");
				});
			});
		},

		placeHolder : function(){
			$(".inputPlace, .datePlace").find("input, textarea").each(function(){
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
			var $scroll;
			function stopScroll(){
				$scroll = window.pageYOffset;
				//console.log($scroll);
				$("html").css({"overflow": "hidden"});
				$("body").css({"position":"fixed", "top": -$scroll});
			};

			function enableScroll(){
				$("html").css({"overflow":"auto" });
				$("body").css({"position":"", "top":""});
				window.scrollTo(0, $scroll);
			};

			//datePicker
			/*
			$('.datepicker').on('click' , function(){
				if(!$(this).parent().find(".cal-wrap").hasClass('show')){
					$(".cal-wrap").removeClass('show');
					$(this).parent().find(".cal-wrap").addClass('show');
					$("#inbyuWrap").append("<div class='dimm'></div>");
					$("#inbyuWrap .dimm").on("click", function(){
						$(".cal-wrap").removeClass('show');
						$(this).remove();
					});
					stopScroll();
				}else{
					$('.datepicker label').show();
					$(this).parent().find(".cal-wrap").removeClass('show');
					$("#inbyuWrap .dimm").remove();
				}
			})
			*/

			$(".select").on("focus", function(){
				$(".cal-wrap").removeClass('show');
				$("#inbyuWrap .dimm").remove();
			});

			$('.datepicker label, .datepicker input, .divInput').on('click focus', function(){
				if(!$(this).parent().parent().find(".cal-wrap").hasClass('show')){
					$(".cal-wrap").removeClass('show');
					$(this).parent().parent().find(".cal-wrap").addClass('show');
					$("#inbyuWrap").append("<div class='dimm'></div>");
					$("#inbyuWrap .dimm").on("click", function(){
						$(".cal-wrap").removeClass('show');
						$(this).remove();
					});
					//stopScroll();
				}else{
					$('.datepicker label').show();
					$(this).parent().parent().find(".cal-wrap").removeClass('show');
					$("#inbyuWrap .dimm").remove();
				}
			});
			
			$(".dimm").on("click", function(){
				alert();
			});
			if(!$(".divInput>b").html() == ""){
				$(".divInput").addClass("on");
			};

			$( "#datepicker_1" ).datepicker({
				  //closeText: "확인",
			   	  prevText: "Previous Month",
				  nextText: "Next Month",
				  currentText: "오늘",
				  minDate:0,
				  maxDate:"+3M",
				  dateFormat:"yy-mm-dd",
				  yearSuffix : "년",
				  showButtonPanel: false,
				  showMonthAfterYear:true,
				  isRTL: false,
				  showMonthAfterYear: true,
				  yearSuffix: ".",
				  dayNamesMin: ["일","월","화","수","목","금","토"],
				  monthNamesShort: ["1","2","3","4","5","6","7","8","9","10","11","12"],
				  monthNames: ["01월","02월","03월","04월","05월","06월","07월","08월","09월","10월","11월","12월"],
				  onSelect: function(selectedDate){
					var $this = $(this).parent().parent(),
					$input = $this.find(".divInput>b"),
					minDate = $(this).datepicker('getDate'),
					todayMin = new Date(minDate.setDate(minDate.getDate())),
					newMin = new Date(minDate.setDate(minDate.getDate() + 1)),
					newMax = new Date(minDate.setDate(minDate.getDate() + 88));

					$("#datePic_1").val(selectedDate);
					$input.html($this.find("#datePic_1").val());

					$input.html(selectedDate);
					//$this.find(".datepicker").children("input").addClass("on");
					$this.find(".datepicker").find(".divInput").addClass("on");
					$this.find(".datepicker").children("label").hide();
					$this.find(".datepicker").removeClass("on");
					$('.cal-wrap').removeClass('show');
					$("#inbyuWrap .dimm").remove();
					$(".dateVal_1").val(selectedDate);
					//$(this).datepicker( "option", "minDate", todayMin );
					//$(this).datepicker( "option", "maxDate", newMax );
					$( "#datepicker_2" ).datepicker( "option", "minDate", newMin );
					$( "#datepicker_2" ).datepicker( "option", "maxDate", newMax );

					//현재시간 set
					var dt = new Date();
					var y = dt.getFullYear();
					var m = dt.getMonth() + 1;
					var d = dt.getDate();
					var strToday = y + "-" + (m < 10 ? "0" : "") + m + "-" + (d < 10 ? "0" : "") + d;
					var startTime = 0;
					var endTime = 23;
					var nDisableLine = -1;
					var html = "";

					if (strToday == selectedDate) {
						var h = dt.getHours();
						var mm = dt.getMinutes();

						if (mm > 50) nDisableLine = h + 1; //10분전 취소 불가
						else nDisableLine = h;
					}

					$("#leave").val("");
					html += "<option value=''>자택 출발시간</option>";
					for (var i=startTime; i <= endTime; i++) {
						var txt = "0";
						var disabled = "0";
						//txt ="0"+ i + "시";
						
						if (i < 10) {
							txt = "0" + i + "시";
						} else {
							txt = i + "시";
						}
						
						if (i <= nDisableLine) continue;

						html += "<option value='" + (i < 10 ? "0" + i : i) + "' " + disabled + ">" + txt + "</option>";
					}
					$("#leave").html(html);
				}
			});

			$( "#datepicker_2" ).datepicker({
				  //closeText: "확인",
				  showOtherMonths: true,
				  selectOtherMonths: false,
				  currentText: "오늘",
				  buttonImageOnly : false,
				  //defaultDate: "+1w",
				  minDate:0,
				  maxDate:"+90D",
				  //yearRange: "2017:2100",
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
					$input = $this.find(".divInput>b"),
					minDate = $(this).datepicker('getDate'),
					newMin = new Date(minDate.setDate(minDate.getDate() + 1));
					newMax = new Date(minDate.setDate(minDate.getDate() - 1));

					$("#datePic_2").val(selectedDate);
					$input.html($this.find("#datePic_2").val());
					
					$input.html(selectedDate);
					//$this.find(".datepicker").children("input").addClass("on");
					$this.find(".datepicker").find(".divInput").addClass("on");
					$this.find(".datepicker").children("label").hide();
					$this.find(".datepicker").removeClass("on");
					$('.cal-wrap').removeClass('show');
					$("#inbyuWrap .dimm").remove();
					$(".dateVal_2").val(selectedDate);
					//$( "#datepicker_1" ).datepicker( "option", "minDate", newMin );
					$( "#datepicker_1" ).datepicker( "option", "maxDate", newMax );
				  }
			});
		},

		//add User
		addUser : function(){
			var $i = 0;
			var arr = [];
			$(".add_Btn").on("click", function(){
				var $userCount = $(".join-input").length,
				html = "";
				html += "<div class='in_box line'>";
				html += "<div class='join-input lineT'>";
				html += "<dl class='input-zip'>";
				html += "<h3 class='userTitle'>동반자 정보 입력</h3>";
				html += "<dt><label for='name"+ $i +"'><b>(필수)</b>동반자 이름</label></dt>";
				html += "<dd><div class='input inputPlace'><label for='name"+ $i +"'>이름을 입력하세요.</label><input type='text' id='name"+ $i +"' class='user_name' name='user_name[]' title='이름을 입력하세요'  /> </div></dd>";
				html += "<dt><label for='engName"+ $i +"'><b>(필수)</b>영문 이름 (여권에 기재된 영문이름)</label></dt>";
				html += "<dd><div class='input inputPlace'><label for='engName"+ $i +"'>여권에 기재된 영문으로 입력</label><input type='text' id='engName"+ $i +"' class='eng_name' name='eng_name[]' title='영문이름을 입력하세요' /> </div></dd>";
				html += "<dt><label for='rrn1"+ $i +"'><b>(필수)</b>주민등록번호</label></dt>";
				html += "<dd><div class='rrtInput inputPlace'><label for='rrn1"+ $i +"'>주민번호 앞자리</label><input type='tel' id='rrn1"+ $i +"' maxlength='6' class='jumin_1' name='jumin_1[]' title='주민등록번호 앞자리를 입력하세요' /> </div>";
				html += "<div class='rrtInput inputPlace'><label for='rrn2"+ $i +"'>주민번호 뒷자리</label><input type='number' id='rrn2"+ $i +"' pattern='[0-9]*' inputmode='numeric' class='numbersOnly jumin_2' maxlength='7' oninput='maxLengthCheck(this)' name='jumin_2[]' title='주민등록번호 뒷자리를 입력하세요' /> </div>";
				html += "</dd>";
				html += "<dt><label for='phone"+ $i +"'><b>(필수)</b>휴대폰번호 (-없이 숫자만 입력)</label></dt>";
				html += "<dd><div class='input inputPlace'><label for='phone"+ $i +"'>휴대폰번호 입력</label><input type='tel' id='phone"+ $i +"' class='user_phone' name='user_phone[]' maxlength='11' title='휴대폰번호을 입력하세요' /> </div></dd>";
				html += "</dl>";
				html += "<a href='#self' class='delete' id='del_"+ $i +"'><img src='../../img/v3/kakao/btn_userDel.png' alt='동행자 삭제버튼' /></a>";
				html += "</div>";
				html += "</div>";

				var $a = $("#inbyuContents .in_box").length - 1;

				$(".joinInput-Area form").append(html);
				$("#inbyuContents .in_box").eq($a).css({"margin-top":"10px", "border-bottom":"1px solid #d8d8d8"});
				$("#inbyuContents .in_box:last").attr("tabindex","0").css({"margin-top":"10px", "margin-bottom":"0px", "border-bottom":"none"}).focus();
				project.placeHolder();

				$("#del_" + $i).on("click", function(){
					$(this).closest(".in_box").remove();
					$("#inbyuContents .in_box:last").css({"margin-top":"10px", "margin-bottom":"0px", "border-bottom":"none"});
				});
				++$i;	
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
		
		file : function(){
			$(".searchfile").on('change', function(){
				val = $(this).val().split("\\");
				f_name = val[val.length-1]; 
				s_name = f_name.substring(f_name.length-4, f_name.length);
				$(this).parent().siblings('div').html("file : "+f_name);
			});
		},
		
		myList_Check : function(){
			var $myList = $(".my_List"),
				$list_ = $myList.find(".myBox"),
				$listArea = $(".joinChk_Box"),
				$claimArea = $(".claim_Box"),
				$emptyArea = $(".empty_List");

			if($list_.is(":visible")){
				$listArea.show();
				$claimArea.show();
				$emptyArea.hide();
			} else {
				$listArea.hide();
				$claimArea.hide();
				$emptyArea.show();
			}
		},

		fullLayerPop : function(){
			var $scroll;
			function stopScroll(){
				$scroll = window.pageYOffset;
				//console.log($scroll);
				$("html").css({"overflow": "hidden"});
				$("body").css({"position":"fixed", "top": -$scroll});
			};

			function enableScroll(){
				$("html").css({"overflow":"auto" });
				$("body").css({"position":"", "top":""});
				window.scrollTo(0, $scroll);
			};

			var $viewBtn = $(".viewPopup"),
			$length = $(".full_LayerPop").length,
			$i = [];

			for(var i = 0; i<=$length; i++)
				$i.push(i);

			$(".full_LayerPop").on('click touchend', function(event) {
				$(this).find(".scroll").addClass("fixScroll");
			});

			var $this;
			$(".viewPopup").on("click", function(){
				if($(".choice-Item-Area").is(":visible")){
					$(".choice-Item-Area").attr("tabindex","");
				};
				$($(this).attr("rel")).attr("tabindex","0").css({"visibility":"visible"}).animate({"opacity":"1", "top":"0", "bottom":"0px"},500, "easeOutExpo", function(){
					$(this).find(".scroll").addClass("fixScroll");
					if($(".my_List").is(":visible")){
						$(".myBox .top").on("click", function(){
							if($(this).next("div").is(":visible")){
								$(this).removeClass("on");
								$(this).next("div").hide();
							} else {
								$(".myBox .top").removeClass("on");
								$(".myBox .bottom").hide();
								$(this).next("div").show();
								$(this).addClass("on");
							}
						});
					}
				}).focus();
				$this = $(this);
				stopScroll();
				return false;
			});

			$(".pop-ok").on("click", function(){
				//alert("c");
				$this = $(this);
				if($(".insu_item li.on").is(":visible")){
					$($(this).attr("rel")).attr("tabindex","0").css({"visibility":"visible"}).animate({"opacity":"1", "top":"0", "bottom":"0px"},500, "easeOutExpo", function(){
						var inH = $(this).find(".scroll").innerHeight();
						$(this).find(".scroll").height(inH);	
						$(this).find(".scroll").addClass("fixScroll");	
					});
					stopScroll();
				};
				return false;
			});

			$.each($i, function(){
				$viewBtn.eq(this).attr("rel","#pop_" + this);
				if($(".pop-ok").is(":visible")){
					$viewBtn.eq(this).attr("rel","#pop_" + (this +1));
				}
				$(".full_LayerPop").eq(this).attr("id","pop_" + this);

				$("#pop_" + this).find(".close").on("click", function(){
					$(".full_LayerPop .inner").stop().animate({"scrollTop":0});
					$(this).closest(".full_LayerPop").css({"visibility":"hidden"}).stop().animate({"opacity":"0", "top":"-200%", "bottom":""},0, "easeOutExpo", function(){
						if($(".scroll").is(":visible")){
							$(this).find(".scroll").height("");	
						}
						$(this).find(".scroll").removeClass("fixScroll");	
					});
					$(".full_LayerPop").attr("tabindex","")
					$(".myBox .top").removeClass("on").off("click");
					$(".myBox .bottom").hide();
					$this.focus();
					enableScroll();
					return false;

					$(window).bind("pageshow", function(event) {
						if(event.originalEvent.persisted){
							window.location.reload()
						}
					});
				});
			});
		},
		
		pvFile : function(){
			var _num = 0,
				arr = [],
				limit = 10,
				sta = 0;

			var fnUpload = {						
				init: function(){
					$(".addControl .add").on("click", function(){
						/*
						if(_num == limit - 1) return false;
						_num++;
						fnUpload.create();
						*/
						if(_num == limit - 1){
							alert("파일첨부는 10개 까지만 가능합니다.");
							 return false;
						} else {
							_num++;
							fnUpload.create();
						}
						return false;
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
					$html += '<div class="up_Box">';
					$html += '<p class="title">파일첨부 <b></b></p>';
					$html += '<div class="file">';
					$html += '<div class="file_box"></div>';
					$html += '<div class="filebutton"><input type="file" name="file" id="file_'+ obj.num +'" class="searchfile files" title="파일 찾기" /><label for="file_'+ obj.num +'" class="button">파일선택</label></div>';
					$html += '<div class="preview_Img">';
					$html += '<img src="img/v3/contents/noImg.jpg" class="newLink" id="pvImg_" alt="" />';
					$html += '</div>';
					$html += '</div>';
					$html += '<div class="addControl">';
					$html += '<label for="file_'+ obj.num +'" class="editFile">수정</label><a href="#self" class="del">삭제</a>';
					$html += '</div>';
					$html += '</div>';
					obj.ui = $($html);
					//console.log(obj.ui);
					$(".img_Upload").append(obj.ui);
					arr.push(obj);

					fnUpload.file(obj);
					fnUpload.del(obj);
				},

				del : function(obj){
					obj.ui.find(".del").on("click", function(){
						sta = 0;
						$this = $(this).closest(".up_Box");
						if(_num <= 0){
							val = $(this).closest(".up_Box").find("input").val();
							//alert("1개 이하 삭제가 불가능합니다.");
							
							if(val == ""){
								alert("1개 이하 삭제가 불가능합니다.");
							} else {
								$this.find(".filebutton").removeClass("hidden");
								$this.find("input").remove();
								$this.find(".filebutton").prepend('<input type="file" name="file" id="file_'+ obj.num +'" class="searchfile files" title="파일 찾기" />');
								$this.find(".file_box").removeClass("hidden");
								$this.find(".editFile").hide();
								$this.find(".preview_Img img").attr("src", "img/v3/contents/noImg.jpg");
								//$this.find(".preview_Img").hide();
								fnUpload.file(obj);
							}
							
						} else {
							obj.ui.remove();
							arr.splice(obj.num,1);
							fnUpload.reset(arr);
							_num--;
						}
						return false;
					});

					fnUpload.reset(arr);
				},

				file : function(obj){
					$("#file_"+ obj.num +"").on('change', function(){
						val = $(this).val().split("\\");

						f_name = val[val.length-1];
						s_name = f_name.substring(f_name.length-4, f_name.length);

						$(this).parent().addClass("hidden");
						$(this).closest(".up_Box").find(".file_box").addClass("hidden");
						$(this).closest(".up_Box").find(".editFile").show();
						$(this).parent().siblings('.file_box').html("file : "+f_name);
				
						if(s_name.toLowerCase() == "jpeg" || s_name.toLowerCase() == ".jpg" || s_name.toLowerCase() == ".gif" || s_name.toLowerCase() == ".png"){
							$(this).closest(".up_Box").find(".preview_Img").show();
							readURL(this);
						} else {
							if(s_name.toLowerCase() == ""){
								$(this).closest(".up_Box").find(".preview_Img").hide();
								$(this).closest(".up_Box").find(".preview_Img img").attr("src", "img/v3/contents/noImg.jpg");
								$(this).parent().removeClass("hidden");
								$(this).closest(".up_Box").find(".file_box").removeClass("hidden");
								$(this).closest(".up_Box").find(".filebutton").css({"opacity":"1"});
								$(this).closest(".up_Box").find(".editFile").hide();
								$(this).attr("val", "");
								//console.log(val);
								alert("파일이 선택되지 않았습니다.");
							} else {
								$(this).parent().css({"opacity":"0"});
								$(this).parent().removeClass("hidden");
								$(this).closest(".up_Box").find(".file_box").removeClass("hidden");
								$(this).closest(".up_Box").find(".preview_Img").hide();
								$(this).closest(".up_Box").find(".preview_Img img").attr("src", "img/v3/contents/noImg.jpg");
								alert("이미지 파일이 아닙니다.");
								return;
							};
						}
					});

					function readURL(input) {
						var reader = new FileReader();

						reader.onload = function(e){
							//$("#pvLink_"+ obj.num +"").attr("data-type", e.target.result);
							$("#pvImg_"+ obj.num +"").attr("src", e.target.result);
						};
						reader.readAsDataURL(input.files[0]);
					};
				},

				reset : function(arr){
					for(var i in arr){
						var obj = arr[i];
						obj.num = parseInt(i);

						title = obj.ui.find(".title b"),
						select = obj.ui.find("select"),
						input = obj.ui.find(".filebutton input"),
						label = obj.ui.find(".filebutton label"),
						edit = obj.ui.find(".addControl label"),
						pvLink = obj.ui.find(".preview_Img a"),
						pvImg = obj.ui.find(".preview_Img img");
						
						obj.ui.attr("id", obj.num + 1);
						console.log(title);
						console.log(obj.ui.attr("id"));
						var z = obj.ui.attr("id");
						title.text(obj.num + 1);

						title.attr("name", "img_position["+ obj.num +"]");
						select.attr("name", "img_position["+ obj.num +"]");
						select.attr("id", "material_"+ obj.num +"");
						input.attr("name", "file["+ obj.num +"]");
						input.attr("id", "file_" + obj.num +"");
						label.attr("for", "file_" + obj.num +"");
						edit.attr("for", "file_" + obj.num +"");
						pvLink.attr("id", "pvLink_" + obj.num +"");
						pvImg.attr("id", "pvImg_" + obj.num +"");
					}

					fnUpload.newPop(obj);
				},

				newPop : function(obj){
					var $scroll;

					function stopScroll(){
						$scroll = window.pageYOffset;
						//console.log($scroll);
						$("html").css({"overflow": "hidden"});
						$("body").css({"position":"fixed", "top": -$scroll});
					};

					function enableScroll(){
						$("html").css({"overflow":"auto"});
						$("body").css({"position":"", "top":""});
						window.scrollTo(0, $scroll);
					};

					$("#pvImg_"+ obj.num +"").on("click", function(){
						var src = $(this).attr("src");
						sta++;
						if(sta == 1){
							$("body").append("<div class='newPop'><img src='" + src + "' alt='' /></div>");
							stopScroll();
						}

						$(".newPop").on("click", function(){
							sta = 0;
							$(this).remove();
							enableScroll();
						});
					});
				}
			};
			
			fnUpload.init();
		},

		claimUi : function(){
			var _num = 0;
			var arr = [];

			var accident = {
				init : function(){
					//reset.create(); 초기 생성 _num=1; 셋팅

					$(".accident_Box .add-btn").on("click", function(){
						_num++;
						accident.create();
					});
					accident.create();

				},

				create : function(){
					var obj = {};
					obj.num = _num;
					$(".total>span").text(obj.num);
					accident.draw(obj);
				},

				draw : function(obj){
					console.log(obj);
					var $html = "";
					$html += "<div class='block'>";
					$html += "<p class='title'>진료내역 <span></span></p>";
					$html += "<dl class='input-zip acc'>";
					$html += "<dt>구분</dt>";
					$html += "<dd>";
					$html += "<div class='radioMdu'>";
					$html += "<p><span><label for='chk2_1'></label><input type='radio' id='chk2_1' title='입원'  /></span><label for='chk2_1'>입원</label></p>";
					$html += "<p><span><label for='chk2_2'></label><input type='radio' id='chk2_2' title='통원' /></span><label for='chk2_2'>통원</label></p>";
					$html += "</div>";
					$html += "</dd>";
					$html += "<dt>진단명</dt>";
					$html += "<dd><div class='input inputPlace'><label for='' class='label'>진단명 입력</label><input type='text' id='' class='ipObj' name='' value='' title='진료받은 진단명 입력'  /></div></dd>"; 
					$html += "<dt>의료기관명</dt>";
					$html += "<dd><div class='input inputPlace'><label for='' class='label'>의료기관명 입력</label><input type='text' id='' class='ipObj' name='' value='' title='진료받은 의료기관명 입력'  /> </div></dd>";
					$html += "<dt>진료과목</dt>";
					$html += "<dd><div class='input inputPlace'><label for='' class='label'>진료과목 입력</label><input type='text' id='' class='ipObj' name='' value='' title='진료받은 진료과목 입력'  /></div></dd>";
					$html += "<dt>진료과목</dt>";
					$html += "<dd>";
					$html += "<div class='datepicker datePlace'><label for=''><span></span></label>";
					$html += "<div class='divInput stDate_1'><b></b></div>";
					$html += "<input type='text' class='accVal' id='' onfocus='this.blur()' name='' title='진료일자 선택 입력'  value='' readonly placeholder='진료일자' />";
					$html += "</div>";
					$html += "<div class='cal-wrap'><div id='' class='accDate'></div></div>";
					$html += "</dd>";
					$html += "</dl>";
					$html += "<div class='close'><a href='#self'>삭제</a></div>";
					$html += "</div>";
					obj.ui = $($html);
					$(".accident_area").append(obj.ui);
					arr.push(obj);

					accident.del(obj);
					accident.event();
					accident.datePicker(obj);
				},

				datePicker : function(obj){
					obj.ui.find('.datepicker label, .datepicker input').on('click focus', function(){
						if(!$(this).parent().parent().find(".cal-wrap").hasClass('show')){
							obj.ui.find(".cal-wrap").removeClass('show');
							$("#inbyuWrap").append("<div class='dimm'></div>");
							$(this).parent().parent().find(".cal-wrap").addClass('show');
						}else{
							//obj.ui.find(".cal-wrap").removeClass('show');
							//$(this).parent().parent().find(".cal-wrap").removeClass('show');
						}
					});

					obj.ui.find('label.d_label').on('click', function(){
						if(!$(this).parent().parent().find(".cal-wrap").hasClass('show')){
							obj.ui.find(".cal-wrap").removeClass('show');
							$(this).parent().parent().find(".cal-wrap").addClass('show');
						}else{
							$(this).parent().parent().find(".cal-wrap").removeClass('show');
						}
					});
				},

				del : function(obj){
					obj.ui.find(".close").on("click", function(){
						sta = 0;
						if(_num <= 0){
							alert("1개 이하 삭제가 불가능합니다.");
						} else {
							obj.ui.remove();
							arr.splice(obj.num, 1);
							accident.change(arr);
							_num--;
						}
						return false;
					});
					accident.change(arr);
				},

				event : function(){
					$(".inputPlace, .datePlace").find("input, textarea").each(function(){
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

					$(".radioMdu").find("input:radio").each(function(){
						if($(this).prop("checked")){
							$(this).parent().addClass("on");
							$(this).prop("checked", true);
						};

						$(this).on("click",function(){
							if($(this).prop("checked")){
								$(this).closest(".radioMdu").find("input").parent().removeClass("on");
								$(this).parent().addClass("on");
								$(this).closest(".radioMdu").find("input:radio").prop("checked", false);
								$(this).prop("checked", true);
							};
						});

						$(this).on("focus", function(){
							$(this).closest(".radioMdu").find("input").parent().removeClass("focus");
							$(this).parent().addClass("focus");
						})

						$(this).on("focusout", function(){
							if($(this).hasClass("last")){
								$(this).parent().removeClass("focus");
							}
						})
					});
				},

				change : function(arr){
					for(var i in arr){
						var obj = arr[i];
						obj.num = parseInt(i);
						obj.ui.attr("id", obj.num);
						
						var title = obj.ui.find(".title span");
						var radio = obj.ui.find(".radioMdu p");
						var label = obj.ui.find(".label");
						var dlabel = obj.ui.find(".d_label");
						var input = obj.ui.find(".ipObj");
						var date = obj.ui.find(".datepicker");
						var datePicker = obj.ui.find(".accDate");
						
						title.text(obj.num + 1);
						for(var i = 0; i<radio.length; i++){
							radio.eq(i).find("label").attr("for", "radio" + obj.num + "_" + i);
							radio.eq(i).find("input").attr("id", "radio" + obj.num + "_" + i);

							date.find("label").eq(i).attr("for","datePic_" + obj.num + "_" + i);
							date.find(".accVal").eq(i).attr("id","datePic_" + obj.num + "_" + i);
							datePicker.eq(i).attr("class","accDatepicker_" + obj.num);
						}

						for(var i = 0; i<input.length; i++){
							label.eq(i).attr("for", "ipObj" + obj.num + "_" + i);
							input.eq(i).attr("id", "ipObj" + obj.num + "_" + i);
						}

						obj.ui.find(".accDatepicker_" + obj.num).datepicker({     
							  //closeText: "확인",
							  showOtherMonths: true,
							  selectOtherMonths: false,
							  currentText: "오늘",
							  minDate:"+0d",
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
									
								  $this.find(".datepicker").children("label").hide();
								  $this.find('.cal-wrap').removeClass('show');
								  $("#inbyuWrap .dimm").remove();
								  $this.find(".accVal").val(selectedDate);
							  }
						});
					}
				}
			}
			accident.init();
		},

		insuUi : function(){
			var _num = 0;
			var arr = [];

			var insurance = {
				init : function(){
					//reset.create(); 초기 생성 _num=1; 셋팅

					$(".insurance .add-btn").on("click", function(){
						_num++;
						insurance.create();
						return false;
					});
					insurance.create();

				},

				create : function(){
					var obj = {};
					obj.num = _num;
					insurance.draw(obj);
				},

				draw : function(obj){
					console.log(obj);
					var $html = "";
					$html += "<div class='block'>";
					$html += "<dl class='input-zip'>";
					$html += "<dt>보험회사명 <span></span></dt>";
					$html += "<dd><div class='input inputPlace'><label for='' class='label'>보험회사명 입력</label><input type='text' id='' class='ipObj' name='' value='' title='보험회사명 입력'  /></div><div class='close'><a href='#self'>삭제</a></div></dd>"; 
					$html += "</dl>";
					$html += "</div>";
					obj.ui = $($html);
					$(".insu_area").append(obj.ui);
					arr.push(obj);

					insurance.event();
					insurance.del(obj);
				},

				del : function(obj){
					obj.ui.find(".close").on("click", function(){
						sta = 0;
						if(_num <= 0){
							alert("1개 이하 삭제가 불가능합니다.");
						} else {
							obj.ui.remove();
							arr.splice(obj.num, 1);
							insurance.change(arr);
							_num--;
						}
						return false;
					});
					insurance.change(arr);
				},

				event : function(){
					$(".inputPlace, .datePlace").find("input, textarea").each(function(){
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

				change : function(arr){
					for(var i in arr){
						var obj = arr[i];
						obj.num = parseInt(i);
						obj.ui.attr("id", obj.num);
						
						var title = obj.ui.find(".input-zip dt>span");
						var label = obj.ui.find("label");
						var input = obj.ui.find("input");
						
						title.text(obj.num +1);

						for(var i = 0; i<input.length; i++){
							label.eq(i).attr("for", "insObj" + obj.num + "_" + i);
							input.eq(i).attr("id", "insObj" + obj.num + "_" + i);
						}
					}
				}
			}
			insurance.init();
		}
	}
//]]>