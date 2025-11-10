"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { Select } from "antd"
import { DollarSign } from "lucide-react"
import { format } from "date-fns"
import { vi } from "date-fns/locale"
import type { Compensations, CompensationComponents, CompensationDetail } from "./types"

const { Option } = Select

interface Props {
  compensations: Compensations[]
  components: CompensationComponents[]
}

export function CompensationTab({ compensations, components }: Props) {
  const [selectedCompId, setSelectedCompId] = useState<string | "all">("all")

  // 💰 Định dạng tiền tệ
  const formatCurrency = (amount: number | string) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
    }).format(Number(amount))

  // 📅 Định dạng ngày
  const formatDate = (dateStr?: string | null) =>
    dateStr && dateStr !== "0000-00-00"
      ? format(new Date(dateStr), "dd/MM/yyyy", { locale: vi })
      : "Hiện tại"

  // ⚡ Gom tất cả item lại (trường hợp cần xử lý toàn cục)
  const allItems = useMemo(
    () => compensations.flatMap((c) => c.items || []),
    [compensations]
  )

  // 🧠 Map metadata từ components để lấy name_vi, category,...
  const enrichItem = (item: CompensationDetail) => {
    const meta = components.find((c) => c.code === item.component_code)
    return {
      ...item,
      nameVi: meta?.name_vi || item.component_code,
      category: meta?.category || "earning",
    }
  }

  // 🎯 Bộ lọc theo kỳ thu nhập
  const filteredCompensations = useMemo(() => {
    if (selectedCompId === "all") return compensations
    return compensations.filter((c) => c.id.toString() === selectedCompId)
  }, [selectedCompId, compensations])

  // 🪙 Nếu không có dữ liệu
  if (!compensations || compensations.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Chế độ đãi ngộ</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Không có dữ liệu đãi ngộ nào.</p>
        </CardContent>
      </Card>
    )
  }
if (!compensations || compensations.length === 0) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Chế độ đãi ngộ</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">Không có dữ liệu đãi ngộ nào.</p>
      </CardContent>
    </Card>
  )
}

  // 🧾 Render UI
  return (
    <div className="space-y-8">
      {/* ---- Bộ lọc chọn kỳ ---- */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-xl font-semibold">Chọn kỳ thu nhập</h2>
        <Select
          value={selectedCompId}
          onChange={(value) => setSelectedCompId(value)}
          style={{ minWidth: 280 }}
        >
          <Option value="all">Tất cả các kỳ</Option>
          {compensations
            .filter((c) => c && c.id)
            .map((comp) => (
              <Option key={comp.id} value={comp.id.toString()}>
                {formatDate(comp.effective_from)} → {formatDate(comp.effective_to)}
              </Option>
            ))}
        </Select>
      </div>

      {/* ---- Render từng kỳ ---- */}
      {filteredCompensations
        .filter((comp) => comp && comp.id)
        .map((comp) => {
          const compItems = comp.items?.map(enrichItem) || []

          // 👉 Tính tổng các nhóm
          const totalEarnings = compItems
            .filter((i) => ["earning", "allowance", "bonus"].includes(i.category))
            .reduce((sum, i) => sum + Number(i.amount), 0)

          const totalDeductions = compItems
            .filter((i) => i.category === "deduction")
            .reduce((sum, i) => sum + Number(i.amount), 0)

          const netSalary = totalEarnings - totalDeductions

          return (
            <Card key={comp.id} className="border shadow-sm">
              <CardHeader className="bg-primary/5 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <CardTitle className="flex items-center gap-2 text-primary">
                  <DollarSign className="h-5 w-5" />
                  Kỳ áp dụng: {formatDate(comp.effective_from)} → {formatDate(comp.effective_to)}
                </CardTitle>
                <div className="text-sm text-muted-foreground">
                  Mã hợp đồng: #{comp.contract_id}
                </div>
              </CardHeader>

              <CardContent className="pt-6 space-y-6">
                {/* --- Tổng quan --- */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="border-2 border-green-500">
                    <CardHeader className="bg-green-50">
                      <CardTitle className="text-green-700 flex items-center gap-2">
                        Tổng thu nhập
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <p className="text-2xl font-bold text-green-700">
                        {formatCurrency(totalEarnings)}
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-red-500">
                    <CardHeader className="bg-red-50">
                      <CardTitle className="text-red-700 flex items-center gap-2">
                        Tổng khấu trừ
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <p className="text-2xl font-bold text-red-700">
                        {formatCurrency(totalDeductions)}
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-primary">
                    <CardHeader className="bg-primary/5">
                      <CardTitle className="text-primary flex items-center gap-2">
                        Thực nhận
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <p className="text-2xl font-bold text-primary">
                        {formatCurrency(netSalary)}
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* --- Chi tiết từng nhóm --- */}
                {["earning", "allowance", "bonus", "deduction"].map((category) => {
                  const items = compItems.filter((i) => i.category === category)
                  if (items.length === 0) return null

                  const titleMap: Record<string, string> = {
                    earning: "Thu nhập",
                    allowance: "Phụ cấp",
                    bonus: "Thưởng",
                    deduction: "Khấu trừ",
                  }

                  const colorMap: Record<string, string> = {
                    earning: "text-green-700",
                    allowance: "text-blue-700",
                    bonus: "text-purple-700",
                    deduction: "text-red-700",
                  }

                  const bgMap: Record<string, string> = {
                    earning: "bg-green-50",
                    allowance: "bg-blue-50",
                    bonus: "bg-purple-50",
                    deduction: "bg-red-50",
                  }

                  return (
                    <Card key={category}>
                      <CardHeader className={bgMap[category]}>
                        <CardTitle className={colorMap[category]}>
                          {titleMap[category]}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-4 space-y-3">
                        {items.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center justify-between p-3 border rounded-lg"
                          >
                            <span className="font-medium">{item.nameVi}</span>
                            <span
                              className={`font-bold ${
                                category === "deduction"
                                  ? "text-red-700"
                                  : colorMap[category]
                              }`}
                            >
                              {category === "deduction" ? "-" : ""}
                              {formatCurrency(item.amount)}
                            </span>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  )
                })}
              </CardContent>
            </Card>
          )
        })}
    </div>
  )
}
