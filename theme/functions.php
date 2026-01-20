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
        'post_type' => 'douMen_contact',
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
    if (empty($body)) return new WP_REST_Response(['message' => 'No data'], 400);

    // 1. Lấy dữ liệu
    $name    = sanitize_text_field($body['name'] ?? '');
    $email   = sanitize_email($body['email'] ?? '');
    $phone   = sanitize_text_field($body['phone'] ?? '');
    $message = sanitize_textarea_field($body['message'] ?? '');
    $time    = date('H:i d/m/Y');

    // 2. Lưu vào Admin WordPress (như cũ)
    wp_insert_post([
        'post_type'    => 'douMen_contact',
        'post_status'  => 'publish',
        'post_content' => wp_json_encode([
            'name' => $name, 'email' => $email, 'phone' => $phone, 'message' => $message, 'time' => $time
        ], JSON_UNESCAPED_UNICODE),
    ]);

    // 3. Phản hồi ngay cho khách hàng (để web chạy nhanh)
    $response = ['message' => 'Contact saved.'];
    if (ob_get_length()) ob_clean();
    header('Content-Type: application/json');
    echo wp_json_encode($response);
    
    if (function_exists('fastcgi_finish_request')) {
        fastcgi_finish_request();
    } else {
        ob_end_flush(); flush();
    }

    // --- PHẦN BACKUP CHẠY NGẦM ---

    // 4. Gửi sang Google Sheets
    // [!!!] Dán cái link Apps Script bạn vừa tạo vào dòng dưới đây:
    $google_script_url = 'https://script.google.com/macros/s/AKfycbzd_u7Oczcx2aow70KlA54WvWlky27tod9b1026PE6SOoeaITJjE4kJZ8RrOiagfPl47A/exec'; 

    wp_remote_post($google_script_url, [
        'body'    => wp_json_encode([
            'time' => $time, 'name' => $name, 'email' => $email, 'phone' => $phone, 'message' => $message
        ]),
        'headers' => ['Content-Type' => 'application/json'],
        'blocking' => false, // false để không cần chờ Google phản hồi, giúp code chạy nhanh hơn
        'sslverify' => false // Bỏ qua check SSL nếu server hosting cũ
    ]);

    // 5. Gửi Email (Code cũ của bạn) tamdoan13062001@gmail.com, cx@mhdpharma.com
    $receiver = 'cx@mhdpharma.com'; 

    $subject = 'Thông báo yêu cầu tư vấn mới từ website duomen.vn';

    // Nội dung Email
    $email_body = "Chào MHD Pharma,\n\n";
    $email_body .= "Bạn vừa nhận được một yêu cầu tư vấn mới từ website duomen.vn.\n\n";
    $email_body .= "Thông tin chi tiết:\n";
    $email_body .= "- Họ và tên: $name\n";
    $email_body .= "- Số điện thoại: $phone\n";
    $email_body .= "- Email: $email\n";
    $email_body .= "- Thời gian gửi: $time\n\n";
    $email_body .= "Nội dung quan tâm:\n$message\n\n";
    $email_body .= "Trân trọng,\nHệ thống website duomen.vn";
    $headers = [];
    if( !empty($email) && is_email($email) ) $headers[] = "Reply-To: $name <$email>";
    
    wp_mail( $receiver, $subject, $email_body, $headers );

    return null;
}

$rocket->register_rest_api('send-voucher', [
    'methods' => 'POST',
    'callback' => 'handle_send_esms_voucher',
    'permission_callback' => '__return_true',
]);

function handle_send_esms_voucher($request) {
    global $wpdb; // Gọi đối tượng database của WP

    // 1. Lấy số điện thoại từ Frontend
    $params = $request->get_json_params();
    $phone = isset($params['phone']) ? sanitize_text_field($params['phone']) : '';

    if (empty($phone)) {
        return new WP_Error('missing_phone', 'Vui lòng nhập số điện thoại', array('status' => 400));
    }

    // =================================================================
    // BƯỚC A: LOGIC LOCK VÀ LẤY MÃ VOUCHER TỪ DATABASE
    // =================================================================
    
     $table_name = 'duomen_db.vouchers'; // Tên bảng (ví dụ: wp_vouchers)
    $lock_session_id = uniqid('sms_req_', true); // Tạo ID phiên duy nhất cho request này

    // 1. Thực hiện LOCK mã cũ nhất (FIFO) chưa dùng
    // Logic: Tìm mã used=0, chưa bị lock (hoặc lock quá 5 phút), gán session_id vào
    $wpdb->query($wpdb->prepare(
        "UPDATE $table_name 
         SET locked_at = NOW(), lock_session_id = %s 
         WHERE used = 0 
         AND (locked_at IS NULL OR locked_at < DATE_SUB(NOW(), INTERVAL 5 MINUTE)) 
         ORDER BY id ASC 
         LIMIT 1",
        $lock_session_id
    ));

    // 2. Lấy mã vừa khóa được ra
    $voucher = $wpdb->get_row($wpdb->prepare(
        "SELECT * FROM $table_name WHERE lock_session_id = %s",
        $lock_session_id
    ));

    // Nếu không lấy được mã nào -> Kho hết hoặc đang bận
    if (!$voucher) {
        return new WP_Error('out_of_stock', 'Hiện tại đã hết mã ưu đãi, vui lòng quay lại sau.', array('status' => 400));
    }

    $voucher_code = $voucher->code; // Mã sẽ gửi đi (Thay cho $otp cũ)

    // =================================================================
    // BƯỚC B: GỬI SMS (ESMS)
    // =================================================================

    $apiKey = '0A48D5AFF2519A81397059AC88029A'; 
    $secretKey = '6669C22354B63C1CEE4203127F77C7';

    $payload = array(
        "ApiKey"    => $apiKey,
        "SecretKey" => $secretKey,
        "Phone"     => $phone,
        
        // Thay $otp bằng $voucher_code
        "Content"   => "$voucher_code la ma xac minh dang ky Baotrixemay cua ban", 
        
        "Brandname" => "Baotrixemay", 
        "SmsType"   => "2", 
        "IsUnicode" => "0", 
        "RequestId" => wp_generate_uuid4(),
        "campaignid" => "Voucher Send", // Đổi tên chiến dịch cho dễ quản lý
        "CallbackUrl" => ""
    );

    $url = 'https://rest.esms.vn/MainService.svc/json/SendMultipleMessage_V4_post_json/';
    $response = wp_remote_post($url, array(
        'headers'     => array('Content-Type' => 'application/json; charset=utf-8'),
        'body'        => json_encode($payload),
        'method'      => 'POST',
        'data_format' => 'body',
        'timeout'     => 45
    ));

    // =================================================================
    // BƯỚC C: XỬ LÝ KẾT QUẢ VÀ CẬP NHẬT DATABASE
    // =================================================================

    if (is_wp_error($response)) {
        // Lỗi kết nối -> Phải NHẢ LOCK để người khác dùng mã này
        release_voucher_lock($table_name, $lock_session_id);
        return new WP_Error('api_error', 'Lỗi kết nối Server SMS', array('status' => 500));
    }

    $body = wp_remote_retrieve_body($response);
    $result = json_decode($body, true);

    // Kiểm tra thành công (CodeResult 100)
    if (isset($result['CodeResult']) && $result['CodeResult'] == "100") {
        
        // THÀNH CÔNG: Chốt đơn (Lock vĩnh viễn)
        // Update used = 1, cập nhật ngày dùng, xóa session tạm
        $wpdb->query($wpdb->prepare(
            "UPDATE $table_name 
             SET used = 1, used_at = NOW(), locked_at = NULL, lock_session_id = NULL 
             WHERE lock_session_id = %s",
            $lock_session_id
        ));

        return new WP_REST_Response(array(
            'status' => 'success',
            'message' => 'Đã gửi mã ưu đãi thành công',
        ), 200);

    } else {
        // THẤT BẠI: Lỗi từ phía eSMS (ví dụ sai số, hết tiền...)
        // Phải NHẢ LOCK để mã này quay về kho (used=0) cho người khác
        release_voucher_lock($table_name, $lock_session_id);

        return new WP_REST_Response(array(
            'status' => 'error',
            'message' => 'Lỗi gửi tin nhắn: ' . ($result['ErrorMessage'] ?? $result['CodeResult']),
            'detail' => $result
        ), 200);
    }
}

// Hàm phụ trợ để nhả Lock (Rollback)
function release_voucher_lock($table, $session_id) {
    global $wpdb;
    $wpdb->query($wpdb->prepare(
        "UPDATE $table 
         SET locked_at = NULL, lock_session_id = NULL 
         WHERE lock_session_id = %s",
        $session_id
    ));
}