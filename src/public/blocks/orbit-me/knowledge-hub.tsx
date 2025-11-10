import { useState } from "@wordpress/element"
import { Tabs, Card, Button, Input, Modal } from "antd"
import {
  SearchOutlined,
  DownloadOutlined,
  EyeOutlined,
  StarOutlined,
  StarFilled,
  ClockCircleOutlined,
  FileTextOutlined,
  VideoCameraOutlined,
  LinkOutlined,
  BookOutlined,
} from "@ant-design/icons"
import { format } from "date-fns"
import { vi } from "date-fns/locale"

const { TabPane } = Tabs

interface Document {
  id: string
  title: string
  description: string
  category: string
  type: "pdf" | "video" | "link" | "presentation"
  author: string
  publishDate: Date
  lastUpdated: Date
  views: number
  rating: number
  tags: string[]
  isNew: boolean
  isFavorite: boolean
}

const mockDocuments: Document[] = [
  {
    id: "1",
    title: "Employee Handbook 2024",
    description: "Cẩm nang nhân viên cập nhật với các chính sách mới nhất",
    category: "HR Policies",
    type: "pdf",
    author: "HR Department",
    publishDate: new Date(2024, 0, 1),
    lastUpdated: new Date(2024, 10, 1),
    views: 1250,
    rating: 4.8,
    tags: ["policy", "handbook"],
    isNew: true,
    isFavorite: false,
  },
  {
    id: "2",
    title: "React Best Practices",
    description: "Hướng dẫn coding standards và best practices cho React development",
    category: "Engineering",
    type: "presentation",
    author: "Tech Lead Team",
    publishDate: new Date(2024, 9, 15),
    lastUpdated: new Date(2024, 10, 5),
    views: 890,
    rating: 4.9,
    tags: ["react", "coding"],
    isNew: true,
    isFavorite: true,
  },
  {
    id: "3",
    title: "Security Training Video",
    description: "Video training về bảo mật thông tin và cyber security",
    category: "Security",
    type: "video",
    author: "IT Security",
    publishDate: new Date(2024, 8, 20),
    lastUpdated: new Date(2024, 8, 20),
    views: 2100,
    rating: 4.6,
    tags: ["security", "training"],
    isNew: false,
    isFavorite: false,
  },
]

export function KnowledgeHub() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null)
  const [viewDialogOpen, setViewDialogOpen] = useState(false)

  const categories = ["all", "HR Policies", "Engineering", "Security", "Benefits", "Training"]

  const filteredDocuments = mockDocuments.filter((doc) => {
    const matchesSearch =
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesCategory = selectedCategory === "all" || doc.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return <FileTextOutlined style={{ color: "red" }} />
      case "video":
        return <VideoCameraOutlined style={{ color: "blue" }} />
      case "link":
        return <LinkOutlined style={{ color: "green" }} />
      case "presentation":
        return <FileTextOutlined style={{ color: "orange" }} />
      default:
        return <FileTextOutlined />
    }
  }

  const handleDocumentView = (doc: Document) => {
    setSelectedDocument(doc)
    setViewDialogOpen(true)
  }

  return (
    
    <div className="p-6 bg-gray-50 min-h-screen">
        <div className="py-6 ">
        <h2 className="text-2xl font-bold">Leave & OT Management</h2>
        <p className="text-gray-700">
            Quản lý nghỉ phép và làm thêm giờ
        </p>
        </div>
      <Tabs
        defaultActiveKey="documents"
        centered
        className="bg-gray-100 rounded-lg p-2"
        tabBarStyle={{ marginBottom: 24 }}
      >
        <TabPane tab="Tài liệu" key="documents">
          {/* Search + Filter */}
          <Card className="mb-6 rounded-xl shadow-sm p-4">
            <div className="flex flex-col md:flex-row gap-4 items-stretch">
                {/* Search */}
                <Input
                prefix={<SearchOutlined />}
                placeholder="Tìm kiếm tài liệu..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="rounded-lg h-10 md:w-1/3 px-4"
                />

                {/* Categories */}
                <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                    <Button
                    key={cat}
                    type={selectedCategory === cat ? "primary" : "default"}
                    size="small"
                    onClick={() => setSelectedCategory(cat)}
                    className={
                        selectedCategory === cat
                        ? "bg-primary text-white rounded-lg h-10 px-4"
                        : "rounded-lg h-10 px-4"
                    }
                    >
                    {cat === "all" ? "Tất cả" : cat}
                    </Button>
                ))}
                </div>
            </div>
        </Card>


          {/* Document Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDocuments.map((doc) => (
              <Card
                key={doc.id}
                className="rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow "
                bodyStyle={{ padding: 16 }}
                title={
                  <div className="flex items-center gap-2">
                    {getTypeIcon(doc.type)}
                    <span className="font-semibold">{doc.title}</span>
                    {doc.isNew && (
                      <span className="ml-2 text-xs bg-primary text-white px-2 py-1 rounded">
                        Mới
                      </span>
                    )}
                  </div>
                }
                extra={
                  doc.isFavorite ? (
                    <StarFilled style={{ color: "gold" }} />
                  ) : (
                    <StarOutlined style={{ color: "#999" }} />
                  )
                }
              >
                <p className="text-gray-600 mb-3">{doc.description}</p>
                <div className="flex gap-4 text-xs text-gray-500 mb-3 py-2">
                  <span>
                    <EyeOutlined /> {doc.views}
                  </span>
                  <span>
                    <StarOutlined /> {doc.rating}
                  </span>
                  <span>
                    <ClockCircleOutlined />{" "}
                    {format(doc.lastUpdated, "dd/MM", { locale: vi })}
                  </span>
                </div>
                <div className="flex gap-2 mb-3 flex-wrap py-2">
                  {doc.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Button
                    block
                    type="primary"
                    icon={<EyeOutlined />}
                    className="bg-primary hover:bg-primary-700 border-none rounded-lg"
                    onClick={() => handleDocumentView(doc)}
                  >
                    Xem
                  </Button>
                  <Button icon={<DownloadOutlined />} />
                </div>
              </Card>
            ))}
          </div>
        </TabPane>

        <TabPane tab="FAQ" key="faq">
            {/* Search + Filter */}
          <Card title={<><BookOutlined /> Câu hỏi thường gặp</>} className="mb-6 rounded-xl shadow-sm p-4">
            <div className="grid grid-cols-1 gap-6">
                <div className="p-4 border rounded-lg"> 
                    <div className="flex justify-between gap-4 mb-2">
                        <h2 className="text-[20px] font-bold">Làm thế nào để xin nghỉ phép?</h2>
                        <span className="px-2 bg-gray-400 text-[16px] rounded-lg">Leave</span>
                    </div>
                    
                    <p className="mb-2 text-[18px]">Bạn có thể xin nghỉ phép thông qua hệ thống Orbit Me. Vào mục Leave & OT, chọn 'Tạo đơn mới', điền thông tin và gửi đơn. Đơn sẽ được gửi đến quản lý trực tiếp để phê duyệt.</p>
                    <div className="py-3 text-[18px]">
                        <p className="text-xs text-gray">45 người thấy hữu ích <span className="ml-[20px]">230 lượt xem</span> </p>
                    </div>
                </div>

                <div className="p-4 border rounded-lg"> 
                    <div className="flex justify-between gap-4 mb-2">
                        <h2 className="text-[20px] font-bold">Khi nào tôi nhận được bảng lương?</h2>
                        <span className="px-2 bg-gray-400 text-[16px] rounded-lg">Payroll</span>
                    </div>
                    
                    <p className="mb-2 text-[18px]">Bảng lương được phát hành vào ngày 25 hàng tháng. Bạn sẽ nhận được thông báo qua email và có thể xem/tải về trong mục Payslip của hệ thống.</p>
                    <div className="py-3 text-[18px]">
                        <p className="text-xs text-gray">38 người thấy hữu ích <span className="ml-[20px]">180 lượt xem</span> </p>
                    </div>
                </div>

                <div className="p-4 border rounded-lg"> 
                    <div className="flex justify-between gap-4 mb-2">
                        <h2 className="text-[20px] font-bold">Làm sao để cập nhật thông tin cá nhân?</h2>
                        <span className="px-2 bg-gray-400 text-[16px] rounded-lg">Profile</span>
                    </div>
                    
                    <p className="mb-2 text-[18px]">Vào mục My Profile, chọn tab 'Thông tin cá nhân', click 'Chỉnh sửa' để cập nhật thông tin. Một số thông tin như chức vụ, phòng ban cần liên hệ HR để thay đổi.</p>
                    <div className="py-3 text-[18px]">
                        <p className="text-xs text-gray">52 người thấy hữu ích <span className="ml-[20px]">290 lượt xem</span> </p>
                    </div>
                </div>
            </div>
        </Card>



        </TabPane>

<TabPane tab="Đào tạo" key="training">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {/* Khóa học bắt buộc */}
    <Card
      title="Khóa học bắt buộc"
      className="rounded-xl shadow-sm py-4"
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 border rounded">
          <div>
            <div className="font-medium">Security Awareness</div>
            <div className="text-sm text-gray-500">Deadline: 31/12/2024</div>
          </div>
          <span className="px-2 py-1 rounded bg-red-100 text-red-800 text-xs">
            Chưa hoàn thành
          </span>
        </div>

        <div className="flex items-center justify-between p-4 border rounded">
          <div>
            <div className="font-medium">Code of Conduct</div>
            <div className="text-sm text-gray-500">Hoàn thành: 15/10/2024</div>
          </div>
          <span className="px-2 py-1 rounded bg-green-100 text-green-800 text-xs">
            Đã hoàn thành
          </span>
        </div>
      </div>
    </Card>

    {/* Khóa học đề xuất */}
    <Card
      title="Khóa học đề xuất"
      className="rounded-xl shadow-sm py-4"
    >
      <div className="space-y-4">
        <div className="p-4 border rounded">
          <div className="font-medium">Advanced React Patterns</div>
          <div className="text-sm text-gray-500">
            Dành cho Frontend Developers
          </div>
          <Button size="small" type="primary" className="mt-2 text-black bg-primary rounded-lg px-2">
            Đăng ký
          </Button>
        </div>

        <div className="p-4 border rounded">
          <div className="font-medium">Leadership Skills</div>
          <div className="text-sm text-gray-500">
            Phát triển kỹ năng lãnh đạo
          </div>
          <Button size="small" type="primary" className="mt-2 text-black bg-primary rounded-lg px-2">
            Đăng ký
          </Button>
        </div>
      </div>
    </Card>
  </div>
</TabPane>

      </Tabs>

      {/* Modal xem tài liệu */}
      <Modal
        open={viewDialogOpen}
        onCancel={() => setViewDialogOpen(false)}
        footer={null}
        title={selectedDocument?.title}
        width={800}
      >
        {selectedDocument && (
          <div>
            <p>Tác giả: {selectedDocument.author}</p>
            <p>
              Cập nhật: {format(selectedDocument.lastUpdated, "dd/MM/yyyy", { locale: vi })}
            </p>
            <p>Lượt xem: {selectedDocument.views}</p>
            <div className="mt-4 p-8 bg-gray-100 text-center rounded">
              {getTypeIcon(selectedDocument.type)}
              <p className="mt-2">{selectedDocument.description}</p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
