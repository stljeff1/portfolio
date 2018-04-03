
function YoutubeHelper(onReady) {

	var self = this;

	self.isReady = false;

	self.readyEventHandler = false;

	self.init = function(onReady) {
 		var tag = document.createElement('script');
		var firstScriptTag = document.getElementsByTagName('script')[0];
 		
 		$(window).on('youtubeReady', function() {
 			self.isReady = true;
 			onReady(self);
 		});

 		tag.src = "https://www.youtube.com/iframe_api";
		firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
	}

	self.onYoutubeReady = function() {

	}

	return self;
}; 

function onYouTubeIframeAPIReady() {
	var body = document.body;
     var event = new CustomEvent('youtubeReady');

     body.clasList += 'youtube-ready';
     body.dispatchEvent(event);
}
