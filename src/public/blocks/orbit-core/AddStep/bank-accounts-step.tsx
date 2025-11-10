"use client"

import { Button } from "../../../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { Input } from "../../../components/ui/input"
import { Label } from "../../../components/ui/label"
import { Badge } from "../../../components/ui/badge"
import { Plus, Trash2 } from "lucide-react"

type BankAccount = {
  bankName: string
  accountNumber: string
  accountHolder: string
  addressBank: string
  isPrimary: boolean
}

type BankAccountsStepProps = {
  bankAccounts: BankAccount[]
  setBankAccounts: (accounts: BankAccount[]) => void
}

export function BankAccountsStep({ bankAccounts, setBankAccounts }: BankAccountsStepProps) {
  const addBankAccount = () => {
    setBankAccounts([...bankAccounts, { bankName: "", accountNumber: "", accountHolder: "",addressBank:"", isPrimary: false }])
  }

  const removeBankAccount = (index: number) => {
    setBankAccounts(bankAccounts.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-black">Tài khoản ngân hàng</h3>
        <Button
          onClick={addBankAccount}
          variant="outline"
          size="sm"
          className="border-gray-300 text-black hover:bg-gray-100 bg-transparent"
        >
          <Plus className="mr-2 h-4 w-4" />
          Thêm tài khoản
        </Button>
      </div>

      {bankAccounts.map((account, index) => (
        <Card key={index} className="bg-gray-50 border-gray-200">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base text-black">
                Tài khoản {index + 1}
                {account.isPrimary && <Badge className="ml-2 bg-primary text-black">Chính</Badge>}
              </CardTitle>
              {bankAccounts.length > 1 && (
                <Button
                  onClick={() => removeBankAccount(index)}
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-black">
                  Tên ngân hàng <span className="text-red-500">*</span>
                </Label>
                <Input
                  value={account.bankName}
                  onChange={(e) => {
                    const newAccounts = [...bankAccounts]
                    newAccounts[index].bankName = e.target.value
                    setBankAccounts(newAccounts)
                  }}
                  className="bg-white border-gray-300"
                  placeholder="VD: Vietcombank"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-black">
                  Số tài khoản <span className="text-red-500">*</span>
                </Label>
                <Input
                  value={account.accountNumber}
                  onChange={(e) => {
                    const newAccounts = [...bankAccounts]
                    newAccounts[index].accountNumber = e.target.value
                    setBankAccounts(newAccounts)
                  }}
                  className="bg-white border-gray-300"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label className="text-black">
                  Tên chủ tài khoản <span className="text-red-500">*</span>
                </Label>
                <Input
                  value={account.accountHolder}
                  onChange={(e) => {
                    const newAccounts = [...bankAccounts]
                    newAccounts[index].accountHolder = e.target.value
                    setBankAccounts(newAccounts)
                  }}
                  className="bg-white border-gray-300"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label className="text-black">
                  Địa chỉ ngân hàng <span className="text-red-500">*</span>
                </Label>
                <Input
                  value={account.addressBank}
                  onChange={(e) => {
                    const newAccounts = [...bankAccounts]
                    newAccounts[index].addressBank = e.target.value
                    setBankAccounts(newAccounts)
                  }}
                  className="bg-white border-gray-300"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
