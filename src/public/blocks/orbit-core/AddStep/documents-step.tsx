"use client"

import { Button } from "../../../components/ui/button"
import { Card, CardContent } from "../../../components/ui/card"
import { Input } from "../../../components/ui/input"
import { Label } from "../../../components/ui/label"
import { Upload, File, Trash2, Plus } from "lucide-react"

type DocWithName = {
  file: File
  name: string
  expiry_date?: string | null
}

type DocumentsState = {
  cccd: DocWithName[]
  contract: DocWithName[]
  degree: DocWithName[]
  certificate: DocWithName[]
  others: DocWithName[]
}

type DocumentsStepProps = {
  documents: DocumentsState
  setDocuments: (docs: DocumentsState) => void
  existingDocs: any[]
  setExistingDocs: (docs: any[]) => void
}

export function DocumentsStep({
  documents,
  setDocuments,
  existingDocs,
  setExistingDocs,
}: DocumentsStepProps) {
  // ✅ Thêm file mới vào nhóm
  const handleAddFile = (type: keyof DocumentsState, files: FileList | null) => {
    if (!files) return
    const newFiles = Array.from(files).map((f) => ({
      file: f,
      name: f.name,
      expiry_date: null,
    }))
    setDocuments({
      ...documents,
      [type]: [...documents[type], ...newFiles],
    })
  }

  // ✅ Xóa file mới thêm (chưa lưu)
  const handleRemove = (type: keyof DocumentsState, index: number) => {
    const updated = [...documents[type]]
    updated.splice(index, 1)
    setDocuments({ ...documents, [type]: updated })
  }

  // ✅ Cập nhật tên / hạn file
  const handleChange = (
    type: keyof DocumentsState,
    index: number,
    field: "name" | "expiry_date",
    value: string
  ) => {
    const updated = [...documents[type]]
    updated[index][field] = value
    setDocuments({ ...documents, [type]: updated })
  }

  // ✅ Đánh dấu xóa file cũ (ẩn luôn khỏi UI)
  const removeExistingFile = (id: number) => {
    const updated = existingDocs.map((doc) =>
      doc.id === id ? { ...doc, _deleted: true } : doc
    )
    setExistingDocs(updated)
  }

  // ✅ Hiển thị nhóm tài liệu
  const renderGroup = (label: string, key: keyof DocumentsState, typeId: string, required = false) => {
    const groupExisting = existingDocs
      .filter((d) => d.typeId === typeId && !d._deleted) // 👈 ẩn file đã xóa
    const groupNew = documents[key]

    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="font-semibold text-black">
            {label} {required && <span className="text-red-500">*</span>}
          </Label>
          <Label
            htmlFor={`file-${key}`}
            className="cursor-pointer inline-flex items-center gap-2 px-3 py-1 border border-gray-300 rounded-md text-sm text-black hover:bg-gray-100"
          >
            <Plus className="h-4 w-4" /> Thêm file
          </Label>
          <Input
            id={`file-${key}`}
            type="file"
            multiple
            accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
            onChange={(e) => handleAddFile(key, e.target.files)}
            className="hidden"
          />
        </div>

        {/* --- Existing files --- */}
        {groupExisting.length > 0 && (
          <div className="space-y-2">
            {groupExisting.map((doc) => (
              <Card key={`old-${doc.id}`} className="bg-white border-gray-200">
                <CardContent className="p-3 flex items-center justify-between">
                  <div className="flex flex-col text-sm text-gray-700">
                    <div className="flex items-center gap-2">
                      <File className="h-4 w-4" />
                      <a
                        href={doc.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {doc.docName}
                      </a>
                    </div>
                    {doc.expiryDate && (
                      <span className="text-gray-500 text-xs">
                        Hết hạn: {doc.expiryDate}
                      </span>
                    )}
                  </div>
                  <Button
                    onClick={() => removeExistingFile(doc.id)}
                    variant="ghost"
                    size="sm"
                    className="text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* --- New files --- */}
        {groupNew.length > 0 && (
          <div className="space-y-2">
            {groupNew.map((doc, index) => (
              <Card key={`new-${index}`} className="bg-gray-50 border-gray-200">
                <CardContent className="p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <File className="h-4 w-4" />
                      <span>{doc.file.name}</span>
                      <span className="text-gray-400">
                        ({(doc.file.size / 1024).toFixed(1)} KB)
                      </span>
                    </div>
                    <Button
                      onClick={() => handleRemove(key, index)}
                      variant="ghost"
                      size="sm"
                      className="text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <Input
                      placeholder="Nhập tên tài liệu..."
                      value={doc.name}
                      onChange={(e) =>
                        handleChange(key, index, "name", e.target.value)
                      }
                      className="bg-white border-gray-300 text-sm"
                    />
                    <Input
                      type="date"
                      value={doc.expiry_date || ""}
                      onChange={(e) =>
                        handleChange(key, index, "expiry_date", e.target.value)
                      }
                      className="bg-white border-gray-300 text-sm"
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {groupExisting.length === 0 && groupNew.length === 0 && (
          <Card className="bg-gray-50 border-gray-200 border-dashed">
            <CardContent className="p-4 text-center text-sm text-gray-600">
              <Upload className="h-6 w-6 mx-auto text-gray-400 mb-1" />
              Chưa có tài liệu nào
            </CardContent>
          </Card>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-black">Tài liệu nhân viên</h3>

      {renderGroup("CMND / CCCD", "cccd", "1", true)}
      {renderGroup("Hợp đồng lao động", "contract", "2", true)}
      {renderGroup("Bằng cấp", "degree", "3", true)}
      {renderGroup("Chứng chỉ", "certificate", "4")}
      {renderGroup("Tài liệu khác", "others", "5")}
    </div>
  )
}
