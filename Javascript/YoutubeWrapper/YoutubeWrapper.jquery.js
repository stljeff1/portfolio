(function ($, window) {

 
	$.fn.YoutubeWrapper = function () {
		var defaults = {
			videoClass: 'yt-video',
			thumbnailClass: 'yt-thumbnail',
			triggerClass: 'video-trigger',
			yt_id_attr: 'data-youtube',
			playerOpts: {
				wmode: 'transparent',
				playerVars: {'rel': 0, 'wmode':'transparent','showinfo':0, 'autoplay':'1'}
			}
		};


		return this.each(function() {
			var $el = $(this);

     		var $video = $el.find('.' + defaults.videoClass);
     		var $trigger = $el.find('.' + triggerClass);
     		var $thumbnail = $el.find('.'+defaults.thumbnailClass);

     		var videoId = $video.attr(defaults.yt_id_attr);

     		var myPlayerOpts = $.extend({}, defaults.playerOpts, {
     			videoId: videoId,
     			events: {
					onReady: function() {
						$el.trigger('yt:ready');
					},
					onStateChange: function(e) {
						console.log('state change', e.data, YT.PlayerState);
						if(e.data == YT.PlayerState.PLAYING) {
							$el.trigger('yt:playing');
						}
						else if(e.data == YT.PlayerState.ENDED) {
							$el.trigger('yt:pauseVideo');
							// $el.trigger('yt:ended');
						}
						else if(e.data == YT.PlayerState.PAUSED) {
							$el.trigger('yt:pauseVideo');
						}
						else if(e.data == YT.PlayerState.BUFFERING) {
							$el.trigger('yt:buffering');
						}

						else if(e.data == YT.PlayerState.CUED) {
							$el.trigger('yt:cued');
						}
					}
	     		}
	     	});

     		var playerObj = new YT.Player(videoId, playerOpts);

     		$el.on({
     			'yt:pauseVideo': function() {
					console.log('pause');
					
					playerObj.player.pauseVideo();
					if($thumbnail) $thumbnail.show();
					
				},
				'yt:playVideo': function() {
				     console.log('play video')
				     if($thumbnail) $thumbnail.hide();
				     playerObj.player.playVideo();
				},
				'yt:stopVideo': function() {
					playerObj.player.stop();
				     console.log('stop video')
				     if($thumbnail) thumbnail.show();
				          
				}
     		})

		})

	};

})(jQuery, window);
