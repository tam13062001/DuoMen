<?php
/**
 * Plugin Name: Rocket Compensation API
 */
include_once get_template_directory() . '/inc/helpers/orbit-db.php';
class Rocket_Compensation {  
    public function __construct(){
        add_action('rest_api_init', [$this,'register_routes']);
    }

    public function register_routes(){

        // API lấy profile full thông tin (personal + contract)
        register_rest_route('rocket/v1','/compensation/(?P<id>\d+)',[
            'methods' => 'GET',
            'callback' => [$this,'show_full_compensation'],
            'permission_callback' => '__return_true'
        ]);
    }

    public function show_full_compensation($request){
        $id = intval($request['id']);
        $orbit_db = get_orbit_db();

        if (is_wp_error($orbit_db)) {
            return $orbit_db; // trả lỗi kết nối
        }

        $employee_table = 'employee_compensations';
        $component_table = 'compensation_components';
        $detail_table   = 'employee_compensation_items';

        // Compensation chính
        $compensation = $orbit_db->get_row(
            $orbit_db->prepare("SELECT * FROM $employee_table WHERE id = %d", $id),
            ARRAY_A
        );

        if(!$compensation){
            return [
                'success' => false,
                'message' => 'Compensation not found'
            ];
        }

        // Lấy chi tiết item của compensation_id
        $items = $orbit_db->get_results(
            $orbit_db->prepare("SELECT * FROM $detail_table WHERE compensation_id = %d", $id),
            ARRAY_A
        );

        // Lấy danh sách component mapping theo code
        $components = [];
        if($items){
            $codes = array_column($items, 'component_code');
            $placeholders = implode(',', array_fill(0, count($codes), '%s'));
            $components = $orbit_db->get_results(
                $orbit_db->prepare("SELECT * FROM $component_table WHERE code IN ($placeholders)", ...$codes),
                ARRAY_A
            );
        }

        return [
            'success' => true,
            'data' => [
                'compensation' => $compensation,
                'items'        => $items,
                'components'   => $components
            ]
        ];
    }

}

new Rocket_Compensation();