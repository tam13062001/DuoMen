"use client"

import { Input } from "../../../components/ui/input"
import { Label } from "../../../components/ui/label"
import { Textarea } from "../../../components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select"

type PersonalInfoStepProps = {
  formData: any
  handleInputChange: (field: string, value: string) => void

}
const ROLE_MAP: Record<string, string> = {
  "1": "admin",
  "2": "manager",
  "3": "employee",
}

const ROLE_OPTIONS = [
  { value: "1", label: "admin" },
  { value: "2", label: "Quản lý" },
  { value: "3", label: "Nhân viên" },
]

export function PersonalInfoStep({ formData, handleInputChange }: PersonalInfoStepProps) {
  return (
    <div className="space-y-6">
      {/* Thông tin cơ bản */}
      <div>
        <h3 className="text-lg font-semibold text-black mb-4">Thông tin cơ bản</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="fullName" className="text-black">
              Họ và tên <span className="text-red-500">*</span>
            </Label>
            <Input
              id="fullName"
              value={formData.fullName}
              onChange={(e) => handleInputChange("fullName", e.target.value)}
              className="bg-white border-gray-300"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="dateOfBirth" className="text-black">
              Ngày sinh <span className="text-red-500">*</span>
            </Label>
            <Input
              id="dateOfBirth"
              type="date"
              value={formData.dateOfBirth}
              onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
              className="bg-white border-gray-300"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="gender" className="text-black">
              Giới tính <span className="text-red-500">*</span>
            </Label>
            <Select
              value={formData.gender}
              onValueChange={(value) => handleInputChange("gender", value)}
            >
              <SelectTrigger className="bg-white border-gray-300">
                <SelectValue placeholder="Chọn giới tính" />
              </SelectTrigger>
              <SelectContent className="bg-white border-gray-200">
                <SelectItem value="M">Nam</SelectItem>
                <SelectItem value="F">Nữ</SelectItem>
                <SelectItem value="O">Khác</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="role_id" className="text-black">
              Phân quyền <span className="text-red-500">*</span>
            </Label>
            <Select
              value={formData.roleId}
              onValueChange={(value) => handleInputChange("roleId", value)}
            >
              <SelectTrigger className="bg-white border-gray-300">
                <SelectValue placeholder="Chọn quyền" />
              </SelectTrigger>
              <SelectContent className="bg-white border-gray-200">
                {ROLE_OPTIONS.map((r) => (
                  <SelectItem key={r.value} value={r.value}>
                    {r.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="maritalStatus" className="text-black">
              Tình trạng hôn nhân
            </Label>
            <Select
              value={formData.maritalStatus}
              onValueChange={(value) => handleInputChange("maritalStatus", value)}
            >
              <SelectTrigger className="bg-white border-gray-300">
                <SelectValue placeholder="Chọn tình trạng" />
              </SelectTrigger>
              <SelectContent className="bg-white border-gray-200">
                <SelectItem value="single">Độc thân</SelectItem>
                <SelectItem value="married">Đã kết hôn</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="nationality" className="text-black">
              Quốc tịch
            </Label>
            <Input
              id="nationality"
              value={formData.nationality}
              onChange={(e) => handleInputChange("nationality", e.target.value)}
              className="bg-white border-gray-300"
              placeholder="Việt Nam"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="hometown" className="text-black">
              Quê quán
            </Label>
            <Input
              id="hometown"
              value={formData.hometown}
              onChange={(e) => handleInputChange("hometown", e.target.value)}
              className="bg-white border-gray-300"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="ethnicity" className="text-black">
              Dân tộc
            </Label>
            <Input
              id="ethnicity"
              value={formData.ethnicity}
              onChange={(e) => handleInputChange("ethnicity", e.target.value)}
              className="bg-white border-gray-300"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="idNumber" className="text-black">
              Số CMND/CCCD <span className="text-red-500">*</span>
            </Label>
            <Input
              id="idNumber"
              value={formData.idNumber}
              onChange={(e) => handleInputChange("idNumber", e.target.value)}
              className="bg-white border-gray-300"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="idIssueDate" className="text-black">
              Ngày cấp
            </Label>
            <Input
              id="idIssueDate"
              type="date"
              value={formData.idIssueDate}
              onChange={(e) => handleInputChange("idIssueDate", e.target.value)}
              className="bg-white border-gray-300"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="idIssuePlace" className="text-black">
              Nơi cấp
            </Label>
            <Input
              id="idIssuePlace"
              value={formData.idIssuePlace}
              onChange={(e) => handleInputChange("idIssuePlace", e.target.value)}
              className="bg-white border-gray-300"
            />
          </div>
        </div>
      </div>

      {/* Thông tin liên hệ */}
      <div>
        <h3 className="text-lg font-semibold text-black mb-4">Thông tin liên hệ</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="personalEmail" className="text-black">
              Email cá nhân
            </Label>
            <Input
              id="personalEmail"
              type="email"
              value={formData.personalEmail}
              onChange={(e) => handleInputChange("personalEmail", e.target.value)}
              className="bg-white border-gray-300"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="personalPhone" className="text-black">
              Số điện thoại <span className="text-red-500">*</span>
            </Label>
            <Input
              id="personalPhone"
              value={formData.personalPhone}
              onChange={(e) => handleInputChange("personalPhone", e.target.value)}
              className="bg-white border-gray-300"
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="permanentAddress" className="text-black">
              Địa chỉ thường trú
            </Label>
            <Textarea
              id="permanentAddress"
              value={formData.permanentAddress}
              onChange={(e) => handleInputChange("permanentAddress", e.target.value)}
              className="bg-white border-gray-300"
              rows={2}
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="currentAddress" className="text-black">
              Địa chỉ tạm trú
            </Label>
            <Textarea
              id="currentAddress"
              value={formData.currentAddress}
              onChange={(e) => handleInputChange("currentAddress", e.target.value)}
              className="bg-white border-gray-300"
              rows={2}
            />
          </div>
        </div>
      </div>

      {/* Liên hệ khẩn cấp */}
      <div>
        <h3 className="text-lg font-semibold text-black mb-4">Liên hệ khẩn cấp</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="emergencyContactName" className="text-black">
              Họ tên người liên hệ
            </Label>
            <Input
              id="emergencyContactName"
              value={formData.emergencyContactName}
              onChange={(e) => handleInputChange("emergencyContactName", e.target.value)}
              className="bg-white border-gray-300"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="emergencyContactPhone" className="text-black">
              Số điện thoại
            </Label>
            <Input
              id="emergencyContactPhone"
              value={formData.emergencyContactPhone}
              onChange={(e) => handleInputChange("emergencyContactPhone", e.target.value)}
              className="bg-white border-gray-300"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="emergencyContactRelationship" className="text-black">
              Mối quan hệ
            </Label>
            <Input
              id="emergencyContactRelationship"
              value={formData.emergencyContactRelationship}
              onChange={(e) => handleInputChange("emergencyContactRelationship", e.target.value)}
              className="bg-white border-gray-300"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="emergencyContactAddress" className="text-black">
              Địa chỉ
            </Label>
            <Input
              id="emergencyContactAddress"
              value={formData.emergencyContactAddress}
              onChange={(e) => handleInputChange("emergencyContactAddress", e.target.value)}
              className="bg-white border-gray-300"
            />
          </div>
        </div>
      </div>

      {/* Trình độ học vấn */}
      <div>
        <h3 className="text-lg font-semibold text-black mb-4">Trình độ học vấn</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="educationLevel" className="text-black">
              Trình độ
            </Label>
            <Select
              value={formData.educationLevel}
              onValueChange={(value) => handleInputChange("educationLevel", value)}
            >
              <SelectTrigger className="bg-white border-gray-300">
                <SelectValue placeholder="Chọn trình độ" />
              </SelectTrigger>
              <SelectContent className="bg-white border-gray-200">
                <SelectItem value="high_school">Trung học phổ thông</SelectItem>
                <SelectItem value="associate">Cao đẳng</SelectItem>
                <SelectItem value="bachelor">Đại học</SelectItem>
                <SelectItem value="master">Thạc sĩ</SelectItem>
                <SelectItem value="doctorate">Tiến sĩ</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="major" className="text-black">
              Xếp loại
            </Label>
            <Select
              value={formData.major}
              onValueChange={(value) => handleInputChange("major", value)}
            >
              <SelectTrigger className="bg-white border-gray-300">
                <SelectValue placeholder="Chọn trình độ" />
              </SelectTrigger>
              <SelectContent className="bg-white border-gray-200">
                <SelectItem value="Excellent">Giỏi</SelectItem>
                <SelectItem value="Good">Khá</SelectItem>
                <SelectItem value="Average">Trung bình</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="educationCertificate" className="text-black">
              Có bằng cấp
            </Label>
            <Select
              value={formData.educationCertificate}
              onValueChange={(value) => handleInputChange("educationCertificate", value)}
            >
              <SelectTrigger className="bg-white border-gray-300">
                <SelectValue placeholder="Chọn" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Có</SelectItem>
                <SelectItem value="0">Không</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  )
}
