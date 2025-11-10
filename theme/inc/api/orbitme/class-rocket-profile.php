<?php
/**
 * Plugin Name: Rocket Profile API
 */
include_once get_template_directory() . '/inc/helpers/orbit-db.php';
class Rocket_Profile {  
    public function __construct(){
        add_action('rest_api_init', [$this,'register_routes']);
    }

    public function register_routes(){

        // API lấy profile full thông tin (personal + contract)
        register_rest_route('rocket/v1','/profile/(?P<id>\d+)',[
            'methods' => 'GET',
            'callback' => [$this,'show_full_profile'],
            'permission_callback' => '__return_true'
        ]);

        register_rest_route('rocket/v1', '/profile/(?P<id>\d+)/avatar', [
            'methods'  => 'POST',
            'callback' => [$this, 'update_avatar'],
            'permission_callback' => '__return_true', // TODO: check quyền user
        ]);

    }

    public function show_full_profile($request){
        $id = intval($request['id']);
        $orbit_db = get_orbit_db();

        if (is_wp_error($orbit_db)) {
            return $orbit_db; // trả lỗi kết nối
        }

        $personal_table = 'employee_personal';
        $contract_table = 'employee_contract';
        $bank_table = 'employee_bank';
        $tax_table = 'employee_tax';

        // Lấy thông tin cá nhân
        $personal = $orbit_db->get_row(
            $orbit_db->prepare("SELECT * FROM $personal_table WHERE id = %d", $id),
            ARRAY_A
        );

        if(!$personal){
            return [
                'success' => false,
                'message' => 'Profile not found'
            ];
        }

        // Lấy thông tin hợp đồng (dựa trên employee_id)
        $contract = $orbit_db->get_row(
            $orbit_db->prepare("SELECT * FROM $contract_table WHERE employee_id = %d", $id),
            ARRAY_A
        );

        $bank = $orbit_db->get_results(
            $orbit_db->prepare("SELECT * FROM $bank_table WHERE employee_id = %d", $id),
            ARRAY_A
        );

        $tax = $orbit_db->get_row(
            $orbit_db->prepare("SELECT * FROM $tax_table WHERE employee_id = %d", $id),
            ARRAY_A
        );
        
        return [
            'success' => true,
            'data' => [
                'personal' => $personal,
                'contract' => $contract,
                'bank' => $bank,
                'tax' => $tax,
            ]
        ];

    }

    public function update_avatar($request) {
        $id = intval($request['id']);
        $avatar_file = $request->get_file_params()['avatar'] ?? null;

        if ( !$avatar_file ) {
            return [
                'success' => false,
                'message' => 'Chưa upload avatar file'
            ];
        }

        // Dùng WP media để lưu file
        require_once(ABSPATH . 'wp-admin/includes/file.php');
        require_once(ABSPATH . 'wp-admin/includes/media.php');
        require_once(ABSPATH . 'wp-admin/includes/image.php');

        $attachment_id = media_handle_upload('avatar', 0);
        if (is_wp_error($attachment_id)) {
            return new WP_Error('upload_failed', 'Upload thất bại', ['status' => 500]);
        }

        $avatar_url = wp_get_attachment_url($attachment_id);

        // Debug check
        error_log("ID: $id");
        error_log("Attachment ID: $attachment_id");
        error_log("Avatar URL: $avatar_url");

        $orbit_db = get_orbit_db();

        if (is_wp_error($orbit_db)) {
            return $orbit_db; // trả lỗi kết nối
        }

        $personal_table = 'employee_personal';

        $updated = $orbit_db->query(
            $orbit_db->prepare(
                "UPDATE $personal_table SET avatar_url = %s WHERE id = %d",
                $avatar_url,
                $id
            )
        );

        if ( $updated === false ) {
            return [
                'success' => false,
                'message' => 'Update fail'
            ];
        }

        // Lấy lại bản ghi để confirm
        $personal = $orbit_db->get_row(
            $orbit_db->prepare("SELECT id, avatar_url FROM $personal_table WHERE id = %d", $id),
            ARRAY_A
        );

        return [
            'success'    => true,
            'message'    => 'Update avatar thành công',
            'avatar_url' => $personal['avatar_url'] ?? null,
        ];
    }


}

new Rocket_Profile();