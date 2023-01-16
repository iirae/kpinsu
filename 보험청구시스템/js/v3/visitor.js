
//	접속유저 브라이저 확인
function user_browser()
{
	var agt = navigator.userAgent.toLowerCase();

	if (agt.indexOf("chrome") != -1) return 'Chrome';
	if (agt.indexOf("opera") != -1) return 'Opera';
	if (agt.indexOf("staroffice") != -1) return 'Star Office';
	if (agt.indexOf("webtv") != -1) return 'WebTV';
	if (agt.indexOf("beonex") != -1) return 'Beonex';
	if (agt.indexOf("chimera") != -1) return 'Chimera';
	if (agt.indexOf("netpositive") != -1) return 'NetPositive';
	if (agt.indexOf("phoenix") != -1) return 'Phoenix';
	if (agt.indexOf("firefox") != -1) return 'Firefox';
	if (agt.indexOf("safari") != -1) return 'Safari';
	if (agt.indexOf("skipstone") != -1) return 'SkipStone';
	if (agt.indexOf("netscape") != -1) return 'Netscape';
//	if (agt.indexOf("mozilla/5.0") != -1) return 'Mozilla';


	if (agt.indexOf("msie") != -1) { // 익스플로러 일 경우

		var rv = -1;
		if (navigator.appName == 'Microsoft Internet Explorer') {

			var ua = navigator.userAgent;
			var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");

			if (re.exec(ua) != null) rv = parseFloat(RegExp.$1);
		}

		return 'Internet Explorer '+rv;
	}
	else {

		return 'Internet Explorer 11';
	}
}

// 접속유저 OS 체크
function user_os()
{
	var os, ua = navigator.userAgent;

	if (ua.match(/Win(dows )?NT 6\.0/)) {

		os = "Windows Vista";
	}
	else if (ua.match(/Win(dows )?(NT 5\.1|XP)/)) {

		os = "Windows XP";
	}
	else {

		if ((ua.indexOf("Windows NT 5.1") != -1) || (ua.indexOf("Windows XP") != -1)) {

			os = "Windows XP";
		}
		else if((ua.indexOf("Windows NT 7.0") != -1) || (ua.indexOf("Windows NT 6.1") != -1)) {

			os = "Windows 7";
		}
		else if((ua.indexOf("Windows NT 8.0") != -1) || (ua.indexOf("Windows NT 6.2") != -1)) {

			os = "Windows 8";
		}
		else if((ua.indexOf("Windows NT 8.1") != -1) || (ua.indexOf("Windows NT 6.3") != -1)) {

			os = "Windows 8.1";
		}
		else if((ua.indexOf("Windows NT 10.0") != -1) || (ua.indexOf("Windows NT 6.4") != -1)) {

			os = "Windows 10";
		}
		else if((ua.indexOf("iPad") != -1) || (ua.indexOf("iPhone") != -1) || (ua.indexOf("iPod") != -1)) {

			os = "Apple iOS";
		}
		else if(ua.indexOf("Android") != -1) {

			os = "Android Phone";
		}
		else if(ua.match(/Win(dows )?NT( 4\.0)?/)) {

			os = "Windows NT";
		}
		else if(ua.match(/Mac|PPC/)) {

			os = "Mac OS";
		}
		else if(ua.match(/Linux/)) {

			os = "Linux";
		}
		else if(ua.match(/(Free|Net|Open)BSD/)) {

			os = RegExp.$1 + "BSD";
		}
		else if(ua.match(/SunOS/)) {

			os = "Solaris";
		}
	}

	if (os.indexOf("Windows") != -1) {

		if (navigator.userAgent.indexOf('WOW64') > -1 || navigator.userAgent.indexOf('Win64') > -1) {

			os += ' 64bit';
		}
		else {

			os += ' 32bit';
		}
	}

	return os ;
}

//
function index_of(ua, word){

	if(null_chk(ua) == 1) return false;
	if(ua.indexOf(word) >-1)
		return true;
	else
		return false;
}

function null_chk(ua){

	if(!ua || ua == "" || ua == "undefined" || ua =="unknown") return 1;
	else return 0;
}

function log_insert()
{
	var log = new Image();
	var referer = document.referrer;

	var browser = user_browser();
	var os = user_os();

	log.src='/visit.htm?mode=visit_log&referer=' + encodeURIComponent(referer) + '&browser=' + browser + '&os=' + os;
}