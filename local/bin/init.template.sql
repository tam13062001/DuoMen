CREATE DATABASE IF NOT EXISTS orbit_db
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE orbit_db;

-- 1. Thông tin cá nhân nhân viên
CREATE TABLE employee_personal (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    avatar_url VARCHAR(255), -- link ảnh hoặc tên file
    personal_email VARCHAR(255),
    dob DATE,
    gender CHAR(1),
    ethnicity VARCHAR(100),
    nationality VARCHAR(100),
    cccd_id VARCHAR(50),
    cccd_issued_date DATE,
    cccd_issued_place VARCHAR(255),
    hometown VARCHAR(255),
    permanent_address TEXT,
    temporary_address TEXT,
    phone VARCHAR(20),
    marital_status ENUM('single','married'),
    emergency_contact_name VARCHAR(255),
    emergency_contact_relationship VARCHAR(100),
    emergency_contact_phone VARCHAR(20),
    emergency_contact_address TEXT,
    education_level ENUM('bachelor','diploma','master'),
    education_grade ENUM('Excellent','Good','Average'),
    education_certificate BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;


CREATE TABLE roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    role_name VARCHAR(50) NOT NULL,
    description TEXT
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE employee_document (
    id INT AUTO_INCREMENT PRIMARY KEY,
    employee_id INT NOT NULL,
    type_id INT,
    doc_name VARCHAR(255) NOT NULL,           -- tên hiển thị (VD: CCCD/CMND, Hợp đồng lao động…)
    file_url VARCHAR(500) NOT NULL,           -- link file hoặc đường dẫn lưu trong server
    upload_date DATE NOT NULL,                -- ngày tải lên
    expiry_date DATE DEFAULT NULL,            -- ngày hết hạn (nếu có, ví dụ hợp đồng)
    notes TEXT DEFAULT NULL,                  -- ghi chú thêm
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (employee_id) REFERENCES employee_personal(id)
        ON DELETE CASCADE ON UPDATE CASCADE
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE category_doc (
    id INT AUTO_INCREMENT PRIMARY KEY,
    doc_type ENUM('cccd','contract','degree','certificate','other') NOT NULL,
    description TEXT
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 2. Thông tin ngân hàng
CREATE TABLE employee_bank (
    id INT AUTO_INCREMENT PRIMARY KEY,
    employee_id INT NOT NULL,
    bank_account_number VARCHAR(100),
    bank_name VARCHAR(255),
    bank_address VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (employee_id) REFERENCES employee_personal(id)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 3. Thông tin thuế
CREATE TABLE employee_tax (
    id INT AUTO_INCREMENT PRIMARY KEY,
    employee_id INT NOT NULL,
    tax_code VARCHAR(100),
    tax_code_issued_date DATE,
    tax_code_issued_place VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (employee_id) REFERENCES employee_personal(id)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 4. Người phụ thuộc
CREATE TABLE employee_dependent (
    id INT AUTO_INCREMENT PRIMARY KEY,
    employee_id INT NOT NULL,
    number_of_dependent INT,
    dependent_full_name VARCHAR(255),
    dependent_tax_code VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (employee_id) REFERENCES employee_personal(id)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 5. Bảo hiểm xã hội
CREATE TABLE employee_social_insurance (
    id INT AUTO_INCREMENT PRIMARY KEY,
    employee_id INT NOT NULL,
    social_insurance_number VARCHAR(100),
    household_code VARCHAR(100),
    social_insurance_start_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (employee_id) REFERENCES employee_personal(id)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 6. Hợp đồng lao động
CREATE TABLE employee_contract (
    id INT AUTO_INCREMENT PRIMARY KEY,
    employee_id INT NOT NULL,
    contract_number VARCHAR(100),
    contract_type ENUM('probation','fixed_term','indefinite'),
    position_title VARCHAR(255),
    department_name VARCHAR(255),
    manager_name VARCHAR(255),
    work_email VARCHAR(255),
    contract_date DATE,
    start_date DATE,
    expiry_date DATE,
    status ENUM('draft','active','expired','terminated','cancelled'),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (employee_id) REFERENCES employee_personal(id)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;


-- 7. Bảng lương cơ bản
CREATE TABLE employee_salary (
    id INT AUTO_INCREMENT PRIMARY KEY,
    employee_id INT NOT NULL,
    salary_amount DECIMAL(15,2),
    effective_date DATE,
    remarks TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (employee_id) REFERENCES employee_personal(id)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 8. Compensation
CREATE TABLE employee_compensations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    employee_id INT NOT NULL,
    contract_id INT NOT NULL,
    effective_from DATE,
    effective_to DATE,
    reason VARCHAR(255),
    supersedes_compensation_id INT,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (employee_id) REFERENCES employee_personal(id),
    FOREIGN KEY (contract_id) REFERENCES employee_contract(id),
    FOREIGN KEY (supersedes_compensation_id) REFERENCES employee_compensations(id)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 9. Compensation components
CREATE TABLE compensation_components (
    code VARCHAR(100) PRIMARY KEY,
    name_vi VARCHAR(255) NOT NULL,
    category ENUM('earning','allowance','benefit','deduction','bonus') NOT NULL,
    unit ENUM('amount','percent') NOT NULL DEFAULT 'amount',
    default_basis_code VARCHAR(100) DEFAULT NULL,
    taxable BOOLEAN NOT NULL DEFAULT TRUE,
    si_applicable BOOLEAN NOT NULL DEFAULT FALSE,
    display_order INT DEFAULT 0,
    active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (default_basis_code) REFERENCES compensation_components(code)
        ON DELETE SET NULL ON UPDATE CASCADE
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;


-- 10. Chi tiết compensation
CREATE TABLE employee_compensation_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    compensation_id INT NOT NULL,
    component_code VARCHAR(100) NOT NULL,
    amount DECIMAL(15,2) NOT NULL DEFAULT 0.00,
    unit ENUM('amount', 'percent') NOT NULL DEFAULT 'amount',
    basis_code VARCHAR(100) DEFAULT NULL,
    currency CHAR(3) NOT NULL DEFAULT 'VND',
    show_on_payslip BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (compensation_id) REFERENCES employee_compensations(id) 
        ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (component_code) REFERENCES compensation_components(code) 
        ON DELETE RESTRICT ON UPDATE CASCADE,
    FOREIGN KEY (basis_code) REFERENCES compensation_components(code) 
        ON DELETE SET NULL ON UPDATE CASCADE
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;


ALTER TABLE employee_personal
ADD COLUMN password VARCHAR(255) NOT NULL AFTER full_name;
ALTER TABLE employee_personal
ADD COLUMN role_id INT DEFAULT 3 AFTER password;
ALTER TABLE employee_personal
ADD COLUMN active TINYINT(1) NOT NULL DEFAULT 1 AFTER role_id;
ALTER TABLE employee_bank
ADD COLUMN account_holder VARCHAR(255) AFTER bank_name;


CREATE TABLE attendance_records (
    id INT AUTO_INCREMENT PRIMARY KEY,
    employee_id INT NOT NULL,
    attendance_date DATE NOT NULL,
    check_in_time TIME,
    check_out_time TIME,
    total_work_hours DECIMAL(5,2) DEFAULT 0,
    work_status ENUM('present','absent','late','on_leave','remote','holiday') DEFAULT 'present',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (employee_id) REFERENCES employee_personal(id)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE attendance_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    employee_id INT NOT NULL,
    log_type ENUM('check_in','check_out','manual_edit') NOT NULL,
    log_time DATETIME NOT NULL,
    device_id VARCHAR(100), -- nếu có dùng máy chấm công
    ip_address VARCHAR(50), -- nếu chấm qua web/app
    created_by INT,         -- ai chỉnh sửa (nếu có)
    notes TEXT,
    FOREIGN KEY (employee_id) REFERENCES employee_personal(id)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE leave_ot (
    id INT AUTO_INCREMENT PRIMARY KEY,
    employee_id INT NOT NULL,
    type ENUM('leave','ot') NOT NULL, -- nghỉ phép hoặc tăng ca
    leave_type ENUM('annual','sick','unpaid','remote','other') DEFAULT NULL, -- loại phép
    ot_hours DECIMAL(5,2) DEFAULT 0, -- số giờ OT (nếu type='ot')
    leave_days DECIMAL(5,2) DEFAULT 0, -- số ngày nghỉ (nếu type='leave')
    start_time DATETIME NULL, -- thời gian bắt đầu nghỉ hoặc OT
    end_time DATETIME NULL,   -- thời gian kết thúc
    reason TEXT, -- lý do nghỉ hoặc OT
    status ENUM('pending','approved','rejected','cancelled') DEFAULT 'pending', -- trạng thái duyệt
    approved_by INT NULL, -- người duyệt
    created_by INT NULL,  -- người tạo đơn
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (employee_id) REFERENCES employee_personal(id) ON DELETE CASCADE,

    FOREIGN KEY (approved_by) REFERENCES employee_personal(id) ON DELETE SET NULL,
    FOREIGN KEY (created_by) REFERENCES employee_personal(id) ON DELETE SET NULL
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;