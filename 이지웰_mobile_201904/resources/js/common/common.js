

(function($){

	/*
	 * @name : config
	 * @type : object
	 * @version : 1.0
	 * @use :
	$.config.get('name');
	$.config.set('name', 'value');
	 */
	$.config = new function (){

		var _config = {
			'rootUrl'		:{'editable' : false, 	'value': location.protocol + "//" + location.host},
			'contextPath'	:{'editable' : true, 	'value': "${contextPath}"},
			'imageRootPath'	:{'editable' : false, 	'value': "/resources/img"},
			'uploadRootUrl'	:{'editable' : true, 	'value': "${uploadRootUrl}"},
			'writable'		:{'editable' : true, 	'value': "${writable}"},
			'recipeUrl'		:{'editable' : false, 	'value': "https://www.cj.co.kr"},
			'cjoneHttpUrl'	:{'editable' : true, 	'value': "${cjoneHttpUrl}"},
			'cjoneHttpsUrl'	:{'editable' : true, 	'value': "${cjoneHttpsUrl}"},
			'localePath'	:{'editable' : true, 	'value': "${localePath}"},
			'isLogined'		:{'editable' : true, 	'value': "${isLogined}"}
		};
		
		return new function () {
			this.set = function (name, value){
				if(_config[name].editable)
					_config[name].value = value;

				_config[name].editable = false;
			};
			this.get = function (name){
				return _config[name] ? _config[name].value : null;
			};
		};
	};


	/*
	 * @name : language
	 */
	$.language = {
		ok : '확인',
		cancel : '취소',
		remove : '삭제',
		q_remove : '삭제하시겠습니까?',
		close : '닫기',
		today : '오늘',
		current : '현재',
		now : '지금',
		year : {
			suffix : '년'
		},
		month : {
			prev : '이전달',
			next : '다음달',
			names : ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
			suffix : '월'
		},
		day : {
			names : ['일', '월', '화', '수', '목', '금', '토']
		},
		time : {
			suffix : '시간',
			suffixEn : 'Time'
		},
		hour : {
			suffix : '시',
			suffixEn : 'Hour'
		},
		minute : {
			suffix : '분',
			suffixEn : 'Minute'
		},
		second : {
			suffix : '초',
			suffixEn : 'Seconde'
		},
		validation : {
			title : '유효성 검사'
		}
	};

	//serializeObject
    $.fn.serializeObject = function () {
        var result = {};
        var extend = function (i, element) {
            var node = result[element.name];
            if ('undefined' !== typeof node && node !== null) {
                if ($.isArray(node)) {
                    node.push(element.value);
                } else {
                    result[element.name] = [node, element.value];
                }
            } else {
                result[element.name] = element.value;
            }
        };

        $.each(this.serializeArray(), extend);
        return result;
    };

    //한글입력방지
	$('.noHan' ).on("blur keyup", function() {
		if($(this).val().match(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g)){
			$(this).val( $(this).val().replace( /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g, '' ) );
		}
	});

	$(document).on("keyup", ".numOnly", function() {$(this).val( $(this).val().replace(/[^0-9]/gi,"") );});
	$(document).on("keyup", ".numOnly2", function() {$(this).val( $(this).val().replace(/[^0-9\-]/gi,"") );});

	$(".numEng").keyup(function(event){
	   if (!(event.keyCode >=37 && event.keyCode<=40)) {
	    var inputVal = $(this).val();
	    $(this).val(inputVal.replace(/[^a-z0-9]/gi,''));
	   }
	});

	$(".noSpecial").bind("keyup",function(e){
		 var re = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi
		 var temp=$(this).val();
		 if(re.test(temp)){ //특수문자가 포함되면 삭제하여 값으로 다시셋팅
		 $(this).val(temp.replace(re,"")); }
	 });

	$(".noSpecial2").bind("keyup",function(e){
		var temp=$(this).val();
		var re = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|\*]+$/

		if (!re.test(temp)) {
			for(var i=0;i<temp.length;i++){
				var c = temp.charAt(i);
				if (!re.test(c)) {
					//console.log("제한된 문자 : ",c);
					$(this).val($(this).val().replace(c,""));
				}
			}
		}
	});
	
	// 통합검색
	$("#cmnSearchBtn").on("click",function(e){
		var keywored = $("#webKeyWord").val();
		if(keywored.trim() == ""){
			if($.config.get('localePath') == "en"){
				alert("Please enter your search term.");
			}else if($.config.get('localePath') == "cn"){
				alert("请输入您的搜索字词。");
			}else{
				alert("검색어를 입력해주세요");
			}
			return false;
		}
		commonSearchBtn(keywored);
	});
	// 통합검색
	$("#webKeyWord").on("keyup",function(e){
		var keywored = $(this).val();
		if(e.keyCode == 13){
			if(keywored.trim() == ""){
				if($.config.get('localePath') == "en"){
					alert("Please enter your search term.");
				}else if($.config.get('localePath') == "cn"){
					alert("请输入您的搜索字词。");
				}else{
					alert("검색어를 입력해주세요");
				}
				return false;
			}
			commonSearchBtn(keywored);
		}
	});
})(jQuery);



function goLogin(){
	
	var nowDate = new Date();
    var year = nowDate.getFullYear();
    var month = nowDate.getMonth()+1;
    var date = nowDate.getDate();
    var hour = nowDate.getHours();
    var minute = nowDate.getMinutes();

    var dateStr;
        
    dateStr=""+year; 
    dateStr+=((month<10) ? "0" : "") + month; 
    dateStr+=((date<10) ? "0" : "") + date; 
    dateStr+=((hour<10) ? "0" : "") + hour; 
    dateStr+=((minute<10) ? "0" : "") + minute; 

    var thisIsTheMoment = parseInt(dateStr);
    var blockCheck = 'shutIn';
    
    
    if( (thisIsTheMoment >= 201903120200) && (thisIsTheMoment < 201903120600)){
        blockCheck = 'shutOut';
    }

    if(blockCheck == 'shutOut'){
    	alert('이용에 불편을 드려 죄송합니다. 시스템 점검중입니다.\n- 점검시간 : 2019.03.12 02:00 ~ 03.12 06:00');
        return;
    }
    
	var isLogin = $.config.get("isLogined");
	
	
	if(isLogin == "true"){ // 로그인
		location.href = "/kr/member/mypage";
	}else{ // 로그인 페이지 이동
		var returnUrl = location.href;
		returnUrl = xssFilter(returnUrl);
		location.href = $.config.get('rootUrl') + '/kr/login?returnUrl=' + encodeURIComponent(getSuccessURL(returnUrl));
	}
}


function getSuccessURL(returnUrl){
	var rootUrl = $.config.get("rootUrl");
	
	rootUrl = rootUrl.replace('http://', "").replace('https://', "");
	returnUrl = returnUrl.replace('http://', "").replace('https://', "");
	
	if(returnUrl.indexOf(rootUrl) > -1){
		return location.protocol+ "//" +returnUrl;
	}else{
		return location.protocol+ "//" +rootUrl
	}
}

//통합검색
function commonSearchBtn(keyWord){
	if(keyWord.trim() == ""){
		if($.config.get('localePath') == "en"){
			alert("Please enter your search term.");
		}else if($.config.get('localePath') == "cn"){
			alert("请输入您的搜索字词。");
		}else{
			alert("검색어를 입력해주세요");
		}
		return false;
	}
	keyWord = keyWord.trim();
	
	var ajax = new ComAjax();
	var param = {"keyWord" : keyWord}
	ajax.url($.config.get("rootUrl")+"/"+$.config.get("localePath")+"/proxy/search/dirtyWord");
    ajax.param(param);
    ajax.dataType("json");
    ajax.success(function(data){
    	if(data != null && data.result == "error"){
    		$("#webKeyWord").val("");
    		alert(data.resultMsg);
    		return false;
    	}else{
    		successSearchBtn(keyWord);
    	}
    	return true;
    });
    ajax.call();	
}

// 금칙어 체크
function successSearchBtn(keyWord){
	location.href = $.config.get("rootUrl")+"/"+$.config.get("localePath")+"/search-results?keyWord="+encodeURIComponent(keyWord);	
}

// jQuery Ajax 공통
var ComAjax = function () {
    var f = {};
    var o = { $f:jQuery(f), type:"POST", async:false, dataType:"json", contentType:"application/x-www-form-urlencoded; charset=UTF-8", timeout:60000};

    f.url = function(url)
    {
        o.url = url;

        return f;
    };

    f.timeout = function(timeout)
    {
        o.timeout = timeout;

        return f;
    };

    f.type = function(type)
    {
        o.type = type;

        return f;
    };

    f.async = function(async)
    {
        o.async = async;

        return f;
    };

    f.param = function(param)
    {
        //o.param = JSON.stringify(param);
 		o.param = param;
        return f;
    };

    f.dataType = function(dataType)
    {
        o.dataType = dataType;

        return f;
    };

    f.contentType = function(contentType)
    {
        o.contentType = contentType;

        return f;
    };

    f.before = function(before)
    {
        o.before = before;

        return f;
    };

    f.success = function(success)
    {
        o.success = success;

        return f;
    };

    f.call = function call(){
        $.ajax({
            url         : o.url,
            type        : o.type,
            async       : o.async,
            data        : o.param,
            dataType    : o.dataType,
            contentType : o.contentType,
            // Type: Function( jqXHR jqXHR, PlainObject settings )
            beforeSend:function() {
                if(o.before != null){
                    if(typeof(o.before) == "function"){
                        o.before();
                    }
                    else {
                        eval(o.before + "();");
                    }
                }
            },
            // Type: Function( jqXHR jqXHR, String textStatus, String errorThrown )
            error: function (xhr, status, errorThrown){
                alert("aJax 통신 오류 : " + xhr.status + " : " + status + " : " + errorThrown);
            },

            // Type: Function( Anything data, String textStatus, jqXHR jqXHR )
            success : function(data, status, xhr) {
                if(status == "success" && xhr.status == 200){
                    if(typeof(o.success) == "function"){
                        o.success(data);
                    }
                    else {
                        eval(o.success + "(data);");
                    }
                }
            }
        });
    };
    return f;
};


var $html = $('html');

//로딩바 시작
function ajaxLoadingBarStart(){
	$html.addClass("is-indicator-short");
}

//로딩바 시작
function ajaxLoadingBarEnd(){
	setTimeout(function(){
		$html.removeClass("is-indicator-short");		
	}, 100);
}

//메뉴 이동
function goUrlMove(url, label, depth){
	if(label != undefined){
		if(url.indexOf("/support/contact-cj-cheiljedang") > -1){
			if (depth == "d1") {
				label = "[SUPPORT] -";
			}else{
				label = "[SUPPORT] - [Contact us]";
			}
		}
		getGaMenuLabel(label);
	}
	
	if(url == '' || url == null){
		window.location.href = $.config.get('rootUrl') + '/kr/index';
	}else{
		window.location.href = url;
	}
}


// GNB GA 공통 적용
function getGaMenuLabel(label){
	var language = "국문";
	var localePath = $.config.get("localePath");
	
	if(localePath == "en"){
		language = "영문";
	}else if(localePath == "cn"){
		language = "중문";
	}else{
		language = "국문";
	}
	
	console.log("gtag[GA] : "+label);
	gtag('event', 'GNB', {'event_category' : language, 'event_label' : label});
      
}

// 약관동의 페이지로 이동 처리부 (login, index 페이지에서 호출함)
function marketingAgree(){
    if (confirm("씨제이제일제당㈜(CJ제일제당 패밀리사이트)의 이용약관에 동의하시면, CJ제일제당 패밀리사이트의 모든 서비스를 이용하실 수 있습니다.\n\n씨제이제일제당㈜의 이용약관에 동의하시겠습니까?")){
    	//location.href = "http://www.cjfamily.com/cnc/panel/familyclub/familyclubInfo.do?sitegubun=CJ_CJ";
    	//location.href = "https://www.cjfamily.com:7001/member/memberNewIMAgreeForm.do";
    	var rootUrl = $.config.get('rootUrl');
    	if(rootUrl.indexOf("stg.re.cj.co.kr") > -1){
    		//location.href = "http://www.cjfamilyim.com:8001/member/memberNewIMAgreeForm.do"
    		location.href = "http://www.cjfamilyim.com:8001/cnc/panel/familyclub/familyclubInfo.do?sitegubun=CJ_CJ"
    	}else{
    		location.href = "http://www.cjfamily.com/cnc/panel/familyclub/familyclubInfo.do?sitegubun=CJ_CJ";
    	}
    	
    } else {
        location.href = $.config.get('rootUrl') + '/kr/logout';
    }
}


/**
 * 현재 일 기준으로  셋팅
 *
 *       dateInput(1,0);        // 1개월 전
 *       dateInput(3,0);        // 3개월 전
 *       dateInput(6,0);        // 6개월 전
 *       dateInput(365,0);      // 1년 전
 *       dateInput(730,0);       // 2년 전
 *       dateInput(1095,0);      // 3년 전
 *
 **/
function dateInput(n,m){

    var date = new Date();
    var start = new Date(Date.parse(date)-n* 1000 * 60 * 60 * 24);
    var today = new Date(Date.parse(date)-m* 1000 * 60 * 60 * 24);

    if(n < 10 && n != 7){
       start.setMonth(start.getMonth()-n);
    }

    var yyyy = start.getFullYear();
    var mm = start.getMonth()+1;
    var dd = start.getDate();

    var t_yyyy = today.getFullYear();
    var t_mm = today.getMonth()+1;
    var t_dd = today.getDate();

    if(mm < 10){
    	mm = "0"+mm;
    }
    if(t_mm < 10){
    	t_mm = "0"+t_mm;
    }
    if(dd < 10){
    	dd = "0"+dd;
    }
    if(t_dd < 10){
    	t_dd = "0"+t_dd;
    }
    $(".datepicker1").val(yyyy+"."+mm+"."+dd);
    $(".datepicker2").val(t_yyyy+"."+t_mm+"."+t_dd);
}

//비밀번호 한글 방지
function chkKorPassWord(password){
	var spe = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
	var passwdLen = $("#passwd").val().length;

	if(spe.test(password)){
		$("#passwd").val($("#passwd").val().substr(0,passwdLen-1));
	}
}

// E-MAIL 한글 방지
function chkKorEmail(email){
	var spe = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
	var emailLen = $("#email").val().length;

	if(spe.test(email)){
		$("#email").val($("#email").val().substr(0,emailLen-1));
	}
}

// 비밀번호 정규식 체크
function chkPassWord(password){
	 var pw = password;
	 var num = pw.search(/[0-9]/g);
	 var eng = pw.search(/[a-z]/ig);
	 var spe = pw.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);

	 if(pw.trim() == ""){
	  	alert("비밀번호를 입력해주세요.");
	  	$("#passwd").focus();
	  	return false;
	 }
	 if(pw.length < 8 || pw.length > 20){
	  	alert("8자리 ~ 20자리 이내로 입력해주세요.");
	  	$("#passwd").focus();
	  	return false;
	 }
	 if(pw.search(/₩s/) != -1){
	  	alert("비밀번호는 공백 없이 입력해주세요.");
	  	$("#passwd").focus();
	  	return false;
	 }
	 if(num < 0 || eng < 0 || spe < 0 ){
	  	alert("영문,숫자, 특수문자를 혼합하여 입력해주세요.");
	  	$("#passwd").focus();
	  	return false;
	 }
	 /*
	 if(/(\w)\1\1\1/.test(password)){
		 alert('동일한 문자를 4번 이상 사용하실 수 없습니다.');
		 return false;
	 }
	 if(password.search(password) > -1){
		 alert("비밀번호에 아이디가 포함되었습니다.");
		 return false;
	 }
	 */

	 return true;
}

function chkEmail(email){
	var emailRule = /^[a-z0-9_+.-]+@([a-z0-9-]+\.)+[a-z0-9]{2,4}$/;
	//console.log("E-MAIL VALUE : ", email);
	if(email.trim() == ""){
	  	alert("email를 입력해주세요.");
	  	$("#email").focus();
	  	return false;
	 }
	if(!emailRule.test(email)){
		alert("E-mail 형식이 맞지 않습니다.");
		$("#email").focus();
	  	return false;
	}
	return true;
}

function doReset(frmNm){
	location.reload();
}

/**
 * 사용법 : pubByteCheckTextarea('#title', ".check_byte");
 * input : 읽을 대상
 * write : 쓰기 대상
 */
 function pubByteCheckTextarea(input, write){
	var maxLength = "30";
	if($(input).val().length>30){
		//alert("20자 이상 입력할수 없습니다.");
		var str = $(input).val();
		//$(input).val(str.substr(0 ,str.length-1));
		$(input).val(str.substr(0 ,Number(maxLength)));
		$(write).html($(input).val().length+"/"+maxLength);
	}else{
		$(write).html($(input).val().length+"/"+maxLength);
	}
};

// 페이스북 공유하기
function facebookShare(){
	var url_conbine_fb = 'https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent(location.href)+'&t='+encodeURIComponent(document.title);
	url_conbine_fb = xssFilter(url_conbine_fb);
	window.open(url_conbine_fb, '', 'scrollbars=no, width=600, height=600');
}

// 트위터 공유하기
function twitterShare(){
	var url_conbine_tw = 'https://twitter.com/intent/tweet?text='+encodeURIComponent(document.title)+'&url='+encodeURIComponent(location.href);
	url_conbine_tw = xssFilter(url_conbine_tw);
	window.open(url_conbine_tw, '', 'scrollbars=no, width=600, height=600');
}

//네이버 공유하기
function naverBlogShare(){
	var url_conbine_nb = 'https://share.naver.com/web/shareView.nhn?url='+encodeURIComponent(location.href)+'&title='+encodeURIComponent(document.title);
	url_conbine_nb = xssFilter(url_conbine_nb);
	window.open(url_conbine_nb, '', 'scrollbars=no, width=600, height=600');
}

//카카오 스토리 공유하기
function kakaostoryShare(){
	var url_conbine_ks = 'https://story.kakao.com/share?url='+encodeURIComponent(location.href)+'&title='+encodeURIComponent(document.title);
	url_conbine_ks = xssFilter(url_conbine_ks);
	window.open(url_conbine_ks, '', 'scrollbars=no, width=600, height=600');	
}

// 현재 URL 복사
function curUrlCopy(){
	copyToClipboard(location.href);
	alert('주소가 복사되었습니다.');
}

//Copies a string to the clipboard. Must be called from within an 
//event handler such as click. May return false if it failed, but
//this is not always possible. Browser support for Chrome 43+, 
//Firefox 42+, Safari 10+, Edge and IE 10+.
//IE: The clipboard feature may be disabled by an administrator. By
//default a prompt is shown the first time the clipboard is 
//used (per session).
function copyToClipboard(text){
	if (window.clipboardData && window.clipboardData.setData) {
        // IE specific code path to prevent textarea being shown while dialog is visible.
        return clipboardData.setData("Text", text); 

    } else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
        var textarea = document.createElement("textarea");
        textarea.textContent = text;
        textarea.style.position = "fixed";  // Prevent scrolling to bottom of page in MS Edge.
        document.body.appendChild(textarea);
        textarea.select();
        try {
            return document.execCommand("copy");  // Security exception may be thrown by some browsers.
        } catch (ex) {
            console.warn("Copy to clipboard failed.", ex);
            return false;
        } finally {
            document.body.removeChild(textarea);
        }
    }
}


/**
 * QQ 웨이보 Share
 * @returns
 */
function qqWeiboShare(){
	
	var url_conbine_fb = 'https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?title='+encodeURIComponent(document.title)+'&url='+encodeURIComponent(location.href);
	url_conbine_fb = xssFilter(url_conbine_fb);
	window.open(url_conbine_fb, '', 'scrollbars=no, width=600, height=600');

}

/**
 * 시나 웨이보 Share
 * @returns
 */
function sinaWeiboShare(){
	var url_conbine_fb = 'https://service.weibo.com/share/share.php?url='+encodeURIComponent(location.href)+'&title='+encodeURIComponent(document.title);
	url_conbine_fb = xssFilter(url_conbine_fb);
	window.open(url_conbine_fb, '', 'scrollbars=no, width=600, height=600');
}



//modal 띄우기(Customize Event)
$document.on('click', '.modalEvent', function(e){
	e.preventDefault();
	var $anchor = $(e.target);
    $anchor = $anchor.is('a') ? $anchor : $anchor.closest('a');
    var _id = $anchor.data('id');
    var _url = $anchor.data('url') + _id;
    console.log(_url);
    	
    $.modal.ajax({
        anchor: $anchor,
        id: _id,
        url: _url
    });
});

// XSS filter
function xssFilter(value){
	var lt = /</g, 
    gt = />/g, 
    ap = /'/g, 
    ic = /"/g;
	return value.toString().replace(lt, "&lt;").replace(gt, "&gt;").replace(ap, "&#39;").replace(ic, "&#34;");
}