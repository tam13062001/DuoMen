"use client"

import { Button } from "../../../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { Input } from "../../../components/ui/input"
import { Label } from "../../../components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select"
import { Plus, Trash2 } from "lucide-react"

export type CompensationItem = {
  componentCode: string
  amount: string
  unit: "amount" | "percent"
  currency: string
  showOnPayslip: boolean
}

type CompensationStepProps = {
  compensationItems: CompensationItem[]
  setCompensationItems: (items: CompensationItem[]) => void
}

export function CompensationStep({ compensationItems, setCompensationItems }: CompensationStepProps) {
  const addCompensationItem = () => {
    setCompensationItems([
      ...compensationItems,
      { componentCode: "", amount: "", unit: "amount", currency: "VND", showOnPayslip: true },
    ])
  }

  const removeCompensationItem = (index: number) => {
    setCompensationItems(compensationItems.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-black">Lương & Phụ cấp</h3>
        <Button
          onClick={addCompensationItem}
          variant="outline"
          size="sm"
          className="border-gray-300 text-black hover:bg-gray-100 bg-transparent"
        >
          <Plus className="mr-2 h-4 w-4" />
          Thêm khoản
        </Button>
      </div>

      {compensationItems.map((item, index) => (
        <Card key={index} className="bg-gray-50 border-gray-200">
          <CardHeader className="pb-3 flex items-center justify-between">
            <CardTitle className="text-base text-black">Khoản {index + 1}</CardTitle>
            {compensationItems.length > 1 && (
              <Button
                onClick={() => removeCompensationItem(index)}
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 text-red-600 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Component Code */}
              <div className="space-y-2">
                <Label className="text-black">Loại khoản</Label>
                <Select
                  value={item.componentCode}
                  onValueChange={(value) => {
                    const newItems = [...compensationItems]
                    newItems[index].componentCode = value
                    setCompensationItems(newItems)
                  }}
                >
                  <SelectTrigger className="bg-white border-gray-300">
                    <SelectValue placeholder="Chọn loại" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-gray-300">
                    <SelectItem value="base_salary">Lương cơ bản</SelectItem>
                    <SelectItem value="lunch_allowance">Trợ cấp cơm trưa</SelectItem>
                    <SelectItem value="kpi_bonus">Thưởng KPI</SelectItem>
                    <SelectItem value="insurance_base_salary">Lương đóng BHXH</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Amount */}
              <div className="space-y-2">
                <Label className="text-black">Số tiền</Label>
                <Input
                  type="number"
                  value={item.amount}
                  onChange={(e) => {
                    const newItems = [...compensationItems]
                    newItems[index].amount = e.target.value
                    setCompensationItems(newItems)
                  }}
                  className="bg-white border-gray-300"
                  placeholder="VD: 1000000"
                />
              </div>

              {/* Unit */}
              <div className="space-y-2">
                <Label className="text-black">Đơn vị</Label>
                <Select
                  value={item.unit}
                  onValueChange={(value) => {
                    const newItems = [...compensationItems]
                    newItems[index].unit = value as "amount" | "percent"
                    setCompensationItems(newItems)
                  }}
                >
                  <SelectTrigger className="bg-white border-gray-300">
                    <SelectValue placeholder="Chọn đơn vị" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="amount">Số tiền</SelectItem>
                    <SelectItem value="percent">Phần trăm</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Show on payslip */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={item.showOnPayslip}
                  onChange={(e) => {
                    const newItems = [...compensationItems]
                    newItems[index].showOnPayslip = e.target.checked
                    setCompensationItems(newItems)
                  }}
                />
                <Label className="text-black">Hiện trên phiếu lương</Label>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
