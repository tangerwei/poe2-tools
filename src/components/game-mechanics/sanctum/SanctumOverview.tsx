import { Card, Space, Typography, Alert, InputNumber, Form, Divider, Row, Col, Table } from 'antd'
import { ExperimentOutlined, CalculatorOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import type { ColumnsType } from 'antd/es/table'

const { Text } = Typography

interface FormItemProps {
  label: string
  children: React.ReactNode
  style?: React.CSSProperties
}

interface SanctifyResultData {
  key: string
  attribute: string
  damage: string
  unchanged: string
  target: string
}

function FormItem({ label, children, style }: FormItemProps) {
  return (
    <Row style={{ marginBottom: 16, ...style }}>
      <Col span={6}>
        <Text style={{ lineHeight: '32px' }}>{label}</Text>
      </Col>
      <Col span={18}>
        {children}
      </Col>
    </Row>
  )
}

export function SanctumOverview() {
  const [form] = Form.useForm()
  const [results, setResults] = useState<SanctifyResultData[]>([])

  const resultColumns: ColumnsType<SanctifyResultData> = [
    {
      title: '装备属性',
      dataIndex: 'attribute',
      key: 'attribute',
      width: '25%',
      render: (text: string) => <Text strong>{text}</Text>
    },
    {
      title: '损坏结果',
      dataIndex: 'damage',
      key: 'damage',
      width: '25%',
      align: 'center',
      render: (value: string) => (
        <Text strong style={{ fontSize: '14px', color: '#ff4d4f' }}>
          {value}
        </Text>
      )
    },
    {
      title: '不变',
      dataIndex: 'unchanged',
      key: 'unchanged',
      width: '25%',
      align: 'center',
      render: (value: string) => (
        <Text strong style={{ fontSize: '14px', color: '#faad14' }}>
          {value}
        </Text>
      )
    },
    {
      title: '目标结果',
      dataIndex: 'target',
      key: 'target',
      width: '25%',
      align: 'center',
      render: (value: string) => (
        <Text strong style={{ fontSize: '14px', color: '#52c41a' }}>
          {value}
        </Text>
      )
    }
  ]

  const calculateResults = (values: any) => {
    const { skillLevel } = values

    // 计算技能等级在不同倍率下的概率分布（使用四舍五入）
    const originalValue = skillLevel || 3

    // 圣化倍率范围是80%-120%，每个倍率出现的概率相等
    // 我们需要计算在整个范围内，装备属性会出现的三种结果的概率区间

    // 找到各种结果的临界点
    // 技能等级使用四舍五入，需要找到精确的临界倍率

    // 对于四舍五入，临界点是 (目标值 - 0.5) / 原始值 和 (目标值 + 0.5) / 原始值
    const lowerBound = (originalValue - 0.5) / originalValue * 100  // 保持原值的最低倍率
    const upperBound = (originalValue + 0.5) / originalValue * 100  // 保持原值的最高倍率

    // 计算各区间
    let damageRangeStart = 80
    let damageRangeEnd = Math.min(120, lowerBound - 0.01)

    let unchangedRangeStart = Math.max(80, lowerBound)
    let unchangedRangeEnd = Math.min(120, upperBound - 0.01)

    let targetRangeStart = Math.max(80, upperBound)
    let targetRangeEnd = 120

    // 确保区间有效
    const damageRangeValid = damageRangeEnd >= damageRangeStart
    const unchangedRangeValid = unchangedRangeEnd >= unchangedRangeStart
    const targetRangeValid = targetRangeEnd >= targetRangeStart

    // 计算概率（基于倍率范围占总范围的比例）
    const totalRange = 40 // 120 - 80 = 40

    const formatNumber = (num: number) => {
      const fixed = num.toFixed(2)
      return fixed.endsWith('.00') ? fixed.slice(0, -3) : fixed
    }

    const formatPercentWithRange = (rangeStart: number, rangeEnd: number, valid: boolean) => {
      if (!valid || rangeEnd < rangeStart) return '-'

      // 限制在80-120范围内
      const effectiveStart = Math.max(80, rangeStart)
      const effectiveEnd = Math.min(120, rangeEnd)

      if (effectiveEnd < effectiveStart) return '-'

      const rangeSize = effectiveEnd - effectiveStart
      const percent = formatNumber((rangeSize / totalRange) * 100) + '%'

      if (Math.abs(effectiveStart - effectiveEnd) < 0.01) {
        return `${percent} (${formatNumber(effectiveStart)}%)`
      } else {
        return `${percent} (${formatNumber(effectiveStart)}%-${formatNumber(effectiveEnd)}%)`
      }
    }

    const damagePercent = formatPercentWithRange(damageRangeStart, damageRangeEnd, damageRangeValid)
    const unchangedPercent = formatPercentWithRange(unchangedRangeStart, unchangedRangeEnd, unchangedRangeValid)
    const targetPercent = formatPercentWithRange(targetRangeStart, targetRangeEnd, targetRangeValid)

    const calculatedResults: SanctifyResultData[] = [
      {
        key: 'skillLevel',
        attribute: `技能等级 +${originalValue}`,
        damage: damagePercent,
        unchanged: unchangedPercent,
        target: targetPercent
      }
    ]

    setResults(calculatedResults)
  }

  const onValuesChange = (_changedValues: any, allValues: any) => {
    calculateResults(allValues)
  }

  useEffect(() => {
    const initialValues = form.getFieldsValue()
    calculateResults(initialValues)
  }, [form])

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Alert
        message="圣化机制"
        description="圣化一个物品会重新随机其词缀数值，并将这些词缀的数值乘以一个介于 80% 至 120% 之间的随机值。生成的物品将成为圣化物品。大多数物品工艺与改造方式无法用于圣化物品。"
        type="info"
        icon={<ExperimentOutlined />}
        showIcon
      />

      <Card title={<><CalculatorOutlined /> 圣化成功率计算器</>} size="small">
        <Form
          form={form}
          layout="horizontal"
          onValuesChange={onValuesChange}
          initialValues={{
            skillLevel: 3
          }}
        >
          <Divider orientation="left" style={{ margin: '12px 0' }}>装备属性</Divider>

          <FormItem label="技能等级">
            <Form.Item
              name="skillLevel"
              style={{ marginBottom: 0 }}
            >
              <InputNumber
                min={1}
                max={10}
                style={{ width: 120 }}
                prefix="+"
              />
            </Form.Item>
          </FormItem>

          <Divider orientation="left" style={{ margin: '12px 0' }}>计算结果</Divider>

          <Table
            columns={resultColumns}
            dataSource={results}
            pagination={false}
            size="small"
            style={{ marginTop: 16 }}
          />
        </Form>
      </Card>
    </Space>
  )
}