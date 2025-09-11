import { Space } from 'antd'
import { Summary } from './Summary'
import { MapList } from './MapList'

export function Chapter1() {
  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Summary />
      <MapList />
    </Space>
  )
}