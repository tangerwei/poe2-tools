import { Typography, Space, Tabs } from 'antd'
import { SkillPenalty } from './SkillPenalty'
import { EquipmentPenalty } from './EquipmentPenalty'

const { Title, Paragraph } = Typography
const { TabPane } = Tabs

// 定义标签页配置接口
interface TabConfig {
  key: string
  title: string
  component: React.ComponentType & { tabTitle?: string; tabKey?: string }
}

// 标签页配置
const tabConfigs: TabConfig[] = [
  {
    key: SkillPenalty.tabKey || 'skills',
    title: SkillPenalty.tabTitle || '技能释放惩罚',
    component: SkillPenalty
  },
  {
    key: EquipmentPenalty.tabKey || 'equipment',
    title: EquipmentPenalty.tabTitle || '装备移速惩罚',
    component: EquipmentPenalty
  },
  // 未来可以轻松添加更多标签页
  // {
  //   key: BuffPenalty.tabKey || 'buffs',
  //   title: BuffPenalty.tabTitle || 'Buff/Debuff惩罚',
  //   component: BuffPenalty
  // }
]

export function MovementPenalty() {
  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <div>
        <Title level={2}>移速惩罚机制</Title>
        <Paragraph>
          在POE2中，移速惩罚主要来自两个方面：装备穿戴的固定惩罚，以及技能释放时的动态惩罚。
          理解这些机制对于优化角色的机动性和战斗效率至关重要。
        </Paragraph>
      </div>

      <Tabs defaultActiveKey={tabConfigs[0].key} size="large">
        {tabConfigs.map((config) => {
          const Component = config.component
          return (
            <TabPane tab={config.title} key={config.key}>
              <Component />
            </TabPane>
          )
        })}
      </Tabs>
    </Space>
  )
}

// 导出MovementPenalty作为默认导出，方便其他地方引用
export { MovementPenalty as default }