// API service for employee management with WordPress REST API

const API_BASE_URL = "/index.php?rest_route=/rocket/v1"

export type EmployeeStep =
  | "personal"
  | "bank"
  | "tax"
  | "dependents"
  | "insurance"
  | "documents"
  | "contract"
  | "compensation"
  | "full"

export type ApiResponse<T = any> = {
  success: boolean
  step?: string
  employee_id?: number
  compensation_id?: number
  data?: T
  code?: string
  message?: string
}

export async function createEmployeeStep(step: EmployeeStep, data: any): Promise<ApiResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/newemployee`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        step,
        data,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || "API request failed")
    }

    return await response.json()
  } catch (error) {
    console.error(`[v0] Error creating employee step ${step}:`, error)
    throw error
  }
}

// Upload document file lên WP API
export async function uploadEmployeeDocument(file: File, typeId: string, employeeId: number) {
  const formData = new FormData()
  formData.append("file", file)
  formData.append("doc_name", file.name)
  formData.append("type_id", typeId)
  formData.append("id", String(employeeId))

  const res = await fetch(`${API_BASE_URL}/upload_document`, {
    method: "POST",
    body: formData,
  })

  if (!res.ok) {
    const err = await res.json()
    throw new Error(err.message || "Upload document failed")
  }

  return res.json()
}

// Helper function to map form data to API format for personal step
export function mapPersonalInfoToApi(formData: any) {
  return {
    full_name: formData.fullName,
    personal_email: formData.personalEmail,
    avatar_url: formData.avatarUrl || null,
    dob: formData.dateOfBirth || null,
    gender: formData.gender || null,
    ethnicity: formData.ethnicity || null,
    nationality: formData.nationality || null,
    cccd_id: formData.idNumber || null,
    cccd_issued_date: formData.idIssueDate || null,
    cccd_issued_place: formData.idIssuePlace || null,
    hometown: formData.hometown || null,
    permanent_address: formData.permanentAddress || null,
    temporary_address: formData.currentAddress || null,
    phone: formData.personalPhone || null,
    marital_status: formData.maritalStatus || null,

    emergency_contact_name: formData.emergencyContactName || null,
    emergency_contact_relationship: formData.emergencyContactRelationship || null,
    emergency_contact_phone: formData.emergencyContactPhone || null,
    emergency_contact_address: formData.emergencyContactAddress || null,

    education_level: formData.educationLevel || null,
    education_grade: formData.major || null,
    education_certificate: formData.educationCertificate ? Number.parseInt(formData.educationCertificate) : null,
    password: formData.password || "123456",
    role_id: formData.roleId || 3,
  }
}

// Helper function to map bank account to API format
export function mapBankAccountToApi(bankAccount: any, employeeId: number) {
  return {
    employee_id: employeeId,
    bank_account_number: bankAccount.accountNumber,
    bank_name: bankAccount.bankName,
    account_holder: bankAccount.accountHolder || null,
    bank_address: bankAccount.addressBank || null,
  }
}

// Helper function to map tax info to API format
export function mapTaxInfoToApi(formData: any, employeeId: number) {
  return {
    employee_id: employeeId,
    tax_code: formData.taxCode,
    tax_code_issued_date: formData.taxCodeIssuedDate || null,
    tax_code_issued_place: formData.taxCodeIssuedPlace || null,
  }
}

// Helper function to map dependent to API format
export function mapDependentToApi(dependent: any, employeeId: number) {
  return {
    employee_id: employeeId,
    dependent_full_name: dependent.fullName,
    relationship: dependent.relationship,
    dependent_tax_code: dependent.idNumber || null,
  }
}

// Helper function to map insurance to API format
export function mapInsuranceToApi(formData: any, employeeId: number) {
  return {
    employee_id: employeeId,
    social_insurance_number: formData.socialInsuranceNumber,
    social_insurance_start_date: formData.socialInsuranceStartDate,
    household_code: formData.healthInsuranceNumber,
  }
}

// Helper function to map document to API format
export function mapDocumentToApi(document: any, employeeId: number) {
  return {
    employee_id: employeeId,
    type_id: document.type_id,
    doc_name: document.docName,
    file_url: document.fileUrl,
    upload_date: document.uploadDate || new Date().toISOString().split("T")[0],
    expiry_date: document.expiryDate || null,
    notes: document.notes || null,
  }
}

export function mapExistingDocsToApi(existingDocs: any[]) {
  return existingDocs.map((d) => ({
    id: d.id,
    type_id: d.typeId,
    doc_name: d.docName,
    file_url: d.fileUrl,
    upload_date: d.uploadDate,
    expiry_date: d.expiryDate,
    notes: d.notes || "",
    _deleted: d._deleted || false,
  }))
}


// Helper function to map contract to API format (with multiple compensations)
// ✅ Map toàn bộ danh sách hợp đồng sang format API
export function mapContractToApi(contracts: any[], employeeId: number) {
  if (!Array.isArray(contracts)) return []

  return contracts
    .filter(
      (c) =>
        !c._deleted &&
        (c.contractNumber || c.contractType || c.positionTitle || c.departmentName)
    )
    .map((contract) => ({
      id: contract.id || null,
      employee_id: employeeId,
      contract_number: contract.contractNumber || null,
      contract_type: contract.contractType || null,
      position_title: contract.positionTitle || null,
      department_name: contract.departmentName || null,
      manager_name: contract.managerName || null,
      work_email: contract.workEmail || null,
      contract_date: contract.contractDate || null,
      start_date: contract.startDate || null,
      expiry_date: contract.expiryDate || null,
      status: contract.status || "active",
      notes: contract.notes || null,
      _deleted: contract._deleted || false,

      compensations:
        contract.compensations
          ?.filter((comp: any) => !comp._deleted && comp.details?.length > 0)
          .map((comp: any) => ({
            id: comp.id || null,
            effective_from: comp.effective_from || null,
            effective_to: comp.effective_to || null,
            reason: comp.reason || "",
            notes: comp.notes || "",
            _deleted: comp._deleted || false,

            details:
              comp.details
                ?.filter((item: any) => !item._deleted && item.componentCode)
                .map((item: any) => ({
                  id: item.id || null,
                  component_code: item.componentCode || "",
                  amount: Number(item.amount) || 0,
                  unit: item.unit || "VND",
                  currency: item.currency || "VND",
                  basis_code: item.basis_code || null,
                  show_on_payslip: item.showOnPayslip ? 1 : 0,
                  _deleted: item._deleted || false,
                })) || [],
          })) || [],
    }))
}





// Nút xóa nhân viên
export async function deleteEmployee(id: string | number) {
  const res = await fetch(`${API_BASE_URL}/employee/${id}`, {
    method: "DELETE",
  })
  return res.json()
}

// Xem chi tiết nhân viên
export async function getEmployeeDetails(id: number) {
  const res = await fetch(`${API_BASE_URL}/employee/${id}`)
  return res.json()
}

//Upload nhân viên
export async function updateEmployeeStep(
  employeeId: number,
  step: EmployeeStep,
  data: any
): Promise<ApiResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/employee/${employeeId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ step, data }),
    })
    return await response.json()
  } catch (err: any) {
    return { success: false, message: err.message }
  }
}

// Đổi mật khẩu nhân viên (có xác thực JWT)
export async function changeEmployeePassword({
  token,
  oldPassword,
  newPassword,
  employeeId, // chỉ cần nếu là admin đổi cho người khác
}: {
  token: string
  oldPassword?: string
  newPassword: string
  employeeId?: number
}): Promise<ApiResponse> {
  try {
    const res = await fetch(`${API_BASE_URL}/employee/change_password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        id: employeeId, // optional — nếu không có, BE sẽ lấy từ token
        old_password: oldPassword,
        new_password: newPassword,
      }),
    })

    const data = await res.json()
    if (!res.ok) throw new Error(data.message || "Đổi mật khẩu thất bại")
    return data
  } catch (err: any) {
    console.error("Error changing password:", err)
    return { success: false, message: err.message }
  }
}
