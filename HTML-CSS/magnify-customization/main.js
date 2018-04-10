//=require magnific-popup/dist/jquery.magnific-popup.min.js

(function($, window) {


	$(function() {
		console.log('go to bed');
		$('.project-thumbnail').magnificPopup({
			type: 'image',
			mainClass: 'scrolling-image',
			image: {
				markup: '<div class="mfp-figure">'+
						'<div class="mfp-close-container"><div class="mfp-close"></div></div>'+
						'<div class="scrolling-image-container">' +
							'<div class="scrolling-viewport"><div class="mfp-img"></div></div>'+
						'</div>' +
						'<div class="mfp-bottom-bar">'+
						'<div class="mfp-title"></div>'+
						'<div class="mfp-counter"></div>'+
					'</div>'+
				'</div>', // Popup HTML markup. `.mfp-img` div will be replaced with img tag, `.mfp-close` by close button

				verticalFit: false,
				titleSrc: function(item) {
					return item.el.attr('data-caption');
				}
			},
			gallery: {
				enabled: true
			}
			
		});

	});

})(jQuery, window);