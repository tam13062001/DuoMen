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

function enqueue_swiper_assets() {
    wp_enqueue_style('swiper-css', 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css');
    wp_enqueue_script('swiper-js', 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js', array(), null, true);
}
add_action('wp_enqueue_scripts', 'enqueue_swiper_assets');

function theme_enqueue_scripts() {
  wp_enqueue_style('aos-css', 'https://cdn.jsdelivr.net/npm/aos@2.3.4/dist/aos.css');
  wp_enqueue_script('aos-js', 'https://cdn.jsdelivr.net/npm/aos@2.3.4/dist/aos.js', array(), null, true);

  // Khởi tạo AOS sau khi trang load
  wp_add_inline_script('aos-js', 'AOS.init({ once: true, duration: 1000 });');
}

$rocket->add_admin_menu(array(
    'name' => $theme_name,
    'title' => 'Duomen Admin',
    'slug' => 'duomen',
    'icon_url' => get_assets_from_path('/icons/DuomenFavicon1.png'),
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

    date_default_timezone_set('Asia/Ho_Chi_Minh');

    $body = $request->get_json_params();
    if (empty($body)) {
        return new WP_REST_Response([
            'message' => 'No data received'
        ], 400);
    }

    // =========================
    // SANITIZE DATA
    // =========================
    $name    = sanitize_text_field($body['name'] ?? '');
    $email   = sanitize_email($body['email'] ?? '');
    $phone   = sanitize_text_field($body['phone'] ?? '');
    $message = sanitize_textarea_field($body['message'] ?? '');
    $time    = date('H:i d/m/Y');

    // =========================
    // SAVE TO CPT
    // =========================
    wp_insert_post([
        'post_type'   => 'duoMen_contact',
        'post_status' => 'publish',
        'post_content'=> wp_json_encode([
            'name'    => $name,
            'email'   => $email,
            'phone'   => $phone,
            'message' => $message,
            'time'    => $time,
        ], JSON_UNESCAPED_UNICODE),
    ]);

    // =========================
    // RETURN RESPONSE EARLY
    // =========================
    $response = new WP_REST_Response([
        'message' => 'Contact saved. Email is being sent.'
    ]);

    ignore_user_abort(true);
    header("Connection: close");
    header("Content-Encoding: none");

    $output = wp_json_encode($response->get_data());
    echo $output;

    header("Content-Type: application/json; charset=UTF-8");
    header("Content-Length: " . strlen($output));

    if (function_exists('fastcgi_finish_request')) {
        fastcgi_finish_request();
    } else {
        ob_end_flush();
        flush();
    }

    // =========================
    // SMTP CONFIG (GMAIL)
    // =========================
    $host     = 'smtp.gmail.com';
    $port     = 587;
    $username = 'dtam768@gmail.com';
    $password = 'ektc qfug ifng asho'; 
    $secure   = 'tls';
    $receiver = 'cx@mhdpharma.com';

    // =========================
    // EMAIL TEMPLATE
    // =========================
    $subject = 'Thông báo yêu cầu tư vấn mới từ website duomen.vn';

    $template = "
    Chào MHD Pharma,

    Bạn vừa nhận được một yêu cầu tư vấn mới từ website duomen.vn.

    Thông tin chi tiết của khách hàng như sau:
    Họ và tên: {{name}}
    Số điện thoại: {{phone}}
    Email: {{email}}
    Nội dung quan tâm: {{message}}
    Thời gian gửi: {{time}}

    Vui lòng liên hệ với khách hàng trong thời gian sớm nhất để đảm bảo trải nghiệm tốt nhất.

    Trân trọng,
    Hệ thống website duomen.vn
    ";

    // =========================
    // SEND EMAIL
    // =========================
    try {
        $mailer = new SMTP_Mailer();
        $mailer->load([
            'host'     => $host,
            'port'     => $port,
            'username' => $username,
            'password' => $password,
            'secure'   => $secure,
        ]);

        $content = strtr($template, [
            '{{name}}'    => $name,
            '{{phone}}'   => $phone,
            '{{email}}'   => $email,
            '{{message}}' => $message,
            '{{time}}'    => $time,
        ]);

        $mailer->send([
            'subject'  => $subject,
            'body'     => $content,
            'receiver' => $receiver,
        ]);

    } catch (\Exception $e) {
        error_log('[DUOMEN CONTACT MAIL ERROR] ' . $e->getMessage());
    }

    return null; // ⚠️ response đã trả trước đó
}