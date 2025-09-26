import { Tabs } from 'antd'
import { SanctumOverview } from './SanctumOverview'

export function Sanctum() {
  const items = [
    {
      key: 'overview',
      label: '圣化概览',
      children: <SanctumOverview />
    }
  ]

  return (
    <Tabs
      items={items}
      defaultActiveKey="overview"
      type="card"
      size="small"
    />
  )
}

// 为组件添加元数据
Sanctum.tabTitle = '圣化'
Sanctum.tabKey = 'sanctum'