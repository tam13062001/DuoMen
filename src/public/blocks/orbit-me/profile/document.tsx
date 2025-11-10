"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import { Label } from "../../../components/ui/label"
import { Textarea } from "../../../components/ui/textarea"
import { Badge } from "../../../components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select"
import {
  FolderOpen,
  FileText,
  Upload,
  Download,
  Eye,
  Trash2,
} from "lucide-react"
import { format } from "date-fns"
import { vi } from "date-fns/locale"
import type { Document } from "./types"

interface DocumentsTabProps {
  documents: Document[]
  setDocuments: (documents: Document[]) => void
}

export function DocumentsTab({ documents, setDocuments }: DocumentsTabProps) {
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false)
  const [selectedType, setSelectedType] = useState<string>("all")

  // ✅ Map theo bảng doc_type
  const docTypeMap: Record<string, { code: string; label: string }> = {
    "1": { code: "cccd", label: "Căn cước công dân / Chứng minh nhân dân" },
    "2": { code: "contract", label: "Hợp đồng lao động" },
    "3": { code: "degree", label: "Bằng cấp" },
    "4": { code: "certificate", label: "Chứng chỉ" },
    "5": { code: "other", label: "Khác" },
  }

  // lọc theo type_id
  const filteredDocuments =
    selectedType === "all"
      ? documents
      : documents.filter((doc) => doc.type_id === selectedType)

  // tải file
  const handleDownload = (url: string, name?: string) => {
    const link = document.createElement("a")
    link.href = url
    link.setAttribute("download", name || "document")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // xóa tài liệu
  const handleDelete = (id: number) => {
    setDocuments(documents.filter((d) => d.id !== id))
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="bg-primary/5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <CardTitle className="flex items-center gap-2">
              <FolderOpen className="h-5 w-5 text-primary" />
              Tài liệu cá nhân ({filteredDocuments.length})
            </CardTitle>

            {/* Bộ lọc + nút tải lên */}
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-full sm:w-[230px]">
                  <SelectValue placeholder="Lọc theo loại tài liệu" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="all">Tất cả</SelectItem>
                  {Object.entries(docTypeMap).map(([id, { label }]) => (
                    <SelectItem key={id} value={id}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-primary text-white hover:bg-primary/90 w-full sm:w-auto">
                    <Upload className="mr-2 h-4 w-4" />
                    Tải lên tài liệu
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Tải lên tài liệu mới</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div>
                      <Label>Loại tài liệu</Label>
                      <Select>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Chọn loại tài liệu" />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(docTypeMap).map(([id, { label }]) => (
                            <SelectItem key={id} value={id}>
                              {label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Tên tài liệu</Label>
                      <Input placeholder="Nhập tên tài liệu..." className="mt-1" />
                    </div>

                    <div>
                      <Label>Chọn file</Label>
                      <Input
                        type="file"
                        className="mt-1"
                        accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Hỗ trợ: PDF, JPG, PNG, DOC, DOCX (Tối đa 10MB)
                      </p>
                    </div>

                    <div>
                      <Label>Ghi chú (tùy chọn)</Label>
                      <Textarea
                        placeholder="Thêm ghi chú về tài liệu..."
                        className="mt-1"
                        rows={3}
                      />
                    </div>

                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        onClick={() => setUploadDialogOpen(false)}
                      >
                        Hủy
                      </Button>
                      <Button
                        className="bg-primary text-white hover:bg-primary/90"
                        onClick={() => setUploadDialogOpen(false)}
                      >
                        Tải lên
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardHeader>

        {/* Danh sách tài liệu */}
        <CardContent className="pt-6">
          {filteredDocuments.length === 0 ? (
            <div className="text-center py-12">
              <FolderOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Chưa có tài liệu</h3>
              <p className="text-muted-foreground mb-4">
                Bắt đầu tải lên tài liệu cá nhân của bạn
              </p>
              <Button
                className="bg-primary text-white hover:bg-primary/90"
                onClick={() => setUploadDialogOpen(true)}
              >
                <Upload className="mr-2 h-4 w-4" />
                Tải lên tài liệu đầu tiên
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredDocuments.map((doc) => (
                <div
                  key={doc.id}
                  className="border-2 border-primary/20 rounded-lg p-4 hover:border-primary/40 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FileText className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="font-semibold text-sm truncate">
                          {doc.doc_name}
                        </h3>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <Badge variant="outline" className="text-xs">
                          {docTypeMap[doc.type_id]?.label || "Không xác định"}
                        </Badge>
                      </div>

                      <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                        <span>
                          {doc.upload_date
                            ? format(doc.upload_date, "dd/MM/yyyy", { locale: vi })
                            : "-"}
                        </span>
                        {doc.expiry_date && (
                          <span>
                            Hết hạn:{" "}
                            {format(doc.expiry_date, "dd/MM/yyyy", { locale: vi })}
                          </span>
                        )}
                      </div>

                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                          <Eye className="mr-1 h-3 w-3" />
                          Xem
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1 bg-transparent"
                          onClick={() => handleDownload(doc.file_url, doc.doc_name)}
                        >
                          <Download className="mr-1 h-3 w-3" />
                          Tải về
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          onClick={() => handleDelete(doc.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
