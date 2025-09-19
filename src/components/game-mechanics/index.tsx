import { Typography, Card, Row, Col, Space } from 'antd'
import { ThunderboltOutlined, DashboardOutlined, FireOutlined, SafetyOutlined } from '@ant-design/icons'
import { useNavigationStore } from '../../hooks/useNavigationStore'

const { Title, Paragraph } = Typography

interface MechanicCard {
  key: string
  title: string
  description: string
  icon: React.ReactNode
  available: boolean
}

export function GameMechanics() {
  const { setSelectedKey } = useNavigationStore()

  const mechanics: MechanicCard[] = [
    {
      key: 'movement-penalty',
      title: '移速惩罚',
      description: '了解不同护甲和盾牌对移动速度的影响，以及如何减免这些惩罚',
      icon: <DashboardOutlined style={{ fontSize: 32 }} />,
      available: true,
    },
    {
      key: 'resistance',
      title: '抗性机制',
      description: '元素抗性、混沌抗性的计算方式和上限',
      icon: <SafetyOutlined style={{ fontSize: 32 }} />,
      available: false,
    },
    {
      key: 'damage-calc',
      title: '伤害计算',
      description: '物理、元素、混沌伤害的计算公式和加成机制',
      icon: <FireOutlined style={{ fontSize: 32 }} />,
      available: false,
    },
    {
      key: 'skill-gems',
      title: '技能宝石系统',
      description: '技能宝石、辅助宝石的连接和品质系统',
      icon: <ThunderboltOutlined style={{ fontSize: 32 }} />,
      available: false,
    },
  ]

  const handleCardClick = (key: string, available: boolean) => {
    if (available) {
      setSelectedKey(key)
    }
  }

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <div>
        <Title level={2}>游戏机制</Title>
        <Paragraph>
          深入了解POE2的核心游戏机制，掌握游戏的底层运作原理，优化你的角色构建。
        </Paragraph>
      </div>

      <Row gutter={[16, 16]}>
        {mechanics.map((mechanic) => (
          <Col xs={24} sm={12} lg={6} key={mechanic.key}>
            <Card
              hoverable={mechanic.available}
              onClick={() => handleCardClick(mechanic.key, mechanic.available)}
              style={{
                height: '100%',
                opacity: mechanic.available ? 1 : 0.6,
                cursor: mechanic.available ? 'pointer' : 'not-allowed'
              }}
            >
              <Space direction="vertical" align="center" style={{ width: '100%' }}>
                <div style={{
                  color: mechanic.available ? '#1890ff' : '#8c8c8c',
                  marginBottom: 16
                }}>
                  {mechanic.icon}
                </div>
                <Title level={4} style={{ textAlign: 'center', marginBottom: 8 }}>
                  {mechanic.title}
                </Title>
                <Paragraph
                  type={mechanic.available ? undefined : 'secondary'}
                  style={{ textAlign: 'center', marginBottom: 0 }}
                >
                  {mechanic.description}
                </Paragraph>
                {!mechanic.available && (
                  <Paragraph type="secondary" style={{ marginTop: 8, fontSize: 12 }}>
                    即将推出
                  </Paragraph>
                )}
              </Space>
            </Card>
          </Col>
        ))}
      </Row>

      <Card type="inner" style={{ marginTop: 24 }}>
        <Title level={4}>更多机制内容</Title>
        <Paragraph>
          游戏机制板块会持续更新，包括但不限于：
        </Paragraph>
        <ul>
          <li>词缀系统：前缀、后缀的生成规则和权重</li>
          <li>合成系统：各种通货的使用技巧</li>
          <li>地图机制：地图词缀、稀有度对掉落的影响</li>
          <li>联盟机制：各个联盟的特殊玩法和奖励</li>
          <li>Boss机制：终盘Boss的攻略和机制解析</li>
        </ul>
      </Card>
    </Space>
  )
}