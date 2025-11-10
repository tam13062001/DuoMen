<?php
// helpers/orbit-db.php

if ( ! function_exists('get_orbit_db') ) {
    /**
     * Hàm kết nối đến database orbit_db
     * Tạo kết nối 1 lần duy nhất rồi dùng lại.
     *
     * @return wpdb|WP_Error
     */
    function get_orbit_db() {
        static $orbit_db = null; // giữ kết nối duy nhất trong suốt request

        if ($orbit_db === null) {
            $orbit_db = new wpdb(DB_USER, DB_PASSWORD, 'orbit_db', DB_HOST);
            // Host : u623323914_gaSZE, local: orbit_db
            if (!$orbit_db || ! $orbit_db->dbh) {
                return new WP_Error(
                    'orbit_db_connection_failed',
                    'Không thể kết nối DB orbit_db.',
                    ['status' => 500]
                );
            }
        }

        return $orbit_db;
    }
}