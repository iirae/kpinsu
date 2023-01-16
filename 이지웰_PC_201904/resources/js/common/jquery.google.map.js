
(function ($) {

	/**
	 * 구글맵 렌더링 플러그인
	 * $('#map_canvas').googlemap({
	 * 		latitude : 35.1008172,		(required)
	 * 		longitude : 129.0373869,	(required)
	 * 		icon : {
	 * 			url : '/static/images/icon/pin_02.png',
	 * 			width : 36,
	 * 			height : 50,
	 * 			title : '아이콘 이미지 타이틀'
	 * 		},
	 * 		icons : [
	 *			{latitude : 35.1008172, longitude : 129.0373869},
	 *			{latitude : 35.1008172, longitude : 129.0373869},
	 * 		],
	 * 		callback : function() {
	 * 		}
	 * });
	 */
	$.fn.googlemap = function(options) {
		if (options === undefined) {
			return alert('Option is required');
		}

		if(!options['latitude'] || !options['longitude']) {
			return alert('latitude, longitude is required.');
		}

		var target = this[0];

		var geocoder = new google.maps.Geocoder();
		var latlng = new google.maps.LatLng(options.latitude, options.longitude);
		var mapOptions = {
			center : latlng,
			zoom : options['zoom'] || 15,
			mapTypeId : google.maps.MapTypeId.ROADMAP
		};
		var map = new google.maps.Map(target, mapOptions);

		var $this = $(this);
		google.maps.event.addListenerOnce(map, 'tilesloaded', function(){ // 대체텍스트 polyfill
			$.doAlt($this);
		});

		if(options['icon']) {
			var icon = {
				url : options.icon.url
		    };
			if(options.icon['width'] && options.icon['height']) {
				icon['scaledSize'] = new google.maps.Size(options.icon.width, options.icon.height);
			}

			var markerOption = {
				map:map,
				draggable:false,
				animation: google.maps.Animation.DROP,
				position: latlng,
				icon: icon,
				title: options.icon['title'] || 'CJ',
				alt :this['title'] || 'CJ'
			};

			marker = new google.maps.Marker(markerOption);
		}
		if(options['icons']) {
			$.each(options.icons, function() {
				var _this = this;
				var icons_latlng = new google.maps.LatLng(this.latitude, this.longitude);
				icons = {
					url : this['url'] || options.icons.url
				};
				/*if(options.icon['width'] && options.icon['height']) {
					icon['scaledSize'] = new google.maps.Size(options.icon.width, options.icon.height);
				}*/
				var markerOption = {
					map:map,
					draggable:false,
					animation: google.maps.Animation.DROP,
					position: icons_latlng,
					icon: icons,
					title: this['title'] || 'CJ',
					alt :this['title'] || 'CJ'
				};

				marker = new google.maps.Marker(markerOption);
				if(_this['callback']) {
					google.maps.event.addListener(marker, 'click', function() {
						_this.callback();
					});
				}
			});
		}

		//callback
		options['callback'] && options['callback']();

	};
})(jQuery);
