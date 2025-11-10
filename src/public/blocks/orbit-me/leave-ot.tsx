"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Badge } from "../../components/ui/badge"
import { Label } from "../../components/ui/label"
import { Textarea } from "../../components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../components/ui/dialog"
import { Plus, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react"
import { format } from "date-fns"
import { vi } from "date-fns/locale"
import { cn } from "../../lib/utils"
import { Input } from "../../components/ui/input"
import { createLeaveOT, fetchLeaveOTList, type LeaveRequest } from "../../api/api-leaveot"

export function LeaveManagement() {
  const [requestType, setRequestType] = useState<"leave" | "ot">("leave")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [leaveType, setLeaveType] = useState("")
  const [otDate, setOtDate] = useState("")
  const [startTime, setStartTime] = useState("")
  const [endTime, setEndTime] = useState("")
  const [reason, setReason] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [requests, setRequests] = useState<LeaveRequest[]>([])
  const [loading, setLoading] = useState(false)

  const [totalLeaveDays, setTotalLeaveDays] = useState(12)
  const [usedLeaveDays, setUsedLeaveDays] = useState(0)
  const [remainingLeaveDays, setRemainingLeaveDays] = useState(12)

  const token = typeof window !== "undefined" ? localStorage.getItem("rocket_token") : null

  const loadRequests = async () => {
    if (!token) return
    setLoading(true)
    const data = await fetchLeaveOTList(token, requestType, 200)
    if (data?.success) {
      const items = data.data || []
      setRequests(items)
      if (requestType === "leave") {
        const approvedDays = items
          .filter((i: any) => i.status === "approved")
          .reduce((sum: number, i: any) => sum + (i.leave_days || 0), 0)
        setUsedLeaveDays(approvedDays)
        setRemainingLeaveDays(Math.max(totalLeaveDays - approvedDays, 0))
      }
    }
    setLoading(false)
  }

  useEffect(() => {
    loadRequests()
  }, [requestType])

  // ===== Tính số ngày nghỉ =====
  const calculateDays = () => {
    if (startDate && endDate) {
      const start = new Date(startDate)
      const end = new Date(endDate)
      const diffTime = end.getTime() - start.getTime()
      if (diffTime < 0) return 0
      return Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1
    }
    return 0
  }

  // ===== Tính số giờ OT =====
  const calculateHours = () => {
    if (startTime && endTime) {
      const [sh, sm] = startTime.split(":").map(Number)
      const [eh, em] = endTime.split(":").map(Number)
      const diff = eh + em / 60 - (sh + sm / 60)
      return diff > 0 ? diff.toFixed(2) : "0.00"
    }
    return "0.00"
  }

  // ===== Gửi đơn =====
  const handleSubmit = async () => {
    if (!token) {
      alert("Bạn chưa đăng nhập.")
      return
    }

    if (requestType === "leave") {
      if (!startDate || !endDate || !leaveType || !reason) {
        alert("Vui lòng điền đầy đủ thông tin nghỉ phép.")
        return
      }
    } else {
      if (!otDate || !startTime || !endTime || !reason) {
        alert("Vui lòng điền đầy đủ thông tin tăng ca.")
        return
      }
    }

    setIsSubmitting(true)

    const payload =
      requestType === "leave"
        ? {
            type: "leave" as const,
            leave_type: leaveType,
            start_time: new Date(startDate).toISOString(),
            end_time: new Date(endDate).toISOString(),
            leave_days: calculateDays(),
            reason,
          }
        : {
            type: "ot" as const,
            start_time: `${otDate} ${startTime}:00`,
            end_time: `${otDate} ${endTime}:00`,
            ot_hours: parseFloat(calculateHours()),
            reason,
          }

    const res = await createLeaveOT(token, payload)
    if (res.success) {
      alert(`✅ Gửi đơn ${requestType === "leave" ? "nghỉ phép" : "tăng ca"} thành công!`)
      setDialogOpen(false)
      loadRequests()
      setStartDate("")
      setEndDate("")
      setLeaveType("")
      setOtDate("")
      setStartTime("")
      setEndTime("")
      setReason("")
    } else {
      alert(`❌ Gửi thất bại: ${res.message || "Lỗi không xác định"}`)
    }

    setIsSubmitting(false)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-100 text-green-800">Đã duyệt</Badge>
      case "rejected":
        return <Badge className="bg-red-100 text-red-800">Từ chối</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Chờ duyệt</Badge>
      default:
        return <Badge variant="secondary">Không xác định</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* Bộ chọn loại đơn */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Quản lý đơn nghỉ phép / tăng ca</h2>
        <Select value={requestType} onValueChange={(v) => setRequestType(v as "leave" | "ot")}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Chọn loại đơn" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="leave">Đơn nghỉ phép</SelectItem>
            <SelectItem value="ot">Đơn tăng ca</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Thông tin phép năm */}
      {requestType === "leave" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Tổng phép năm</CardTitle>
            </CardHeader>
            <CardContent><div className="text-2xl font-bold">{totalLeaveDays} ngày</div></CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Đã dùng</CardTitle>
            </CardHeader>
            <CardContent><div className="text-2xl font-bold text-primary">{usedLeaveDays} ngày</div></CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Còn lại</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={cn("text-2xl font-bold", remainingLeaveDays > 0 ? "text-green-600" : "text-red-600")}>
                {remainingLeaveDays} ngày
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Form tạo đơn */}
      <Card>
        <CardHeader className="flex justify-between">
          <CardTitle>
            {requestType === "leave" ? "Xin nghỉ phép" : "Đăng ký tăng ca"}
          </CardTitle>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button><Plus className="mr-2 h-4 w-4" />Tạo đơn</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] bg-white">
              <DialogHeader>
                <DialogTitle>
                  {requestType === "leave" ? "Tạo đơn nghỉ phép" : "Tạo đơn tăng ca"}
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-4 py-4">
                {requestType === "leave" ? (
                  <>
                    <div>
                      <Label>Loại nghỉ phép</Label>
                      <Select value={leaveType} onValueChange={setLeaveType}>
                        <SelectTrigger><SelectValue placeholder="Chọn loại nghỉ" /></SelectTrigger>
                        <SelectContent className="bg-white">
                          <SelectItem value="annual">Nghỉ phép năm</SelectItem>
                          <SelectItem value="sick">Nghỉ ốm</SelectItem>
                          <SelectItem value="unpaid">Không lương</SelectItem>
                          <SelectItem value="remote">Làm từ xa</SelectItem>
                          <SelectItem value="other">Khác</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Từ ngày</Label>
                        <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                      </div>
                      <div>
                        <Label>Đến ngày</Label>
                        <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} min={startDate} />
                      </div>
                    </div>
                    {startDate && endDate && (
                      <p className="text-sm text-muted-foreground bg-gray-50 p-2 rounded">
                        Tổng số ngày nghỉ: <b>{calculateDays()}</b> ngày
                      </p>
                    )}
                  </>
                ) : (
                  <>
                    <div>
                      <Label className="mb-2">Ngày tăng ca</Label>
                      <Input type="date" value={otDate} onChange={(e) => setOtDate(e.target.value)} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Bắt đầu</Label>
                        <Input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
                      </div>
                      <div>
                        <Label>Kết thúc</Label>
                        <Input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
                      </div>
                    </div>
                    {startTime && endTime && (
                      <p className="text-sm text-muted-foreground bg-gray-50 p-2 rounded">
                        Tổng giờ OT: <b>{calculateHours()}</b> giờ
                      </p>
                    )}
                  </>
                )}

                <div>
                  <Label>Lý do</Label>
                  <Textarea value={reason} onChange={(e) => setReason(e.target.value)} rows={3} />
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setDialogOpen(false)}>Hủy</Button>
                  <Button onClick={handleSubmit} disabled={isSubmitting}>
                    {isSubmitting ? "Đang gửi..." : "Gửi đơn"}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </CardHeader>

        <CardContent>
          {loading ? (
            <p>Đang tải...</p>
          ) : (
            <div className="space-y-4">
              {requests.length === 0 ? (
                <p className="text-sm text-muted-foreground">Chưa có đơn nào.</p>
              ) : (
                requests.map((req) => (
                  <div key={req.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <div className="font-medium">
                        {requestType === "leave"
                          ? req.leave_type
                          : `${req.ot_hours} giờ OT`}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {format(new Date(req.start_time), "dd/MM/yyyy HH:mm", { locale: vi })} -{" "}
                        {format(new Date(req.end_time), "dd/MM/yyyy HH:mm", { locale: vi })}
                      </div>
                      <div className="text-sm text-muted-foreground">{req.reason}</div>
                    </div>
                    <div className="text-right">
                      {getStatusBadge(req.status)}
                      <div className="text-xs text-muted-foreground mt-1">
                        Gửi: {format(new Date(req.created_at), "dd/MM/yyyy", { locale: vi })}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
