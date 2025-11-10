"use client"

import { useEffect, useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Badge } from "../../components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { Plus, Search, Edit, Trash2 } from "lucide-react"
import axios from "axios"
import { EmployeeFormPage } from "./EmployeeFormPage"
import { deleteEmployee } from "../../api/api-profile"

type Employee = {
  id: string
  full_name: string
  personal_email: string
  phone: string
  active: string
  created_at: string
  position_title: string
  department_name: string
}

export default function EmployeeManagement() {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [searchText, setSearchText] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState("All")
  const [statusFilter, setStatusFilter] = useState("All")

  const [viewMode, setViewMode] = useState<"list" | "add" | "edit">("list")
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | undefined>(undefined)

  // 🧭 Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  useEffect(() => {
    if (viewMode === "list") {
      axios
        .get("/index.php?rest_route=/rocket/v1/employees")
        .then((res) => {
          if (res.data.success) {
            const list = res.data.data.map((item: any) => {
              const contract = item.contract && item.contract.length > 0 ? item.contract[0] : {}
              return {
                id: item.personal.id,
                full_name: item.personal.full_name,
                personal_email: item.personal.personal_email,
                phone: item.personal.phone,
                active: item.personal.active,
                created_at: item.personal.created_at,
                position_title: contract.position_title || "",
                department_name: contract.department_name || "",
              }
            })
            setEmployees(list)
          }
        })
        .catch((err) => console.error(err))
    }
  }, [viewMode])

  const filteredEmployees = useMemo(() => {
    return employees.filter((emp) => {
      const matchesSearch =
        emp.full_name?.toLowerCase().includes(searchText.toLowerCase()) ||
        emp.personal_email?.toLowerCase().includes(searchText.toLowerCase())

      const matchesDept = departmentFilter === "All" || emp.department_name === departmentFilter
      const matchesStatus =
        statusFilter === "All" ||
        (statusFilter === "Active" && emp.active === "1") ||
        (statusFilter === "Inactive" && emp.active !== "1")

      return matchesSearch && matchesDept && matchesStatus
    })
  }, [employees, searchText, departmentFilter, statusFilter])

  // 🧮 Pagination calculation
  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const currentEmployees = filteredEmployees.slice(startIndex, startIndex + itemsPerPage)

  // 🧭 Reset page khi filter/search thay đổi
  useEffect(() => {
    setCurrentPage(1)
  }, [searchText, departmentFilter, statusFilter])

  // 👉 Render form khi add hoặc edit
  if (viewMode === "add") {
    return <EmployeeFormPage mode="add" employeeId={undefined} onCancel={() => setViewMode("list")} />
  }
  if (viewMode === "edit") {
    return <EmployeeFormPage mode="edit" employeeId={selectedEmployeeId} onCancel={() => setViewMode("list")} />
  }

  const departments = ["All", "IT", "Marketing", "Sales", "HR", "Finance"]
  const statuses = ["All", "Active", "Inactive"]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-black">Quản lý nhân viên</h1>
          <p className="text-black/70">Quản lý thông tin nhân viên và hồ sơ</p>
        </div>

        <Button className="bg-primary text-black font-semibold" onClick={() => setViewMode("add")}>
          <Plus className="mr-2 h-4 w-4" />
          Thêm nhân viên
        </Button>
      </div>

      {/* Filters */}
      <Card className="bg-white border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-black">Bộ lọc & Tìm kiếm</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-4 w-4" />
              <Input
                placeholder="Tìm kiếm theo tên, mã NV, hoặc email..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="pl-10 bg-white border-gray-300"
              />
            </div>
            <div className="flex gap-2">
              <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                <SelectTrigger className="w-40 bg-white border-gray-300">
                  <SelectValue placeholder="Phòng ban" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((dept) => (
                    <SelectItem key={dept} value={dept}>
                      {dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-32 bg-white border-gray-300">
                  <SelectValue placeholder="Trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  {statuses.map((st) => (
                    <SelectItem key={st} value={st}>
                      {st}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Employee Table */}
      <Card className="bg-white border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-black">Danh sách nhân viên ({filteredEmployees.length})</CardTitle>
          <CardDescription className="text-gray-600">Quản lý thông tin và hồ sơ nhân viên</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border border-gray-200 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Mã NV</TableHead>
                  <TableHead>Họ tên</TableHead>
                  <TableHead>Chức vụ</TableHead>
                  <TableHead>Phòng ban</TableHead>
                  <TableHead>Liên hệ</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead>Ngày vào</TableHead>
                  <TableHead>Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentEmployees.length > 0 ? (
                  currentEmployees.map((emp) => (
                    <TableRow key={emp.id}>
                      <TableCell>{emp.id}</TableCell>
                      <TableCell>{emp.full_name}</TableCell>
                      <TableCell>{emp.position_title}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{emp.department_name || "Chưa rõ"}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="text-sm">{emp.personal_email}</div>
                          <div className="text-xs text-gray-600">{emp.phone}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={
                            emp.active === "1"
                              ? "bg-primary text-black"
                              : "bg-gray-200 text-gray-600"
                          }
                        >
                          {emp.active === "1" ? "Hoạt động" : "Không hoạt động"}
                        </Badge>
                      </TableCell>
                      <TableCell>{emp.created_at}</TableCell>
                      <TableCell>
                        <div className="flex space-x-1">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                              setSelectedEmployeeId(emp.id)
                              setViewMode("edit")
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-red-600 hover:bg-red-50"
                            onClick={async () => {
                              if (confirm(`Bạn có chắc muốn xóa nhân viên ${emp.full_name}?`)) {
                                const res = await deleteEmployee(emp.id)
                                if (res.success) {
                                  setEmployees((prev) => prev.filter((e) => e.id !== emp.id))
                                } else {
                                  alert(res.message || "Không thể xóa nhân viên")
                                }
                              }
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-6 text-gray-500">
                      Không tìm thấy nhân viên nào
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* ✅ Pagination controls */}
          <div className="flex justify-center items-center gap-3 mt-4">
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            >
              Trang trước
            </Button>

            <span className="text-sm text-gray-700">
              Trang {currentPage} / {totalPages || 1}
            </span>

            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === totalPages || totalPages === 0}
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            >
              Trang sau
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
