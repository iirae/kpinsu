(function($){
	$.fn.claimUi = function(options){
		var _opt = $.extend({
			type : 1, //0=선택(default), 1=외래, 2=약제, 3=입원, 4=비급여특약(입원), 5=비급여특약(외래)
			_n : 0 //claim-Block : 해당 건수 갯수
		}, options);

		//var _n = 0; claimUi_Box

		var _a = [];
		var	 $title;
		var $txt;
		var $type;
		var $claim = $(this);
		var $select = $claim.find(".claimSelect");
		var $trigger = $claim.find(".choiceClaim");
		var $selVal = $claim.find(".claimSelect option:selected").val();
		var $selVal_txt = $claim.find(".claimSelect option:selected").text();

		var claim = {
			init : function(){
				$select.on("change", function(){
					$selVal_txt = $(this).find("option:selected").text();
					$type = $(this).find("option:selected").val();
				});

				$claim.find(".reset").on("click focus", function(){
					$(".datepicker").children("label").show();
				});

				if(_opt.type !== 0){
					/* edit_creat */
					if($select.find("option").eq(_opt.type).attr("selected","selected").val()){
						$select.find("option").eq(_opt.type).attr("selected","selected")
						var txt = $select.find("option").eq(_opt.type).attr("selected","selected").text();
						
						for(var i = 1; i<=_opt._n; i++){
							claim.creat();

							$(".claimBLock_list .claimTb_title").each(function(i){
								console.log(i);
								$(this).text(txt + " " + (i+1));
							});
						}

						$("input").on("keyup",function(){
							if(!/[^0-9]/g){
								alert("숫자만 입력가능합니다");
							} else {
								$(this).val($(this).val().replace(/[^0-9]/g,""));
							};
						});

						$claim.find(".claim-Box .info_Text>b").text("수정하고자 하는 값을 수정 후 수정완료버튼을 눌러주세요");

						$claim.find(".claimBtn>a").hide();
						$claim.find(".claimBtn>div").hide();
						$claim.find(".claimBtn>div.edit").show();

						$select.not(":selected").attr("disabled", "disabled");
						$trigger.attr("class", "");
						$claim.find("#choiceClaim").off();
						$claim.find(".addClaim").off();
						$claim.find(".delClaim").off();
					};
					/* edit_creat */
				} else {
					var $type = $claim.find(".claimSelect option:selected").val();
					var txt = $select.find("option").eq(_opt.type).attr("selected","selected").text();

					$trigger.on("click", function(){
						_opt._n = 0;
						_a = [];

						var $v = $claim.find(".claimSelect option:selected").val();

						var chk = 0;
						var domObj = $("input");
						if($claim.find(".claim-Block").is(":visible")){
							for(var i = 0; i <= domObj.length; i ++){
								var chkObj = domObj.eq(i).val();
								if(chkObj == ""){
									chk++;
									if(chk == 1){
										if(!confirm("입력하신값이 초기화됩니다")){
											//return;
										};
									};
									istrue = true;
								};
							};
							istrue = false;
						}
						
						if($type == "선택"){
							$claim.find(".claim-cont").removeClass("on");
							var txt = "청구항목을 선택하신 뒤 확인 버튼을 눌러주세요."
							alert("보험금 청구 항목을 선택하세요.");

							$claim.find(".claim-cont .addClaim").remove();
							$claim.find(".claim-cont .claim-top").remove();
							$claim.find(".claimBLock_list>div").remove();

							$claim.find(".claim-Box .info_Text>b").text(txt);
							$claim.find(".claimBtn>a").show();
							$claim.find(".claimBtn>div").hide();
							return false;
						} else {
							$claim.find(".claim-cont .addClaim").remove();
							$claim.find(".claim-cont .claim-top").remove();
							$claim.find(".claimBLock_list>div").remove();
							claim.event();
							claim.creat();

							$("input").on("keyup",function(){
								if(!/[^0-9]/g){
									alert("숫자만 입력가능합니다");
								} else {
									$(this).val($(this).val().replace(/[^0-9]/g,""));
								};
							});

							$txt = $claim.find(".claim-txt").text();

							$claim.find(".claim-Box .info_Text>b").text($txt);
							$claim.find(".claimBtn>a").hide();
							$claim.find(".claimBtn>div").hide();
							$claim.find(".claimBtn>div.add").show();

							$claim.find(".addClaim").on("click", function(){
								claim.creat();
								_opt._n++;
								return false;
							});
							return false;
						}
					});
				};
			},

			event : function(){
				var $v = $select.find("option:selected").val();

				var html = "";
				html += "<div class='claim-top'>";
				html += "<p class='claim-title'><b>" + $selVal_txt + " 항목이 선택되었습니다.</b>아래 항목을 모두 기재해주세요.</p>";
				html += "<div class='claimEx-Btn'><a href='javascript:void(0)' class='exPopup'>" + $selVal_txt + " 입력예시 확인</a></div><div>";
				html += "</div>";
				$claim.find(".claim-cont").addClass("on").prepend(html);
				$claim.find(".claim-cont .add-claim").append("<div class='addClaim'><a href='#self'><span>" + $selVal_txt + " 추가</span></a></div>");
			},

			creat : function(){
				//add DOM
				var obj = {};
				obj.n = _opt._n;
				claim.add(obj);
			},

			add : function(obj){
				//select add DOM
				var $this = $select.find("option:selected").val();
				var html = "";
				switch ($this){
					case "type_1" : //외래
						html += "<div class='claim-Block'>";
						html += "<p class='claim-txt'>외래 : 가입하신 보험 항목중에서 상해/질병외래의료실비 부분을 말합니다.</p>";
						html += "<p class='claimTb_title'><span></span></p>";
						html += "<table class='claimTable'>";
						html += "<caption>외래 항목 관련테이블</caption>";
						html += "<colgroup><col style='width:30%' /><col style='width:70%' /></colgroup>";
						html += "<tbody>";
						html += "<tr>";
						html += "<th><label for='' class='label'>가입금액</label></th>";
						html += "<td><select name='' id='' class='ipObj select'><option value='선택'>선택</option></select></td>";
						html += "</tr>";
						html += "<tr>";
						html += "<th><label for='' class='label'>병원구분</label></th>";
						html += "<td><select name='' id='' class='ipObj select'><option value='선택'>선택</option></select></td>";
						html += "</tr>";
						html += "<tr>";
						html += "<th><label for='pickup' class='d_label'>진료일자</label></th>";
						html += "<td>";
						html += "<div class='dateP-Box'>";
						html += "<div class='datepicker datePlace'><label for='pickup'>년-월-일</label><input type='text' id='' class='datePic' name='' readonly title='진료일자을 입력하세요' /></div>";
						html += "<div class='cal-wrap'><div id='' class='pickupDate'></div></div></div>";
						html += "</td>";
						html += "</tr>";
						html += "<tr>";
						html += "<th><label for='' class='label'>급여/환자부담액</label></th>";
						html += "<td><input type='text' id='' class='ipObj' title='급여/환자부담액을 입력하세요' /> 원</td>";
						html += "</tr>";
						html += "<tr>";
						html += "<th><label for='' class='label'>급여전액본인부담액</label></th>";
						html += "<td><input type='text' id='' class='ipObj' title='급여환자부담액을 입력하세요' /> 원</td>";
						html += "</tr>";
						html += "<tr>";
						html += "<th><label for='' class='label'>비급여환자부담액</label></th>";
						html += "<td><input type='text' id='' class='ipObj' title='급여환자부담액을 입력하세요' /> 원</td>";
						html += "</tr>";
						html += "<tr>";
						html += "<th><label for='' class='label'>도수치료,체외충격차, 증식치료,<br />비급여주사료, MRI/MRA <br />비급여본인부담금</label></th>";
						html += "<td><input type='text' id='' class='ipObj' title='급여환자부담액을 입력하세요' /> 원</td>";
						html += "</tr>";
						html += "<tr>";
						html += "<th><label for='' class='label'>보상제외금액 및 할인금액</label></th>";
						html += "<td><input type='text' id='' class='ipObj' title='보상제외금액 및 할인금액을 입력하세요' /> 원</td>";
						html += "</tr>";
						html += "</tbody>";
						html += "</table>";
						html += "<div class='delClaim'><a href='#self'>삭제</a></div>";
						html += "</div>";
					break;
					case "type_2" : //약제
						html += "<div class='claim-Block'>";
						html += "<p class='claim-txt'>약제 : 상해/질병처방조제의료실비</p>";
						html += "<p class='claimTb_title'><span></span></p>";
						html += "<table class='claimTable'>";
						html += "<caption>약제 항목 관련테이블</caption>";
						html += "<colgroup><col style='width:30%' /><col style='width:70%' /></colgroup>";
						html += "<tbody>";
						html += "<tr>";
						html += "<th><label for='' class='label'>가입금액</label></th>";
						html += "<td><select name='' id='' class='ipObj select'><option value='선택'>선택</option></select></td>";
						html += "</tr>";
						html += "<tr>";
						html += "<th><label for='pickup' class='d_label'>진료일자</label></th>";
						html += "<td>";
						html += "<div class='dateP-Box'>";
						html += "<div class='datepicker datePlace'><label for='pickup'>년-월-일</label><input type='text' id='' class='datePic' name='' readonly title='진료일자을 입력하세요' /></div>";
						html += "<div class='cal-wrap'><div id='' class='pickupDate'></div></div></div>";
						html += "</td>";
						html += "</tr>";
						html += "<tr>";
						html += "<th><label for='' class='label'>급여/환자부담액</label></th>";
						html += "<td><input type='text' id='' class='ipObj' title='급여/환자부담액을 입력하세요' /> 원</td>";
						html += "</tr>";
						html += "<tr>";
						html += "<th><label for='' class='label'>비급여환자부담액</label></th>";
						html += "<td><input type='text' id='' class='ipObj' title='급여환자부담액을 입력하세요' /> 원</td>";
						html += "</tr>";
						html += "<tr>";
						html += "<th><label for='' class='label'>보상제외금액</label></th>";
						html += "<td><input type='text' id='' class='ipObj' title='보상제외금액' /> 원</td>";
						html += "</tr>";
						html += "</tbody>";
						html += "</table>";
						html += "<div class='delClaim'><a href='#self'>삭제</a></div>";
						html += "</div>";
					break;     
					case "type_3" : //입원
						html += "<div class='claim-Block'>";
						html += "<p class='claim-txt'>입원 : 상해/질병입원의료실비</p>";
						html += "<p class='claimTb_title'><span></span></p>";
						html += "<table class='claimTable'>";
						html += "<caption>입원 항목 관련테이블</caption>";
						html += "<colgroup><col style='width:30%' /><col style='width:70%' /></colgroup>";
						html += "<tbody>";
						html += "<tr>";
						html += "<th><label for='' class='label'>가입금액</label></th>";
						html += "<td><select name='' id='' class='ipObj select'><option value='선택'>선택</option></select></td>";
						html += "</tr>";
						html += "<tr>";
						html += "<th><label for='' class='label'>병원구분</label></th>";
						html += "<td><select name='' id='' class='ipObj select'><option value='선택'>선택</option></select></td>";
						html += "</tr>";
						html += "<tr>";
						html += "<th><label for='pickup' class='d_label'>입원일자</label></th>";
						html += "<td>";
						html += "<div class='dateP-Box'>";
						html += "<div class='datepicker datePlace'><label for='pickup'>년-월-일</label><input type='text' id='' class='datePic' name='' readonly title='입원일자을 입력하세요' /></div>";
						html += "<div class='cal-wrap'><div id='' class='pickupDate'></div></div></div>";
						html += "</td>";
						html += "</tr>";
						html += "<tr>";
						html += "<th><label for='pickup' class='d_label'>퇴원일자</label></th>";
						html += "<td>";
						html += "<div class='dateP-Box'>";
						html += "<div class='datepicker datePlace'><label for='pickup'>년-월-일</label><input type='text' id='' class='datePic' name='' readonly title='퇴원일자을 입력하세요' /></div>";
						html += "<div class='cal-wrap'><div id='' class='pickupDate'></div></div></div>";
						html += "</td>";
						html += "</tr>";
						html += "<tr>";
						html += "<th><label for='' class='label'>급여본인부담금</label></th>";
						html += "<td><input type='text' id='' class='ipObj' title='급여본인부담금을 입력하세요' /> 원</td>";
						html += "</tr>";
						html += "<tr>";
						html += "<th><label for='' class='label'>전액본인부담금</label></th>";
						html += "<td><input type='text' id='' class='ipObj' title='전액본인부담금을 입력하세요' /> 원</td>";
						html += "</tr>";
						html += "<tr>";
						html += "<th><label for='' class='label'>비급여본인부담금</label></th>";
						html += "<td><input type='text' id='' class='ipObj' title='비급여본인부담금을 입력하세요' /> 원</td>";
						html += "</tr>";
						html += "<tr>";
						html += "<th><label for='' class='label'>상급병실차액</label></th>";
						html += "<td><input type='text' id='' class='ipObj' title='상급병실차액을 입력하세요' /> 원</td>";
						html += "</tr>";
						html += "<tr>";
						html += "<th><label for='' class='label'>도수치료,체외충격차, 증식치료,<br />비급여주사료, MRI/MRA <br />비급여본인부담금</label></th>";
						html += "<td><input type='text' id='' class='ipObj' title='급여환자부담액을 입력하세요' /> 원</td>";
						html += "</tr>";
						html += "<tr>";
						html += "<th><label for='' class='label'>보상제외금액 및 할인금액</label></th>";
						html += "<td><input type='text' id='' class='ipObj' title='보상제외금액 및 할인금액을 입력하세요' /> 원</td>";
						html += "</tr>";
						html += "</tbody>";
						html += "</table>";
						html += "<div class='delClaim'><a href='#self'>삭제</a></div>";
						html += "</div>";
					break;
					case "type_4" : //비급여특약(입원)
						html += "<div class='claim-Block'>";
						html += "<p class='claim-txt'>비급여특약 : [비급여 도수치료·체외충격파치료·증식치료 ] [비급여 주사료]  [비급여 자기공명영상진단(MRI/MRA) 비용을 말합니다</p>";
						html += "<p class='claimTb_title'><span></span></p>";
						html += "<table class='claimTable'>";
						html += "<caption>비급여특약(입원) 항목 관련테이블</caption>";
						html += "<colgroup><col style='width:30%' /><col style='width:70%' /></colgroup>";
						html += "<tbody>";
						html += "<tr>";
						html += "<th><label for='' class='label'>가입금액</label></th>";
						html += "<td><select name='' id='' class='ipObj select'><option value='선택'>선택</option></select></td>";
						html += "</tr>";
						html += "<tr>";
						html += "<th><label for='' class='label'>병원구분</label></th>";
						html += "<td><select name='' id='' class='ipObj select'><option value='선택'>선택</option></select></td>";
						html += "</tr>";
						html += "<tr>";
						html += "<th><label for='pickup' class='d_label'>입원일자</label></th>";
						html += "<td>";
						html += "<div class='dateP-Box'>";
						html += "<div class='datepicker datePlace'><label for='pickup'>년-월-일</label><input type='text' id='' class='datePic' name='' readonly title='입원일자을 입력하세요' /></div>";
						html += "<div class='cal-wrap'><div id='' class='pickupDate'></div></div></div>";
						html += "</td>";
						html += "</tr>";
						html += "<tr>";
						html += "<th><label for='pickup' class='d_label'>퇴원일자</label></th>";
						html += "<td>";
						html += "<div class='dateP-Box'>";
						html += "<div class='datepicker datePlace'><label for='pickup'>년-월-일</label><input type='text' id='' class='datePic' name='' readonly title='퇴원일자을 입력하세요' /></div>";
						html += "<div class='cal-wrap'><div id='' class='pickupDate'></div></div></div>";
						html += "</td>";
						html += "</tr>";
						html += "<tr>";
						html += "<th>비급여 주사료 환자부담액</th>";
						html += "<td>";
						html += "<div class='ct'><label for='' class='label'>횟수</label> <input type='text' id='' class='ipObj' title='비급여 주사횟수 입력하세요' /> 회 </div><span class='bullet'>/</span>";
						html += "<div class='pr'><label for='' class='label'>금액</label> <input type='text' id='' class='ipObj' title='비급여 주사료 환자부담액을 입력하세요' /> 원</div>";
						html += "</td>";
						html += "</tr>";
						html += "<tr>";
						html += "<th>비급여 도수치료 환자부담액</th>";
						html += "<td>";
						html += "<div class='ct'><label for='' class='label'>횟수</label> <input type='text' id='' class='ipObj' title='비급여 도수치료 횟수를 입력하세요' /> 회 </div><span class='bullet'>/</span>";
						html += "<div class='pr'><label for='' class='label'>금액</label> <input type='text' id='' class='ipObj' title='비급여 도수치료 환자부담액을 입력하세요' /> 원</div>";
						html += "</td>";
						html += "</tr>";
						html += "<tr>";
						html += "<th>비급여 체외충격파 환자부담액</th>";
						html += "<td>";
						html += "<div class='ct'><label for='' class='label'>횟수</label> <input type='text' id='' class='ipObj' title='비급여 체외충격파 횟수를 입력하세요' /> 회 </div><span class='bullet'>/</span>";
						html += "<div class='pr'><label for='' class='label'>금액</label> <input type='text' id='' class='ipObj' title='비급여 체외충격파 환자부담액을 입력하세요' /> 원</div>";
						html += "</td>";
						html += "</tr>";
						html += "<tr>";
						html += "<th>비급여 증식치료 환자부담액</th>";
						html += "<td>";
						html += "<div class='ct'><label for='' class='label'>횟수</label> <input type='text' id='' class='ipObj' title='비급여 증식치료 횟수를 입력하세요' /> 회 </div><span class='bullet'>/</span>";
						html += "<div class='pr'><label for='' class='label'>금액</label> <input type='text' id='' class='ipObj' title='비급여 증식치료 환자부담액을 입력하세요' /> 원</div>";
						html += "</td>";
						html += "</tr>";
						html += "<tr>";
						html += "<th><label for='' class='label'>비급여 MRI/MRA 환자부담액</label></th>";
						html += "<td><input type='text' id='' class='ipObj' title='비급여 MRI/MRA 환자부담액을 입력하세요' /> 원</td>";
						html += "</tr>";
						html += "</tbody>";
						html += "</table>";
						html += "<div class='delClaim'><a href='#self'>삭제</a></div>";
						html += "</div>";
					break;
					case "type_5" : //비급여특약(외래)
						html += "<div class='claim-Block'>";
						html += "<p class='claim-txt'>비급여특약 : [비급여 도수치료·체외충격파치료·증식치료 ] [비급여 주사료]  [비급여 자기공명영상진단(MRI/MRA) 비용을 말합니다</p>";
						html += "<p class='claimTb_title'><span></span></p>";
						html += "<table class='claimTable'>";
						html += "<caption>비급여특약(외래) 항목 관련테이블</caption>";
						html += "<colgroup><col style='width:30%' /><col style='width:70%' /></colgroup>";
						html += "<tbody>";
						html += "<tr>";
						html += "<th><label for='' class='label'>가입금액</label></th>";
						html += "<td><select name='' id='' class='ipObj select'><option value='선택'>선택</option></select></td>";
						html += "</tr>";
						html += "<tr>";
						html += "<th><label for='' class='label'>입/통원</label></th>";
						html += "<td><select name='' id='' class='ipObj select'><option value='선택'>선택</option></select></td>";
						html += "</tr>";
						html += "<tr>";
						html += "<th><label for='pickup' class='d_label'>진료일자</label></th>";
						html += "<td>";
						html += "<div class='dateP-Box'>";
						html += "<div class='datepicker datePlace'><label for='pickup'>년-월-일</label><input type='text' id='' class='datePic' name='' readonly title='진료일자을 입력하세요' /></div>";
						html += "<div class='cal-wrap'><div id='' class='pickupDate'></div></div></div>";
						html += "</td>";
						html += "</tr>";
						html += "<tr>";
						html += "<th><label for='' class='label'>비급여 주사료 환자부담액</label></th>";
						html += "<td><input type='text' id='' class='ipObj' title='비급여 주사료 환자부담액을 입력하세요' /> 원</td>";
						html += "</tr>";
						html += "<tr>";
						html += "<th><label for='' class='label'>비급여 도수치료 환자부담액</label></th>";
						html += "<td><input type='text' id='' class='ipObj' title='비급여 도수치료 환자부담액을 입력하세요' /> 원</td>";
						html += "</tr>";
						html += "<tr>";
						html += "<th><label for='' class='label'>비급여 체외충격파 환자부담액</label></th>";
						html += "<td><input type='text' id='' class='ipObj' title='비급여 체외충격파 환자부담액을 입력하세요' /> 원</td>";
						html += "</tr>";
						html += "<tr>";
						html += "<th><label for='' class='label'>비급여 증식치료 환자부담액</label></th>";
						html += "<td><input type='text' id='' class='ipObj' title='비급여 증식치료 환자부담액을 입력하세요' /> 원</td>";
						html += "</tr>";
						html += "<tr>";
						html += "<th><label for='' class='label'>비급여 MRI/MRA 환자부담액</label></th>";
						html += "<td><input type='text' id='' class='ipObj' title='비급여 MRI/MRA 환자부담액을 입력하세요' /> 원</td>";
						html += "</tr>";
						html += "</tbody>";
						html += "</table>";
						html += "<div class='delClaim'><a href='#self'>삭제</a></div>";
						html += "</div>";
					break;
					default : console.log("default");
				}
				obj.ui = $(html);
				$claim.find(".claim-cont .claimBLock_list").append(obj.ui);
				$claim.find(".claim-cont .claim-Block:last").attr("tabindex","0").focus();

				_a.push(obj);
				claim.del(obj);
				claim.datePicker(obj);
			},
			
			datePicker : function(obj){
				//console.log(obj.ui);
				obj.ui.find('.datepicker label, .datepicker input').on('click focus', function(){
					if(!$(this).parent().parent().find(".cal-wrap").hasClass('show')){
						obj.ui.find(".cal-wrap").removeClass('show');
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
				obj.ui.find(".delClaim").on("click", function(){
					if(_opt._n <= 0){
						alert("1개 이하 삭제가 불가능합니다.");
					} else {
						obj.ui.remove();
						_a.splice(obj.n, 1);
						claim.reset(_a);
						_opt._n--;
					}
				});
				
				claim.reset(_a);
			},

			reset : function(_a){
				for(var i in _a){
					var obj = _a[i];
					obj.n = parseInt(i);
					obj.ui.attr("id", obj.n);

					var title = obj.ui.find(".claimTb_title");
					var label = obj.ui.find(".label");
					var dlabel = obj.ui.find(".d_label");
					var input = obj.ui.find(".ipObj");
					var date = obj.ui.find(".datepicker");
					var datePicker = obj.ui.find(".pickupDate");

					title.text($selVal_txt + " " + (obj.n+1));

					for(var i = 0; i<input.length; i++){
						dlabel.eq(i).attr("for","datePic_" + obj.n + "_" + i);
						date.find("label").eq(i).attr("for","datePic_" + obj.n + "_" + i);
						date.find(".datePic").eq(i).attr("id","datePic_" + obj.n + "_" + i);
						datePicker.eq(i).attr("class","trDatepicker_" + obj.n);
						label.eq(i).attr("for", "ipObj" + obj.n + "_" + i);
						input.eq(i).attr("id", "ipObj" + obj.n + "_" + i);
					}

					obj.ui.find(".trDatepicker_" + obj.n).datepicker({     
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
							  $this.find(".datePic").val(selectedDate);
							  console.log( $this.find(".datePic").val());
						  }
					});
				};
			}
		}

		return this.each(function(){
			claim.init();
		});
	}
})(jQuery);