"use client"

import { Button } from "../../../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { Input } from "../../../components/ui/input"
import { Label } from "../../../components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select"
import { Plus, Trash2 } from "lucide-react"

type Dependent = {
  fullName: string
  relationship: string
  idNumber: string
  isRegisteredDependent: boolean
}

type DependentsStepProps = {
  dependents: Dependent[]
  setDependents: (dependents: Dependent[]) => void
}

export function DependentsStep({ dependents, setDependents }: DependentsStepProps) {
  const addDependent = () => {
    setDependents([
      ...dependents,
      { fullName: "", relationship: "", idNumber: "", isRegisteredDependent: false },
    ])
  }

  const removeDependent = (index: number) => {
    setDependents(dependents.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-black">Người phụ thuộc</h3>
        <Button
          onClick={addDependent}
          variant="outline"
          size="sm"
          className="border-gray-300 text-black hover:bg-gray-100 bg-transparent"
        >
          <Plus className="mr-2 h-4 w-4" />
          Thêm người phụ thuộc
        </Button>
      </div>

      {dependents.map((dependent, index) => (
        <Card key={index} className="bg-gray-50 border-gray-200">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base text-black">Người phụ thuộc {index + 1}</CardTitle>
              <Button
                onClick={() => removeDependent(index)}
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 text-red-600 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-black">
                  Họ và tên <span className="text-red-500">*</span>
                </Label>
                <Input
                  value={dependent.fullName}
                  onChange={(e) => {
                    const newDependents = [...dependents]
                    newDependents[index].fullName = e.target.value
                    setDependents(newDependents)
                  }}
                  className="bg-white border-gray-300"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-black">Số thuế người phụ thuộc</Label>
                <Input
                  value={dependent.idNumber}
                  onChange={(e) => {
                    const newDependents = [...dependents]
                    newDependents[index].idNumber = e.target.value
                    setDependents(newDependents)
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
