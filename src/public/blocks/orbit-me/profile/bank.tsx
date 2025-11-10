"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import { Label } from "../../../components/ui/label"
import { Badge } from "../../../components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../../components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select"
import { CreditCard, Plus, Trash2 } from "lucide-react"
import type { Bank } from "./types"

interface BankAccountsTabProps {
  banks: Bank[]
  setBankAccounts: (accounts: Bank[]) => void
}

export function BankAccountsTab({
  banks,
  setBankAccounts,
}: BankAccountsTabProps) {
  // state lưu tạm khi người dùng nhập form
//   const [newAccount, setNewAccount] = useState<Partial<Bank>>({
//     account_number: "",
//     bank_name: "",
//     bank_address: "",
//   })

//   const handleAdd = () => {
//     if (!newAccount.account_number || !newAccount.bank_name) return

//     const newBank: Bank = {
//       id: Date.now(), // tạm ID
//       employee_id: 0,
//       account_number: newAccount.account_number!,
//       bank_name: newAccount.bank_name!,
//       bank_address: newAccount.bank_address || "",
//       created_at: new Date().toISOString(),
//     }

//     setBankAccounts([...banks, newBank])
//     setAddBankDialogOpen(false)
//     setNewAccount({ account_number: "", bank_name: "", bank_address: "" })
//   }

  const handleDelete = (id: string) => {
    setBankAccounts(banks.filter((b) => b.id !== id))
  }

  return (
    <Card>
      <CardHeader className="bg-primary/5">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-primary" />
            Thông tin ngân hàng
          </CardTitle>
        </div>
      </CardHeader>

      <CardContent className="pt-6">
        <div className="space-y-4">
          {banks.length === 0 && (
            <p className="text-muted-foreground">Chưa có tài khoản nào.</p>
          )}

          {banks.map((account, index) => (
            <div
              key={account.id}
              className="border-2 border-primary/20 rounded-lg p-4 hover:border-primary/40 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <CreditCard className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-lg">{account.bank_name}</h3>
                      {index === 0 && (
                        <Badge className="bg-primary text-white hover:bg-primary">Chính</Badge>
                      )}
                    </div>
                    <p className="text-muted-foreground text-sm mt-1">
                      {account.bank_address}
                    </p>
                    <p className="font-mono font-medium mt-2">{account.bank_account_number}</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  onClick={() => handleDelete(account.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
