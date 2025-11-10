<?php
/**
 * Plugin Name: Rocket Attendance API
 * Description: API chấm công (check-in / check-out / history) cho Orbit HR, có xác thực JWT
 */

include_once get_template_directory() . '/inc/helpers/orbit-db.php';
include_once get_template_directory() . '/inc/api/class-rocket-jwt.php';
date_default_timezone_set('Asia/Ho_Chi_Minh');

class Rocket_Attendance {
    private $secret = "YOUR_SECRET_KEY";

    public function __construct() {
        add_action('rest_api_init', [$this, 'register_routes']);
    }

    public function register_routes() {
        register_rest_route('rocket/v1', '/attendance/check-in', [
            'methods' => 'POST',
            'callback' => [$this, 'check_in'],
            'permission_callback' => '__return_true',
        ]);

        register_rest_route('rocket/v1', '/attendance/check-out', [
            'methods' => 'POST',
            'callback' => [$this, 'check_out'],
            'permission_callback' => '__return_true',
        ]);

        register_rest_route('rocket/v1', '/attendance/list', [
            'methods' => 'GET',
            'callback' => [$this, 'get_attendance_list'],
            'permission_callback' => '__return_true',
        ]);

        register_rest_route('rocket/v1', '/attendance/history', [
            'methods' => 'GET',
            'callback' => [$this, 'get_attendance_history'],
            'permission_callback' => '__return_true',
        ]);
    }

    // ================= JWT Verify =================
    private function verify_token($request) {
        $auth_header = $request->get_header('authorization');
        if (!$auth_header) {
            return new WP_Error('missing_token', 'Thiếu Authorization header', ['status' => 401]);
        }
        if (strpos($auth_header, 'Bearer ') !== 0) {
            return new WP_Error('invalid_format', 'Token không hợp lệ', ['status' => 401]);
        }

        $token = substr($auth_header, 7);
        $decoded = jwt_decode($token, $this->secret);
        if (!$decoded || empty($decoded['sub'])) {
            return new WP_Error('invalid_token', 'Token không hợp lệ hoặc hết hạn', ['status' => 401]);
        }

        if (!empty($decoded['exp']) && $decoded['exp'] < time()) {
            return new WP_Error('expired_token', 'Token đã hết hạn', ['status' => 401]);
        }

        return $decoded;
    }
// ================= Check-in =================
public function check_in($request) {
    global $wpdb;
    $orbit_db = get_orbit_db();
    if (is_wp_error($orbit_db)) return $orbit_db;

    date_default_timezone_set('Asia/Ho_Chi_Minh');

    $verify = $this->verify_token($request);
    if (is_wp_error($verify)) return $verify;

    $employee_id = intval($verify['sub']);
    $params = $request->get_json_params();

    // ✅ Nhận thời gian từ FE nếu có
    $client_time = isset($params['check_in_time']) ? $params['check_in_time'] : null;

    // Chuyển về định dạng H:i:s
    if ($client_time) {
        $timestamp = strtotime($client_time);
        $now = date('H:i:s', $timestamp);
    } else {
        $now = current_time('H:i:s');
    }

    $today = current_time('Y-m-d');

    // Kiểm tra đã chấm chưa
    $exists = $orbit_db->get_var(
        $orbit_db->prepare("SELECT id FROM attendance_records WHERE employee_id = %d AND attendance_date = %s", $employee_id, $today)
    );

    if ($exists) {
        return new WP_Error('already_checked_in', 'Bạn đã chấm công hôm nay', ['status' => 400]);
    }

    // ✅ Xác định trạng thái làm việc dựa vào giờ check-in
    $checkInTime = strtotime($now);
    $tenAM = strtotime('10:00:00');
    $work_status = ($checkInTime > $tenAM) ? 'late' : 'present';

    $orbit_db->insert('attendance_records', [
        'employee_id' => $employee_id,
        'attendance_date' => $today,
        'check_in_time' => $now,
        'work_status' => $work_status,
        'created_at' => current_time('mysql'),
        'updated_at' => current_time('mysql')
    ]);

    return [
        'success' => true,
        'message' => sprintf(' Đã chấm công vào lúc %s (%s)', $now, $work_status === 'late' ? 'Đi muộn' : 'Đúng giờ'),
        'employee_id' => $employee_id,
        'attendance_date' => $today,
        'work_status' => $work_status,
    ];
}

// ================= Check-out =================
public function check_out($request) {
    global $wpdb;
    $orbit_db = get_orbit_db();
    if (is_wp_error($orbit_db)) return $orbit_db;

    date_default_timezone_set('Asia/Ho_Chi_Minh');

    $verify = $this->verify_token($request);
    if (is_wp_error($verify)) return $verify;

    $employee_id = intval($verify['sub']);
    $params = $request->get_json_params();

    // ✅ Nhận thời gian từ FE nếu có
    $client_time = isset($params['check_out_time']) ? $params['check_out_time'] : null;

    if ($client_time) {
        $timestamp = strtotime($client_time);
        $now = date('H:i:s', $timestamp);
    } else {
        $now = current_time('H:i:s');
    }

    $today = current_time('Y-m-d');

    $record = $orbit_db->get_row(
        $orbit_db->prepare("SELECT * FROM attendance_records WHERE employee_id = %d AND attendance_date = %s", $employee_id, $today)
    );

    if (!$record) {
        return new WP_Error('not_checked_in', 'Bạn chưa chấm vào hôm nay', ['status' => 400]);
    }

    $check_in = strtotime($record->check_in_time);
    $check_out = strtotime($now);
    $hours = round(($check_out - $check_in) / 3600, 2);

    // ✅ Tự động cập nhật trạng thái khi checkout (nếu có thể)
    // Nếu làm ít hơn 4 tiếng thì có thể đánh dấu là vắng một phần (tùy chính sách)
    if ($hours < 4) {
        $work_status = 'absent';
    } else {
        $work_status = $record->work_status; // Giữ nguyên trạng thái cũ (present/late)
    }

    $orbit_db->update('attendance_records', [
        'check_out_time' => $now,
        'total_work_hours' => $hours,
        'work_status' => $work_status,
        'updated_at' => current_time('mysql')
    ], ['id' => $record->id]);

    return [
        'success' => true,
        'message' => ' Đã tan ca lúc ' . $now,
        'employee_id' => $employee_id,
        'attendance_date' => $today,
        'total_hours' => $hours,
        'work_status' => $work_status
    ];
}


    // ================= Danh sách chấm công =================
    public function get_attendance_list($request) {
        global $wpdb;
        $orbit_db = get_orbit_db();
        if (is_wp_error($orbit_db)) return $orbit_db;

        $verify = $this->verify_token($request);
        if (is_wp_error($verify)) return $verify;

        $employee_id = intval($verify['sub']);
        $month = sanitize_text_field($request->get_param('month') ?? '');
        $limit = intval($request->get_param('limit') ?? 200);

        $query = "SELECT * FROM attendance_records WHERE employee_id = %d";
        $params = [$employee_id];

        if (!empty($month)) {
            $query .= " AND DATE_FORMAT(attendance_date, '%%Y-%%m') = %s";
            $params[] = $month;
        }

        $query .= " ORDER BY attendance_date DESC LIMIT %d";
        $params[] = $limit;

        $records = $orbit_db->get_results($orbit_db->prepare($query, ...$params), ARRAY_A);

        return [
            'success' => true,
            'filter' => $month ?: 'all',
            'count' => count($records),
            'data' => $records,
        ];
    }

    // ================= Lịch sử chấm công =================
    public function get_attendance_history($request) {
        global $wpdb;
        $orbit_db = get_orbit_db();
        if (is_wp_error($orbit_db)) return $orbit_db;

        $verify = $this->verify_token($request);
        if (is_wp_error($verify)) return $verify;

        $employee_id = intval($verify['sub']);
        $from = sanitize_text_field($request->get_param('from') ?? '');
        $to = sanitize_text_field($request->get_param('to') ?? '');
        $limit = intval($request->get_param('limit') ?? 100);

        $query = "SELECT * FROM attendance_records WHERE employee_id = %d";
        $params = [$employee_id];

        if ($from && $to) {
            $query .= " AND attendance_date BETWEEN %s AND %s";
            $params[] = $from;
            $params[] = $to;
        } elseif ($from) {
            $query .= " AND attendance_date >= %s";
            $params[] = $from;
        } elseif ($to) {
            $query .= " AND attendance_date <= %s";
            $params[] = $to;
        }

        $query .= " ORDER BY attendance_date DESC LIMIT %d";
        $params[] = $limit;

        $records = $orbit_db->get_results($orbit_db->prepare($query, ...$params), ARRAY_A);

        return [
            'success' => true,
            'employee_id' => $employee_id,
            'range' => ['from' => $from ?: 'N/A', 'to' => $to ?: 'N/A'],
            'count' => count($records),
            'data' => $records
        ];
    }
}

new Rocket_Attendance();
