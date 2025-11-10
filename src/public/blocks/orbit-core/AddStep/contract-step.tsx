"use client"

import { useEffect } from "react"
import { Input } from "../../../components/ui/input"
import { Label } from "../../../components/ui/label"
import { Button } from "../../../components/ui/button"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "../../../components/ui/select"
import { Copy, Plus, Trash2 } from "lucide-react"

type ContractStepProps = {
  contracts: any[]
  setContracts: React.Dispatch<React.SetStateAction<any[]>>
}

const CONTRACT_TYPES = [
  { value: "probation", label: "Thử việc" },
  { value: "fixed_term", label: "Xác định thời hạn" },
  { value: "indefinite", label: "Không xác định thời hạn" },
]

const STATUS_TYPES = [
  { value: "active", label: "Đang hiệu lực" },
  { value: "draft", label: "Bản nháp" },
  { value: "expired", label: "Hết hạn" },
  { value: "terminated", label: "Đã chấm dứt" },
  { value: "cancelled", label: "Đã hủy" },
]

const COMPONENTS = [
  { code: "base_salary", label: "Lương cơ bản", unitType: "amount" },
  { code: "insurance_base_salary", label: "Lương đóng BHXH", unitType: "amount" },
  { code: "kpi_bonus", label: "Thưởng KPI", unitType: "percent" },
  { code: "lunch_allowance", label: "Trợ cấp cơm trưa", unitType: "amount" },
  { code: "uniform_allowance", label: "Trợ cấp trang phục", unitType: "amount" },
  { code: "phone_allowance", label: "Trợ cấp điện thoại", unitType: "amount" },
  { code: "other_allowance", label: "Trợ cấp khác", unitType: "amount" },
]

export function ContractStep({ contracts, setContracts }: ContractStepProps) {
  useEffect(() => {
    const updated = contracts.map((contract) => {
      if (contract._deleted) return contract
      if (contract.compensations?.length > 0) {
        contract.compensations = contract.compensations.map((comp) => {
          const hasBase = comp.details?.some((d: any) => d.componentCode === "base_salary")
          if (!hasBase) {
            comp.details = [
              { componentCode: "base_salary", amount: "", unit: "VND", currency: "VND", basis_code: null, showOnPayslip: true },
              ...(comp.details || []),
            ]
          }
          return comp
        })
      }
      return contract
    })
    setContracts(updated)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // --- Hàm xử lý cơ bản ---
  const handleChange = (index: number, field: string, value: string) => {
    const newContracts = [...contracts]
    newContracts[index][field] = value
    setContracts(newContracts)
  }

  // --- Thêm / xóa hợp đồng ---
  const addContract = () => {
    setContracts([
      ...contracts,
      {
        id: null,
        contractType: "probation",
        startDate: "",
        expiryDate: "",
        reason: "",
        contractNumber: "",
        positionTitle: "",
        departmentName: "",
        managerName: "",
        workEmail: "",
        contractDate: "",
        status: "draft",
        notes: "",
        compensations: [],
      },
    ])
  }

  const removeContract = (index: number) => {
    const newContracts = [...contracts]
    if (newContracts[index].id) {
      newContracts[index]._deleted = true
    } else {
      newContracts.splice(index, 1)
    }
    setContracts(newContracts)
  }

  // --- Compensation ---
  const addCompensation = (contractIdx: number) => {
    const newContracts = [...contracts]
    newContracts[contractIdx].compensations.push({
      id: null,
      effective_from: "",
      effective_to: "",
      reason: "",
      notes: "",
      details: [
        { id: null, componentCode: "base_salary", amount: "", unit: "VND", currency: "VND", basis_code: null, showOnPayslip: true },
      ],
    })
    setContracts(newContracts)
  }

  const removeCompensation = (contractIdx: number, compIdx: number) => {
    const newContracts = [...contracts]
    const comp = newContracts[contractIdx].compensations[compIdx]
    if (comp.id) {
      comp._deleted = true
    } else {
      newContracts[contractIdx].compensations.splice(compIdx, 1)
    }
    setContracts(newContracts)
  }

  // --- Details ---
  const addDetail = (contractIdx: number, compIdx: number) => {
    const newContracts = [...contracts]
    newContracts[contractIdx].compensations[compIdx].details.push({
      id: null,
      componentCode: "",
      amount: "",
      unit: "VND",
      currency: "VND",
      basis_code: null,
      showOnPayslip: true,
    })
    setContracts(newContracts)
  }

  const removeDetail = (contractIdx: number, compIdx: number, detailIdx: number) => {
    const newContracts = [...contracts]
    const details = newContracts[contractIdx].compensations[compIdx].details
    const detail = details[detailIdx]
    if (detail.componentCode === "base_salary") return
    if (detail.id) {
      detail._deleted = true
    } else {
      details.splice(detailIdx, 1)
    }
    setContracts(newContracts)
  }

  const handleDetailChange = (contractIdx: number, compIdx: number, detailIdx: number, field: string, value: any) => {
    const newContracts = [...contracts]
    const detail = newContracts[contractIdx].compensations[compIdx].details[detailIdx]

    if (field === "componentCode") {
      const comp = COMPONENTS.find((c) => c.code === value)
      if (comp) {
        detail.componentCode = value
        detail.unit = comp.unitType === "amount" ? "VND" : "%"
        detail.currency = comp.unitType === "amount" ? "VND" : "%"
      }
    } else {
      detail[field] = value
    }

    // Nếu chọn % và có basis_code thì tính luôn giá trị quy đổi
    if (field === "amount" || field === "basis_code" || field === "unit") {
      if (detail.unit === "%" && detail.basis_code) {
        const allDetails = newContracts[contractIdx].compensations[compIdx].details
        const basis = allDetails.find((d: any) => d.componentCode === detail.basis_code)
        if (basis && basis.amount) {
          const percent = parseFloat(detail.amount || 0)
          const baseAmount = parseFloat(basis.amount || 0)
          detail.calculated_amount = (baseAmount * percent) / 100
        }
      } else {
        delete detail.calculated_amount
      }
    }

    setContracts(newContracts)
  }

  const handleCompChange = (contractIdx: number, compIdx: number, field: string, value: string) => {
    const newContracts = [...contracts]
    newContracts[contractIdx].compensations[compIdx][field] = value
    setContracts(newContracts)
  }

  // --- Hiển thị giá trị quy đổi ---
  const getCalculatedValue = (contractIdx: number, compIdx: number, detail: any) => {
    if (detail.unit !== "%" || !detail.basis_code) return null
    const allDetails = contracts[contractIdx].compensations[compIdx].details
    const basis = allDetails.find((d: any) => d.componentCode === detail.basis_code)
    if (!basis || !basis.amount) return null
    const percent = parseFloat(detail.amount || 0)
    const baseAmount = parseFloat(basis.amount || 0)
    if (isNaN(percent) || isNaN(baseAmount)) return null
    const calc = (baseAmount * percent) / 100
    return calc.toLocaleString("vi-VN") + " VND"
  }

    // --- Sao chép hợp đồng ---
  const duplicateContract = (index: number) => {
    const contractToCopy = contracts[index]
    if (!contractToCopy) return

    // Tạo bản sao sâu (deep clone)
    const cloned = JSON.parse(JSON.stringify(contractToCopy))

    // Reset các giá trị không nên copy nguyên
    cloned.id = null
    cloned.contractNumber = ""
    cloned.status = "draft"

    // Reset toàn bộ id trong compensations & details
    if (Array.isArray(cloned.compensations)) {
      cloned.compensations = cloned.compensations.map((comp: any) => ({
        ...comp,
        id: null,
        _deleted: false,
        details: Array.isArray(comp.details)
          ? comp.details.map((d: any) => ({ ...d, id: null, _deleted: false }))
          : [],
      }))
    }

    // Thêm vào danh sách
    setContracts([...contracts, cloned])
  }

  // --- Render ---
  return (
    <div className="space-y-6">
      {contracts
        .filter((c) => !c._deleted)
        .map((contract, idx) => (
          <div key={idx} className="border rounded-xl p-6 bg-gray-50 relative">
            <button
              onClick={() => duplicateContract(idx)}
              className="absolute top-3 right-16 text-red-500 text-sm flex items-center"
            >
              <Copy className="h-4 w-4 mr-1" /> Sao chép
            </button>
            <button
              onClick={() => removeContract(idx)}
              className="absolute top-3 right-3 text-red-500 text-sm flex items-center"
            >
              <Trash2 className="h-4 w-4 mr-1" /> Xóa
            </button>

            <h3 className="text-lg font-semibold mb-4">Hợp đồng {idx + 1}</h3>

            {/* --- Thông tin hợp đồng --- */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <Label>Loại hợp đồng</Label>
                <Select value={contract.contractType} onValueChange={(v) => handleChange(idx, "contractType", v)}>
                  <SelectTrigger className="bg-white border-gray-300 mt-1">
                    <SelectValue placeholder="Chọn loại" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-gray-300">
                    {CONTRACT_TYPES.map((t) => (
                      <SelectItem key={t.value} value={t.value}>
                        {t.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Số hợp đồng</Label>
                <Input
                  className="mt-1"
                  placeholder="VD: HD2025-001"
                  value={contract.contractNumber}
                  onChange={(e) => handleChange(idx, "contractNumber", e.target.value)}
                />
              </div>
              <div>
                <Label>Vị trí</Label>
                <Input
                  className="mt-1"
                  placeholder="VD: Nhân viên IT"
                  value={contract.positionTitle}
                  onChange={(e) => handleChange(idx, "positionTitle", e.target.value)}
                />
              </div>
              <div>
                <Label>Phòng ban</Label>
                <Input
                  className="mt-1"
                  value={contract.departmentName}
                  onChange={(e) => handleChange(idx, "departmentName", e.target.value)}
                />
              </div>
              <div>
                <Label>Họ và tên quản lý</Label>
                <Input
                  className="mt-1"
                  placeholder="Nhập tên quản lý"
                  value={contract.managerName}
                  onChange={(e) => handleChange(idx, "managerName", e.target.value)}
                />
              </div>
              <div>
                <Label>Email công ty</Label>
                <Input
                  className="mt-1"
                  value={contract.workEmail}
                  onChange={(e) => handleChange(idx, "workEmail", e.target.value)}
                />
              </div>
              <div>
                <Label>Ngày ký</Label>
                <Input
                  type="date"
                  className="mt-1"
                  value={contract.contractDate}
                  onChange={(e) => handleChange(idx, "contractDate", e.target.value)}
                />
              </div>
              <div>
                <Label>Ngày bắt đầu</Label>
                <Input
                  type="date"
                  className="mt-1"
                  value={contract.startDate}
                  onChange={(e) => handleChange(idx, "startDate", e.target.value)}
                />
              </div>
              <div>
                <Label>Ngày kết thúc</Label>
                <Input
                  type="date"
                  className="mt-1"
                  value={contract.expiryDate}
                  onChange={(e) => handleChange(idx, "expiryDate", e.target.value)}
                />
              </div>
              <div>
                <Label>Trạng thái hợp đồng</Label>
                <Select value={contract.status} onValueChange={(v) => handleChange(idx, "status", v)}>
                  <SelectTrigger className="bg-white border-gray-300 mt-1">
                    <SelectValue placeholder="Chọn trạng thái" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-gray-300">
                    {STATUS_TYPES.map((t) => (
                      <SelectItem key={t.value} value={t.value}>
                        {t.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-3">
                <Label>Ghi chú</Label>
                <Input
                  className="mt-1"
                  placeholder="Nhập ghi chú"
                  value={contract.notes}
                  onChange={(e) => handleChange(idx, "notes", e.target.value)}
                />
              </div>
            </div>

            {/* --- Phần Lương & Phụ cấp --- */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <h4 className="font-semibold text-black">Lương & Phụ cấp</h4>
                <Button size="sm" className="bg-yellow-500 hover:bg-yellow-600 text-white" onClick={() => addCompensation(idx)}>
                  <Plus className="h-4 w-4 mr-1" /> Thêm gói lương
                </Button>
              </div>

              {contract.compensations
                .filter((c: any) => !c._deleted)
                .map((comp: any, cIdx: number) => (
                  <div key={cIdx} className="border rounded-md p-4 bg-white relative">
                    <button onClick={() => removeCompensation(idx, cIdx)} className="absolute top-3 right-3 text-red-500">
                      <Trash2 className="h-4 w-4" />
                    </button>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                      <div>
                        <Label>Từ ngày</Label>
                        <Input
                          type="date"
                          className="mt-1"
                          value={comp.effective_from}
                          onChange={(e) => handleCompChange(idx, cIdx, "effective_from", e.target.value)}
                        />
                      </div>
                      <div>
                        <Label>Đến ngày</Label>
                        <Input
                          type="date"
                          className="mt-1"
                          value={comp.effective_to}
                          onChange={(e) => handleCompChange(idx, cIdx, "effective_to", e.target.value)}
                        />
                      </div>
                      <div>
                        <Label>Lý do</Label>
                        <Input
                          className="mt-1"
                          placeholder="Nhập lý do"
                          value={comp.reason}
                          onChange={(e) => handleCompChange(idx, cIdx, "reason", e.target.value)}
                        />
                      </div>
                      <div>
                        <Label>Ghi chú</Label>
                        <Input
                          className="mt-1"
                          placeholder="Nhập ghi chú"
                          value={comp.notes}
                          onChange={(e) => handleCompChange(idx, cIdx, "notes", e.target.value)}
                        />
                      </div>
                    </div>

                    {/* --- Chi tiết lương --- */}
                    <div className="mt-2">
                      <Button size="sm" variant="outline" onClick={() => addDetail(idx, cIdx)}>
                        <Plus className="h-4 w-4 mr-1" /> Thêm chi tiết
                      </Button>

                      <div className="mt-3 space-y-2">
                        {comp.details
                          .filter((d: any) => !d._deleted)
                          .map((detail: any, dIdx: number) => (
                            <div key={dIdx} className="grid grid-cols-12 gap-3 items-center">
                              <div className="col-span-3">
                                <Select
                                  value={detail.componentCode}
                                  onValueChange={(v) => handleDetailChange(idx, cIdx, dIdx, "componentCode", v)}
                                >
                                  <SelectTrigger className="bg-white border-gray-300">
                                    <SelectValue placeholder="Chọn thành phần" />
                                  </SelectTrigger>
                                  <SelectContent className="bg-white border-gray-300">
                                    {COMPONENTS.map((c) => (
                                      <SelectItem key={c.code} value={c.code}>
                                        {c.label}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="col-span-3 relative">
                                <Input
                                  type="number"
                                  placeholder="Số tiền / %"
                                  value={detail.amount}
                                  onChange={(e) => handleDetailChange(idx, cIdx, dIdx, "amount", e.target.value)}
                                />
                                {detail.unit === "%" && detail.basis_code && (
                                  <p className="text-xs text-gray-500 mt-1">
                                    = {getCalculatedValue(idx, cIdx, detail) || "—"}
                                  </p>
                                )}
                              </div>
                              <div className="col-span-2">
                                <Select
                                  value={detail.unit}
                                  onValueChange={(v) => handleDetailChange(idx, cIdx, dIdx, "unit", v)}
                                >
                                  <SelectTrigger className="bg-white border-gray-300">
                                    <SelectValue placeholder="Đơn vị" />
                                  </SelectTrigger>
                                  <SelectContent className="bg-white border-gray-300">
                                    <SelectItem value="VND">VND</SelectItem>
                                    <SelectItem value="%">%</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="col-span-3">
                                <Select
                                  value={detail.basis_code || ""}
                                  onValueChange={(v) => handleDetailChange(idx, cIdx, dIdx, "basis_code", v)}
                                >
                                  <SelectTrigger className="bg-white border-gray-300">
                                    <SelectValue placeholder="Tính theo" />
                                  </SelectTrigger>
                                  <SelectContent className="bg-white border-gray-300">
                                    <SelectItem value="base_salary">Lương cơ bản</SelectItem>
                                    <SelectItem value="insurance_base_salary">Lương đóng BHXH</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="col-span-1 text-right">
                                {detail.componentCode !== "base_salary" && (
                                  <Button variant="ghost" size="sm" onClick={() => removeDetail(idx, cIdx, dIdx)}>
                                    <Trash2 className="h-4 w-4 text-red-500" />
                                  </Button>
                                )}
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      <Button onClick={addContract} className="bg-yellow-500 hover:bg-yellow-600 text-white">
        <Plus className="h-4 w-4 mr-1" /> Thêm hợp đồng
      </Button>
    </div>
  )
}