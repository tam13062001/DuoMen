<?php
class Helper {
    function get_custom_logo_url($size = 'full') {
        $custom_logo_id = get_theme_mod('custom_logo');
        $image_url = wp_get_attachment_image_url($custom_logo_id, $size);
        return $image_url;
    }
}