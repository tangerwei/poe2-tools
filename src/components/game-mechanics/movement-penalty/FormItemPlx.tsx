import { Row, Col, Typography } from 'antd'
import { ReactNode } from 'react'

const { Text } = Typography

interface FormItemPlxProps {
  label: string
  children: ReactNode
  style?: React.CSSProperties
}

export function FormItemPlx({ label, children, style }: FormItemPlxProps) {
  return (
    <Row style={{ marginBottom: 16, ...style }}>
      <Col span={4}>
        <Text style={{ lineHeight: '24px' }}>{label}</Text>
      </Col>
      <Col span={20}>
        {children}
      </Col>
    </Row>
  )
}