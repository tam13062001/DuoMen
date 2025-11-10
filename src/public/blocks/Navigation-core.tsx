import { useState, useEffect } from "@wordpress/element"
import { Layout, Menu, Button } from "antd"
import {
  HomeOutlined,
  FileTextOutlined,
  LineChartOutlined,
  UserOutlined,
  BookOutlined,
  PlayCircleOutlined,
  LeftOutlined,
  RightOutlined,
  UsergroupDeleteOutlined,
} from "@ant-design/icons"
import EmployeeManagement from "./orbit-core/employees"
import {LeaveOTManagement} from "./orbit-core/leave-ot"
const { Sider, Content } = Layout

const navigation = [
  { name: "Trang chủ", key: "home", icon: <HomeOutlined /> },
  { name: "Nhân viên", key: "employees", icon: <UsergroupDeleteOutlined />},
  { name: "Nghỉ phép", key: "leave", icon: <FileTextOutlined /> },
  { name: "Hợp đồng", key: "performance", icon: <LineChartOutlined /> },
  { name: "Hiệu suất", key: "profile", icon: <UserOutlined /> },
  { name: "Báo cáo", key: "knowledge-hub", icon: <BookOutlined /> }, // 👈 đổi key
  { name: "Cài đặt", key: "playground", icon: <PlayCircleOutlined /> },
]

export default function DashboardSidebarCore() {
  const [collapsed, setCollapsed] = useState(false)
  const [activeKey, setActiveKey] = useState("home")
  const [contents, setContents] = useState<Record<string, string>>({})

  useEffect(() => {
    const container = document.getElementById("orbit-contents")
    if (!container) {
      console.warn("⚠️ orbit-contents not found in DOM")
      return
    }

    const nodes = container.querySelectorAll<HTMLDivElement>("div[data-key]")
    const data: Record<string, string> = {}
    nodes.forEach((node) => {
      const key = node.getAttribute("data-key")
      if (key) data[key] = node.innerHTML
    })

    console.log("✅ Loaded orbit contents:", Object.keys(data))
    setContents(data)
  }, [])

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        trigger={null}
        width={240}
        style={{ background: "#000", borderRight: "1px solid #333" }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: collapsed ? "center" : "space-between",
            alignItems: "center",
            color: "#fff",
            padding: "12px",
          }}
        >
          {!collapsed && (
            <h2 style={{ fontSize: "18px", fontWeight: 600 }}>Navigation</h2>
          )}
          <Button
            type="text"
            onClick={() => setCollapsed(!collapsed)}
            icon={collapsed ? <RightOutlined /> : <LeftOutlined />}
            style={{ color: "#fff" }}
          />
        </div>

        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[activeKey]}
          style={{ background: "#000", color: "#fff" }}
        >
          {navigation.map((item) => (
            <Menu.Item
              key={item.key}
              icon={item.icon}
              onClick={() => setActiveKey(item.key)}
              style={{ display: "flex", alignItems: "center", gap: "12px" }}
            >
              {item.name}
            </Menu.Item>
          ))}
        </Menu>
      </Sider>

      <Layout style={{ padding: "20px" }}>
        <Content style={{ background: "#fff", padding: "24px", borderRadius: "8px" }}>
          {activeKey === "employees" ? (
            <EmployeeManagement />
          ) : activeKey === "leave" ? (
            <LeaveOTManagement />
          ) : contents[activeKey] ? (
            <div dangerouslySetInnerHTML={{ __html: contents[activeKey] }} />
          ) : (
            <p>Loading...</p>
          )}
        </Content>
      </Layout>
    </Layout>
  )
}
