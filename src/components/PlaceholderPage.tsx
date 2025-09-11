import { Typography } from 'antd'

const { Title } = Typography

interface PlaceholderPageProps {
  title: string
}

export function PlaceholderPage({ title }: PlaceholderPageProps) {
  return <Title level={2}>{title}</Title>
}