<?php
require_once 'class-rocket-jwt.php';
include_once get_template_directory() . '/inc/helpers/orbit-db.php';

class Rocket_Login_API {
    private $secret = "YOUR_SECRET_KEY"; // đổi sang key bí mật

    public function __construct() {
        add_action('rest_api_init', [$this, 'register_routes']);
    }

    public function register_routes() {
        register_rest_route('rocket/v1', '/login', [
            'methods' => 'POST',
            'callback' => [$this, 'handle_login'],
            'permission_callback' => '__return_true'
        ]);

        register_rest_route('rocket/v1', '/logout', [
            'methods' => 'POST',
            'callback' => [$this, 'handle_logout'],
            'permission_callback' => '__return_true'
        ]);
    }

    public function handle_login(WP_REST_Request $request) { 
        $email    = sanitize_email($request->get_param('email'));
        $password = $request->get_param('password');

        // Nếu muốn giới hạn domain email công ty (ví dụ @rocketgroup.asia)
        if (!str_ends_with($email, '@rocketgroup.asia')) {
            return rest_ensure_response([
                'success' => false,
                'message' => 'Chỉ email công ty được phép login'
            ]);
        }

        // Kết nối DB orbit_db
        $orbit_db = get_orbit_db();

        if (is_wp_error($orbit_db)) {
            return $orbit_db; // trả lỗi kết nối
        }

        // Lấy user bằng work_email từ contract
        $user = $orbit_db->get_row(
            $orbit_db->prepare("
                SELECT p.*, r.role_name, c.work_email
                FROM employee_personal p
                INNER JOIN employee_contract c ON c.employee_id = p.id
                LEFT JOIN roles r ON p.role_id = r.id
                WHERE c.work_email = %s
                AND c.status = 'active'
                LIMIT 1
            ", $email)
        );

        if (!$user) {
            return rest_ensure_response([
                'success' => false,
                'message' => 'Không tìm thấy tài khoản với email công ty'
            ]);
        }

        // Check password
        $is_valid = false;
        if (password_verify($password, $user->password)) {
            $is_valid = true;
        } elseif ($user->password === $password) {
            // trường hợp mật khẩu còn lưu plain text → hash lại
            $is_valid = true;
            $new_hashed = password_hash($password, PASSWORD_BCRYPT);
            $orbit_db->update(
                'employee_personal',
                ['password' => $new_hashed],
                ['id' => $user->id]
            );
        }

        if (!$is_valid) {
            return rest_ensure_response([
                'success' => false,
                'message' => 'Sai mật khẩu'
            ]);
        }

        // Tạo JWT
        $payload = [
            'sub'   => $user->id,
            'email' => $user->work_email, // dùng work_email
            'role'  => $user->role_name ?: 'employee',
            'iat'   => time(),
            'exp'   => time() + 3600
        ];
        $token = jwt_encode($payload, $this->secret);

        return rest_ensure_response([
            'success' => true,
            'message' => 'Đăng nhập thành công',
            'token'   => $token,
            'data'    => [
                'id'    => $user->id,
                'email' => $user->work_email,
                'role'  => $user->role_name
            ]
        ]);
    }


    public function handle_logout(WP_REST_Request $request) {
        $auth = $request->get_header('authorization');
        if (!$auth) {
            return rest_ensure_response(['success' => false, 'message' => 'Missing token']);
        }

        // Xóa role_id cookie phía server
        setcookie("role_id", "", time() - 3600, "/");

        return rest_ensure_response([
            'success' => true,
            'message' => 'Đã logout thành công. Hãy xoá token phía client.'
        ]);
    }

}

new Rocket_Login_API();
