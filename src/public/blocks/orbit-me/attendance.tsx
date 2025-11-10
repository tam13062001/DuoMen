"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Badge } from "../../components/ui/badge"
import { Clock, Calendar, CheckCircle2, XCircle, AlertCircle, Download } from "lucide-react"
import { cn } from "../../lib/utils"
import {
  checkIn,
  checkOut,
  fetchAttendanceList,
  type AttendanceRecord,
} from "../../api/api-attendance"

// ====== Cấu hình trạng thái ======
const statusConfig = {
  present: { label: "Đúng giờ", color: "bg-green-100 text-green-800", icon: CheckCircle2 },
  late: { label: "Đi muộn", color: "bg-yellow-100 text-yellow-800", icon: AlertCircle },
  absent: { label: "Vắng mặt", color: "bg-red-100 text-red-800", icon: XCircle },
  on_leave: { label: "Nghỉ phép", color: "bg-blue-100 text-blue-800", icon: Calendar },
  remote: { label: "Làm từ xa", color: "bg-purple-100 text-purple-800", icon: Calendar },
  holiday: { label: "Nghỉ lễ", color: "bg-gray-100 text-gray-800", icon: Calendar },
}

// ====== Helpers ======
const toNum = (v: unknown) => (Number.isFinite(Number(v)) ? Number(v) : 0)
const f2 = (v: unknown, digits = 2) => toNum(v).toFixed(digits)
const hhm = (t?: string | null) => (t ? t.slice(0, 5) : "--")

// 🕒 Hàm lấy giờ hiện tại theo múi giờ Việt Nam
const getVietnamTimeISO = () => {
  const vnDate = new Date().toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" })
  const localDate = new Date(vnDate)
  const year = localDate.getFullYear()
  const month = String(localDate.getMonth() + 1).padStart(2, "0")
  const day = String(localDate.getDate()).padStart(2, "0")
  const hour = String(localDate.getHours()).padStart(2, "0")
  const minute = String(localDate.getMinutes()).padStart(2, "0")
  const second = String(localDate.getSeconds()).padStart(2, "0")
  return `${year}-${month}-${day}T${hour}:${minute}:${second}+07:00`
}

// ====== Component chính ======
export function AttendanceManagement() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [records, setRecords] = useState<AttendanceRecord[]>([])
  const [loading, setLoading] = useState(false)
  const [token, setToken] = useState<string>("")
  const [message, setMessage] = useState<string>("")
  const [lastActionTime, setLastActionTime] = useState<string>("")

  // 🔒 Lấy token từ localStorage
  useEffect(() => {
    const jwt = localStorage.getItem("rocket_token")
    if (jwt) setToken(jwt)
  }, [])

  // ⏰ Đồng hồ realtime
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  // 📅 Lấy lịch sử khi có token
  useEffect(() => {
    if (!token) return
    refreshHistory()
  }, [token])

  const refreshHistory = async () => {
    try {
      const month = new Date().toISOString().slice(0, 7) // yyyy-mm
      const data = await fetchAttendanceList(token, month)
      if (data.success) setRecords(data.data || [])
      else setMessage(data.message || "Không thể tải dữ liệu")
    } catch (err) {
      console.error(err)
      setMessage("Lỗi kết nối server")
    }
  }

  // ✅ Check-in
  const handleCheckIn = async () => {
    if (!token) return alert("Thiếu token đăng nhập")
    setLoading(true)

    const currentTimeVN = getVietnamTimeISO()
    console.log("🕒 Check-in giờ Việt Nam:", currentTimeVN)

    const res = await checkIn(token, { check_in_time: currentTimeVN })
    setMessage(res.message || res.error || "")
    setLoading(false)
    if (res.success) {
      setLastActionTime(`✅ Đã chấm công lúc ${currentTimeVN}`)
      await refreshHistory()
    }
  }

  // ✅ Check-out
  const handleCheckOut = async () => {
    if (!token) return alert("Thiếu token đăng nhập")
    setLoading(true)

    const currentTimeVN = getVietnamTimeISO()
    console.log("🕒 Check-out giờ Việt Nam:", currentTimeVN)

    const res = await checkOut(token, { check_out_time: currentTimeVN })
    setMessage(res.message || res.error || "")
    setLoading(false)
    if (res.success) {
      setLastActionTime(`🏁 Đã tan ca lúc ${currentTimeVN}`)
      await refreshHistory()
    }
  }

  // 📊 Thống kê
  const presentDays = records.filter((r) => r.work_status === "present").length
  const lateDays = records.filter((r) => r.work_status === "late").length
  const totalHours = records.reduce((sum, r) => sum + toNum(r.total_work_hours), 0)
  const avgHours = records.length ? totalHours / records.length : 0

  const formatTime = (date: Date) =>
    date.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit", second: "2-digit" })

  const formatDate = (date: Date) =>
    date.toLocaleDateString("vi-VN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })

  // ==============================
  // ========== GIAO DIỆN =========
  // ==============================
  return (
    <div className="space-y-6">

      {/* 🕒 Check-in/out section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-black">
              <Clock className="h-5 w-5 text-primary" />
              Chấm công hôm nay
            </CardTitle>
            <CardDescription className="text-gray-600">{formatDate(currentTime)}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="text-5xl font-bold text-black mb-2">{formatTime(currentTime)}</div>
              {message && <div className="text-sm text-gray-700">{message}</div>}
              {lastActionTime && <div className="text-sm text-green-700">{lastActionTime}</div>}
            </div>

            <div className="flex gap-3">
              <Button
                className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                size="lg"
                onClick={handleCheckIn}
                disabled={loading}
              >
                <Clock className="mr-2 h-5 w-5" />
                Vào ca
              </Button>
              <Button
                className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                size="lg"
                onClick={handleCheckOut}
                disabled={loading}
              >
                <Clock className="mr-2 h-5 w-5" />
                Tan ca
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 📈 Statistics */}
        <Card className="bg-white border border-gray-200">
          <CardHeader>
            <CardTitle className="text-black">Thống kê tháng này</CardTitle>
            <CardDescription className="text-gray-600">
              {new Date().toLocaleDateString("vi-VN", { month: "long", year: "numeric" })}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Ngày đi làm</p>
                <p className="text-3xl font-bold text-green-600">{presentDays}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Đi muộn</p>
                <p className="text-3xl font-bold text-yellow-600">{lateDays}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Tổng giờ làm</p>
                <p className="text-2xl font-bold text-black">{f2(totalHours)}h</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Trung bình/ngày</p>
                <p className="text-2xl font-bold text-black">{f2(avgHours)}h</p>
              </div>
            </div>
            <Button variant="outline" className="w-full border-gray-300 text-black hover:bg-gray-50 bg-transparent">
              <Download className="mr-2 h-4 w-4" />
              Xuất báo cáo
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* 🧾 Attendance History */}
      <Card className="bg-white border border-gray-200">
        <CardHeader>
          <CardTitle className="text-black">Lịch sử chấm công</CardTitle>
          <CardDescription className="text-gray-600">Gần đây</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {records.length === 0 && <p className="text-gray-500 text-sm">Không có dữ liệu</p>}

            {records.map((record) => {
              const config = statusConfig[record.work_status] || statusConfig.present
              const StatusIcon = config.icon
              return (
                <div
                  key={record.id}
                  className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <div className="text-sm font-medium text-black">
                        {new Date(record.attendance_date).toLocaleDateString("vi-VN", { day: "2-digit" })}
                      </div>
                      <div className="text-xs text-gray-600">
                        {new Date(record.attendance_date).toLocaleDateString("vi-VN", { month: "short" })}
                      </div>
                    </div>
                    <div className="h-10 w-px bg-gray-200" />
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Badge className={cn("text-xs", config.color)}>
                          <StatusIcon className="mr-1 h-3 w-3" />
                          {config.label}
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-600">
                        {record.check_in_time ? (
                          <>
                            Vào: {hhm(record.check_in_time)} • Ra: {hhm(record.check_out_time)}
                          </>
                        ) : (
                          "Không có dữ liệu"
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-black">{f2(record.total_work_hours)}h</div>
                    <div className="text-xs text-gray-600">Giờ làm</div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
