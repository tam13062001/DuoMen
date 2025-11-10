// src/services/leaveot-api.ts
// 🚀 API service cho module Nghỉ phép / OT (Leave / OT)

const API_BASE_URL = "/index.php?rest_route=/rocket/v1"

// ===== Kiểu dữ liệu =====
export type LeaveRequest = {
  id: number
  type: "leave" | "ot"
  leave_type: string | null
  ot_hours?: number
  leave_days?: number
  start_time: string
  end_time: string
  reason?: string
  status: "pending" | "approved" | "rejected" | "cancelled"
  approved_by?: number | null
  created_by?: number | null
  created_at: string
  updated_at?: string
  full_name?: string
}

// ===== 1️⃣ Tạo đơn nghỉ phép hoặc OT =====
export async function createLeaveOT(
  token: string,
  body: {
    type: "leave" | "ot"
    leave_type?: string
    start_time: string
    end_time: string
    leave_days?: number
    ot_hours?: number
    reason?: string
  }
) {
  const res = await fetch(`${API_BASE_URL}/leaveot`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  })
  return res.json()
}

// ===== 2️⃣ Lấy danh sách đơn nghỉ / OT =====
export async function fetchLeaveOTList(
  token: string,
  type: "leave" | "ot" = "leave",
  limit: number = 100
) {
  try {
    const params = new URLSearchParams()
    params.append("type", type)
    params.append("limit", String(limit))

    const res = await fetch(`${API_BASE_URL}/leaveot&${params.toString()}`, {
      headers: { Authorization: `Bearer ${token}` },
    })

    return await res.json()
  } catch (error: any) {
    console.error("[fetchLeaveOTList] Error:", error)
    return { success: false, message: "Lỗi kết nối server", error: error.message }
  }
}

// ===== 3️⃣ Phê duyệt hoặc từ chối =====
export async function approveLeaveOT(
  token: string,
  id: number,
  status: "approved" | "rejected" | "cancelled"
) {
  const res = await fetch(`${API_BASE_URL}/leaveot/approve`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ id, status }),
  })
  return res.json()
}
