CREATE DATABASE IF NOT EXISTS duomen_db
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE duomen_db;

CREATE TABLE `vouchers` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `code` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Mã Voucher',
  
  -- Trạng thái sử dụng (Yêu cầu của bạn)
  `used` tinyint(1) NOT NULL DEFAULT 0 COMMENT '0: Còn, 1: Đã dùng',
  `used_at` datetime DEFAULT NULL COMMENT 'Thời điểm chuyển used thành 1',
  
  -- Cột phục vụ cơ chế LOCK (Chống trùng)
  `locked_at` datetime DEFAULT NULL COMMENT 'Thời điểm bắt đầu giữ mã',
  `lock_session_id` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Mã định danh phiên làm việc đang giữ khóa',
  
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_unique_code` (`code`), -- Đảm bảo mã không trùng nhau
  KEY `idx_find_available` (`used`, `locked_at`), -- Index giúp tìm mã còn trống cực nhanh
  KEY `idx_session` (`lock_session_id`) -- Index giúp tìm lại mã mình vừa khóa nhanh hơn
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `vouchers` (`code`, `used`) VALUES 
('TEST-CODE-001', 0),
('TEST-CODE-002', 0),
('TEST-CODE-003', 0),
('TEST-CODE-004', 0),
('TEST-CODE-005', 0);

-- Giả sử biến session_id của người dùng hiện tại là 'user_ABC_123'
UPDATE `vouchers` 
SET 
    `locked_at` = NOW(),
    `lock_session_id` = 'user_ABC_123' 
WHERE 
    `used` = 0 
    AND (`locked_at` IS NULL OR `locked_at` < DATE_SUB(NOW(), INTERVAL 5 MINUTE))
LIMIT 1;

