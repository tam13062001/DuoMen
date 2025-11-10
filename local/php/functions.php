<?php

require_once __DIR__.'/core/theme.php';

define('WP_ENVIRONMENT_TYPE', 'development');

$theme = new Theme();
$theme->load();
