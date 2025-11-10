"use client"

import { Input } from "../../../components/ui/input"
import { Label } from "../../../components/ui/label"

type TaxInfoStepProps = {
  formData: any
  handleInputChange: (field: string, value: string) => void
}

export function TaxInfoStep({ formData, handleInputChange }: TaxInfoStepProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-black">Thông tin thuế thu nhập cá nhân</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Mã số thuế */}
        <div className="space-y-2">
          <Label htmlFor="taxCode" className="text-black">
            Mã số thuế
          </Label>
          <Input
            id="taxCode"
            value={formData.taxCode}
            onChange={(e) => handleInputChange("taxCode", e.target.value)}
            className="bg-white border-gray-300"
          />
        </div>

        {/* Ngày cấp MST */}
        <div className="space-y-2">
          <Label htmlFor="taxCodeIssuedDate" className="text-black">
            Ngày cấp MST
          </Label>
          <Input
            id="taxCodeIssuedDate"
            type="date"
            value={formData.taxCodeIssuedDate}
            onChange={(e) => handleInputChange("taxCodeIssuedDate", e.target.value)}
            className="bg-white border-gray-300"
          />
        </div>

        {/* Nơi cấp MST */}
        <div className="space-y-2">
          <Label htmlFor="taxCodeIssuedPlace" className="text-black">
            Nơi cấp MST
          </Label>
          <Input
            id="taxCodeIssuedPlace"
            value={formData.taxCodeIssuedPlace}
            onChange={(e) => handleInputChange("taxCodeIssuedPlace", e.target.value)}
            className="bg-white border-gray-300"
          />
        </div>

        {/* Số người phụ thuộc */}
        <div className="space-y-2">
          <Label htmlFor="numberOfDependent" className="text-black">
            Số người phụ thuộc
          </Label>
          <Input
            id="numberOfDependent"
            type="number"
            value={formData.numberOfDependent}
            onChange={(e) => handleInputChange("numberOfDependent", e.target.value)}
            className="bg-white border-gray-300"
            min="0"
          />
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-900">
          <strong>Lưu ý:</strong> Mã số thuế được sử dụng để tính toán và kê khai thuế thu nhập cá nhân.
          Số người phụ thuộc sẽ ảnh hưởng đến giảm trừ gia cảnh.
        </p>
      </div>
    </div>
  )
}
