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
		$html += '<div class="filebutton"><input type="file" name="file" id="file_'+ obj.num +'" class="searchfile files" title="파일 찾기" /><label for="file_'+ obj.num +'" class="button">파일선택</label></div>';
		$html += '</div>';
		$html += '<div class="preview_Img">';
		$html += '<img src="../../images/contents/noImg.jpg" class="newLink" id="pvImg_" alt="" />';
		$html += '</div>';
		$html += '<div class="addControl">';
		$html += '<span class="del">삭제</span>';
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
			if(_num <= 0){
				val = $(this).closest(".up_Box").find("input").val();

				if(val == ""){
					alert("1개 이하 삭제가 불가능합니다.");
				} else {
					$(this).closest(".up_Box").find(".filebutton").css({"opacity":"1"});
					$(this).closest(".up_Box").find("input").remove();
					$(this).closest(".up_Box").find(".filebutton").prepend('<input type="file" name="file" id="file_'+ obj.num +'" class="searchfile files" title="파일 찾기" />');
					$(this).closest(".up_Box").find(".preview_Img img").attr("src", "");
					$(this).closest(".up_Box").find(".preview_Img").hide();
					fnUpload.file(obj);
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
			//console.log(s_name);
			$(this).parent().css({"opacity":"0"});
			$(this).parent().siblings('.file_box').html("file : "+f_name);
	
			if(s_name.toLowerCase() == "jpeg" || s_name.toLowerCase() == ".jpg" || s_name.toLowerCase() == ".gif" || s_name.toLowerCase() == ".png"){
				$(this).closest(".up_Box").find(".preview_Img").show();
				readURL(this);
			} else {
				if(s_name.toLowerCase() == ""){
					$(this).closest(".up_Box").find(".preview_Img").hide();
					$(this).closest(".up_Box").find(".preview_Img img").attr("src", "../../images/contents/noImg.jpg");
					$(this).closest(".up_Box").find(".filebutton").css({"opacity":"1"});
					$(this).attr("val", "");
					//console.log(val);
					alert("파일이 선택되지 않았습니다.");
				} else {
					$(this).closest(".up_Box").find(".preview_Img").hide();
					$(this).closest(".up_Box").find(".preview_Img img").attr("src", "../../images/contents/noImg.jpg");
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
			var obj = arr[i],
			select = obj.ui.find("select"),
			input = obj.ui.find(".filebutton input"),
			label = obj.ui.find(".filebutton label"),
			edit = obj.ui.find(".addControl label"),
			pvLink = obj.ui.find(".preview_Img a"),
			pvImg = obj.ui.find(".preview_Img img");

			obj.num = parseInt(i);

			select.attr("name", "img_position["+ obj.num +"]");
			select.attr("id", "material_"+ obj.num +"");
			input.attr("name", "file["+ obj.num +"]");
			input.attr("id", "file_" + obj.num +"");
			label.attr("for", "file_" + obj.num +"");
			pvLink.attr("id", "pvLink_" + obj.num +"");
			pvImg.attr("id", "pvImg_" + obj.num +"");
			edit.attr("for", "file_" + obj.num +"");
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