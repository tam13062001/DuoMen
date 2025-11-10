<?php

class Portal extends Base {
  function enqueue_styles()
  {
    wp_enqueue_style(
      'style.css',
      get_stylesheet_directory_uri().'/styles/style.css',
      [],
      $this->get_version()
    );
  }

  function enqueue_scripts()
  {
    wp_enqueue_script(
      'app',
      get_stylesheet_directory_uri().'/build/public/index.js',
      ['wp-element'],
      $this->get_version(),
      true
    );
  }
}