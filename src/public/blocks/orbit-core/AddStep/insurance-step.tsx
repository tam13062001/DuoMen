"use client"

import { Input } from "../../../components/ui/input"
import { Label } from "../../../components/ui/label"

type InsuranceStepProps = {
  formData: any
  handleInputChange: (field: string, value: string) => void
}

export function InsuranceStep({ formData, handleInputChange }: InsuranceStepProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-black">Bảo hiểm xã hội & Y tế</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="socialInsuranceNumber" className="text-black">
            Số sổ BHXH
          </Label>
          <Input
            id="socialInsuranceNumber"
            value={formData.socialInsuranceNumber}
            onChange={(e) => handleInputChange("socialInsuranceNumber", e.target.value)}
            className="bg-white border-gray-300"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="socialInsuranceStartDate" className="text-black">
            Ngày bắt đầu đóng BHXH
          </Label>
          <Input
            id="socialInsuranceStartDate"
            type="date"
            value={formData.socialInsuranceStartDate}
            onChange={(e) => handleInputChange("socialInsuranceStartDate", e.target.value)}
            className="bg-white border-gray-300"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="healthInsuranceNumber" className="text-black">
            Mã số hộ gia đình
          </Label>
          <Input
            id="healthInsuranceNumber"
            value={formData.healthInsuranceNumber}
            onChange={(e) => handleInputChange("healthInsuranceNumber", e.target.value)}
            className="bg-white border-gray-300"
          />
        </div>
      </div>
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-900">
          <strong>Lưu ý:</strong> Thông tin bảo hiểm xã hội và y tế được sử dụng để đóng và quản lý các khoản bảo hiểm
          bắt buộc theo quy định của pháp luật.
        </p>
      </div>
    </div>
  )
}
