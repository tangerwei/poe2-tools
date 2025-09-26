import { useState, useEffect } from 'react'
import { Card, Form, InputNumber, Space, Typography, Divider, Checkbox, Table } from 'antd'
import { FormItemPlx } from './FormItemPlx'
import type { ColumnsType } from 'antd/es/table'

const { Text } = Typography

interface SkillGem {
  key: string
  name: string
  effect: string
  penaltyModifier: number // 正数表示增加惩罚，负数表示减少惩罚
}

interface CalculatorValues {
  baseSpeed: number
  skillGems: string[]
  bootsSpeedIncrease: number
  reducePenalty: number
  socketCount: number
  runeType: 'speed' | 'penalty_reduction'
  doubleRuneEffect: boolean
}

interface SpeedResultData {
  key: string
  speedType: string
  speedRune: number
  penaltyReductionRune: number
}

export function MovementSpeedCalculator() {
  const [form] = Form.useForm()
  const [speedResults, setSpeedResults] = useState<SpeedResultData[]>([])
  const [baseResults, setBaseResults] = useState({ normalSpeed: 0, castingSpeed: 0 })

  const resultColumns: ColumnsType<SpeedResultData> = [
    {
      title: '',
      dataIndex: 'speedType',
      key: 'speedType',
      width: '34%',
      render: (text: string) => <Text strong>{text}</Text>
    },
    {
      title: '移速+5%',
      dataIndex: 'speedRune',
      key: 'speedRune',
      width: '33%',
      align: 'center',
      render: (value: number) => (
        <Text strong style={{ fontSize: '16px', color: value > 0 ? '#52c41a' : '#fa8c16' }}>
          {value}
        </Text>
      )
    },
    {
      title: '移速惩罚-6%',
      dataIndex: 'penaltyReductionRune',
      key: 'penaltyReductionRune',
      width: '33%',
      align: 'center',
      render: (value: number) => (
        <Text strong style={{ fontSize: '16px', color: value > 0 ? '#52c41a' : '#fa8c16' }}>
          {value}
        </Text>
      )
    }
  ]

  // 技能石配置
  const skillGems: SkillGem[] = [
    {
      key: 'composure',
      name: '从容不迫',
      effect: '移动速度惩罚总增 30%',
      penaltyModifier: 0.30
    },
    {
      key: 'mobility',
      name: '机动',
      effect: '移动速度惩罚总降 25%',
      penaltyModifier: -0.25
    }
  ]

  const calculateSpeed = (values: CalculatorValues) => {
    const { baseSpeed, skillGems: selectedGems, bootsSpeedIncrease, reducePenalty, socketCount, doubleRuneEffect } = values

    // 计算技能石对惩罚的影响 (惩罚总增)
    let penaltyIncrease = 0 // (1 + 惩罚总增) 中的惩罚总增部分
    if (selectedGems && selectedGems.length > 0) {
      selectedGems.forEach(gemKey => {
        const gem = skillGems.find(g => g.key === gemKey)
        if (gem) {
          penaltyIncrease += gem.penaltyModifier
        }
      })
    }

    // 基础移速惩罚 (释法时固定50%)
    const basePenalty = 0.5

    // 鞋子惩罚降低
    const bootsPenaltyReduction = reducePenalty / 100

    // 移速增加因子
    const speedIncrease = 1 + (bootsSpeedIncrease / 100)

    // 1. 计算基础配置（不考虑镶嵌孔且没有降低移速惩罚）
    // 正常移速：基础移速 × 移速增加 (仅鞋子移速)
    const baseNormalSpeed = baseSpeed * speedIncrease

    // 释法移速：基础移速 × 移速增加 × (1 - 移速惩罚 × (1 + 惩罚总增))
    const basePenaltyEffect = basePenalty * (1 + penaltyIncrease)
    const finalBasePenalty = Math.max(0, Math.min(1, basePenaltyEffect))
    const baseCastingSpeed = baseSpeed * speedIncrease * (1 - finalBasePenalty)

    setBaseResults({
      normalSpeed: Math.round(baseNormalSpeed),
      castingSpeed: Math.round(baseCastingSpeed)
    })

    // 2. 计算移速符文配置的结果
    const speedRuneBonus = 0.05 * socketCount * (doubleRuneEffect ? 2 : 1)
    const speedIncreaseWithSpeedRune = speedIncrease + speedRuneBonus

    // 正常移速：基础移速 × 移速增加
    const normalSpeedWithSpeedRune = baseSpeed * speedIncreaseWithSpeedRune

    // 释法移速：基础移速 × 移速增加 × (1 - 移速惩罚 × (1 + 惩罚总增) × (1 - 惩罚降低))
    const effectivePenaltyForSpeedRune = basePenalty * (1 + penaltyIncrease) * (1 - bootsPenaltyReduction)
    const finalEffectivePenaltyForSpeedRune = Math.max(0, Math.min(1, effectivePenaltyForSpeedRune))
    const castingSpeedWithSpeedRune = baseSpeed * speedIncreaseWithSpeedRune * (1 - finalEffectivePenaltyForSpeedRune)

    // 3. 计算惩罚减免符文配置的结果
    const penaltyReductionBonus = 0.06 * socketCount * (doubleRuneEffect ? 2 : 1)

    // 正常移速：基础移速 × 移速增加 (惩罚减免符文不增加移速)
    const normalSpeedWithPenaltyRune = baseSpeed * speedIncrease

    // 释法移速：基础移速 × 移速增加 × (1 - 移速惩罚 × (1 + 惩罚总增) × (1 - 惩罚降低) × (1 - 惩罚总降))
    const effectivePenaltyForPenaltyRune = basePenalty * (1 + penaltyIncrease) * (1 - bootsPenaltyReduction) * (1 - penaltyReductionBonus)
    const finalEffectivePenaltyForPenaltyRune = Math.max(0, Math.min(1, effectivePenaltyForPenaltyRune))
    const castingSpeedWithPenaltyRune = baseSpeed * speedIncrease * (1 - finalEffectivePenaltyForPenaltyRune)

    const results: SpeedResultData[] = [
      {
        key: 'normal',
        speedType: '正常移速',
        speedRune: Math.round(normalSpeedWithSpeedRune),
        penaltyReductionRune: Math.round(normalSpeedWithPenaltyRune)
      },
      {
        key: 'casting',
        speedType: '释法时移速',
        speedRune: Math.round(castingSpeedWithSpeedRune),
        penaltyReductionRune: Math.round(castingSpeedWithPenaltyRune)
      }
    ]

    setSpeedResults(results)
  }

  const onValuesChange = (_changedValues: any, allValues: CalculatorValues) => {
    calculateSpeed(allValues)
  }

  // 初始计算
  useEffect(() => {
    const initialValues = form.getFieldsValue()
    calculateSpeed(initialValues)
  }, [form])

  return (
    <Card title="释法移速计算器" size="small">
      <Form
        form={form}
        layout="horizontal"
        onValuesChange={onValuesChange}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        initialValues={{
          baseSpeed: 100,
          skillGems: [],
          bootsSpeedIncrease: 30,
          reducePenalty: 8,
          socketCount: 2,
          doubleRuneEffect: true
        }}
      >
        <FormItemPlx label="基础移速">
          <Form.Item
            name="baseSpeed"
            rules={[{ required: true, message: '请输入基础移速' }]}
            style={{ marginBottom: 0 }}
          >
            <InputNumber
              min={1}
              max={999999}
              style={{ width: '120px' }}
              placeholder="100"
            />
          </Form.Item>
        </FormItemPlx>

        <Divider orientation="left" style={{ margin: '12px 0' }}>技能石</Divider>

        <Form.Item
          name="skillGems"
          style={{ marginBottom: 16 }}
        >
          <Checkbox.Group>
            <Space direction="vertical" style={{ width: '100%' }}>
              {skillGems.map(gem => (
                <Checkbox key={gem.key} value={gem.key}>
                  <Space size="small">
                    <Text strong style={{ fontSize: '13px' }}>{gem.name}</Text>
                    <Text type="secondary" style={{ fontSize: '11px' }}>
                      - {gem.effect}
                    </Text>
                  </Space>
                </Checkbox>
              ))}
            </Space>
          </Checkbox.Group>
        </Form.Item>

        <Divider orientation="left" style={{ margin: '12px 0' }}>鞋子属性</Divider>

        <FormItemPlx label="移速提升">
          <Form.Item
            name="bootsSpeedIncrease"
            style={{ marginBottom: 0 }}
          >
            <InputNumber
              min={0}
              max={999999}
              style={{ width: '120px' }}
              placeholder="30"
              suffix="%"
            />
          </Form.Item>
        </FormItemPlx>

        <FormItemPlx label="降低移速惩罚">
          <Form.Item
            name="reducePenalty"
            style={{ marginBottom: 0 }}
          >
            <InputNumber
              min={0}
              max={999999}
              style={{ width: '120px' }}
              suffix="%"
            />
          </Form.Item>
        </FormItemPlx>

        <FormItemPlx label="孔数">
          <Form.Item
            name="socketCount"
            style={{ marginBottom: 0 }}
          >
            <InputNumber
              min={0}
              max={999999}
              style={{ width: '120px' }}
              placeholder="2"
            />
          </Form.Item>
        </FormItemPlx>

        <FormItemPlx label="增加符文效果">
          <Form.Item
            name="doubleRuneEffect"
            valuePropName="checked"
            style={{ marginBottom: 0 }}
          >
            <Checkbox>增加100%镶嵌符文效果</Checkbox>
          </Form.Item>
        </FormItemPlx>

        <Divider orientation="left" style={{ margin: '12px 0' }}>计算结果</Divider>

        <div style={{ marginBottom: 16 }}>
          <Text strong style={{ display: 'block', marginBottom: 8 }}>
            基础配置（不考虑镶嵌孔且没有降低移速惩罚）：
          </Text>
          <Space direction="vertical" size={4}>
            <div>
              <Text>正常移速: </Text>
              <Text strong style={{ fontSize: '16px', color: '#52c41a' }}>{baseResults.normalSpeed}</Text>
            </div>
            <div>
              <Text>释法时移速: </Text>
              <Text strong style={{ fontSize: '16px', color: '#fa8c16' }}>{baseResults.castingSpeed}</Text>
            </div>
          </Space>
        </div>

        <Table
          columns={resultColumns}
          dataSource={speedResults}
          pagination={false}
          size="small"
          bordered
          style={{ marginBottom: 16 }}
        />
      </Form>
    </Card>
  )
}