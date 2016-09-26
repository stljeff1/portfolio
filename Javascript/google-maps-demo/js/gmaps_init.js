
(function($) {
	
	/************ DECLARE GLOBALS ********************/
	var map_to_pdx;
	
	var monthnames=new Array("Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec");
	
	var green_icon = "http://maps.google.com/mapfiles/marker_green.png";
	var red_icon = "http://maps.google.com/mapfiles/marker.png";
	
	
	/***************** CLASS: MyList **********************/
	/* * 
		Stores a list of pbjects, and a a reference pointing to a selected list item
		Functions:
			add - Adds item to the list
			saveAll - Adds an array of items to the list
			count - returns number of items in list
			getAll - returns entire list
			get - gets the item at a specified index
			indexOf - returns index number of specified object, making that object the new selection
			next - returns the next object in the list
			previous - returns the previous object in the list
			triggerMarkerIcon - toggles marker icon of the selected index;
				Parameter toggle - boolean. False for default red flag; true for green flag
		*/
	function MyList() {
		this.list = [];
		this.pointer = -1;	
	}
	
	MyList.prototype.add = function(obj) { return this.list.push(obj); };
	MyList.prototype.saveAll = function(array) { if(array.constructor === Array) this.list = array; };
	MyList.prototype.count = function() { return this.list.length; };
	MyList.prototype.getAll = function() { return this.list; };
	MyList.prototype.get = function(i) {
		if(i > -1 && i < this.list.length) {
			this.triggerMarkerIcon();
			this.pointer = i;
			this.triggerMarkerIcon(true);			
			return this.list[i];
		}
	};
	MyList.prototype.indexOf = function(marker) {
		this.triggerMarkerIcon();
		for(var i = 0; i < this.list.length; i++) {
			if(this.list[i] === marker) {
				this.pointer = i;
				this.triggerMarkerIcon(true);
				return i;
			}
		}
		return -1;
	};
	MyList.prototype.next = function() {
		this.triggerMarkerIcon();
		this.pointer++;
		if(this.pointer == this.list.length) this.pointer = 0;
		this.triggerMarkerIcon(true);
			
		return this.list[this.pointer];
	};
	MyList.prototype.previous = function() {
		this.triggerMarkerIcon();
		this.pointer--;
		if(this.pointer < 0) this.pointer = this.list.length - 1;
		this.triggerMarkerIcon(true);
			
		return this.list[this.pointer];
	};
	MyList.prototype.triggerMarkerIcon = function(toggle) {
		var icon = red_icon;
		if(toggle) icon = green_icon;
		
		if(this.pointer > -1 && this.list[this.pointer]) {
			this.list[this.pointer].setIcon(icon);
		}
	};
	
	
	/***************** CLASS: MyMap **********************/
	/* * 
		Wrapper class for Google Maps Object. 
		customized to show a list of Instagram images, each marked on a map
		Functions:
			changeMarker: activates the marker chosen by the user. Displays infoWindow
			addMarker: creates a custom marker object, including the content for the marker, 
				extrracted from the data object.
				Expands the bounds of the map.
			initControls: Adds the 'Next' and 'Previous' click event handlers allowing the user to go back
				and forth between markers
			initMap: initializes Map, stores the markers in a list
		*/
	function MyMap() {
		this.map = undefined;
		this.el = undefined;
		this.infoWindow = new google.maps.InfoWindow();
		this.bounds = new google.maps.LatLngBounds();
		this.markers = new MyList();
	}
	
	MyMap.prototype.changeMarker = function(marker, origin) {
	
		if(!origin)
			this.markers.indexOf(marker);
			
		console.log(marker);
	
		this.infoWindow.setContent(marker.content);
		this.infoWindow.open(this.map, marker);	
	};
	
	MyMap.prototype.addMarker = function(mark) {
		var self = this, date, date_string, latlng, gMarker;
		if (mark.location.lat != undefined && mark.location.long != undefined) {
			
			date = new Date(mark.created_time * 1000);
			date_string = monthnames[date.getMonth()] + ' ' + date.getDate();
						
			latlng = new google.maps.LatLng(mark.location.lat, mark.location.long);
			
			gMarker = new google.maps.Marker({
				position: latlng,
				map: self.map,
				title: date_string
			});
			
			gMarker.content = "<div class='text-center' style='max-width: 300px;'><strong>"+date_string+"</strong><br/><a href='"+mark.link+"' target='_blank'><img src='"+mark.images.low_resolution.url+"'/></a><br/>"+mark.caption.text + "<br/><strong>Filter:</strong> " + mark.filter + "</div>";
			
			google.maps.event.addListener(gMarker, 'click', function() { 
				self.changeMarker(gMarker);
			});
			
			this.markers.add(gMarker);
			
			this.bounds.extend(latlng);			
		}	
	}
	
	MyMap.prototype.initControls = function() {
		
		var self = this;
		
		$('.next-marker').click(function(e) {
			e.preventDefault();
			self.changeMarker(self.markers.next(), this);	
		});
		$('.previous-marker').click(function(e) {
			e.preventDefault();
			self.changeMarker(self.markers.previous(), this);	
		});
	};
	
	MyMap.prototype.initMap = function(id, data) {
		
		this.el = $(id)[0];
		//, center:new google.maps.LatLng(-176.10, 45.1353)
		this.map = new google.maps.Map(this.el, {zoom: 5});
		
		var self = this;
		
		for(var i = 0; i < data.length; i++) {
			this.addMarker(data[i]);
		}
		
		//this.map.fitBounds(self.bounds);
		
		this.changeMarker(this.markers.next());
		
		this.map.setCenter(new google.maps.LatLng(43.56,-100.13));
		
		google.maps.event.addListener(this.infoWindow, 'domready', function() {
			$('.gm-style-iw').parent().addClass('gm-info-window');
			$('.gm-style-iw').prev().children('div').css('background-color', 'transparent');
		});
		
	};
	
	map_to_pdx = new MyMap();
	
	$(function() {
		
		if(!pdx_trip_data_uri) {
			console.log("ERROR. No input.");
		}
		else {
			if($('#map-container').is(':visible')) {
				//Get Data from JSON Object
				var jqxhr = $.getJSON(pdx_trip_data_uri.path);
				
				jqxhr.done(function(data) {
					if(data.length > 0) {
						map_to_pdx.initMap('#map-canvas', data);
						map_to_pdx.initControls();
					}
				});
			}
		}
		
	});
	
})(jQuery);
