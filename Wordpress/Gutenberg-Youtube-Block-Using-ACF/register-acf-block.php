<?php

function register_acf_block_types() {

    // register a testimonial block.
    acf_register_block_type(array(
        'name'              => 'video',
        'title'             => __('Custom Video Block'),
        'description'       => __('A custom video block.'),
        'render_template'   => 'views/video-iframe.php',
        'category'          => 'common',
        'icon'              => 'video-alt3',
        'keywords'          => array( 'video' ),
    ));
}

// Check if function exists and hook into setup.
if( function_exists('acf_register_block_type') ) {
    add_action('acf/init', 'register_acf_block_types');
}