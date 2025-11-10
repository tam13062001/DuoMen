<?php

class PortalLoader extends BaseLoader
{
    function enqueue_styles()
    {
        wp_enqueue_style(
            'style.css',
            get_stylesheet_directory_uri() . '/styles/style.css',
            [],
            $this->content_version
        );
    }

    function enqueue_scripts()
    {
        wp_enqueue_script(
            'app',
            get_stylesheet_directory_uri() . '/build/public/index.js',
            ['wp-element'],
            $this->content_version,
            true
        );
    }

    function register_rest_api()
    {

    }
}