import { Space, Typography } from 'antd'

const { Title, Text } = Typography

export function StoryOverview() {
  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Title level={2}>剧情流程</Title>
      <Text>请从左侧菜单选择章节查看详细流程</Text>
    </Space>
  )
}