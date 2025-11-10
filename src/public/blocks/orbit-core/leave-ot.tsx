"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Badge } from "../../components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { CheckCircle, XCircle, Clock, Search, Calendar, Users } from "lucide-react"
import { toast } from "../../components/ui/use-toast"

// 🧩 Import API
import {
  fetchLeaveOTList,
  approveLeaveOT,
  type LeaveRequest,
} from "../../api/api-leaveot"

export function LeaveOTManagement() {
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([])
  const [otRequests, setOtRequests] = useState<LeaveRequest[]>([])
  const [loading, setLoading] = useState(false)

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("All")

  const token = typeof window !== "undefined" ? localStorage.getItem("rocket_token") || "" : ""

  // 🧠 Gọi API list
  async function loadData() {
    if (!token) return
    setLoading(true)

    const [leaveRes, otRes] = await Promise.all([
      fetchLeaveOTList(token, "leave", 200),
      fetchLeaveOTList(token, "ot", 200),
    ])

    if (leaveRes.success) setLeaveRequests(leaveRes.data || [])
    if (otRes.success) setOtRequests(otRes.data || [])

    setLoading(false)
  }

  useEffect(() => {
    loadData()
  }, [])

  // 🧾 Hàm phê duyệt / từ chối
  async function handleApprove(id: number, type: "leave" | "ot", status: "approved" | "rejected") {
    if (!token) return toast({ title: "Lỗi", description: "Thiếu token đăng nhập", variant: "destructive" })
    const res = await approveLeaveOT(token, id, status)

    if (res.success) {
      toast({ title: "Thành công", description: res.message })
      loadData()
    } else {
      toast({ title: "Thất bại", description: res.message || "Lỗi phê duyệt", variant: "destructive" })
    }
  }

  const filteredLeave = leaveRequests.filter((r) =>
     r.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.reason?.toLowerCase().includes(searchTerm.toLowerCase())
  ).filter((r) => selectedStatus === "All" || r.status === selectedStatus)

  const filteredOT = otRequests.filter((r) =>
     r.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.reason?.toLowerCase().includes(searchTerm.toLowerCase())
  ).filter((r) => selectedStatus === "All" || r.status === selectedStatus)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Leave & OT Management</h1>
          <p className="text-muted-foreground">Quản lý đơn nghỉ phép và tăng ca</p>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="requests" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 bg-muted">
          <TabsTrigger value="requests" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Requests
          </TabsTrigger>
          <TabsTrigger value="calendar" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Calendar View
          </TabsTrigger>
        </TabsList>

        <TabsContent value="requests" className="space-y-4">
          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle>Bộ lọc</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col md:flex-row gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Tìm theo tên hoặc lý do..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">Tất cả</SelectItem>
                  <SelectItem value="pending">Chờ duyệt</SelectItem>
                  <SelectItem value="approved">Đã duyệt</SelectItem>
                  <SelectItem value="rejected">Từ chối</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={loadData} disabled={loading}>
                {loading ? "Đang tải..." : "Tải lại"}
              </Button>
            </CardContent>
          </Card>

          {/* Leave Requests */}
          <Card>
            <CardHeader>
              <CardTitle>Đơn nghỉ phép</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nhân viên</TableHead>
                      <TableHead>Loại nghỉ</TableHead>
                      <TableHead>Thời gian</TableHead>
                      <TableHead>Lý do</TableHead>
                      <TableHead>Trạng thái</TableHead>
                      <TableHead>Hành động</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredLeave.length === 0 && (
                      <TableRow><TableCell colSpan={6} className="text-center text-muted-foreground py-4">Không có đơn</TableCell></TableRow>
                    )}
                    {filteredLeave.map((req) => (
                      <TableRow key={req.id}>
                        <TableCell>{req.full_name}</TableCell>
                        <TableCell>{req.leave_type || "—"}</TableCell>
                        <TableCell>
                          {req.start_time} → {req.end_time}
                        </TableCell>
                        <TableCell className="max-w-40 truncate">{req.reason}</TableCell>
                        <TableCell>
                          <Badge
                            className={
                              req.status === "approved"
                                ? "bg-green-600 text-white"
                                : req.status === "rejected"
                                ? "bg-red-600 text-white"
                                : "bg-yellow-500 text-white"
                            }
                          >
                            {req.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {req.status === "pending" && (
                            <div className="flex gap-1">
                              <Button
                                size="sm"
                                onClick={() => handleApprove(req.id, "leave", "approved")}
                              >
                                Duyệt
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleApprove(req.id, "leave", "rejected")}
                              >
                                Từ chối
                              </Button>
                            </div>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* OT Requests */}
          <Card>
            <CardHeader>
              <CardTitle>Đơn tăng ca</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nhân viên</TableHead>
                      <TableHead>Giờ OT</TableHead>
                      <TableHead>Thời gian</TableHead>
                      <TableHead>Lý do</TableHead>
                      <TableHead>Trạng thái</TableHead>
                      <TableHead>Hành động</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredOT.length === 0 && (
                      <TableRow><TableCell colSpan={6} className="text-center text-muted-foreground py-4">Không có đơn</TableCell></TableRow>
                    )}
                    {filteredOT.map((req) => (
                      <TableRow key={req.id}>
                        <TableCell>{req.full_name}</TableCell>
                        <TableCell>{req.ot_hours || 0}h</TableCell>
                        <TableCell>{req.start_time} → {req.end_time}</TableCell>
                        <TableCell className="max-w-40 truncate">{req.reason}</TableCell>
                        <TableCell>
                          <Badge
                            className={
                              req.status === "approved"
                                ? "bg-green-600 text-white"
                                : req.status === "rejected"
                                ? "bg-red-600 text-white"
                                : "bg-yellow-500 text-white"
                            }
                          >
                            {req.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {req.status === "pending" && (
                            <div className="flex gap-1">
                              <Button
                                size="sm"
                                onClick={() => handleApprove(req.id, "ot", "approved")}
                              >
                                Duyệt
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleApprove(req.id, "ot", "rejected")}
                              >
                                Từ chối
                              </Button>
                            </div>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calendar">
          <Card>
            <CardHeader>
              <CardTitle>Calendar View</CardTitle>
              <CardDescription>Chức năng lịch sẽ được cập nhật sau</CardDescription>
            </CardHeader>
            <CardContent className="h-64 flex items-center justify-center text-muted-foreground">
              Coming soon...
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
