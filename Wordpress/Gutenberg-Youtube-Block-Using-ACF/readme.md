# Custom Youtube Video Block for Wordpress Gutenberg
## Leverages [Advanced Custom Fields Pro](https://www.advancedcustomfields.com/pro/)
***

This snippet allows a Wordpress user to place a video using the [Gutenber Editor](https://wordpress.org/gutenberg/).

**RE: [Enhance YouTube embed block with player parameters](https://github.com/WordPress/gutenberg/issues/9678)**

The default video element does not allow URL parameters. In my specific case, I needed to [not show related videos](https://developers.google.com/youtube/player_parameters#rel) after my video had ended (IE, I needed this to be my embed URL `https://www.youtube.com/embed/UnTQVlqmDQ0?rel=0`). Currently, this is not possible in Wordpress.

Therefore, I came up with my own solution using ACF Pro. In this folder you will find the code I used to register my ACF block, the template used to render the block, and the json useds to create the custom field.

###Reference: 

- [https://www.advancedcustomfields.com/resources/blocks/](https://www.advancedcustomfields.com/resources/blocks/)
- [Dash Icons](http://calebserna.com/dashicons-cheatsheet/)
- [Default block categories](https://developer.wordpress.org/block-editor/developers/block-api/block-registration/)


###TODO
 - Disable default video element [https://developer.wordpress.org/reference/hooks/allowed_block_types/](https://developer.wordpress.org/reference/hooks/allowed_block_types/)