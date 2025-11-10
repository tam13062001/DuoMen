<?php

class Theme {
  protected $name;
  protected $version;
  protected $loader;

  public function __construct () {
    $wp_theme = wp_get_theme();
    $this->version = $wp_theme->get('Version');
    $this->name = $wp_theme->get('Theme Name');;
    $this->load_dependencies();
    $this->load_admin_hooks();
    $this->load_public_hooks();
  }
  private function load_dependencies() {
    require_once __DIR__ .'/loader.php';
    require_once __DIR__ .'/helpers/base.php';
    require_once __DIR__ .'/helpers/admin.php';
    require_once __DIR__.'/helpers/portal.php';

    $this->loader = new Loader();
  }
  private function load_admin_hooks() {
    $admin = new Admin($this->name, $this->version);
    $this->loader->add_action('admin_enqueue_scripts', $admin, 'enqueue_styles');
    $this->loader->add_action('admin_enqueue_scripts', $admin, 'enqueue_scripts');
    $this->loader->add_action('after_setup_theme', $admin, 'add_theme_support');

    $this->loader->add_filter('block_categories_all', $admin, 'add_block_category');
    $this->loader->add_action('init', $admin, 'load_blocks');

    $this->loader->add_action('init', $admin, 'add_menus');

    $this->loader->add_action('admin_menu', $admin, 'add_sidebar');
  }
  private function load_public_hooks()
  {
    $portal = new Portal($this->name, $this->version);
    $this->loader->add_action('wp_enqueue_scripts', $portal, 'enqueue_styles');
    $this->loader->add_action('wp_enqueue_scripts', $portal, 'enqueue_scripts');
  }

  public function load()
  {
    $this->loader->run();
  }
}