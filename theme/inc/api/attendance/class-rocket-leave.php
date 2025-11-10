<?php
/**
 * Plugin Name: Rocket Leave OT API
 * Description: API nghỉ phép & tăng ca (Leave / OT) cho Orbit HR, có xác thực JWT.
 */

include_once get_template_directory() . '/inc/helpers/orbit-db.php';
include_once get_template_directory() . '/inc/api/class-rocket-jwt.php';
date_default_timezone_set('Asia/Ho_Chi_Minh');

class Rocket_LeaveOT {
    private $secret = "YOUR_SECRET_KEY";

    public function __construct() {
        add_action('rest_api_init', [$this, 'register_routes']);
    }

    public function register_routes() {

        // 1️⃣ Tạo đơn nghỉ hoặc OT
        register_rest_route('rocket/v1', '/leaveot', [
            'methods' => 'POST',
            'callback' => [$this, 'create_leaveot'],
            'permission_callback' => '__return_true',
        ]);

        // 2️⃣ Lấy danh sách đơn nghỉ / OT
        register_rest_route('rocket/v1', '/leaveot', [
            'methods' => 'GET',
            'callback' => [$this, 'list_leaveot'],
            'permission_callback' => '__return_true',
        ]);

        // 3️⃣ Phê duyệt đơn
        register_rest_route('rocket/v1', '/leaveot/approve', [
            'methods' => 'PUT',
            'callback' => [$this, 'approve_leaveot'],
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

    // =====================================================
    // 1️⃣ API tạo đơn nghỉ phép hoặc OT
    // =====================================================
    public function create_leaveot($request) {
        global $wpdb;
        $orbit_db = get_orbit_db();
        if (is_wp_error($orbit_db)) return $orbit_db;

        $verify = $this->verify_token($request);
        if (is_wp_error($verify)) return $verify;

        $employee_id = intval($verify['sub']);
        $params = $request->get_json_params();

        $type = sanitize_text_field($params['type'] ?? '');
        $leave_type = $params['leave_type'] ?? null;
        $start_time = $params['start_time'] ?? null;
        $end_time = $params['end_time'] ?? null;
        $ot_hours = floatval($params['ot_hours'] ?? 0);
        $leave_days = floatval($params['leave_days'] ?? 0);
        $reason = sanitize_textarea_field($params['reason'] ?? '');
        $now = current_time('mysql');

        if (!in_array($type, ['leave', 'ot'])) {
            return new WP_Error('invalid_type', 'Loại đơn không hợp lệ (leave|ot)', ['status' => 400]);
        }

        // Kiểm tra ngày nghỉ trùng (nếu type=leave)
        if ($type === 'leave' && $start_time && $end_time) {
            $conflict = $orbit_db->get_var($orbit_db->prepare("
                SELECT COUNT(*) FROM leave_ot
                WHERE employee_id = %d 
                  AND type = 'leave'
                  AND status IN ('pending', 'approved')
                  AND (
                        (start_time <= %s AND end_time >= %s)
                        OR (start_time <= %s AND end_time >= %s)
                     )
            ", $employee_id, $end_time, $end_time, $start_time, $start_time));

            if ($conflict > 0) {
                return new WP_Error('duplicate_leave', 'Đã có đơn nghỉ phép trong khoảng thời gian này', ['status' => 400]);
            }
        }

        $orbit_db->insert('leave_ot', [
            'employee_id' => $employee_id,
            'type' => $type,
            'leave_type' => $leave_type,
            'ot_hours' => $ot_hours,
            'leave_days' => $leave_days,
            'start_time' => $start_time,
            'end_time' => $end_time,
            'reason' => $reason,
            'status' => 'pending',
            'created_by' => $employee_id,
            'created_at' => $now,
            'updated_at' => $now
        ]);

        return [
            'success' => true,
            'message' => 'Đã gửi đơn ' . ($type === 'leave' ? 'nghỉ phép' : 'tăng ca') . ' thành công',
            'data' => ['id' => $orbit_db->insert_id]
        ];
    }

    // =====================================================
    // 2️⃣ API xem danh sách đơn nghỉ phép / OT
    // =====================================================
    public function list_leaveot($request) {
        global $wpdb;
        $orbit_db = get_orbit_db();
        if (is_wp_error($orbit_db)) return $orbit_db;

        // 🔒 Xác thực JWT
        $verify = $this->verify_token($request);
        if (is_wp_error($verify)) return $verify;

        $employee_id = intval($verify['sub']);
        $role = isset($verify['role']) ? strtolower($verify['role']) : ''; // 👈 lấy role từ payload
        $type = sanitize_text_field($request->get_param('type') ?? '');
        $status = sanitize_text_field($request->get_param('status') ?? '');
        $limit = intval($request->get_param('limit') ?? 50);

        // === 🔍 Nếu là quản lý hoặc admin → xem toàn bộ ===
        if (in_array($role, ['admin', 'manager'])) {
            $query = "SELECT l.*, p.full_name 
                    FROM leave_ot l
                    LEFT JOIN employee_personal p ON l.employee_id = p.id
                    WHERE 1=1";
            $args = [];
        } else {
            // === 👤 Nhân viên chỉ xem đơn của chính mình ===
            $query = "SELECT l.*, p.full_name 
                    FROM leave_ot l
                    LEFT JOIN employee_personal p ON l.employee_id = p.id
                    WHERE l.employee_id = %d";
            $args = [$employee_id];
        }

        if ($type) {
            $query .= " AND l.type = %s";
            $args[] = $type;
        }

        if ($status) {
            $query .= " AND l.status = %s";
            $args[] = $status;
        }

        $query .= " ORDER BY l.created_at DESC LIMIT %d";
        $args[] = $limit;

        $results = $orbit_db->get_results($orbit_db->prepare($query, ...$args));

        return [
            'success' => true,
            'count' => count($results),
            'data' => $results
        ];
    }


    // =====================================================
    // 3️⃣ API phê duyệt đơn
    // =====================================================
    public function approve_leaveot($request) {
        global $wpdb;
        $orbit_db = get_orbit_db();
        if (is_wp_error($orbit_db)) return $orbit_db;

        $verify = $this->verify_token($request);
        if (is_wp_error($verify)) return $verify;

        $approver_id = intval($verify['sub']);
        $params = $request->get_json_params();
        $leave_id = intval($params['id'] ?? 0);
        $status = sanitize_text_field($params['status'] ?? '');

        if (!in_array($status, ['approved', 'rejected', 'cancelled'])) {
            return new WP_Error('invalid_status', 'Trạng thái không hợp lệ', ['status' => 400]);
        }

        // Cập nhật trạng thái
        $orbit_db->update('leave_ot', [
            'status' => $status,
            'approved_by' => $approver_id,
            'updated_at' => current_time('mysql')
        ], ['id' => $leave_id]);

        // Nếu duyệt -> đồng bộ với bảng attendance_records theo ngày
        if ($status === 'approved') {
            $leave = $orbit_db->get_row($orbit_db->prepare("SELECT * FROM leave_ot WHERE id = %d", $leave_id));

            if ($leave && $leave->start_time && $leave->end_time) {
                $start_date = date('Y-m-d', strtotime($leave->start_time));
                $end_date = date('Y-m-d', strtotime($leave->end_time));

                if ($leave->type === 'leave') {
                    $orbit_db->query($orbit_db->prepare("
                        UPDATE attendance_records
                        SET work_status = 'on_leave'
                        WHERE employee_id = %d
                          AND attendance_date BETWEEN %s AND %s
                    ", $leave->employee_id, $start_date, $end_date));
                } elseif ($leave->type === 'ot') {
                    $orbit_db->query($orbit_db->prepare("
                        UPDATE attendance_records
                        SET total_work_hours = total_work_hours + %f
                        WHERE employee_id = %d
                          AND attendance_date BETWEEN %s AND %s
                    ", $leave->ot_hours, $leave->employee_id, $start_date, $end_date));
                }
            }
        }

        return [
            'success' => true,
            'message' => "Đơn đã được cập nhật trạng thái: {$status}",
            'leave_id' => $leave_id
        ];
    }
}

new Rocket_LeaveOT();
