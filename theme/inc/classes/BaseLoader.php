<?php

class BaseLoader
{
    protected $name;
    protected $version;
    protected $content_version;
    public function __construct()
    {
        global $rocket;
        $this->name = $rocket->name;
        $this->version = $rocket->version;
        $this->content_version = $rocket->version;
        if ($rocket->development_mode) {
            $this->content_version = time();
        }
    }
    function enqueue_styles()
    {
        wp_enqueue_style($this->name, plugin_dir_url( __FILE__ ) . 'css/plugin-name-admin.css', array(), $this->content_version, 'all' );
    }

    function enqueue_scripts()
    {
        wp_enqueue_script($this->name, plugin_dir_url( __FILE__ ) . 'js/plugin-name-admin.js', array( 'jquery' ), $this->content_version, false );
    }
}