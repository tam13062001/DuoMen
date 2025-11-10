"use client"

import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { Input } from "../../../components/ui/input"
import { Label } from "../../../components/ui/label"
import { Textarea } from "../../../components/ui/textarea"
import { Badge } from "../../../components/ui/badge"
import { FileText } from "lucide-react"
import { format } from "date-fns"
import { vi } from "date-fns/locale"
import type { WorkInfo } from "./types"

interface ContractTabProps {
  contractInfo: WorkInfo[] | WorkInfo | null
}

export function WorkInfoTab({ contractInfo }: ContractTabProps) {
  // ✅ Ép kiểu thành mảng an toàn
  const contracts: WorkInfo[] = Array.isArray(contractInfo)
    ? contractInfo
    : contractInfo
    ? [contractInfo]
    : []

  if (contracts.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Thông tin hợp đồng</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Không có hợp đồng nào được ghi nhận.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {contracts.map((contract, index) => (
        <Card key={index} className="border border-gray-200 shadow-sm">
          <CardHeader className="bg-primary/5">
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Hợp đồng #{index + 1}: {contract.contract_number || "Chưa có số hợp đồng"}
            </CardTitle>
          </CardHeader>

          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <Label className="text-muted-foreground">Số hợp đồng</Label>
                <Input value={contract.contract_number || ""} disabled className="mt-1 font-medium font-mono" />
              </div>
              <div>
                <Label className="text-muted-foreground">Loại hợp đồng</Label>
                <Input value={contract.contract_type || ""} disabled className="mt-1 font-medium" />
              </div>
              <div>
                <Label className="text-muted-foreground">Trạng thái</Label>
                <div className="mt-1 flex items-center h-10">
                  <Badge
                    className={
                      contract.status === "Đang hoạt động"
                        ? "bg-green-100 text-green-800 hover:bg-green-100"
                        : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                    }
                  >
                    {contract.status || "Không rõ"}
                  </Badge>
                </div>
              </div>

              <div>
                <Label className="text-muted-foreground">Chức vụ</Label>
                <Input value={contract.position_title || ""} disabled className="mt-1 font-medium" />
              </div>
              <div>
                <Label className="text-muted-foreground">Phòng ban</Label>
                <Input value={contract.department_name || ""} disabled className="mt-1 font-medium" />
              </div>
              <div>
                <Label className="text-muted-foreground">Quản lý trực tiếp</Label>
                <Input value={contract.manager_user_id || ""} disabled className="mt-1 font-medium" />
              </div>

              <div>
                <Label className="text-muted-foreground">Ngày bắt đầu</Label>
                <Input
                  value={
                    contract.start_date
                      ? format(new Date(contract.start_date), "dd/MM/yyyy", { locale: vi })
                      : "Không rõ"
                  }
                  disabled
                  className="mt-1 font-medium"
                />
              </div>
              <div>
                <Label className="text-muted-foreground">Ngày hết hạn</Label>
                <Input
                  value={
                    contract.expiry_date
                      ? format(new Date(contract.expiry_date), "dd/MM/yyyy", { locale: vi })
                      : "Không xác định"
                  }
                  disabled
                  className="mt-1 font-medium"
                />
              </div>
              <div>
                <Label className="text-muted-foreground">Trạng thái</Label>
                <span className="text-muted-foreground text-[16px]">{contract.status || "Không rõ"}</span>
              </div>

              <div className="md:col-span-2 lg:col-span-3">
                <Label className="text-muted-foreground">Ghi chú</Label>
                <Textarea value={contract.notes || ""} disabled className="mt-1 font-medium" rows={3} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
