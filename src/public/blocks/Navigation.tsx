import { useState, useEffect } from "@wordpress/element"
import { Layout, Menu, Button } from "antd"
import {
  HomeOutlined,
  CalendarOutlined,
  FileTextOutlined,
  LineChartOutlined,
  UserOutlined,
  BookOutlined,
  PlayCircleOutlined,
  LeftOutlined,
  RightOutlined,
  ScheduleOutlined,
} from "@ant-design/icons"
import { ProfileManagement } from "./orbit-me/profile"
import { KnowledgeHub } from "./orbit-me/knowledge-hub"
import {PlaygroundAntd} from "./orbit-me/playgroud"
import {AttendanceManagement} from "./orbit-me/attendance"
import {LeaveManagement} from "./orbit-me/leave-ot"
const { Sider, Content } = Layout

const navigation = [
  { name: "Home", key: "home", icon: <HomeOutlined /> },
  { name: "Attendance", key: "attendance", icon: <ScheduleOutlined /> },
  { name: "Leave & OT", key: "leave", icon: <CalendarOutlined /> },
  { name: "Payslip", key: "payslip", icon: <FileTextOutlined /> },
  { name: "Performance", key: "performance", icon: <LineChartOutlined /> },
  { name: "My Profile", key: "profile", icon: <UserOutlined /> },
  { name: "Knowledge Hub", key: "knowledge-hub", icon: <BookOutlined /> }, // 👈 đổi key
  { name: "Playground", key: "playground", icon: <PlayCircleOutlined /> },
]

export default function DashboardSidebar() {
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
          {activeKey === "profile" ? (
            <ProfileManagement />
          ) : activeKey === "knowledge-hub" ? (
            <KnowledgeHub />
          ) : activeKey === "playground" ? (
            <PlaygroundAntd />
          ) : activeKey === "attendance" ? (
            <AttendanceManagement />
          ) : contents[activeKey] ? (
            <div dangerouslySetInnerHTML={{ __html: contents[activeKey] }} />
          ) : activeKey === "leave" ? (
            <LeaveManagement />
          ) :
          (
            <p>Loading...</p>
          )}
        </Content>
      </Layout>
    </Layout>
  )
}
