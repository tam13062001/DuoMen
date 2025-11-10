"use client"

import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { Input } from "../../../components/ui/input"
import { Label } from "../../../components/ui/label"
import { Receipt } from "lucide-react"
import { format } from "date-fns"
import type { Tax } from "./types"

interface TaxInfoTabProps {
  taxInfo: Tax
  setTaxInfo: (info: Tax) => void
}

export function TaxInfoTab({ taxInfo, setTaxInfo }: TaxInfoTabProps) {
  return (
    <Card>
      <CardHeader className="bg-primary/5">
        <CardTitle className="flex items-center gap-2">
          <Receipt className="h-5 w-5 text-primary" />
          Thông tin thuế
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <Label className="text-muted-foreground">Mã số thuế</Label>
            <span className="text-muted-foreground text-[16px]">{taxInfo.tax_code}</span>
          </div>
          <div>
            <Label className="text-muted-foreground">Ngày cấp</Label>
            <span className="text-[16px]">
              {taxInfo.tax_code_issued_date
                ? new Date(taxInfo.tax_code_issued_date).toLocaleDateString("en-CA") // 👉 yyyy-MM-dd
                : "—"}
            </span>
          </div>
          <div>
            <Label className="text-muted-foreground">Nơi cấp</Label>
            <span className="text-muted-foreground text-[16px]">{taxInfo.tax_code_issued_place}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
