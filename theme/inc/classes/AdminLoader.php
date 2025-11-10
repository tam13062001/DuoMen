<?php

class AdminLoader extends BaseLoader
{

    function enqueue_scripts()
    {
        wp_enqueue_script(
            'admin-app',
            get_stylesheet_directory_uri().'/build/admin/index.js',
            ['wp-element'],
            $this->content_version,
            true
        );

        wp_enqueue_script('your-script', 'path/to/script.js', array('wp-api'), null, true);
        wp_localize_script('your-script', 'wpApiSettings', array(
            'nonce' => wp_create_nonce('wp_rest')
        ));
    }

    function enqueue_styles()
    {

    }

    function add_theme_support()
    {
        $defaults = array(
            'height'               => 100,
            'width'                => 400,
            'flex-height'          => true,
            'flex-width'           => true,
            'header-text'          => array('site-title', 'site-description'),
            'unlink-homepage-logo' => true,
        );
        add_theme_support('custom-logo', $defaults);
        add_theme_support('title-tag');
        add_theme_support('post-thumbnails');
    }

    function add_block_category($categories) {
        array_unshift($categories, array(
            'slug' => 'rocket',
            'title' => 'Rocket'
        ));
        return $categories;
    }
    function load_blocks()
    {
        $block_dir = get_stylesheet_directory().'/build/blocks/*';
        $dirs = glob($block_dir, GLOB_ONLYDIR);
        foreach ($dirs as $dir_path) {
            // do not load example block
            if (str_ends_with($dir_path, '/example')) {
                continue;
            }
            $result = register_block_type($dir_path);
            if (!$result) {
                echo sprintf("Could not load %s \n", $dir_path);
            }
        }
    }
    function add_menus() {
        register_nav_menus(array(
            'primary-menu' => __('Primary Menu')
        ));
        register_nav_menus(array(
            'footer-menu' => __('Footer Menu')
        ));
        register_nav_menus(array(
            'privacy-menu' => __('Privacy Menu')
        ));
    }
    function add_sidebar() {
        // https://developer.wordpress.org/reference/functions/add_menu_page/
        add_menu_page(
            'Example',
            'Example',
            'manage_options',
            'example',
            function () {
                return get_template_part('templates/admin', 'page');
            },
            'dashicons-admin-generic',
            2
        );
    }

    function save_post_meta()
    {

    }

    function add_page_meta() {

    }
}