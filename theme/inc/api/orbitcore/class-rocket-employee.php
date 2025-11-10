<?php
/**
 * Plugin Name: Rocket Profile API
 */
include_once get_template_directory() . '/inc/helpers/orbit-db.php';
include_once get_template_directory() . '/inc/api/class-rocket-jwt.php';
class Rocket_Employees { 
    private $secret = "YOUR_SECRET_KEY"; 
    public function __construct(){
        add_action('rest_api_init', [$this,'register_routes']);
    }

    public function register_routes(){

        // API lấy profile full thông tin (personal + contract)
        register_rest_route('rocket/v1','/employee/(?P<id>\d+)',[
            'methods' => 'GET',
            'callback' => [$this,'show_employee_byID'],
            'permission_callback' => '__return_true'
        ]);

        register_rest_route('rocket/v1','/employees',[
            'methods' => 'GET',
            'callback' => [$this,'show_full_employee'],
            'permission_callback' => '__return_true'
        ]);

        register_rest_route('rocket/v1','/newemployee',[
            'methods' => 'POST',
            'callback' => [$this,'create_employee'],
            'permission_callback' => '__return_true'
        ]);

        register_rest_route('rocket/v1', '/upload_document', [
            'methods'  => 'POST',
            'callback' => [$this, 'orbit_upload_document'],
            'permission_callback' => '__return_true'
        ]);
        
        register_rest_route('rocket/v1','/employee/(?P<id>\d+)',[
            'methods' => 'DELETE',
            'callback' => [$this,'delete_employee'],
            'permission_callback' => '__return_true'
        ]);

        register_rest_route('rocket/v1','/employee/(?P<id>\d+)',[
            'methods' => 'PUT',
            'callback' => [$this,'update_employee'],
            'permission_callback' => '__return_true'
        ]);

        register_rest_route('rocket/v1', '/employee/change_password', [
            'methods' => 'POST',
            'callback' => [$this, 'change_password'],
            'permission_callback' => '__return_true',
        ]);
        register_rest_route('rocket/v1', '/forgot_password', [
            'methods' => 'POST',
            'callback' => [$this, 'forgot_password'],
            'permission_callback' => '__return_true',
        ]);

        register_rest_route('rocket/v1', '/employee/reset_password', [
            'methods' => 'POST',
            'callback' => [$this, 'reset_password'],
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
    
    public function show_employee_byID($request){ 
        $id = intval($request['id']);
        if ($id <= 0) {
            return new WP_Error('invalid_id','ID không hợp lệ',['status'=>400]);
        }
        
        $orbit_db = get_orbit_db();

        if (is_wp_error($orbit_db)) {
            return $orbit_db; // trả lỗi kết nối
        }

        // Bảng
        $personal_table     = 'employee_personal';
        $contract_table     = 'employee_contract';
        $bank_table         = 'employee_bank';
        $tax_table          = 'employee_tax';
        $dependent_table    = 'employee_dependent';
        $insurance_table    = 'employee_social_insurance';
        $document_table     = 'employee_document';
        $comp_table         = 'employee_compensations';
        $comp_item_table    = 'employee_compensation_items';

        // Lấy thông tin cá nhân
        $personal = $orbit_db->get_row(
            $orbit_db->prepare("SELECT * FROM $personal_table WHERE id = %d", $id),
            ARRAY_A
        );

        if (empty($personal)) {
            return [
                'success' => false,
                'message' => 'Không tìm thấy nhân viên với ID '.$id
            ];
        }

        // Lấy các thông tin khác
        $contract = $orbit_db->get_results(
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

        $dependents = $orbit_db->get_results(
            $orbit_db->prepare("SELECT * FROM $dependent_table WHERE employee_id = %d", $id),
            ARRAY_A
        );

        $insurance = $orbit_db->get_row(
            $orbit_db->prepare("SELECT * FROM $insurance_table WHERE employee_id = %d", $id),
            ARRAY_A
        );

        $documents = $orbit_db->get_results(
            $orbit_db->prepare("SELECT * FROM $document_table WHERE employee_id = %d", $id),
            ARRAY_A
        );

        // Compensation + items
        $compensations = $orbit_db->get_results(
            $orbit_db->prepare("SELECT * FROM $comp_table WHERE employee_id = %d", $id),
            ARRAY_A
        );

        if (!empty($compensations)) {
            foreach ($compensations as &$comp) {
                $comp_id = intval($comp['id']);
                $comp['items'] = $orbit_db->get_results(
                    $orbit_db->prepare("SELECT * FROM $comp_item_table WHERE compensation_id = %d", $comp_id),
                    ARRAY_A
                );
            }
        }

        return [
            'success' => true,
            'data'    => [
                'personal'     => $personal,
                'contract'     => $contract,
                'bank'         => $bank,
                'tax'          => $tax,
                'dependents'   => $dependents,
                'insurance'    => $insurance,
                'documents'    => $documents,
                'compensations'=> $compensations,
            ]
        ];
    }


    public function show_full_employee($request) {
        $orbit_db = get_orbit_db();

        if (is_wp_error($orbit_db)) {
            return $orbit_db; // trả lỗi kết nối
        }

        // Bảng
        $personal_table     = 'employee_personal';
        $contract_table     = 'employee_contract';
        $bank_table         = 'employee_bank';
        $tax_table          = 'employee_tax';
        $dependent_table    = 'employee_dependent';
        $insurance_table    = 'employee_social_insurance';
        $document_table     = 'employee_document';
        $comp_table         = 'employee_compensations';
        $comp_item_table    = 'employee_compensation_items';

        // Lấy toàn bộ thông tin cá nhân
        $all_personal = $orbit_db->get_results("SELECT * FROM $personal_table", ARRAY_A);

        if (empty($all_personal)) {
            return [
                'success' => false,
                'message' => 'Không có nhân viên nào'
            ];
        }

        $employees = [];
        foreach ($all_personal as $p) {
            $id = intval($p['id']);

            // Lấy hợp đồng
            $contract = $orbit_db->get_results(
                $orbit_db->prepare("SELECT * FROM $contract_table WHERE employee_id = %d", $id),
                ARRAY_A
            );

            // Lấy ngân hàng
            $bank = $orbit_db->get_results(
                $orbit_db->prepare("SELECT * FROM $bank_table WHERE employee_id = %d", $id),
                ARRAY_A
            );

            // Lấy thuế
            $tax = $orbit_db->get_results(
                $orbit_db->prepare("SELECT * FROM $tax_table WHERE employee_id = %d", $id),
                ARRAY_A
            );

            // Lấy người phụ thuộc
            $dependents = $orbit_db->get_results(
                $orbit_db->prepare("SELECT * FROM $dependent_table WHERE employee_id = %d", $id),
                ARRAY_A
            );

            // Lấy bảo hiểm
            $insurance = $orbit_db->get_results(
                $orbit_db->prepare("SELECT * FROM $insurance_table WHERE employee_id = %d", $id),
                ARRAY_A
            );

            // Lấy tài liệu
            $documents = $orbit_db->get_results(
                $orbit_db->prepare("SELECT * FROM $document_table WHERE employee_id = %d", $id),
                ARRAY_A
            );

            // Lấy compensation + items
            $compensations = $orbit_db->get_results(
                $orbit_db->prepare("SELECT * FROM $comp_table WHERE employee_id = %d", $id),
                ARRAY_A
            );

            if (!empty($compensations)) {
                foreach ($compensations as &$comp) {
                    $comp_id = intval($comp['id']);
                    $comp['items'] = $orbit_db->get_results(
                        $orbit_db->prepare("SELECT * FROM $comp_item_table WHERE compensation_id = %d", $comp_id),
                        ARRAY_A
                    );
                }
            }

            $employees[] = [
                'personal'     => $p,
                'contract'     => $contract,
                'bank'         => $bank,
                'tax'          => $tax,
                'dependents'   => $dependents,
                'insurance'    => $insurance,
                'documents'    => $documents,
                'compensations'=> $compensations,
            ];
        }

        return [
            'success' => true,
            'data'    => $employees
        ];
    }

    public function create_employee($request) {
        global $wpdb;
        $orbit_db = get_orbit_db();

        if (is_wp_error($orbit_db)) {
            return $orbit_db;
        }

        $params = $request->get_json_params();
        $step   = $params['step'] ?? 'full';
        $data   = $params['data'] ?? [];
        $now    = current_time('mysql');

        switch ($step) {
            // =====================================================
            // 1️⃣ STEP: PERSONAL
            // =====================================================
            case 'personal':
                if (empty($data['full_name']) || empty($data['personal_email'])) {
                    return new WP_Error('invalid_data','Thiếu full_name hoặc personal_email',['status'=>400]);
                }

                $exists = $orbit_db->get_var(
                    $orbit_db->prepare("SELECT COUNT(*) FROM employee_personal WHERE personal_email = %s", $data['personal_email'])
                );
                if ($exists > 0) {
                    return new WP_Error('email_exists','Email đã tồn tại',['status'=>400]);
                }

                $orbit_db->insert('employee_personal', [
                    'full_name'      => sanitize_text_field($data['full_name']),
                    'personal_email' => sanitize_email($data['personal_email']),
                    'avatar_url'     => $data['avatar_url'] ?? null,
                    'dob'            => $data['dob'] ?? null,
                    'gender'         => $data['gender'] ?? null,
                    'ethnicity'      => $data['ethnicity'] ?? null,
                    'nationality'    => $data['nationality'] ?? null,
                    'cccd_id'        => $data['cccd_id'] ?? null,
                    'cccd_issued_date'  => $data['cccd_issued_date'] ?? null,
                    'cccd_issued_place' => $data['cccd_issued_place'] ?? null,
                    'hometown'          => $data['hometown'] ?? null,
                    'permanent_address' => $data['permanent_address'] ?? null,
                    'temporary_address' => $data['temporary_address'] ?? null,
                    'phone'          => $data['phone'] ?? null,
                    'marital_status' => $data['marital_status'] ?? null,
                    'emergency_contact_name'        => $data['emergency_contact_name'] ?? null,
                    'emergency_contact_relationship'=> $data['emergency_contact_relationship'] ?? null,
                    'emergency_contact_phone'       => $data['emergency_contact_phone'] ?? null,
                    'emergency_contact_address'     => $data['emergency_contact_address'] ?? null,
                    'education_level'               => $data['education_level'] ?? null,
                    'education_grade'               => $data['education_grade'] ?? null,
                    'education_certificate'         => isset($data['education_certificate']) ? (int)$data['education_certificate'] : null,
                    'password' => isset($data['password']) && $data['password'] !== '' ? sanitize_text_field($data['password']) : '123456',
                    'role_id'        => $data['role_id'] ?? 3,
                    'active'         => 1,
                    'created_at'     => $now,
                    'updated_at'     => $now,
                ]);

                $new_id = $orbit_db->insert_id;
                return ['success'=>true,'step'=>$step,'employee_id'=>$new_id];

            // =====================================================
            // 2️⃣ STEP: FULL (TẠO TOÀN BỘ)
            // =====================================================
            case 'full':
                $personal     = $data['personal'] ?? $data;
                $employee_id  = intval($data['employee_id'] ?? 0);

                if (empty($personal['full_name']) || empty($personal['personal_email'])) {
                    return new WP_Error('invalid_data','Thiếu full_name hoặc personal_email',['status'=>400]);
                }

                // --- PERSONAL ---
                if ($employee_id > 0) {
                    $exists = $orbit_db->get_var($orbit_db->prepare(
                        "SELECT COUNT(*) FROM employee_personal WHERE personal_email = %s AND id != %d",
                        $personal['personal_email'], $employee_id
                    ));
                    if ($exists > 0) {
                        return new WP_Error('email_exists','Email đã tồn tại',['status'=>400]);
                    }
                } else {
                    $existing_id = $orbit_db->get_var(
                        $orbit_db->prepare("SELECT id FROM employee_personal WHERE personal_email = %s", $personal['personal_email'])
                    );
                    if ($existing_id) {
                        $employee_id = intval($existing_id);
                    } else {
                        $orbit_db->insert('employee_personal', [
                            'full_name'      => sanitize_text_field($personal['full_name']),
                            'personal_email' => sanitize_email($personal['personal_email']),
                            'avatar_url'     => $personal['avatar_url'] ?? null,
                            'dob'            => $personal['dob'] ?? null,
                            'gender'         => $personal['gender'] ?? null,
                            'ethnicity'      => $personal['ethnicity'] ?? null,
                            'nationality'    => $personal['nationality'] ?? null,
                            'cccd_id'        => $personal['cccd_id'] ?? null,
                            'cccd_issued_date'  => $personal['cccd_issued_date'] ?? null,
                            'cccd_issued_place' => $personal['cccd_issued_place'] ?? null,
                            'hometown'          => $personal['hometown'] ?? null,
                            'permanent_address' => $personal['permanent_address'] ?? null,
                            'temporary_address' => $personal['temporary_address'] ?? null,
                            'phone'             => $personal['phone'] ?? null,
                            'marital_status'    => $personal['marital_status'] ?? null,
                            'education_level'   => $personal['education_level'] ?? null,
                            'education_grade'   => $personal['education_grade'] ?? null,
                            'education_certificate' => isset($personal['education_certificate']) ? (int)$personal['education_certificate'] : null,
                            'password' => isset($personal['password']) && $personal['password'] !== '' ? sanitize_text_field($personal['password']) : '123456',
                            'role_id'        => $personal['role_id'] ?? 3,
                            'active'         => 1,
                            'created_at'     => $now,
                            'updated_at'     => $now,
                        ]);
                        $employee_id = $orbit_db->insert_id;
                    }
                }

                if ($employee_id <= 0) {
                    return new WP_Error('invalid_employee_id','Không lấy được employee_id',['status'=>500]);
                }

                // --- BANK ---
                if (!empty($data['bank'])) {
                    $bank = $data['bank'];
                    $orbit_db->insert('employee_bank', [
                        'employee_id'         => $employee_id,
                        'bank_account_number' => $bank['bank_account_number'] ?? null,
                        'bank_name'           => $bank['bank_name'] ?? null,
                        'account_holder'      => $bank['account_holder'] ?? null,
                        'bank_address'        => $bank['bank_address'] ?? null,
                        'created_at'          => $now,
                        'updated_at'          => $now,
                    ]);
                }

                // --- TAX ---
                if (!empty($data['tax'])) {
                    $tax = $data['tax'];
                    $orbit_db->insert('employee_tax', [
                        'employee_id'           => $employee_id,
                        'tax_code'              => $tax['tax_code'] ?? null,
                        'tax_code_issued_date'  => $tax['tax_code_issued_date'] ?? null,
                        'tax_code_issued_place' => $tax['tax_code_issued_place'] ?? null,
                        'created_at'            => $now,
                        'updated_at'            => $now,
                    ]);
                }

                // --- DEPENDENTS ---
                if (!empty($data['dependents']) && is_array($data['dependents'])) {
                    foreach ($data['dependents'] as $dep) {
                        $orbit_db->insert('employee_dependent', [
                            'employee_id'          => $employee_id,
                            'number_of_dependent'  => $dep['number_of_dependent'] ?? 1,
                            'dependent_full_name'  => $dep['dependent_full_name'] ?? '',
                            'dependent_tax_code'   => $dep['dependent_tax_code'] ?? null,
                            'created_at'           => $now,
                            'updated_at'           => $now,
                        ]);
                    }
                }

                // --- INSURANCE ---
                if (!empty($data['insurance'])) {
                    $ins = $data['insurance'];
                    $orbit_db->insert('employee_social_insurance', [
                        'employee_id'                => $employee_id,
                        'social_insurance_number'    => $ins['social_insurance_number'] ?? null,
                        'household_code'             => $ins['household_code'] ?? null,
                        'social_insurance_start_date'=> $ins['social_insurance_start_date'] ?? null,
                        'created_at'                 => $now,
                        'updated_at'                 => $now,
                    ]);
                }

                // --- DOCUMENTS ---
                if (!empty($data['documents']) && is_array($data['documents'])) {
                    foreach ($data['documents'] as $doc) {
                        $orbit_db->insert('employee_document', [
                            'employee_id' => $employee_id,
                            'type_id'     => $doc['type_id'],
                            'doc_name'    => $doc['doc_name'],
                            'file_url'    => $doc['file_url'],
                            'upload_date' => $doc['upload_date'] ?? date('Y-m-d'),
                            'expiry_date' => $doc['expiry_date'] ?? null,
                            'notes'       => $doc['notes'] ?? null,
                            'created_at'  => $now,
                            'updated_at'  => $now,
                        ]);
                    }
                }

                // --- CONTRACTS + COMPENSATIONS ---
                if (!empty($data['contracts']) && is_array($data['contracts'])) {
                    foreach ($data['contracts'] as $contract) {
                    // Chỉ bỏ qua nếu toàn bộ dữ liệu đều trống
                    if (empty($contract['contract_number']) 
                        && empty($contract['position_title'])
                        && empty($contract['department_name'])
                        && empty($contract['start_date'])
                        && empty($contract['compensations'])) continue;


                        $orbit_db->insert('employee_contract', [
                            'employee_id'     => $employee_id,
                            'contract_number' => $contract['contract_number'] ?? null,
                            'contract_type'   => $contract['contract_type'] ?? null,
                            'position_title'  => $contract['position_title'] ?? null,
                            'department_name' => $contract['department_name'] ?? null,
                            'manager_name'    => $contract['manager_name'] ?? null,
                            'work_email'      => $contract['work_email'] ?? null,
                            'contract_date'   => $contract['contract_date'] ?? null,
                            'start_date'      => $contract['start_date'] ?? null,
                            'expiry_date'     => $contract['expiry_date'] ?? null,
                            'status'          => $contract['status'] ?? 'active',
                            'notes'           => $contract['notes'] ?? null,
                            'created_at'      => $now,
                            'updated_at'      => $now,
                        ]);
                        $contract_id = $orbit_db->insert_id;

                        if (!empty($contract['compensations']) && is_array($contract['compensations'])) {
                            foreach ($contract['compensations'] as $comp) {
                                if (empty($comp['details'])) continue;

                                $orbit_db->insert('employee_compensations', [
                                    'contract_id'    => $contract_id,
                                    'employee_id'    => $employee_id,
                                    'effective_from' => $comp['effective_from'] ?? null,
                                    'effective_to'   => $comp['effective_to'] ?? null,
                                    'reason'         => $comp['reason'] ?? null,
                                    'notes'          => $comp['notes'] ?? null,
                                    'created_at'     => $now,
                                    'updated_at'     => $now,
                                ]);
                                $compensation_id = $orbit_db->insert_id;

                                foreach ($comp['details'] as $detail) {
                                    $component_code = $detail['component_code'] ?? ($detail['componentCode'] ?? null);
                                    if (empty($component_code)) continue;

                                    $orbit_db->insert('employee_compensation_items', [
                                        'compensation_id' => $compensation_id,
                                        'component_code'  => $component_code,
                                        'amount'          => floatval($detail['amount'] ?? 0),
                                        'unit'            => $detail['unit'] ?? 'VND',
                                        'currency'        => $detail['currency'] ?? 'VND',
                                        'basis_code'      => $detail['basis_code'] ?? null,
                                        'show_on_payslip' => !empty($detail['show_on_payslip']) ? 1 : 0,
                                        'created_at'      => $now,
                                        'updated_at'      => $now,
                                    ]);
                                }
                            }
                        }
                    }
                }

                return ['success' => true, 'step' => 'full', 'employee_id' => $employee_id];

            default:
                return new WP_Error('invalid_step', 'Step không hợp lệ', ['status'=>400]);
        }
    }

    public function orbit_upload_document($request) {
        $employee_id = intval($request['id']);
        $file = $request->get_file_params()['file'] ?? null;
        $doc_name = sanitize_text_field($request['doc_name']);
        $type_id = sanitize_text_field($request['type_id']);

        if (!$file) {
            return [
                'success' => false,
                'message' => 'Chưa upload file',
            ];
        }

        add_filter('upload_mimes', function($mimes) {
            $mimes['pdf'] = 'application/pdf';
            return $mimes;
        });

        require_once(ABSPATH . 'wp-admin/includes/file.php');
        $upload_overrides = ['test_form' => false];
        $movefile = wp_handle_upload($_FILES['file'], $upload_overrides);

        if (!$movefile || isset($movefile['error'])) {
            return [
                'success' => false,
                'message' => 'Upload thất bại',
                'error'   => $movefile['error'] ?? 'Unknown error',
            ];
        }

        $file_url = $movefile['url'];

        // ✅ KHÔNG INSERT DATABASE Ở ĐÂY
        // ✅ Chỉ trả về đường dẫn file cho FE
        return [
            'success'  => true,
            'message'  => 'Upload thành công',
            'file_url' => $file_url,
        ];
    }

    // Hàm xử lý update
    public function update_employee($request) {
        global $wpdb;
        $orbit_db = get_orbit_db();

        if (is_wp_error($orbit_db)) return $orbit_db;

        $employee_id = intval($request['id']);
        if ($employee_id <= 0) {
            return new WP_Error('invalid_id', 'ID nhân viên không hợp lệ', ['status' => 400]);
        }

        // ✅ FIX: đọc JSON thủ công (PUT không tự parse)
        $raw = $request->get_body();
        $params = json_decode($raw, true);
        if (json_last_error() !== JSON_ERROR_NONE) {
            return new WP_Error('invalid_json', 'Dữ liệu JSON không hợp lệ', ['status' => 400]);
        }

        $step = $params['step'] ?? 'personal';
        $data = $params['data'] ?? [];
        $now  = current_time('mysql');

        switch ($step) {
            // ================= 1. PERSONAL =================
            case 'personal':
                $orbit_db->update('employee_personal', [
                    'full_name'      => $data['full_name'] ?? null,
                    'personal_email' => $data['personal_email'] ?? null,
                    'avatar_url'     => $data['avatar_url'] ?? null,
                    'dob'            => $data['dob'] ?? null,
                    'gender'         => $data['gender'] ?? null,
                    'ethnicity'      => $data['ethnicity'] ?? null,
                    'nationality'    => $data['nationality'] ?? null,
                    'cccd_id'        => $data['cccd_id'] ?? null,
                    'cccd_issued_date'  => $data['cccd_issued_date'] ?? null,
                    'cccd_issued_place' => $data['cccd_issued_place'] ?? null,
                    'hometown'          => $data['hometown'] ?? null,
                    'permanent_address' => $data['permanent_address'] ?? null,
                    'temporary_address' => $data['temporary_address'] ?? null,
                    'phone'             => $data['phone'] ?? null,
                    'marital_status'    => $data['marital_status'] ?? null,
                    'emergency_contact_name'        => $data['emergency_contact_name'] ?? null,
                    'emergency_contact_relationship'=> $data['emergency_contact_relationship'] ?? null,
                    'emergency_contact_phone'       => $data['emergency_contact_phone'] ?? null,
                    'emergency_contact_address'     => $data['emergency_contact_address'] ?? null,
                    'education_level'   => $data['education_level'] ?? null,
                    'education_grade'   => $data['education_grade'] ?? null,
                    'education_certificate' => isset($data['education_certificate']) ? (int)$data['education_certificate'] : null,
                    'updated_at'       => $now,
                ], ['id' => $employee_id]);
                break;

            // ================= 2. BANK =================
            case 'bank':
                $exists = $orbit_db->get_var($orbit_db->prepare(
                    "SELECT id FROM employee_bank WHERE employee_id=%d", $employee_id
                ));
                if ($exists) {
                    $orbit_db->update('employee_bank', [
                        'bank_account_number' => $data['bank_account_number'] ?? null,
                        'bank_name'           => $data['bank_name'] ?? null,
                        'account_holder'     => $data['account_holder'] ?? null,
                        'bank_address'        => $data['bank_address'] ?? null,
                        'updated_at'          => $now,
                    ], ['employee_id' => $employee_id]);
                } else {
                    $orbit_db->insert('employee_bank', [
                        'employee_id'         => $employee_id,
                        'bank_account_number' => $data['bank_account_number'] ?? null,
                        'bank_name'           => $data['bank_name'] ?? null,
                        'account_holder'      => $data['account_holder'] ?? null,
                        'bank_address'        => $data['bank_address'] ?? null,
                        'created_at'          => $now,
                        'updated_at'          => $now,
                    ]);
                }
                break;

            // ================= 3. TAX =================
            case 'tax':
                $exists = $orbit_db->get_var($orbit_db->prepare(
                    "SELECT id FROM employee_tax WHERE employee_id=%d", $employee_id
                ));
                if ($exists) {
                    $orbit_db->update('employee_tax', [
                        'tax_code'              => $data['tax_code'] ?? null,
                        'tax_code_issued_date'  => $data['tax_code_issued_date'] ?? null,
                        'tax_code_issued_place' => $data['tax_code_issued_place'] ?? null,
                        'updated_at'            => $now,
                    ], ['employee_id' => $employee_id]);
                } else {
                    $orbit_db->insert('employee_tax', [
                        'employee_id'           => $employee_id,
                        'tax_code'              => $data['tax_code'] ?? null,
                        'tax_code_issued_date'  => $data['tax_code_issued_date'] ?? null,
                        'tax_code_issued_place' => $data['tax_code_issued_place'] ?? null,
                        'created_at'            => $now,
                        'updated_at'            => $now,
                    ]);
                }
                break;

            // ================= 4. DEPENDENTS =================
            case 'dependents':
                $orbit_db->delete('employee_dependent', ['employee_id' => $employee_id]);
                if (!empty($data)) {
                    foreach ($data as $dep) {
                        $orbit_db->insert('employee_dependent', [
                            'employee_id'          => $employee_id,
                            'number_of_dependent'  => $dep['number_of_dependent'] ?? 1,
                            'dependent_full_name'  => $dep['dependent_full_name'],
                            'dependent_tax_code'   => $dep['dependent_tax_code'] ?? null,
                            'created_at'           => $now,
                            'updated_at'           => $now,
                        ]);
                    }
                }
                break;

            // ================= 5. INSURANCE =================
            case 'insurance':
                $exists = $orbit_db->get_var($orbit_db->prepare(
                    "SELECT id FROM employee_social_insurance WHERE employee_id=%d", $employee_id
                ));
                if ($exists) {
                    $orbit_db->update('employee_social_insurance', [
                        'social_insurance_number'     => $data['social_insurance_number'] ?? null,
                        'household_code'              => $data['household_code'] ?? null,
                        'social_insurance_start_date' => $data['social_insurance_start_date'] ?? null,
                        'updated_at'                  => $now,
                    ], ['employee_id' => $employee_id]);
                } else {
                    $orbit_db->insert('employee_social_insurance', [
                        'employee_id'                 => $employee_id,
                        'social_insurance_number'     => $data['social_insurance_number'] ?? null,
                        'household_code'              => $data['household_code'] ?? null,
                        'social_insurance_start_date' => $data['social_insurance_start_date'] ?? null,
                        'created_at'                  => $now,
                        'updated_at'                  => $now,
                    ]);
                }
                break;

            // ================= 6. DOCUMENTS =================
            case 'documents':
                    file_put_contents(
                        WP_CONTENT_DIR . '/debug_documents_update.json',
                        json_encode([
                            'employee_id' => $employee_id,
                            'raw_data' => $data,
                            'timestamp' => current_time('mysql'),
                        ], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE)
                    );
                if (empty($data) || !is_array($data)) {
                    return new WP_Error('invalid_data', 'Dữ liệu tài liệu không hợp lệ', ['status' => 400]);
                }

                // Lấy danh sách document hiện tại trong DB
                $existing_doc_ids = $orbit_db->get_col(
                    $orbit_db->prepare("SELECT id FROM employee_document WHERE employee_id = %d", $employee_id)
                );
                $sent_doc_ids = [];

                foreach ($data as $doc) {
                    $doc_id  = intval($doc['id'] ?? 0);
                    $deleted = !empty($doc['_deleted']);

                    // --- Nếu bị đánh dấu xóa ---
                    if ($deleted && $doc_id > 0) {
                        $orbit_db->delete('employee_document', ['id' => $doc_id]);
                        continue;
                    }

                    // --- Chuẩn bị dữ liệu cập nhật ---
                    $doc_data = [
                        'employee_id' => $employee_id,
                        'type_id'     => sanitize_text_field($doc['type_id']),
                        'doc_name'    => sanitize_text_field($doc['doc_name']),
                        'file_url'    => esc_url_raw($doc['file_url']),
                        'upload_date' => !empty($doc['upload_date']) ? sanitize_text_field($doc['upload_date']) : $now,
                        'expiry_date' => !empty($doc['expiry_date']) ? sanitize_text_field($doc['expiry_date']) : null,
                        'notes'       => sanitize_text_field($doc['notes'] ?? ''),
                        'updated_at'  => $now,
                    ];

                    if ($doc_id > 0) {
                        // --- Update ---
                        $orbit_db->update(
                            'employee_document',
                            $doc_data,
                            ['id' => $doc_id]
                        );
                        $sent_doc_ids[] = $doc_id;
                    } else {
                        // --- Insert mới ---
                        $doc_data['created_at'] = $now;
                        $orbit_db->insert('employee_document', $doc_data);
                        $sent_doc_ids[] = $orbit_db->insert_id;
                    }
                }

                // --- Xóa các document cũ không còn trong FE ---
                if (!empty($existing_doc_ids)) {
                    $to_delete = array_diff($existing_doc_ids, $sent_doc_ids);
                    foreach ($to_delete as $del_id) {
                        $orbit_db->delete('employee_document', ['id' => intval($del_id)]);
                    }
                }

                return [
                    'success' => true,
                    'message' => 'Cập nhật tài liệu thành công',
                ];


            // ================= 7. CONTRACTS + COMPENSATIONS =================
            case 'contract':

                file_put_contents(
                    WP_CONTENT_DIR . '/debug_contract_upload.json',
                    json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE)
                );

                if (empty($data) || !is_array($data)) {
                    return new WP_Error('invalid_data', 'Dữ liệu hợp đồng không hợp lệ', ['status' => 400]);
                }

                foreach ($data as $contract) {
                    // --- Nếu bị đánh dấu xóa ---
                    if (isset($contract['_deleted']) && $contract['_deleted'] === true && !empty($contract['id'])) {
                        $contract_id = intval($contract['id']);

                        // Xóa cascade
                        $orbit_db->query($orbit_db->prepare("
                            DELETE i FROM employee_compensation_items i
                            INNER JOIN employee_compensations c ON c.id = i.compensation_id
                            WHERE c.contract_id = %d
                        ", $contract_id));
                        $orbit_db->delete('employee_compensations', ['contract_id' => $contract_id]);
                        $orbit_db->delete('employee_contract', ['id' => $contract_id]);
                        continue;
                    }

                    // --- Thêm hoặc cập nhật hợp đồng ---
                    $contract_id = null;
                    if (!empty($contract['id'])) {
                        $contract_id = intval($contract['id']);
                        $orbit_db->update('employee_contract', [
                            'contract_number' => $contract['contract_number'] ?: null,
                            'contract_type'   => $contract['contract_type'] ?: null,
                            'position_title'  => $contract['position_title'] ?: null,
                            'department_name' => $contract['department_name'] ?: null,
                            'manager_name' => $contract['manager_name'] ?: null,
                            'work_email'      => $contract['work_email'] ?: null,
                            'contract_date'   => $contract['contract_date'] ?: null,
                            'start_date'      => $contract['start_date'] ?: null,
                            'expiry_date'     => $contract['expiry_date'] ?: null,
                            'status'          => $contract['status'] ?: 'active',
                            'notes'           => $contract['notes'] ?: null,
                            'updated_at'      => $now,
                        ], ['id' => $contract_id]);
                    } else {
                        $orbit_db->insert('employee_contract', [
                            'employee_id'     => $employee_id,
                            'contract_number' => $contract['contract_number'] ?: null,
                            'contract_type'   => $contract['contract_type'] ?: null,
                            'position_title'  => $contract['position_title'] ?: null,
                            'department_name' => $contract['department_name'] ?: null,
                            'manager_name' => $contract['manager_name'] ?: null,
                            'work_email'      => $contract['work_email'] ?: null,
                            'contract_date'   => $contract['contract_date'] ?: null,
                            'start_date'      => $contract['start_date'] ?: null,
                            'expiry_date'     => $contract['expiry_date'] ?: null,
                            'status'          => $contract['status'] ?: 'active',
                            'notes'           => $contract['notes'] ?: null,
                            'created_at'      => $now,
                            'updated_at'      => $now,
                        ]);
                        $contract_id = $orbit_db->insert_id;
                    }

                    if (!$contract_id) continue;

                    // --- Đồng bộ COMPENSATIONS ---
                    $existing_comp_ids = $orbit_db->get_col($orbit_db->prepare(
                        "SELECT id FROM employee_compensations WHERE contract_id = %d", $contract_id
                    ));
                    $sent_comp_ids = [];

                    if (!empty($contract['compensations']) && is_array($contract['compensations'])) {
                        foreach ($contract['compensations'] as $comp) {
                            $comp_id = !empty($comp['id']) ? intval($comp['id']) : null;

                            // Nếu FE đánh dấu xóa
                            if (isset($comp['_deleted']) && $comp['_deleted'] === true && $comp_id) {
                                $orbit_db->delete('employee_compensation_items', ['compensation_id' => $comp_id]);
                                $orbit_db->delete('employee_compensations', ['id' => $comp_id]);
                                continue;
                            }

                            // Nếu có id -> update, không có id -> insert
                            if ($comp_id) {
                                $orbit_db->update('employee_compensations', [
                                    'effective_from' => $comp['effective_from'] ?: null,
                                    'effective_to'   => $comp['effective_to'] ?: null,
                                    'reason'         => $comp['reason'] ?: null,
                                    'notes'          => $comp['notes'] ?: null,
                                    'updated_at'     => $now,
                                ], ['id' => $comp_id]);
                            } else {
                                $orbit_db->insert('employee_compensations', [
                                    'employee_id'    => $employee_id,
                                    'contract_id'    => $contract_id,
                                    'effective_from' => $comp['effective_from'] ?: null,
                                    'effective_to'   => $comp['effective_to'] ?: null,
                                    'reason'         => $comp['reason'] ?: null,
                                    'notes'          => $comp['notes'] ?: null,
                                    'created_at'     => $now,
                                    'updated_at'     => $now,
                                ]);
                                $comp_id = $orbit_db->insert_id;
                            }

                            $sent_comp_ids[] = $comp_id;
                            if (!$comp_id) continue;

                            // --- Đồng bộ COMPENSATION ITEMS ---
                            $existing_item_ids = $orbit_db->get_col($orbit_db->prepare(
                                "SELECT id FROM employee_compensation_items WHERE compensation_id = %d", $comp_id
                            ));
                            $sent_item_ids = [];

                            if (!empty($comp['details']) && is_array($comp['details'])) {
                                foreach ($comp['details'] as $detail) {
                                    $detail_id = !empty($detail['id']) ? intval($detail['id']) : null;

                                    // Nếu FE đánh dấu xóa
                                    if (isset($detail['_deleted']) && $detail['_deleted'] === true && $detail_id) {
                                        $orbit_db->delete('employee_compensation_items', ['id' => $detail_id]);
                                        continue;
                                    }

                                    if (empty($detail['component_code'])) continue;

                                    if ($detail_id) {
                                        $orbit_db->update('employee_compensation_items', [
                                            'component_code'  => $detail['component_code'],
                                            'amount'          => floatval($detail['amount'] ?? 0),
                                            'unit'            => $detail['unit'] ?? 'VND',
                                            'basis_code'      => $detail['basis_code'] ?? null,
                                            'currency'        => $detail['currency'] ?? 'VND',
                                            'show_on_payslip' => !empty($detail['show_on_payslip']) ? 1 : 0,
                                            'updated_at'      => $now,
                                        ], ['id' => $detail_id]);
                                    } else {
                                        $orbit_db->insert('employee_compensation_items', [
                                            'compensation_id' => $comp_id,
                                            'component_code'  => $detail['component_code'],
                                            'amount'          => floatval($detail['amount'] ?? 0),
                                            'unit'            => $detail['unit'] ?? 'VND',
                                            'basis_code'      => $detail['basis_code'] ?? null,
                                            'currency'        => $detail['currency'] ?? 'VND',
                                            'show_on_payslip' => !empty($detail['show_on_payslip']) ? 1 : 0,
                                            'created_at'      => $now,
                                            'updated_at'      => $now,
                                        ]);
                                        $detail_id = $orbit_db->insert_id;
                                    }

                                    $sent_item_ids[] = $detail_id;
                                }
                            }

                            // Xóa các item không còn trong FE
                            if (!empty($existing_item_ids)) {
                                $to_delete_items = array_diff($existing_item_ids, $sent_item_ids);
                                foreach ($to_delete_items as $del_id) {
                                    $orbit_db->delete('employee_compensation_items', ['id' => intval($del_id)]);
                                }
                            }
                        }
                    }

                    // Xóa các compensation cũ không còn trong FE
                    if (!empty($existing_comp_ids)) {
                        $to_delete_comps = array_diff($existing_comp_ids, $sent_comp_ids);
                        foreach ($to_delete_comps as $del_id) {
                            $orbit_db->delete('employee_compensation_items', ['compensation_id' => intval($del_id)]);
                            $orbit_db->delete('employee_compensations', ['id' => intval($del_id)]);
                        }
                    }
                }

                break;




            default:
                return new WP_Error('invalid_step', 'Step không hợp lệ', ['status' => 400]);
        }

        return [
            'success' => true,
            'step' => $step,
            'employee_id' => $employee_id,
            'message' => 'Cập nhật thành công'
        ];
    }


    public function delete_employee($request) {
        $id = intval($request['id']);
        if ($id <= 0) {
            return new WP_Error('invalid_id','ID không hợp lệ',['status'=>400]);
        }

        $orbit_db = get_orbit_db();

        if (is_wp_error($orbit_db)) {
            return $orbit_db; // trả lỗi kết nối
        }

        // Danh sách bảng liên kết
        $tables = [
            'employee_bank'              => 'employee_id',
            'employee_tax'               => 'employee_id',
            'employee_dependent'         => 'employee_id',
            'employee_social_insurance'  => 'employee_id',
            'employee_document'          => 'employee_id',
            'employee_contract'          => 'employee_id',
            'employee_compensations'     => 'employee_id',
        ];

        foreach ($tables as $table => $col) {
            $orbit_db->delete($table, [$col => $id]);
        }

        // Cuối cùng xóa personal
        $deleted = $orbit_db->delete('employee_personal',['id'=>$id]);

        if ($deleted === false) {
            return new WP_Error('delete_failed','Không thể xóa nhân viên',['status'=>500]);
        }

        if ($deleted === 0) {
            return ['success'=>false,'message'=>'Nhân viên không tồn tại'];
        }

        return [
            'success'=>true,
            'message'=>"Đã xóa nhân viên ID $id"
        ];
    }
   
    public function change_password($request) {
        global $wpdb;
        $orbit_db = get_orbit_db();
        if (is_wp_error($orbit_db)) return $orbit_db;

        // ✅ Xác thực JWT
        $verify = $this->verify_token($request);
        if (is_wp_error($verify)) return $verify;

        $jwt_employee_id = intval($verify['sub']);
        $jwt_role = strtolower($verify['role'] ?? 'employee');

        // ✅ Lấy body
        $params = $request->get_json_params();
        $target_id = intval($params['id'] ?? $jwt_employee_id);
        $old_password = sanitize_text_field($params['old_password'] ?? '');
        $new_password = sanitize_text_field($params['new_password'] ?? '');

        if (empty($new_password)) {
            return new WP_Error('invalid_data', 'Thiếu mật khẩu mới', ['status' => 400]);
        }

        // 👮 Nếu là nhân viên → chỉ đổi chính mình
        if ($jwt_role === 'employee' && $target_id !== $jwt_employee_id) {
            return new WP_Error('forbidden', 'Bạn không có quyền đổi mật khẩu người khác', ['status' => 403]);
        }

        // 🔒 Lấy mật khẩu hiện tại từ DB
        $current_password = $orbit_db->get_var(
            $orbit_db->prepare("SELECT password FROM employee_personal WHERE id = %d", $target_id)
        );

        if (!$current_password) {
            return new WP_Error('not_found', 'Không tìm thấy nhân viên', ['status' => 404]);
        }

        // ✅ Nếu là nhân viên → phải nhập đúng mật khẩu cũ
        if ($jwt_role === 'employee') {
            if (empty($old_password)) {
                return new WP_Error('missing_old_password', 'Vui lòng nhập mật khẩu cũ', ['status' => 400]);
            }

            // 🧠 So sánh bằng password_verify thay vì so sánh chuỗi
            if (!password_verify($old_password, $current_password)) {
                return new WP_Error('wrong_password', 'Mật khẩu cũ không đúng', ['status' => 403]);
            }
        }
        // 🔑 Hash mật khẩu mới trước khi lưu
        $hashed_password = password_hash($new_password, PASSWORD_BCRYPT);

        $orbit_db->update('employee_personal', [
            'password'   => $hashed_password,
            'updated_at' => current_time('mysql'),
        ], ['id' => $target_id]);

        return [
            'success' => true,
            'message' => 'Đổi mật khẩu thành công',
            'employee_id' => $target_id,
            'role' => $jwt_role
        ];
    }

    public function forgot_password($request) {
        global $wpdb;
        $orbit_db = get_orbit_db();
        if (is_wp_error($orbit_db)) return $orbit_db;

        $params = $request->get_json_params();
        $email = sanitize_email($params['email'] ?? '');

        if (empty($email)) {
            return new WP_Error('missing_email', 'Vui lòng nhập email', ['status' => 400]);
        }

        // 🔍 Tìm nhân viên theo email
        $user = $orbit_db->get_row(
            $orbit_db->prepare("SELECT id, full_name FROM employee_personal WHERE personal_email = %s", $email)
        );

        if (!$user) {
            return new WP_Error('not_found', 'Email không tồn tại trong hệ thống', ['status' => 404]);
        }

        // 🔑 Sinh mật khẩu mới (8 ký tự ngẫu nhiên)
        $new_password = substr(str_shuffle("ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789"), 0, 10);
        $hashed_password = password_hash($new_password, PASSWORD_BCRYPT);

        // 🧩 Cập nhật mật khẩu mới vào DB
        $orbit_db->update(
            'employee_personal',
            [
                'password' => $hashed_password,
                'updated_at' => current_time('mysql'),
            ],
            ['id' => $user->id]
        );

        // ✉️ Gửi email
        $subject = "Mật khẩu mới của bạn - Orbit HR";
        $message = "
            <p>Xin chào <strong>{$user->full_name}</strong>,</p>
            <p>Bạn vừa yêu cầu đặt lại mật khẩu. Dưới đây là mật khẩu mới của bạn:</p>
            <p style='font-size:18px; font-weight:bold; color:#0d6efd;'>{$new_password}</p>
            <p>Vui lòng đăng nhập và thay đổi lại mật khẩu trong phần Cài đặt &gt; Bảo mật tài khoản.</p>
            <hr>
            <p style='font-size:12px;color:#777'>Email này được gửi tự động từ hệ thống Orbit HR. Vui lòng không trả lời.</p>
        ";

        add_filter('wp_mail_content_type', function () { return 'text/html'; });
        $mail_sent = wp_mail($email, $subject, $message);
        remove_filter('wp_mail_content_type', 'text/html');

        if (!$mail_sent) {
            return new WP_Error('mail_failed', 'Không gửi được email. Kiểm tra cấu hình SMTP.', ['status' => 500]);
        }

        return [
            'success' => true,
            'message' => 'Đã gửi mật khẩu mới qua email. Vui lòng kiểm tra hộp thư.',
            'new_password' => $new_password // ⚠️ chỉ giữ để test, sau có thể bỏ
        ];
    }


}

new Rocket_Employees();