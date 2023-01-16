window.setting = (typeof window.setting !== 'undefined') ? window.setting : {};
// window.setting.modalPage = true; // modalPage 사용 유무

window.setting = {
    suit: 'classic', // 기기 모드 classic, mobile
    dev: false, // 개발모드
    lang: 'ko', // 언어 설정 en, cn
    // path: { // ajax path
    //     header: '../html_ajax/_header.html',
    //     allmenu: '../html_ajax/_allmenu.html',
    // }
};

var fonts = {
    notoSansKr: 'Noto Sans KR:100,300,400,500,700,900:korean',
    montserrat: 'Montserrat:400,500,600,700',
    DMSerifDisplay: 'DM Serif Display:400,500,600,700'
};
WebFont.load({
    google: {
        families: [fonts.notoSansKr, fonts.montserrat, fonts.DMSerifDisplay]
    }
});
