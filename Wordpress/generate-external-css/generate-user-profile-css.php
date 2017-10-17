<?php 

function generate_all_css_headshots() {

	$themeDir = get_stylesheet_directory();
	$q = new WP_User_Query(array('meta_key'=>'active', 'meta_value'=>1, 'meta_compare' => '='));

	$all_css = '';
	foreach($q->results as $u) {
		$id = $u->ID;

		$user = get_userdata($id);
		$cssId = $user->data->user_nicename;
		$regex_find_rule = "/\.head-shot\#" . $cssId . " .team-overlay-content\s{[^}]+}[\r\n\s]{2,}/";

		$rules = array(
			"url('%s')",
			"url('%s' 1x), url('%s') 2x"
		);

		$userImage = get_field("human_picture", 'user_'.$id);

		$hoverImage = convertToHover($userImage);

		$css = ".head-shot#%s .team-overlay-content {" .
				"background-image: " . sprintf($rules[0], $hoverImage) . ";" .
				"background-image: -webkit-image-set( " . sprintf($rules[1], $hoverImage, convertTo2x($hoverImage)) . " );" .
				"background-image: image-set( " . sprintf($rules[1], $hoverImage, convertTo2x($hoverImage)) . " );" .
			"}\r\r";

		$cssCompiled = sprintf($css, $cssId);

		$all_css .= $cssCompiled;
		
		
	}
	    file_put_contents($themeDir . '/css/head-shot-images.css', $all_css, LOCK_EX); 

}

function generate_css_headshot($userID) 
{
	$themeDir = get_stylesheet_directory();
	$cssFileContents = file_get_contents($themeDir . '/css/head-shot-images.css'); 

	$user = get_userdata($userID);
	$cssId = $user->data->user_nicename;
	$regex_find_rule = "/\.head-shot\#" . $cssId . " .team-overlay-content\s{[^}]+}[\r\n\s]{2,}/";

	if(get_field('active', 'user_'.$userID)) {
		$rules = array(
			"url('%s')",
			"url('%s' 1x), url('%s') 2x"
		);

		$userImage = get_field("human_picture", 'user_'.$userID);

		$hoverImage = convertToHover($userImage);


		$css = ".head-shot#%s .team-overlay-content {" .
				"background-image: " . sprintf($rules[0], $hoverImage) . ";" .
				"background-image: -webkit-image-set( " . sprintf($rules[1], $hoverImage, convertTo2x($hoverImage)) . " );" .
				"background-image: image-set( " . sprintf($rules[1], $hoverImage, convertTo2x($hoverImage)) . " );" .
			"}\r\r";

		$cssCompiled = sprintf($css, $cssId);

		if(preg_match($regex_find_rule, $cssFileContents)) {
			$cssCompiled = preg_replace($regex_find_rule, $cssCompiled, $cssFileContents);
		}
		else {
			$cssCompiled = $cssFileContents . $cssCompiled;
		}

	    file_put_contents($themeDir . '/css/head-shot-images.css', $cssCompiled, LOCK_EX); 
	}

	else {
		//USER IS NOT ACTIVE, REMOVE THE CSS
		if(preg_match($regex_find_rule, $cssFileContents)) {
		//PhpConsole::debug('Match Foudn!');
			$cssCompiled = preg_replace($regex_find_rule, '', $cssFileContents);
	    		file_put_contents($themeDir . '/css/head-shot-images.css', $cssCompiled, LOCK_EX); 	
		}
		
	}



}


?>