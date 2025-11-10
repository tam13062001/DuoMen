"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import {
  User, CreditCard, FileText, Users, Shield, FileSignature, DollarSign,
  Check, X, ArrowLeft, Upload, type File,
} from "lucide-react"

import { PersonalInfoStep } from "./AddStep/personal-info-step"
import { BankAccountsStep } from "./AddStep/bank-accounts-step"
import { TaxInfoStep } from "./AddStep/tax-info-step"
import { DependentsStep } from "./AddStep/dependents-step"
import { InsuranceStep } from "./AddStep/insurance-step"
import { DocumentsStep } from "./AddStep/documents-step"
import { ContractStep } from "./AddStep/contract-step"

import {
  createEmployeeStep, uploadEmployeeDocument,
  mapPersonalInfoToApi, mapBankAccountToApi, mapTaxInfoToApi, mapDependentToApi,
  mapInsuranceToApi, mapExistingDocsToApi, getEmployeeDetails, updateEmployeeStep,
  mapContractToApi,
} from "../../api/api-profile"

import { message } from "antd"

type FormStep = { id: string; title: string; icon: any; completed: boolean }
type EmployeeFormPageProps = { mode: "add" | "edit"; employeeId?: string; onCancel?: () => void }

const DOC_TYPE_IDS = {
  cccd: "1",
  contract: "2",
  degree: "3",
  certificate: "4",
  other: "5",
} as const

export function EmployeeFormPage({ mode, employeeId, onCancel }: EmployeeFormPageProps) {
  const [currentStep, setCurrentStep] = useState("personal")

  const [formData, setFormData] = useState({
    fullName: "", personalEmail: "", personalPhone: "",
    dateOfBirth: "", gender: "", ethnicity: "", maritalStatus: "",
    nationality: "", idNumber: "", idIssueDate: "", idIssuePlace: "",
    permanentAddress: "", currentAddress: "", hometown: "", avatarUrl: "",
    educationLevel: "", major: "", educationCertificate: "", graduationYear: "",
    emergencyContactName: "", emergencyContactPhone: "",
    emergencyContactRelationship: "", emergencyContactAddress: "",roleId: "", password: "",

    // CONTRACT (dùng cho contract chính)
    contractType: "", contractNumber: "", positionTitle: "", departmentName: "",
    managerName: "", workEmail: "", startDate: "", expiryDate: "",
    contractDate: "", probationEndDate: "", status: "", notes: "",

    // BANK
    bankAccountNumber: "", bankName: "", bankAddress: "",

    // TAX
    taxCode: "", taxCodeIssuedDate: "", taxCodeIssuedPlace: "", taxDependents: "0",

    // INSURANCE
    socialInsuranceNumber: "", socialInsuranceStartDate: "", healthInsuranceNumber: "",
  })

  const [contracts, setContracts] = useState<any[]>([
    {
      contractType: "",
      startDate: "",
      expiryDate: "",
      reason: "",
      contractNumber: "",
      positionTitle: "",
      departmentName: "",
      managerName: "",
      workEmail: "",
      contractDate: "",
      status: "active",
      notes: "",
      compensations: [],
    },
  ])

  const [bankAccounts, setBankAccounts] = useState([
    { bankName: "", accountNumber: "", accountHolder: "", addressBank: "", isPrimary: true },
  ])

  const [dependents, setDependents] = useState([
    { fullName: "", relationship: "", idNumber: "", isRegisteredDependent: true },
  ])

  // ✅ Thay thế đoạn cũ
  type DocWithName = {
    file: File
    name: string
  }

const [documents, setDocuments] = useState({
  cccd: [] as DocWithName[],
  contract: [] as DocWithName[],
  degree: [] as DocWithName[],
  certificate: [] as DocWithName[],
  others: [] as DocWithName[],
})


  const [existingDocs, setExistingDocs] = useState<any[]>([])

  const [loading, setLoading] = useState(false)
  const [createdEmployeeId, setCreatedEmployeeId] = useState<number | null>(null)

  // ==================== FETCH DATA EDIT MODE ====================
  useEffect(() => {
    const fetchEmployee = async () => {
      if (mode !== "edit" || !employeeId) return
      try {
        setLoading(true)
        const res = await getEmployeeDetails(Number(employeeId))
        if (!res || !res.success) return message.error("Không tải được thông tin nhân viên")

        const emp = res.data
        console.log("=== EMPLOYEE RAW DATA ===", emp)

        // ==================== PERSONAL ====================
        setFormData((prev) => ({
          ...prev,
          fullName: emp.personal?.full_name || "",
          personalEmail: emp.personal?.personal_email || "",
          personalPhone: emp.personal?.phone || "",
          dateOfBirth: emp.personal?.dob || "",
          gender: emp.personal?.gender || "",
          ethnicity: emp.personal?.ethnicity || "",
          maritalStatus: emp.personal?.marital_status || "",
          nationality: emp.personal?.nationality || "",
          idNumber: emp.personal?.cccd_id || "",
          idIssueDate: emp.personal?.cccd_issued_date || "",
          idIssuePlace: emp.personal?.cccd_issued_place || "",
          permanentAddress: emp.personal?.permanent_address || "",
          currentAddress: emp.personal?.temporary_address || "",
          hometown: emp.personal?.hometown || "",
          avatarUrl: emp.personal?.avatar_url || "",
          emergencyContactName: emp.personal?.emergency_contact_name || "",
          emergencyContactPhone: emp.personal?.emergency_contact_phone || "",
          emergencyContactRelationship: emp.personal?.emergency_contact_relationship || "",
          emergencyContactAddress: emp.personal?.emergency_contact_address || "",
          educationLevel: emp.personal?.education_level || "",
          major: emp.personal?.education_grade || "",
          educationCertificate: emp.personal?.education_certificate
            ? String(emp.personal.education_certificate)
            : "",
          graduationYear: emp.personal?.graduation_year || "",
        }))

       // ==================== BANK ====================
        if (emp.bank?.length) {
          setBankAccounts(
            emp.bank.map((b: any) => ({
              bankName: b.bank_name || "",
              accountNumber: b.bank_account_number || "",
              accountHolder: b.account_holder || "",
              addressBank: b.bank_address || "",
              isPrimary: !!b.is_primary,
            }))
          )
        }

        // ==================== TAX ====================
        if (emp.tax) {
          setFormData((prev) => ({
            ...prev,
            taxCode: emp.tax.tax_code || "",
            taxCodeIssuedDate: emp.tax.tax_code_issued_date || "",
            taxCodeIssuedPlace: emp.tax.tax_code_issued_place || "",
            taxDependents: emp.dependents ? "1" : "0",
          }))
        }

        // ==================== DEPENDENTS ====================
        if (Array.isArray(emp.dependents) && emp.dependents.length > 0) {
          setDependents(
            emp.dependents.map((d: any) => ({
              fullName: d.dependent_full_name || "",
              relationship: d.relationship || "", // nếu BE chưa có, có thể map tạm
              idNumber: d.dependent_tax_code || "",
              isRegisteredDependent: d.is_registered_dependent == 1 || d.is_registered_dependent === true,
            }))
          )
        } else {
          // Không có người phụ thuộc thì reset về 1 form trống
          setDependents([{ fullName: "", relationship: "", idNumber: "", isRegisteredDependent: false }])
        }

        // ==================== INSURANCE ====================
        if (emp.insurance) {
          setFormData((prev) => ({
            ...prev,
            socialInsuranceNumber: emp.insurance.social_insurance_number || "",
            socialInsuranceStartDate: emp.insurance.social_insurance_start_date || "",
            healthInsuranceNumber: emp.insurance.household_code || "", // nếu muốn hiển thị household_code
          }))
        }

        // ==================== DOCUMENTS ====================
        if (emp.documents?.length) {
          setExistingDocs(
            emp.documents.map((doc: any) => ({
              id: doc.id,
              typeId: doc.type_id,
              docName: doc.doc_name,
              fileUrl: doc.file_url,
              uploadDate: doc.upload_date,
              expiryDate: doc.expiry_date,
              notes: doc.notes,
            }))
          )
        }

        // ==================== CONTRACT + COMPENSATIONS ====================
      if (Array.isArray(emp.contract) && emp.contract.length > 0) {
        const fullContracts = emp.contract.map((c: any) => {
          // Tìm các compensation thuộc contract này
          const relatedComps = (emp.compensations || [])
            .filter((comp: any) => comp.contract_id === c.id)
            .map((comp: any) => ({
              id: comp.id,
              effective_from: comp.effective_from || "",
              effective_to: comp.effective_to || "",
              reason: comp.reason || "",
              notes: comp.notes || "",
              details:
                (comp.items || []).map((item: any) => ({
                  id: item.id,
                  componentCode: item.component_code || "",
                  amount: Number(item.amount) || 0,
                  unit: item.unit === "percent" || item.unit === "%" ? "%" : "VND",
                  currency: item.currency || "VND",
                  basis_code: item.basis_code || null,
                  showOnPayslip: item.show_on_payslip == "1",
                })) || [],
            }));

          return {
            id: c.id,
            contractType: c.contract_type || "",
            contractNumber: c.contract_number || "",
            positionTitle: c.position_title || "",
            departmentName: c.department_name || "",
            managerName: c.manager_name || "",
            workEmail: c.work_email || "",
            contractDate: c.contract_date || "",
            startDate: c.start_date || "",
            expiryDate: c.expiry_date || "",
            status: c.status || "active",
            notes: c.notes || "",
            compensations: relatedComps,
          };
        });

        setContracts(fullContracts);
      }
        // Lưu ID
        setCreatedEmployeeId(Number(employeeId))

        // Log toàn bộ state sau khi set
        setTimeout(() => {
          console.log("=== FINAL STATE ===", {
            formData,
            contracts,
            bankAccounts,
            dependents,
            existingDocs,
          })
        }, 500)
      } catch (e: any) {
        console.error("Error fetching employee:", e)
        message.error("Có lỗi khi load dữ liệu nhân viên")
      } finally {
        setLoading(false)
      }
    }

    fetchEmployee()
  }, [mode, employeeId])


  // ==================== HANDLERS ====================
  const handleInputChange = (field: string, value: string) =>
    setFormData((prev) => ({ ...prev, [field]: value }))

  const buildDocsPayload = async (documents: any, empId: number, existingDocs: any[]) => {
    const docsPayload: any[] = []

    const handleUploadDOC = async (docObj: any, typeId: string, label: string) => {
      const { file, name, expiry_date } = docObj
      const up = await uploadEmployeeDocument(file, typeId, empId)
      if (up.success) {
        docsPayload.push({
          type_id: typeId,
          doc_name: name,
          file_url: up.file_url,
          upload_date: new Date().toISOString().split("T")[0],
          expiry_date: expiry_date || null,
          notes: label,
        })
      }
    }

    for (const doc of documents.cccd) await handleUploadDOC(doc, "1", "CCCD")
    for (const doc of documents.contract) await handleUploadDOC(doc, "2", "Hợp đồng")
    for (const doc of documents.degree) await handleUploadDOC(doc, "3", "Bằng cấp")
    for (const doc of documents.certificate) await handleUploadDOC(doc, "4", "Chứng chỉ")
    for (const doc of documents.others) await handleUploadDOC(doc, "5", "Tài liệu khác")

    return docsPayload
  }

  // ==================== CREATE MODE ====================
  const handleSave = async () => {
    setLoading(true)
    try {
      // 🟩 1️⃣ Gọi API tạo personal trước (để có employee_id)
      const personalRes = await createEmployeeStep("personal", mapPersonalInfoToApi(formData))
      if (!personalRes.success || !personalRes.employee_id) {
        throw new Error("Không thể tạo thông tin cá nhân")
      }

      const empId = personalRes.employee_id
      console.log("✅ Employee ID:", empId)

      // 🟩 2️⃣ Upload tài liệu (documents)
      const docsPayload = await buildDocsPayload(documents, empId, existingDocs)

      // 🟩 3️⃣ Chuẩn bị dữ liệu đầy đủ
      const validContracts = contracts.filter(
        (c) =>
          !c._deleted &&
          (c.contractNumber || c.contractType || c.positionTitle)
      )

      const fullData = {
        employee_id: empId,
        personal: mapPersonalInfoToApi(formData),
        bank: bankAccounts[0]?.accountNumber ? mapBankAccountToApi(bankAccounts[0], empId) : null,
        tax: formData.taxCode ? mapTaxInfoToApi(formData, empId) : null,
        dependents: dependents.map((d) => mapDependentToApi(d, empId)),
        insurance: formData.socialInsuranceNumber ? mapInsuranceToApi(formData, empId) : null,
        documents: docsPayload,
        contracts: mapContractToApi(validContracts, empId),
      }

      console.log("📤 PAYLOAD gửi BE:", fullData)

      // 🟩 4️⃣ Gọi API full để update các bảng còn lại
      const res = await createEmployeeStep("full", fullData)
      if (!res.success) throw new Error(res.message || "Không thể hoàn tất lưu nhân viên")

      message.success("✅ Đã lưu toàn bộ thông tin nhân viên thành công!")
      setCreatedEmployeeId(empId)
    } catch (e: any) {
      console.error("❌ Lỗi khi lưu:", e)
      message.error(e.message || "Có lỗi xảy ra khi lưu nhân viên")
    } finally {
      setLoading(false)
    }
  }



  // ==================== UPDATE MODE ====================
  const handleUpload = async () => {
    setLoading(true)
    try {
      let empId = createdEmployeeId
      if (mode !== "edit" || !empId) return

      await updateEmployeeStep(empId, "personal", mapPersonalInfoToApi(formData))
      if (bankAccounts[0]?.accountNumber)
        await updateEmployeeStep(empId, "bank", mapBankAccountToApi(bankAccounts[0], empId))
      if (formData.taxCode)
        await updateEmployeeStep(empId, "tax", mapTaxInfoToApi(formData, empId))
      if (dependents.length)
        await updateEmployeeStep(empId, "dependents", dependents.map((d) => mapDependentToApi(d, empId)))
      if (formData.socialInsuranceNumber)
        await updateEmployeeStep(empId, "insurance", mapInsuranceToApi(formData, empId))

      // --- Contracts + compensations ---
      if (contracts.length > 0) {
        const fullContractsPayload = contracts.map((contract) => ({
          id: contract.id || null,
          _deleted: contract._deleted || false,
          employee_id: empId,
          contract_number: contract.contractNumber || "",
          contract_type: contract.contractType || "",
          position_title: contract.positionTitle || "",
          department_name: contract.departmentName || "",
          manager_name: contract.managerName || "",
          work_email: contract.workEmail || "",
          contract_date: contract.contractDate || "",
          start_date: contract.startDate || "",
          expiry_date: contract.expiryDate || "",
          status: contract.status || "active",
          notes: contract.notes || "",

          compensations:
            contract.compensations?.map((comp) => ({
              id: comp.id || null,
              _deleted: comp._deleted || false,
              effective_from: comp.effective_from || contract.startDate,
              effective_to: comp.effective_to || contract.expiryDate,
              reason: comp.reason || "",
              notes: comp.notes || "",
              details:
                comp.details?.map((item) => ({
                  id: item.id || null,
                  _deleted: item._deleted || false, // 👈 GIỮ LẠI
                  component_code: item.componentCode || "",
                  amount: Number(item.amount) || 0,
                  unit: item.unit || "VND",
                  currency: item.currency || "VND",
                  basis_code: item.basis_code || null,
                  show_on_payslip: item.showOnPayslip ? 1 : 0,
                })) || [],
            })) || [],
        }))

        console.log("📤 Upload contract payload:", fullContractsPayload)
        await updateEmployeeStep(empId, "contract", fullContractsPayload)
      }

      // --- Documents
      const docsPayload = [
        ...mapExistingDocsToApi(existingDocs), // bao gồm doc có _deleted = true
        ...await buildDocsPayload(documents, empId, existingDocs),
      ]
      if (docsPayload.length)
        await updateEmployeeStep(empId, "documents", docsPayload)

      message.success("Cập nhật thông tin nhân viên thành công!")
    } catch (e: any) {
      message.error(e.message || "Có lỗi xảy ra khi cập nhật nhân viên")
    } finally {
      setLoading(false)
    }
  }

  // ==================== UI ====================
  const steps: FormStep[] = [
    { id: "personal", title: "Thông tin cá nhân", icon: User, completed: false },
    { id: "bank", title: "Tài khoản ngân hàng", icon: CreditCard, completed: false },
    { id: "tax", title: "Thuế thu nhập", icon: FileText, completed: false },
    { id: "dependents", title: "Người phụ thuộc", icon: Users, completed: false },
    { id: "insurance", title: "Bảo hiểm xã hội", icon: Shield, completed: false },
    { id: "documents", title: "Tài liệu", icon: Upload, completed: false },
    { id: "contract", title: "Hợp đồng", icon: FileSignature, completed: false },
  ]

  const renderStepContent = () => {
    switch (currentStep) {
      case "personal": 
        return <PersonalInfoStep formData={formData} handleInputChange={handleInputChange} />

      case "bank": 
        return <BankAccountsStep bankAccounts={bankAccounts} setBankAccounts={setBankAccounts} />

      case "tax": 
        return <TaxInfoStep formData={formData} handleInputChange={handleInputChange} />

      case "dependents": 
        return <DependentsStep dependents={dependents} setDependents={setDependents} />

      case "insurance": 
        return <InsuranceStep formData={formData} handleInputChange={handleInputChange} />

      case "documents":
        return (
          <DocumentsStep
            documents={documents}
            setDocuments={setDocuments}
            existingDocs={existingDocs}
            setExistingDocs={setExistingDocs}
          />
        )

      case "contract":
        return <ContractStep contracts={contracts} setContracts={setContracts} />

      default: 
        return null
    }
  }


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={onCancel} className="text-black hover:bg-gray-100">
              <ArrowLeft className="h-4 w-4 mr-2" /> Quay lại
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-black">
                {mode === "add" ? "Thêm nhân viên mới" : `Chỉnh sửa nhân viên ${formData.fullName}`}
              </h1>
              <p className="text-sm text-gray-600">Điền đầy đủ thông tin nhân viên</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="border-gray-300 text-black hover:bg-gray-100" onClick={onCancel}>
              <X className="h-4 w-4 mr-2" /> Hủy
            </Button>
            <Button onClick={mode === "edit" ? handleUpload : handleSave} disabled={loading} className="bg-primary text-black hover:bg-primary/90 font-semibold">
              <Check className="h-4 w-4 mr-2" />
              {loading ? "Đang lưu..." : "Lưu thông tin"}
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto p-6 flex gap-6">
        <div className="w-64 flex-shrink-0">
          <Card className="bg-white border-gray-200 sticky top-6">
            <CardHeader><CardTitle className="text-base text-black">Các bước</CardTitle></CardHeader>
            <CardContent className="p-0">
              <nav className="space-y-1">
                {steps.map((step) => {
                  const Icon = step.icon
                  const isActive = currentStep === step.id
                  return (
                    <button
                      key={step.id}
                      onClick={() => setCurrentStep(step.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-left ${
                        isActive
                          ? "bg-primary/10 border-l-4 border-primary text-black font-semibold"
                          : "text-gray-700 hover:bg-gray-50 border-l-4 border-transparent"
                      }`}
                    >
                      <Icon className={`h-5 w-5 ${isActive ? "text-primary" : "text-gray-500"}`} />
                      <span className="text-sm">{step.title}</span>
                      {step.completed && <Check className="h-4 w-4 ml-auto text-green-600" />}
                    </button>
                  )
                })}
              </nav>
            </CardContent>
          </Card>
        </div>

        <div className="flex-1">
          <Card className="bg-white border-gray-200">
            <CardContent className="p-6">{renderStepContent()}</CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
