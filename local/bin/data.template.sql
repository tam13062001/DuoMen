USE orbit_db;

-- 1. Thông tin cá nhân nhân viên
INSERT INTO employee_personal 
(full_name, personal_email, dob, gender, ethnicity, nationality, cccd_id, cccd_issued_date, cccd_issued_place, hometown, permanent_address, temporary_address, phone, marital_status, emergency_contact_name, emergency_contact_relationship, emergency_contact_phone, emergency_contact_address, education_level, education_grade, education_certificate, password, role_id) 
VALUES
('Đoàn Xuân Tâm', 'tam@rocketgroup.asia', '1995-05-20', 'M', 'Kinh', 'Việt Nam', '123456789', '2015-06-01', 'Hà Nội', 'Nam Định', '123 Trần Hưng Đạo, Nam Định', 'Hà Nội', '0912345678', 'single', 'Nguyễn Văn A', 'Anh trai', '0987654321', 'Hà Nội', 'bachelor', 'Good', TRUE, 'tam12345', 3),
('Nguyễn Thị Lan', 'lan@rocketgroup.asia', '1992-08-15', 'F', 'Tày', 'Việt Nam', '987654321', '2012-03-15', 'Bắc Giang', 'Bắc Giang', '45 Lý Thường Kiệt, Bắc Giang', 'Hà Nội', '0901234567', 'married', 'Phạm Văn B', 'Chồng', '0977123456', 'Hà Nội', 'master', 'Excellent', TRUE, 'lan12345', 2);

INSERT INTO roles (role_name, description) VALUES
('admin', 'Quản trị hệ thống'),
('manager', 'Quản lý'),
('employee', 'Nhân viên');


-- 2. Thông tin ngân hàng
INSERT INTO employee_bank (employee_id, bank_account_number, bank_name, bank_address) VALUES
(1, '123456789012', 'Vietcombank', 'Chi nhánh Hà Nội'),
(2, '987654321098', 'Techcombank', 'Chi nhánh Bắc Giang');

-- 3. Thông tin thuế
INSERT INTO employee_tax (employee_id, tax_code, tax_code_issued_date, tax_code_issued_place) VALUES
(1, 'TX123456', '2016-07-01', 'Hà Nội'),
(2, 'TX654321', '2013-04-20', 'Bắc Giang');

-- 4. Người phụ thuộc
INSERT INTO employee_dependent (employee_id, number_of_dependent, dependent_full_name, dependent_tax_code) VALUES
(1, 1, 'Nguyễn Văn C', 'DP123'),
(2, 2, 'Phạm Thị D', 'DP456');

-- 5. Bảo hiểm xã hội
INSERT INTO employee_social_insurance (employee_id, social_insurance_number, household_code, social_insurance_start_date) VALUES
(1, 'SI123456', 'HK001', '2017-01-01'),
(2, 'SI654321', 'HK002', '2015-09-01');

-- 6. Hợp đồng lao động
INSERT INTO employee_contract (employee_id, contract_number, contract_type, position_title, department_name, manager_name, work_email, contract_date, start_date, expiry_date, status, notes) VALUES
(1, 'HD001', 'fixed_term', 'Developer', 'IT', NULL, 'tam@rocketgroup.asia', '2020-01-01', '2020-01-15', '2022-01-15', 'active', 'Hợp đồng chính thức'),
(2, 'HD002', 'indefinite', 'Manager', 'HR', NULL, 'lan@rocketgroup.asia', '2019-03-01', '2019-03-15', NULL, 'active', 'Hợp đồng vô thời hạn');

-- 7. Bảng lương cơ bản
INSERT INTO employee_salary (employee_id, salary_amount, effective_date, remarks) VALUES
(1, 15000000.00, '2022-01-01', 'Lương cơ bản Developer'),
(2, 25000000.00, '2022-01-01', 'Lương cơ bản Manager');

-- 8. employee_compensations
INSERT INTO employee_compensations (employee_id, contract_id, effective_from, reason, notes) VALUES
(1, 1, '2023-01-01', 'Điều chỉnh lương', 'Tăng lương theo thâm niên'),
(2, 2, '2023-01-01', 'Điều chỉnh lương', 'Phụ cấp thêm KPI');

-- 9. compensation_components
INSERT INTO compensation_components (code, name_vi, category, unit, taxable, si_applicable, display_order, active) VALUES
('base_salary', 'Lương cơ bản', 'earning', 'amount', TRUE, TRUE, 1, TRUE),
('insurance_base_salary', 'Lương đóng BHXH', 'earning', 'amount', TRUE, TRUE, 2, TRUE),
('lunch_allowance', 'Trợ cấp cơm trưa', 'allowance', 'amount', TRUE, FALSE, 3, TRUE),
('phone_allowance', 'Trợ cấp điện thoại', 'allowance', 'amount', TRUE, FALSE, 4, TRUE),
('uniform_allowance', 'Trợ cấp trang phục', 'allowance', 'amount', TRUE, FALSE, 5, TRUE),
('kpi_bonus', 'Lương KPIs', 'bonus', 'percent', TRUE, FALSE, 6, TRUE),
('other_allowance', 'Trợ cấp khác', 'allowance', 'amount', TRUE, FALSE, 7, TRUE);

-- 10. employee_compensation_items
INSERT INTO employee_compensation_items (compensation_id, component_code, amount, unit, currency, show_on_payslip) VALUES
(1, 'base_salary', 20000000, 'amount', 'VND', TRUE),
(1, 'lunch_allowance', 1000000, 'amount', 'VND', TRUE),
(1, 'kpi_bonus', 10, 'percent', 'VND', TRUE),  -- 10% KPI
(2, 'base_salary', 12000000, 'amount', 'VND', TRUE),
(2, 'lunch_allowance', 800000, 'amount', 'VND', TRUE),
(2, 'kpi_bonus', 15, 'percent', 'VND', TRUE);  -- 15% KPI

-- 11. employee_document
INSERT INTO category_doc (doc_type, description) VALUES
('cccd', 'Căn cước công dân / Chứng minh nhân dân'),
('contract', 'Hợp đồng lao động'),
('degree', 'Bằng cấp'),
('certificate', 'Chứng chỉ'),
('other', 'Khác');

INSERT INTO employee_document (employee_id,type_id, doc_name, file_url, upload_date, expiry_date, notes)
VALUES
(1, '1', 'CCCD Nguyễn Văn A', 'https://example.com/docs/cccd_nguyenvana.pdf', CURDATE(), NULL, 'CCCD bản scan'),
(1, '2', 'Hợp đồng lao động 2025', 'https://example.com/docs/contract_nv_a.pdf', CURDATE(), '2026-12-31', 'HĐLĐ thời hạn 1 năm'),
(1, '3', 'Bằng đại học CNTT', 'https://example.com/docs/degree_nv_a.jpg', CURDATE(), NULL, 'Đại học Bách khoa'),
(1, '4', 'Chứng chỉ tiếng Anh TOEIC', 'https://example.com/docs/toeic_nv_a.pdf', CURDATE(), '2027-01-01', 'TOEIC 850'),
(1, '5', 'Sổ hộ khẩu', 'https://example.com/docs/sohokhau_nv_a.pdf', CURDATE(), NULL, 'Sổ hộ khẩu gia đình');

