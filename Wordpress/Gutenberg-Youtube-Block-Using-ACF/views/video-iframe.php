<?php



$container_id = $block['id'];

if(isset($block['className']))
    $className = $block['className'];
else
    $className = '';

$url = get_field('video_url');
$is_valid = preg_match('/(^|\/|v=)([a-z0-9_-]{8,11})(\?|$)/i', $url, $match);

if($is_valid) {

    $video_id = $match[2];
    $yt_base = 'https://www.youtube.com/embed/';
    $yt_suffix = '?rel=0&modestbranding=1&showinfo=0&feature=oembed';

    $video_url = $yt_base . $video_id . $yt_suffix;

    ?>
    <figure id="<?php echo $block['id']; ?>" class="wp-block-embed-youtube wp-block-embed is-type-video is-provider-youtube wp-embed-aspect-16-9 wp-has-aspect-ratio <?php echo $className; ?>">
        <div class="wp-block-embed__wrapper">
            <div class="responsive-embed widescreen">
                <iframe src="<?php echo $video_url; ?>" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""></iframe>
                
            </div>
        </div>
    </figure>
    <?php

}

else {
    ?>
        <div class="invalid-media-type"><p>Video not found.</p></div>
    <?php
}
