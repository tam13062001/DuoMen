<?php
class Base
{
  protected $name;
  protected $version;
  protected $is_dev;
  public function __construct($name, $version)
  {
    $this->name = $name;
    $this->version = $version;
    $this->is_dev = wp_get_environment_type() === 'development';
  }
  function enqueue_styles()
  {
    wp_enqueue_style($this->name, plugin_dir_url( __FILE__ ) . 'css/plugin-name-admin.css', array(), $this->version, 'all' );
  }

  function enqueue_scripts()
  {
    wp_enqueue_script($this->name, plugin_dir_url( __FILE__ ) . 'js/plugin-name-admin.js', array( 'jquery' ), $this->version, false );
  }

  protected function get_version() {
    $version = $this->version;
    if ($this->is_dev) {
      return (string)time();
    }
  }
}