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


// add_action('rest_api_init', function () {
//     register_rest_route('rocket/v1', '/test-db', array(
//         'methods'  => 'GET',
//         'callback' => 'orbit_test_db',
//     ));
// });

// function orbit_test_db() {
//     global $wpdb;

//     // Kiểm tra kết nối DB mặc định
//     if ( empty( $wpdb->dbh ) || ! $wpdb->check_connection() ) {
//         return new WP_Error(
//             'db_connection_failed',
//             'Không thể kết nối tới cơ sở dữ liệu WordPress.',
//             array( 'status' => 500 )
//         );
//     }

//     // Kết nối DB orbit_db riêng
//     $orbit_db = new wpdb(DB_USER, DB_PASSWORD, 'u623323914_gaSZE', DB_HOST);

//     if ( ! $orbit_db || ! $orbit_db->dbh ) {
//         return new WP_Error(
//             'orbit_db_connection_failed',
//             'Không thể kết nối tới cơ sở dữ liệu orbit_db.',
//             array( 'status' => 500 )
//         );
//     }

//     $personal_table = 'employee_personal';

//     // Lấy thông tin cá nhân
//     $personal = $orbit_db->get_results("SELECT * FROM {$personal_table}", ARRAY_A);

//     // Kiểm tra lỗi query
//     if ( $orbit_db->last_error ) {
//         return new WP_Error(
//             'db_query_failed',
//             'Lỗi khi thực thi query: ' . $orbit_db->last_error,
//             array( 'status' => 500 )
//         );
//     }

//     // Nếu không có dữ liệu
//     if ( empty( $personal ) ) {
//         return rest_ensure_response([
//             'message' => 'Không tìm thấy dữ liệu nhân viên.',
//             'data'    => []
//         ]);
//     }

//     // Trả kết quả
//     return rest_ensure_response($personal);
// }

// ====== Map role_id <-> role_name ======

// Danh sách role
function rocket_roles_map() {
    return [
        1 => "orbit-admin",
        2 => "orbit-core",
        3 => "orbit-me",
    ];
}

// role_id -> role_name
function rocket_get_role_name($role_id) {
    $roles = rocket_roles_map();
    return $roles[$role_id] ?? null;
}

// role_name -> role_id
function rocket_get_role_id($role_name) {
    $roles = array_flip(rocket_roles_map());
    return $roles[$role_name] ?? null;
}

// ====== Redirect logic ======

add_action('template_redirect', function() {
    // Nếu đang ở trang chủ (domain.com)
    if (is_front_page() || is_home()) {
        $role_id = isset($_COOKIE['role_id']) ? intval($_COOKIE['role_id']) : 0;

        if ($role_id) {
            $role_name = rocket_get_role_name($role_id);
            if ($role_name) {
                // Redirect về /role_name
                wp_redirect(home_url("/" . $role_name));
                exit;
            }
        } else {
            // ❌ Không có role_id → giữ nguyên ở trang login (domain.com)
        }
    }
});

function allow_pdf_upload($mimes) {
    $mimes['pdf'] = 'application/pdf';
    return $mimes;
}
add_filter('upload_mimes', 'allow_pdf_upload');
