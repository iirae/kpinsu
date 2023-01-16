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
				html += "<a href='#self' class='delete' id='del_"+ $i +"'><img src='../../img/kakao/btn_userDel.png' alt='동행자 삭제버튼' /></a>";
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
				$emptyArea = $(".empty_List");

			if($list_.is(":visible")){
				$listArea.show();
				$emptyArea.hide();
			} else {
				$listArea.hide();
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
		}
	}


    var $window = $(window),
		$html = $('html');

    $window.on('load scroll', function(){
		var scrollTop = $window.scrollTop();
        if (scrollTop > 10) {
            $html.addClass('is-scroll-down');
        } else {
            $html.removeClass('is-scroll-down');
		}
    });
//]]>
