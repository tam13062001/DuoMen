<?php

class RocketTheme
{
    public string $name;
    public string $version;
    public Registry $loader;
    public Helper $helper;
    public bool $development_mode;

    public function __construct(array $options)
    {
        $this->version = $options['version'];
        $this->name = $options['name'];;
        $this->development_mode = $options['development_mode'];
        $this->loader = new Registry();
        $this->helper = new Helper();
    }

    private function load_dependencies(): void
    {
        $this->load_admin();
        $this->load_public();
        $this->load_parent_theme();
    }

 function add_admin_menu(array $options): void {
    add_action('admin_menu', function () use ($options) {
        $lang = isset($_GET['lang']) ? $_GET['lang'] : 'vi'; // Ưu tiên theo query `?lang=en`
        $title = is_array($options['title']) ? ($options['title'][$lang] ?? $options['title']['vi']) : $options['title'];

        add_menu_page(
            $options['name'],
            $title,
            'manage_options',
            $options['slug'],
            function () {
                echo '<div id="rocket-root"></div>';
            },
            $options['icon_url'],
            2
        );
    });
}


    private function load_admin()
    {
        $admin = new AdminLoader();

        $this->loader->add_action('admin_enqueue_scripts', $admin, 'enqueue_styles');
        $this->loader->add_action('admin_enqueue_scripts', $admin, 'enqueue_scripts');
        $this->loader->add_action('after_setup_theme', $admin, 'add_theme_support');
// $theme->loader->add_action('widgets_init', $admin, 'register_widget_areas');

        $this->loader->add_filter('block_categories_all', $admin, 'add_block_category');
        $this->loader->add_action('init', $admin, 'load_blocks');

        $this->loader->add_action('init', $admin, 'add_menus');

        $this->loader->add_action('add_meta_boxes', $admin, 'add_page_meta');
        $this->loader->add_action('save_post', $admin, 'save_post_meta', 1, 2);


    }

    private function load_public()
    {
        $public = new PortalLoader();

        $this->loader->add_action('wp_enqueue_scripts', $public, 'enqueue_styles');
        $this->loader->add_action('wp_enqueue_scripts', $public, 'enqueue_scripts');

        $this->loader->add_action('rest_api_init', $public, 'register_rest_api');
    }

    private function load_parent_theme()
    {
        if (is_child_theme()) {
            function enqueue_parent_styles()
            {
//      wp_enqueue_style( 'parent-type', get_template_directory_uri() . '/style.css' );
            }

            add_action('wp_enqueue_scripts', 'enqueue_parent_styles');
        }
    }

    public function load()
    {
        $this->load_dependencies();
        $this->loader->run();
    }

    public function register_rest_api(string $path, array $options = []): void {
        add_action('rest_api_init', function () use ($path, $options) {
            register_rest_route('rocket/v1', $path, $options);
        });
    }
}