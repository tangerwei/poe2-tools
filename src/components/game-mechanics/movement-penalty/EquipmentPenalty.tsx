import { Typography, Card, Table, Space, Alert } from 'antd'
import type { ColumnsType } from 'antd/es/table'

const { Title, Paragraph, Text } = Typography

interface PenaltyData {
  key: string
  equipmentType: string
  basePenalty: string
  notes?: string
}

export function EquipmentPenalty() {
  const columns: ColumnsType<PenaltyData> = [
    {
      title: '装备类型',
      dataIndex: 'equipmentType',
      key: 'equipmentType',
      width: '30%',
    },
    {
      title: '基础移速惩罚',
      dataIndex: 'basePenalty',
      key: 'basePenalty',
      width: '25%',
      render: (text: string) => <Text strong>{text}</Text>,
    },
    {
      title: '备注',
      dataIndex: 'notes',
      key: 'notes',
      width: '45%',
      render: (text?: string) => text || '-',
    },
  ]

  const armorData: PenaltyData[] = [
    // 待填充正确数据
  ]

  const shieldData: PenaltyData[] = [
    // 待填充正确数据
  ]

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Alert
        message="装备移速惩罚"
        description="不同类型的装备会对角色的移动速度产生惩罚，需要在防御和机动性之间做出权衡。"
        type="info"
        showIcon
      />

      <Card title="护甲移速惩罚">
        <Table
          columns={columns}
          dataSource={armorData}
          pagination={false}
          size="middle"
        />
        <Paragraph style={{ marginTop: 16 }}>
          <Text type="secondary">
            * 护甲的移速惩罚基于装备的基础类型，不受装备词缀影响
          </Text>
        </Paragraph>
      </Card>

      <Card title="盾牌移速惩罚">
        <Table
          columns={columns}
          dataSource={shieldData}
          pagination={false}
          size="middle"
        />
        <Paragraph style={{ marginTop: 16 }}>
          <Text type="secondary">
            * 盾牌的移速惩罚独立计算，与护甲惩罚叠加
          </Text>
        </Paragraph>
      </Card>

      <Card title="减免装备惩罚的方法">
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <div>
            <Title level={4}>1. 天赋点</Title>
            <Paragraph>
              某些天赋可以减少或完全移除护甲的移速惩罚，例如：
              <ul>
                <li>护甲精通类天赋</li>
                <li>特定职业的专属天赋</li>
              </ul>
            </Paragraph>
          </div>

          <div>
            <Title level={4}>2. 装备词缀</Title>
            <Paragraph>
              某些独特装备或稀有词缀可以提供移速加成，部分抵消惩罚：
              <ul>
                <li>鞋子上的移速词缀（最高 +30%）</li>
                <li>特定独特装备的固定词缀</li>
              </ul>
            </Paragraph>
          </div>

          <div>
            <Title level={4}>3. 药剂</Title>
            <Paragraph>
              快速药剂可以临时提供大量移速加成：
              <ul>
                <li>快速药剂：+40% 移速</li>
                <li>水银药剂：+60% 移速（如果游戏中存在）</li>
              </ul>
            </Paragraph>
          </div>
        </Space>
      </Card>
    </Space>
  )
}

// 为组件添加元数据
EquipmentPenalty.tabTitle = '装备移速惩罚'
EquipmentPenalty.tabKey = 'equipment'