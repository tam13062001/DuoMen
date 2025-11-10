// src/services/attendance-api.ts
// 🚀 API service cho module chấm công (check-in / check-out / history / list)

// 👉 Dùng dạng "raw" REST route (thay cho /wp-json/...)
// Hoạt động tốt khi site đang dùng plain permalink (localhost hoặc chưa bật rewrite)
const API_BASE_URL = "/index.php?rest_route=/rocket/v1"

export type AttendanceRecord = {
  id: number
  employee_id: number
  attendance_date: string
  check_in_time: string | null
  check_out_time: string | null
  total_work_hours: number | string | null
  work_status: "present" | "absent" | "late" | "on_leave" | "remote" | "holiday"
  notes?: string
  created_at?: string
  updated_at?: string
}

export type AttendanceResponse<T = any> = {
  success: boolean
  message?: string
  error?: string
  employee_id?: number
  count?: number
  data?: T
  month?: string
  range?: { from: string; to: string }
  filter?: string
}

// ======================= API functions =======================

export async function checkIn(token: string, body: { check_in_time: string }) {
  const res = await fetch(`${API_BASE_URL}/attendance/check-in`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body), // ✅ gửi object
  })
  return res.json()
}

export async function checkOut(token: string, body: { check_out_time: string }) {
  const res = await fetch(`${API_BASE_URL}/attendance/check-out`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body), // ✅ gửi object
  })
  return res.json()
}

// 📅 Danh sách chấm công (tùy chọn month)
export async function fetchAttendanceList(
  token: string,
  month?: string,
  limit: number = 200
): Promise<AttendanceResponse<AttendanceRecord[]>> {
  try {
    const params = new URLSearchParams()
    if (month) params.append("month", month)
    params.append("limit", String(limit))

    // ⚡ Quan trọng: Dùng "&" thay vì "?" sau rest_route=
    const res = await fetch(`${API_BASE_URL}/attendance/list&${params.toString()}`, {
      headers: { Authorization: `Bearer ${token}` },
    })

    return await res.json()
  } catch (error: any) {
    console.error("[fetchAttendanceList] Error:", error)
    return { success: false, message: "Lỗi kết nối server", error: error.message }
  }
}

// 🗓️ Lịch sử theo khoảng thời gian
export async function fetchAttendanceHistory(
  token: string,
  from?: string,
  to?: string,
  limit: number = 30
): Promise<AttendanceResponse<AttendanceRecord[]>> {
  try {
    const params = new URLSearchParams()
    if (from) params.append("from", from)
    if (to) params.append("to", to)
    params.append("limit", String(limit))

    // ⚡ Tương tự, dùng "&"
    const res = await fetch(`${API_BASE_URL}/attendance/history&${params.toString()}`, {
      headers: { Authorization: `Bearer ${token}` },
    })

    return await res.json()
  } catch (error: any) {
    console.error("[fetchAttendanceHistory] Error:", error)
    return { success: false, message: "Lỗi kết nối server", error: error.message }
  }
}

