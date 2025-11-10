<?php
function get_assets_from_path($path) {
    return get_stylesheet_directory_uri() . '/assets/' . $path;
}

function load_envfile() {
    $env_file_path = ABSPATH."/.env";
    if (file_exists($env_file_path)) {
        $env = file_get_contents($env_file_path);
        $lines = explode("\n",$env);

        foreach($lines as $line){
            preg_match("/([^#]+)\=(.*)/",$line,$matches);
            if(isset($matches[2])){ putenv(trim($line)); }
        }
    }

}