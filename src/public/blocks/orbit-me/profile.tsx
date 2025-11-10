"use client"

import { useState, useEffect } from "@wordpress/element"
import { Card } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Switch } from "../../components/ui/switch"
import { Separator } from "../../components/ui/separator"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../../components/ui/tabs"
import { Bell, Shield, Lock } from "lucide-react"

import { PersonalInfoTab } from "./profile/personal"
import { BankAccountsTab } from "./profile/bank"
import { TaxInfoTab } from "./profile/tax"
import { WorkInfoTab } from "./profile/workcontact"
import { CompensationTab } from "./profile/compensation"
import { DocumentsTab } from "./profile/document"
import { InsuranceTab } from "./profile/insurance-tab"
import { changeEmployeePassword } from "../../api/api-profile"

import {
  PersonalInfo,
  WorkInfo,
  Bank,
  Tax,
  Compensations,
  CompensationDetail,
  CompensationComponents,
  Document,
  SocialInsurance,
} from "./profile/types"
import { useToast } from "../../components/ui/use-toast"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../../components/ui/dialog"

export function ProfileManagement() {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo | null>(null)
  const [workInfo, setWorkInfo] = useState<WorkInfo[] | null>(null)
  const [banks, setBanks] = useState<Bank[]>([])
  const [tax, setTax] = useState<Tax | null>(null)
  const [insurance, setInsurance] = useState<SocialInsurance | null>(null)
  const [compensations, setCompensations] = useState<Compensations[]>([])
  const [components, setComponents] = useState<CompensationComponents[]>([])
  const [items, setItems] = useState<CompensationDetail[]>([])
  const [documents, setDocuments] = useState<Document[]>([])
  const [isEditing, setIsEditing] = useState(false)
  const [uploadVisible, setUploadVisible] = useState(false)

  const [openChangePass, setOpenChangePass] = useState(false)
  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const { toast } = useToast()

  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    payslip: true,
    leave: true,
    performance: false,
  })

  const [privacy, setPrivacy] = useState({
    profileVisible: true,
    contactVisible: false,
    salaryVisible: false,
  })

  const userId = localStorage.getItem("user_id")
  const token = localStorage.getItem("rocket_token")

  const handleSave = () => setIsEditing(false)

  const handleChangePassword = async () => {
    if (!newPassword || !confirmPassword) {
      toast({ title: "Thiếu thông tin", description: "Vui lòng nhập đủ mật khẩu mới", variant: "destructive" })
      return
    }
    if (newPassword !== confirmPassword) {
      toast({ title: "Lỗi xác nhận", description: "Mật khẩu xác nhận không khớp", variant: "destructive" })
      return
    }

    try {
      const res = await changeEmployeePassword({
        token: token || "",
        oldPassword,
        newPassword,
      })
      if (res.success) {
        toast({ title: "Thành công", description: "Đổi mật khẩu thành công ✅" })
        setOpenChangePass(false)
        setOldPassword("")
        setNewPassword("")
        setConfirmPassword("")
      } else {
        toast({ title: "Lỗi", description: res.message || "Không thể đổi mật khẩu", variant: "destructive" })
      }
    } catch (err: any) {
      toast({ title: "Lỗi hệ thống", description: err.message || "Vui lòng thử lại", variant: "destructive" })
    }
  }
  useEffect(() => {
    if (!userId) return

    fetch(`/index.php?rest_route=/rocket/v1/employee/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("📥 Kết quả API employee:", res)
        if (res.success && res.data) {
          setPersonalInfo(res.data.personal || null)
          setWorkInfo(
            Array.isArray(res.data.contract)
              ? res.data.contract
              : [res.data.contract]
          )
          setBanks(Array.isArray(res.data.bank) ? res.data.bank : [res.data.bank])
          setTax(res.data.tax || null)
          setInsurance(res.data.insurance || null)

          const doc = res.data.documents
          setDocuments(Array.isArray(doc) ? doc : [doc])

          const comps = Array.isArray(res.data.compensations)
            ? res.data.compensations
            : res.data.compensations
            ? [res.data.compensations]
            : []

          setCompensations(comps)
        }
      })
      .catch((err) => console.error("❌ Lỗi khi fetch employee:", err))
  }, [userId, token])

  const handleUpload = async (file: File) => {
    const formData = new FormData()
    formData.append("avatar", file)
    const res = await fetch(
      `/index.php?rest_route=/rocket/v1/profile/${personalInfo?.id}/avatar`,
      { method: "POST", body: formData }
    )
    const data = await res.json()
    console.log("📥 Kết quả API upload avatar:", data)
    if (data.success) {
      setPersonalInfo((prev) => ({ ...prev!, avatar_url: data.avatar_url }))
    } else {
      console.error("❌ Lỗi upload avatar:", data)
    }
    return false
  }

  if (!personalInfo) return <p>Đang tải dữ liệu...</p>

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground">Profile Management</h1>
        <p className="text-muted-foreground">
          Quản lý thông tin cá nhân và cài đặt tài khoản
        </p>
      </div>

      <Tabs defaultValue="personal" className="space-y-6">
        {/* === Tab Header === */}
        <TabsList className="grid w-full grid-cols-8 bg-white border rounded-lg shadow-sm">
          <TabsTrigger value="personal">Cá nhân</TabsTrigger>
          <TabsTrigger value="bank">Ngân hàng</TabsTrigger>
          <TabsTrigger value="tax">Thuế</TabsTrigger>
          <TabsTrigger value="insurance">BHXH</TabsTrigger>
          <TabsTrigger value="work">Hợp đồng</TabsTrigger>
          <TabsTrigger value="compensation">Thu nhập</TabsTrigger>
          <TabsTrigger value="documents">Tài liệu</TabsTrigger>
          <TabsTrigger value="settings">Cài đặt</TabsTrigger>
        </TabsList>

        {/* --- Cá nhân --- */}
        <TabsContent value="personal" className="space-y-6">
          <PersonalInfoTab
            personalInfo={personalInfo}
            setPersonalInfo={setPersonalInfo}
            workInfo={workInfo}
            handleUpload={handleUpload}
          />
        </TabsContent>

        {/* --- Ngân hàng --- */}
        <TabsContent value="bank" className="space-y-6">
          <BankAccountsTab banks={banks} setBankAccounts={setBanks} />
        </TabsContent>

        {/* --- Thuế --- */}
        <TabsContent value="tax" className="space-y-6">
          <TaxInfoTab taxInfo={tax} setTaxInfo={setTax} />
        </TabsContent>

        {/* --- BHXH --- */}
        <TabsContent value="insurance" className="space-y-6">
          <InsuranceTab socialInsurance={insurance} />
        </TabsContent>

        {/* --- Hợp đồng --- */}
        <TabsContent value="work" className="space-y-6">
          <WorkInfoTab contractInfo={workInfo} />
        </TabsContent>

        {/* --- Thu nhập --- */}
        <TabsContent value="compensation" className="space-y-6">
          <CompensationTab compensations={compensations} components={components} />
        </TabsContent>

        {/* --- Tài liệu --- */}
        <TabsContent value="documents" className="space-y-6">
          <DocumentsTab documents={documents} setDocuments={setDocuments} />
        </TabsContent>

        {/* --- Cài đặt --- */}
        <TabsContent value="settings" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
              <Bell className="h-5 w-5 text-primary" /> Cài đặt thông báo
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Email thông báo</span>
                <Switch
                  checked={notifications.email}
                  onCheckedChange={(c) =>
                    setNotifications({ ...notifications, email: c })
                  }
                />
              </div>
              <Separator />
              <div className="flex justify-between">
                <span>Push notification</span>
                <Switch
                  checked={notifications.push}
                  onCheckedChange={(c) =>
                    setNotifications({ ...notifications, push: c })
                  }
                />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
              <Shield className="h-5 w-5 text-primary" /> Cài đặt riêng tư
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Hiển thị hồ sơ</span>
                <Switch
                  checked={privacy.profileVisible}
                  onCheckedChange={(c) =>
                    setPrivacy({ ...privacy, profileVisible: c })
                  }
                />
              </div>
              <Separator />
              <div className="flex justify-between">
                <span>Hiển thị thông tin liên hệ</span>
                <Switch
                  checked={privacy.contactVisible}
                  onCheckedChange={(c) =>
                    setPrivacy({ ...privacy, contactVisible: c })
                  }
                />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
              <Lock className="h-5 w-5 text-primary" /> Bảo mật tài khoản
            </h3>
            <div className="space-y-2">
            <Button className="w-full" onClick={() => setOpenChangePass(true)}>
              Đổi mật khẩu
            </Button>

            {/* 🧩 Modal đổi mật khẩu */}
            <Dialog open={openChangePass} onOpenChange={setOpenChangePass}>
              <DialogContent className="sm:max-w-md  bg-white">
                <DialogHeader>
                  <DialogTitle>Đổi mật khẩu</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 mt-4 ">
                  <div>
                    <label className="text-sm font-medium">Mật khẩu hiện tại</label>
                    <Input
                      type="password"
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                      placeholder="Nhập mật khẩu hiện tại"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Mật khẩu mới</label>
                    <Input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Nhập mật khẩu mới"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Xác nhận mật khẩu mới</label>
                    <Input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Nhập lại mật khẩu mới"
                    />
                  </div>
                </div>
                <DialogFooter className="mt-4">
                  <Button variant="outline" onClick={() => setOpenChangePass(false)}>
                    Hủy
                  </Button>
                  <Button onClick={handleChangePassword}>Xác nhận đổi</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

              <Button variant="outline" className="w-full">
                Thiết lập xác thực 2 bước
              </Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
