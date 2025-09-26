import { Space, Alert, Collapse } from 'antd'
import { MovementSpeedCalculator } from './MovementSpeedCalculator'

const { Panel } = Collapse

// 使用装饰器模式的替代方案：静态属性
export function SkillPenalty() {
  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Collapse size="small" style={{ marginBottom: 16 }}>
        <Panel header="移速计算公式" key="formula">
          <Alert
            description={
              <>
                移速 = 基础移速 × 移速增加 × (1 - 移速惩罚 × (1 + 惩罚总增) × (1 - 惩罚降低) × (1 - 惩罚总降))
                <br />
                在POE2中，移动时释放技能会受到固定的50%移速惩罚。
              </>
            }
            type="warning"
          />
        </Panel>
      </Collapse>

      <MovementSpeedCalculator />
    </Space>
  )
}

// 为组件添加元数据
SkillPenalty.tabTitle = '技能释放惩罚'
SkillPenalty.tabKey = 'skills'