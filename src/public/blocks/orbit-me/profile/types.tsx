export interface PersonalInfo {
  id: string
  full_name: string
  avatar_url:string
  personal_email: string
  phone: string
  permanent_address: string
  temporary_address : string
  dob: Date
  gender: string
  nationality: string
  ethnicity:string
  marital_status: string
  hometown : string
  cccd_id: string
  cccd_issued_date : string 
  cccd_issued_place : string
  emergency_contact_name: string
  emergency_contact_relationship: string
  emergency_contact_phone: string
  emergency_contact_address : string
  education_level : string
  education_grade : string
  education_certificate : string
}

export interface WorkInfo {
  contract_number: string
  contract_type:string
  position_title: string
  department_name: string
  manager_user_id: string
  work_email: string
  start_date: Date
  expiry_date : Date
  status : string 
  notes : string 
}

export interface Bank {
  id: string
  bank_account_number : string
  bank_name : string
  bank_address : string
}
export interface Tax {
  id: string
  tax_code: string
  tax_code_issued_date: Date
  tax_code_issued_place: string
}

export interface CompensationDetail {
  id: string
  compensation_id: string
  component_code: string
  amount: string
  unit: string
  basis_code?: string | null
  currency: string
  show_on_payslip: string
  created_at?: string
  updated_at?: string
}

export interface Compensations {
  id: string
  employee_id: string
  contract_id: string
  effective_from: string | null
  effective_to: string | null
  reason: string | null
  notes: string | null
  items?: CompensationDetail[] // ✅ nằm trong từng compensation
  created_at?: string
  updated_at?: string
}

export interface CompensationComponents {
  code: string
  name_vi: string
  category: "earning" | "allowance" | "benefit" | "deduction"
  unit: "amount" | "percent"
  default_basis_code?: string | null
  taxable: boolean
  si_applicable: boolean
  display_order: number
  active: boolean
}


export interface Document {
  id: number
  employee_id : string
  type_id : string
  doc_name : string
  file_url: string
  upload_date : Date
  expiry_date : Date
  notes : string
}
export interface SocialInsurance {
  id: string
  employee_id : string
  social_insurance_number: string
  household_code: string
  social_insurance_start_date: Date
}