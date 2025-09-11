import { Card, Badge } from 'antd'
import { CopyText } from '../../CopyText'

export function Summary() {
  return (
    <Badge.Ribbon text="重要提示">
      <Card>
        <ul>
          <li>堆冰抗</li>
          <li>升级之后回程，看商店，鞋子+武器+戒指+项链</li>
          <li><CopyText text="抗性|召唤|移|生" style={{ color: '#1677ff' }}>抗性|召唤|移|生</CopyText></li>
        </ul>
      </Card>
    </Badge.Ribbon>
  )
}