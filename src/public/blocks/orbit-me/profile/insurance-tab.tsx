"use client"

import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { Label } from "../../../components/ui/label"
import { Shield } from "lucide-react"
import { format } from "date-fns"
import type { SocialInsurance } from "./types"

interface InsuranceTabProps {
  socialInsurance: SocialInsurance
}

export function InsuranceTab({ socialInsurance }: InsuranceTabProps) {
  return (
    <Card>
      <CardHeader className="bg-primary/5">
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          Bảo hiểm xã hội
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label className="text-muted-foreground">Số sổ BHXH</Label>
            <span className="text-muted-foreground text-[16px]">
              {socialInsurance.social_insurance_number || "—"}
            </span>
          </div>
          <div>
            <Label className="text-muted-foreground">Ngày bắt đầu đóng tại Rocket</Label>
            <span>
              {socialInsurance.social_insurance_start_date
                ? new Date(socialInsurance.social_insurance_start_date).toLocaleDateString("en-CA") // 👉 yyyy-MM-dd
                : "—"}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
