import { useState } from "@wordpress/element"
import {
  Tabs,
  Card,
  Badge,
  Button,
  Avatar,
  Modal,
  Progress,
  Row,
  Col,
  Tag,
  List,
  Space,
} from "antd"
import {
  CalendarOutlined,
  TeamOutlined,
  GiftOutlined,
  StarOutlined,
  HeartOutlined,
  EnvironmentOutlined,
  UserOutlined,
} from "@ant-design/icons"
import { format } from "date-fns"
import { vi } from "date-fns/locale"

const { TabPane } = Tabs

interface Event {
  id: string
  title: string
  description: string
  type: "team-building" | "social" | "learning" | "wellness"
  date: Date
  location: string
  participants: number
  maxParticipants: number
  organizer: string
  status: "upcoming" | "ongoing" | "completed"
  isJoined: boolean
}

interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  earnedDate: Date
  rarity: "common" | "rare" | "epic" | "legendary"
}

interface Leaderboard {
  rank: number
  name: string
  avatar: string
  points: number
  badges: number
}

const mockEvents: Event[] = [
  {
    id: "1",
    title: "Team Building Q4 2024",
    description: "Hoạt động team building cuối năm tại resort Vũng Tàu với nhiều trò chơi thú vị",
    type: "team-building",
    date: new Date(2024, 11, 15),
    location: "Vũng Tàu Resort",
    participants: 45,
    maxParticipants: 60,
    organizer: "HR Team",
    status: "upcoming",
    isJoined: true,
  },
  {
    id: "2",
    title: "Tech Talk: AI in Development",
    description: "Chia sẻ về ứng dụng AI trong phát triển phần mềm",
    type: "learning",
    date: new Date(2024, 10, 28),
    location: "Meeting Room A",
    participants: 25,
    maxParticipants: 50,
    organizer: "Tech Team",
    status: "upcoming",
    isJoined: false,
  },
]

const mockAchievements: Achievement[] = [
  {
    id: "1",
    title: "Early Bird",
    description: "Đến sớm 30 ngày liên tiếp",
    icon: "🌅",
    earnedDate: new Date(2024, 9, 15),
    rarity: "rare",
  },
  {
    id: "2",
    title: "Team Player",
    description: "Tham gia 5 hoạt động team building",
    icon: "🤝",
    earnedDate: new Date(2024, 8, 20),
    rarity: "common",
  },
]

const mockLeaderboard: Leaderboard[] = [
  { rank: 1, name: "Nguyen Van A", avatar: "", points: 2450, badges: 12 },
  { rank: 2, name: "Kim Nguyen", avatar: "", points: 2380, badges: 10 },
  { rank: 3, name: "Tran Thi B", avatar: "", points: 2200, badges: 9 },
]

export function PlaygroundAntd() {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [eventModalOpen, setEventModalOpen] = useState(false)

  const handleEventView = (event: Event) => {
    setSelectedEvent(event)
    setEventModalOpen(true)
  }

  const handleJoinEvent = (eventId: string) => {
    console.log("Joining event:", eventId)
  }

  const getEventTypeTag = (type: string) => {
  switch (type) {
    case "team-building":
      return <Tag color="blue">Team Building</Tag>
    case "social":
      return <Tag color="green">Hoạt động xã hội</Tag>
    case "learning":
      return <Tag color="purple">Học tập</Tag>
    case "wellness":
      return <Tag color="pink">Sức khỏe</Tag>
    default:
      return <Tag>Khác</Tag>
  }
}

  return (
    <Tabs defaultActiveKey="events">
      <TabPane tab="Sự kiện" key="events">
  <Row gutter={[16, 16]} className="mb-4">
    <Col xs={24} sm={12} md={6}>
      <Card>
        <div className="pb-2 font-medium text-sm text-gray-500">Sự kiện tham gia</div>
        <div className="text-2xl font-bold text-primary">12</div>
        <p className="text-xs text-gray-400">Năm 2024</p>
      </Card>
    </Col>

    <Col xs={24} sm={12} md={6}>
      <Card>
        <div className="pb-2 font-medium text-sm text-gray-500">Điểm tích lũy</div>
        <div className="text-2xl font-bold text-green-600">2,380</div>
        <p className="text-xs text-gray-400">Hạng #2</p>
      </Card>
    </Col>

    <Col xs={24} sm={12} md={6}>
      <Card>
        <div className="pb-2 font-medium text-sm text-gray-500">Thành tích</div>
        <div className="text-2xl font-bold">10</div>
        <p className="text-xs text-gray-400">Badges earned</p>
      </Card>
    </Col>

    <Col xs={24} sm={12} md={6}>
      <Card>
        <div className="pb-2 font-medium text-sm text-gray-500">Sự kiện sắp tới</div>
        <div className="text-2xl font-bold text-blue-600">3</div>
        <p className="text-xs text-gray-400">Đã đăng ký</p>
      </Card>
    </Col>
  </Row>

  <Card title={<><CalendarOutlined /> Sự kiện sắp tới</>}>
    <List
      itemLayout="vertical"
      dataSource={mockEvents}
      renderItem={(event: Event) => (
        <List.Item key={event.id}>
          <Card>
            <Row justify="space-between" align="top" style={{ marginBottom: 0 }}>
              <Col>
                <h3 style={{ fontWeight: 500 }}>{event.title}</h3>
                <p style={{ color: "#888", marginBottom: 8 }}>{event.description}</p>
                <Space size="large" style={{ fontSize: 12, color: "#888" }}>
                  <span><CalendarOutlined /> {format(event.date, "dd/MM/yyyy HH:mm", { locale: vi })}</span>
                  <span><EnvironmentOutlined /> {event.location}</span>
                  <span><TeamOutlined /> {event.participants}/{event.maxParticipants}</span>
                </Space>
              </Col>
              <Col style={{ textAlign: "right" }}>
                {getEventTypeTag(event.type)}
                <div style={{ marginTop: 8 }}>
                  {event.isJoined ? (
                    <Tag color="green">Đã tham gia</Tag>
                  ) : (
                    <Button size="small" type="primary" className="bg-primary rounded-lg text-black" onClick={() => handleJoinEvent(event.id)}>Tham gia</Button>
                  )}
                </div>
              </Col>
            </Row>

            <Row align="middle">
              <Col flex="auto">
                <Progress
  percent={(event.participants / event.maxParticipants) * 100}
  size="small"
  strokeColor="#F3C11B"
/>
              </Col>
              <Col>
                <Button size="small" className=" rounded-lg text-black" onClick={() => handleEventView(event)}>Chi tiết</Button>
              </Col>
            </Row>
          </Card>
        </List.Item>
      )}
    />
  </Card>
</TabPane>


      <TabPane tab="Thành tích" key="achievements">
        <Row gutter={16}>
          {mockAchievements.map((ach) => (
            <Col span={8} key={ach.id}>
              <Card>
                <div style={{ fontSize: 30 }}>{ach.icon}</div>
                <h4>{ach.title}</h4>
                <p>{ach.description}</p>
                <Badge color="blue" text={ach.rarity} />
              </Card>
            </Col>
          ))}
        </Row>
      </TabPane>

      <TabPane tab="Bảng xếp hạng" key="leaderboard">
        {mockLeaderboard.map((user) => (
          <Card key={user.rank} className="mb-3">
            <Row justify="space-between" align="middle">
              <Col>
                <Avatar icon={<UserOutlined />} />
                <span style={{ marginLeft: 8 }}>{user.name}</span>
              </Col>
              <Col>
                <b>{user.points}</b> điểm
              </Col>
            </Row>
          </Card>
        ))}
      </TabPane>

      <TabPane tab="Phần thưởng" key="rewards">
        <Row gutter={16}>
          <Col span={8}>
            <Card title="Voucher ăn trưa" cover={<GiftOutlined style={{ fontSize: 40, margin: "16px auto" }} />}>
              <p>500 điểm</p>
              <Button block>Đổi thưởng</Button>
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Ngày nghỉ thêm" cover={<HeartOutlined style={{ fontSize: 40, margin: "16px auto", color: "red" }} />}>
              <p>2000 điểm</p>
              <Button block>Đổi thưởng</Button>
            </Card>
          </Col>
        </Row>
      </TabPane>

      <Modal
        open={eventModalOpen}
        onCancel={() => setEventModalOpen(false)}
        title={selectedEvent?.title}
        footer={null}
      >
        {selectedEvent && (
          <>
            <p>{selectedEvent.description}</p>
            <p><b>Địa điểm: </b> {selectedEvent.location}</p>
            <p><b>Tổ chức bởi:</b> {selectedEvent.organizer}</p>
          </>
        )}
      </Modal>
    </Tabs>
  )
}
