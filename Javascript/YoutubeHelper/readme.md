## Youtube Helper
***

### Date: September, 2017

### Purpose

This module encapulates the functionality needed to load the [Youtubed API](https://developers.google.com/youtube/iframe_api_reference). 

The module also defines the required `` function that is called once the API is loaded and ready. The function fires an event from the body to notify other modules that the API is ready. Once the API is ready, modules can initialize players.

**Default Usage**
` 
	
     var ytHelper = new YoutubeHelper();
     ytHelper.init(function() {
     	

     	// DO SOMETHING ONCE API IS READY

     });

`
