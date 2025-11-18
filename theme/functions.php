<?php
date_default_timezone_set('Asia/Ho_Chi_Minh');
if ( ! defined( 'WP_DEVELOPMENT_MODE' ) ) {
    define( 'WP_DEVELOPMENT_MODE', 'all' );
}
require_once get_template_directory() . '/inc/autoload.php';

load_envfile();

global $rocket;

$wp_theme = wp_get_theme();
$theme_name = $wp_theme->get( 'Name' );

$rocket = new RocketTheme(array(
    'version' => $wp_theme->get('Version'),
    'name' => $theme_name,
    'development_mode' => true
));
$rocket->load();

$rocket->add_admin_menu(array(
    'name' => $theme_name,
    'title' => 'Duomen Admin',
    'slug' => 'duomen',
    'icon_url' => get_assets_from_path('/icons/DuomenFavicon.png'),
));


$rocket->register_rest_api('save-contact', [
    'methods' => 'POST',
    'callback' => 'doumen_save_contact',
    'permission_callback' => '__return_true'
]);

$rocket->register_rest_api('contacts', [
    'methods' => 'GET',
    'callback' => 'doumen_list_contact',
    'permission_callback' => function () {
        return is_user_logged_in();
    }
]);

function doumen_list_contact() {
    $query = new WP_Query(array(
        'post_type' => 'doumen_contact',
        'posts_per_page' => -1,
        'orderby' => 'date',
        'order' => 'DESC'
    ));

    $result = array();

    foreach ($query->posts as $post) {
        $result[] = array(
            'id' => $post->ID,
            'data' => json_decode($post->post_content, true)
        );
    }

    return new WP_REST_Response($result, 200);
}


function doumen_save_contact(WP_REST_Request $request) {
    $data = $request->get_json_params();

    if (empty($data)) {
        return new WP_Error('empty_data', 'No data received', array('status' => 400));
    }

    // Lưu vào custom post type doumen_contact
    $post_id = wp_insert_post([
        'post_type'   => 'doumen_contact',
        'post_title'  => $data['name'] ?? 'New contact',
        'post_status' => 'publish',
        'post_content'=> wp_json_encode($data, JSON_UNESCAPED_UNICODE)
    ]);

    if (is_wp_error($post_id)) {
        return new WP_Error('save_failed', 'Could not save contact', array('status' => 500));
    }

    return new WP_REST_Response([
        'success' => true,
        'message' => 'Saved!',
        'id'      => $post_id
    ], 200);
}
