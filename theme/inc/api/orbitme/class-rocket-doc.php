<?php
/**
 * Plugin Name: Rocket Doc API
 */
include_once get_template_directory() . '/inc/helpers/orbit-db.php';
class Rocket_Doc {  
    public function __construct(){
        add_action('rest_api_init', [$this,'register_routes']);
    }

    public function register_routes(){

        // API lấy profile full thông tin (personal + contract)
        register_rest_route('rocket/v1','/doc/(?P<id>\d+)',[
            'methods' => 'GET',
            'callback' => [$this,'show_full_doc'],
            'permission_callback' => '__return_true'
        ]);

        register_rest_route('rocket/v1','/doc/(?P<id>\d+)',[
            'methods' => 'POST',
            'callback' => [$this,'upload_document'],
            'permission_callback' => '__return_true'
        ]);
    }

    public function show_full_doc($request){
        $employee_id = intval($request['id']);
        $orbit_db = get_orbit_db();

        if (is_wp_error($orbit_db)) {
            return $orbit_db; // trả lỗi kết nối
        }

        $doc_table = 'employee_document';

        // Lấy tất cả tài liệu của employee_id
        $docs = $orbit_db->get_results(
            $orbit_db->prepare("SELECT * FROM $doc_table WHERE employee_id = %d", $employee_id),
            ARRAY_A
        );

        if(!$docs || empty($docs)){
            return [
                'success' => false,
                'message' => 'Không tìm thấy tài liệu cho nhân viên này'
            ];
        }
        
        return [
            'success' => true,
            'data' => [
                'documents' => $docs,
            ]
        ];
    }

public function upload_document($request) {
    $employee_id = intval($request['id']);
    $file = $request->get_file_params()['file'] ?? null;
    $doc_name = sanitize_text_field($request['doc_name']);
    $type_id = sanitize_text_field($request['type_id']);
    $expiry_date = sanitize_text_field($request['expiry_date']); // optional

    if (!$file) {
        return [
            'success' => false,
            'message' => 'Chưa upload file',
            'files'   => $_FILES, // Debug xem file đã nhận chưa
        ];
    }

    // Cho phép upload PDF
    add_filter('upload_mimes', function($mimes) {
        $mimes['pdf'] = 'application/pdf';
        return $mimes;
    });

    // Dùng wp_handle_upload thay vì media_handle_upload để tránh lỗi REST API
    require_once(ABSPATH . 'wp-admin/includes/file.php');

    $upload_overrides = ['test_form' => false];
    $movefile = wp_handle_upload($_FILES['file'], $upload_overrides);

    if (!$movefile || isset($movefile['error'])) {
        return [
            'success' => false,
            'message' => 'Upload thất bại',
            'error'   => $movefile['error'] ?? 'Unknown error',
            'status'  => 500,
        ];
    }

    $file_url = $movefile['url'];

    // Kết nối database orbit_db
    $orbit_db = get_orbit_db();

    if (is_wp_error($orbit_db)) {
        return $orbit_db; // trả lỗi kết nối
    }

    $doc_table = 'employee_document';

    // Kiểm tra xem đã có document cùng employee_id + doc_type chưa
    $existing = $orbit_db->get_row(
        $orbit_db->prepare(
            "SELECT id FROM {$doc_table} WHERE employee_id = %d AND type_id = %s LIMIT 1",
            $employee_id, $type_id
        )
    );

    if ($existing) {
        $updated = $orbit_db->update(
            $doc_table,
            [
                'doc_name'    => $doc_name,
                'file_url'    => $file_url,
                'upload_date' => current_time('mysql'),
                'expiry_date' => $expiry_date ?: null,
                'updated_at'  => current_time('mysql')
            ],
            ['id' => $existing->id],
            ['%s','%s','%s','%s','%s'],
            ['%d']
        );

        if ($updated === false) {
            return [
                'success' => false,
                'message' => 'Cập nhật thất bại'
            ];
        }

        return [
            'success'   => true,
            'message'   => 'Cập nhật document thành công',
            'file_url'  => $file_url,
            'doc_id'    => $existing->id
        ];

    } else {
        $inserted = $orbit_db->insert(
            $doc_table,
            [
                'employee_id' => $employee_id,
                'type_id'    => $type_id,
                'doc_name'    => $doc_name,
                'file_url'    => $file_url,
                'upload_date' => current_time('mysql'),
                'expiry_date' => $expiry_date ?: null,
                'created_at'  => current_time('mysql'),
                'updated_at'  => current_time('mysql')
            ],
            ['%d','%s','%s','%s','%s','%s','%s','%s']
        );

        if ($inserted === false) {
            return [
                'success' => false,
                'message' => 'Thêm mới thất bại'
            ];
        }

        return [
            'success'   => true,
            'message'   => 'Thêm document thành công',
            'file_url'  => $file_url,
            'doc_id'    => $orbit_db->insert_id
        ];
    }
}



}

new Rocket_Doc();