$(function() {

    var $window = $window || $(window),
        $document = $document || $(document),
        $html = $html || $('html');

    // 맵 트리거
    $document.on('click', '.section-map .js-map', function(e){
        e.preventDefault();
        var $this = $(e.target);
        $this = ($this.is('a')) ? $this : $this.closest('a');
        var _title = '미국';
        var option = {
            latitude: ($this.data('latitude') || '36.3541125'),
            longitude: ($this.data('longitude') || '127.1224608'),
            icon: {
                url: '../resources/img/common/map_pin_01.png',
                width: 97,
                height: 58,
                title: _title
            }
        };
        $('#map_canvas').googlemap(option);
    });

    var informations = {
        "all": {
            "latitude": "36.3541125",
            "zoom": 7,
            "title": "전체",
            "longitude": "127.43909029999997"
        },
        "gyeongwon": {
            "latitude": "37.3873091",
            "description": "경기도 성남시 분당구 서현로180번길 19 비젼월드 2층 (서현동)",
            "tel": "031-784-0501",
            "tabIndex": 2201,
            "title": "경원 지사",
            "longitude": "127.1224608"
        },
        "busan": {
            "latitude": "35.1008172",
            "description": "부산광역시 중구 대교로 119 CJ대한통운빌딩 5층 (중앙동6가)",
            "tel": "051-860-4106",
            "tabIndex": 2101,
            "title": "부산 지사",
            "longitude": "129.0373869"
        },
        "gyeongbuk": {
            "latitude": "35.858598106697315",
            "description": "대구광역시 달서구 달구벌대로 1790 현대해상빌딩 11,12층 (두류동)",
            "tel": "053-605-4200",
            "tabIndex": 2401,
            "title": "경북 지사",
            "longitude": "128.56081143021583"
        },
        "chungcheong": {
            "latitude": "36.3541125",
            "description": "대전광역시 동구 한밭대로 1285 (용전동)",
            "tel": "042-630-6203",
            "tabIndex": 2301,
            "title": "충청 지사",
            "longitude": "127.43909029999997"
        },
        "honam": {
            "latitude": "35.2138519",
            "description": "광주광역시 광산구 임방울대로 826번길 30 애플타워2층 CJ제일제당 호남지사",
            "tel": "062-570-5000",
            "tabIndex": 2501,
            "title": "호남 지사",
            "longitude": "126.87845879999997"
        }
    };

/*
<ul class="sorting-list" id="naviMenu">
    <li class="on"><button type="button" name="directions" data-id="all" class="text-style"><span>전체</span></button></li>
    <li><button type="button" name="directions" data-id="busan" class="text-style"><span>부산지사</span></button></li>
    <li><button type="button" name="directions" data-id="gyeongwon" class="text-style"><span>경원지사</span></button></li>
    <li><button type="button" name="directions" data-id="chungcheong" class="text-style"><span>충청지사</span></button></li>
    <li><button type="button" name="directions" data-id="gyeongbuk" class="text-style"><span>경북지사</span></button></li>
    <li><button type="button" name="directions" data-id="honam" class="text-style"><span>호남지사</span></button></li>
</ul>
*/


    $('button[name=directions]').on('click', function() {

        var _this = $(this);
        var data = informations[_this.data('id')];

        var option = {
            latitude: data.latitude,
            longitude: data.longitude,
            icon: {
                url: '../resources/img/common/map_pin_01.png',
                width: 97,
                height: 58,
                title: data.title
            }
        };
        if (data['zoom']) {
            option['zoom'] = data.zoom;
        }
        if (_this.data('id') == 'all') {
            var icons = [];
            $('button[name=directions]').each(function(i) {
                if (i < 1) return;

                var b = this;
                var branch = informations[$(this).data('id')];
                icons.push({
                    latitude: branch.latitude,
                    longitude: branch.longitude,
                    title: branch.title,
                    callback: function() {
                        b.click();
                    }
                });
                option['icons'] = icons;
            });


        } else {
            option['callback'] = function() {
                guide(data);
            };

        }
        $('#map_canvas').googlemap(option);

        //활성화표시
        $("#naviMenu li").removeClass("on");
        _this.closest('li').addClass('on');
    });


    $('button[name=directions]:eq(0)').trigger('click');





});
