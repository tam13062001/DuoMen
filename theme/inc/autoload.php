<?php
function rocket_theme_autoload($class_name) {

    $base_dir = get_template_directory() . '/inc/classes/';
    // Convert class name to file path
    $file = $base_dir . str_replace( '\\', '/', $class_name) . '.php';

    if ( file_exists( $file ) ) {
        require_once $file;
    }
}

// Register the autoload function
spl_autoload_register('rocket_theme_autoload');

include_once __DIR__.'/helpers/components.php';
include_once __DIR__.'/helpers/menu.php';
include_once __DIR__.'/helpers/utils.php';
include_once __DIR__.'/helpers/orbit-db.php';
