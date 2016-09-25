/****
  *
  *	Date: May, 2014
  *	URL: rktoyota.com/?gclid=my-test-id
  *  
  *	
  *	Purpose of this file: 
  *	This file appends an Adwords Campaign ID to show a conversion.
  *	If the user comes to the site and fills out a form, the campaign ID is appended to a hidden form field.
  *
  *
  ******/

function setCookie(name, value, days){

    var date = new Date();

    date.setTime(date.getTime() + (days*24*60*60*1000)); 

    var expires = "; expires=" + date.toGMTString();

    document.cookie = name + "=" + value + expires;

}

function readCookie(name) { 

  var n = name + "="; 

  var cookie = document.cookie.split(';'); 

  for(var i=0;i < cookie.length;i++) {      

      var c = cookie[i];      

      while (c.charAt(0)==' '){c = c.substring(1,c.length);}      

      if (c.indexOf(n) == 0){return c.substring(n.length,c.length);} 

  } 

  return null; 

  } 

function getParam(p){

    var match = RegExp('[?&]' + p + '=([^&]*)').exec(window.location.search);

    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));

}

var gclid = getParam('gclid');
if(window.console) console.log(gclid);
if(gclid){

    var gclsrc = getParam('gclsrc');

    if(!gclsrc || gclsrc.indexOf('aw') !== -1){

            setCookie('gclid', gclid, 90);

        }

}

if(!window.CMS) {

	$(function(){
		
		var adwords_var = readCookie('gclid'); 
		var formEl = $("input[name^='DDS_gclid']");
		if(formEl.length != 0) {
			if(adwords_var) {
				if(window.console) console.log(adwords_var);
				$(formEl).val(adwords_var);
			}
			$(formEl).parent().hide();
		}
		
		
				
	});
}
