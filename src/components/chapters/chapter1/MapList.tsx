import { Card, Row, Col, Space, Typography } from 'antd'
import { useChapterStore } from '../../../hooks/useChapterStore'
import { MapDetail } from '../../MapDetail'

const { Title } = Typography

const mapData = [
  { 
    id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 
    name: '进入城镇以前', 
    description: '冒险的起点',
    strategy: [
      '记住沿着河流往上',
      '左键普攻，右键技能',
      '空格翻滚后长按奔跑'
    ]
  },
  { 
    id: 'b2c3d4e5-f6g7-8901-bcde-f23456789012', 
    name: '克里废尔', 
    description: '第一个城镇',
    strategy: [
      '找到木柴堆 - 技能宝石',
      '腐败兽群 - 贝拉',
      '往上，地图边缘，解锁韧木森林，然后顺着边缘往走，解锁当前地图传送点+泥穴，回程',
      '检查商店：乌娜 - 检查武器，铁匠：鞋子 + 头盔',
      '去泥穴干掉暴食虫 - 技能宝石，骷髅弓箭手，记得先减少一个骷髅战士，打完回程拿到辅助',
      '辅助宝石选择 顽疾，释出-蓝色，点燃-红色 - 放到火墙术上'
    ]
  },
  { 
    id: 'c3d4e5f6-g7h8-9012-cdef-345678901234', 
    name: '韧木森林', 
    description: '危险的森林区域',
    strategy: [
      '解锁传送点',
      '沿着边缘，找到红谷，先激活传送点',
      '击杀异生荆棘 - 可以拿到宝石，可以将释出先放到混沌箭上，打完再放回顽疾，拿到的宝石升级顽疾',
      '大概地图中间可以找到阴森网道'
    ]
  },
  { 
    id: 'd4e5f6g7-h8i9-0123-def0-456789012345', 
    name: '红谷', 
    description: '三尖碑所在地',
    strategy: [
      '找到3个尖碑，位置呈三角形分布，可以推算第3个',
      '回程'
    ]
  },
  {
    id: 'e5f6g7h8-i9j0-1234-efgh-567890123456',
    name: '返回韧木森林',
    description: '继续探索森林',
    strategy: [
      '钢钉解锁符咒，回程',
      '去阴森网道',
      '找到永恒园林',
      '宝石学习精华吸取 - 替代混沌箭'
    ]
  },
  {
    id: 'f6g7h8i9-j0k1-2345-fghi-678901234567',
    name: '永恒园林',
    description: '古老的园林遗迹',
    strategy: [
      '先找到两个寝宫，优先打伴侣的寝宫',
      '伴侣的寝宫：boss + 精英怪 - 拿辅助宝石，极速腐化，装备道精华吸取上',
      '执政官地宫',
      '打完园林boss，激活猎场'
    ]
  },
  {
    id: 'g7h8i9j0-k1l2-3456-ghij-789012345678',
    name: '猎场',
    description: '狩猎场地',
    strategy: [
      '祭坛激活，对话',
      '欧甘农地传送点',
      '击杀悬铃巨鸦',
      '茂棘森林 - 激活传送点可以先撤'
    ]
  },
  {
    id: 'h8i9j0k1-l2m3-4567-hijk-890123456789',
    name: '欧甘农地',
    description: '废弃的农地',
    strategy: [
      '废弃房屋 - 乌娜的小提琴',
      '欧甘村庄，解锁后回程'
    ]
  },
  {
    id: 'i9j0k1l2-m3n4-5678-ijkl-901234567890',
    name: '茂棘森林',
    description: '荆棘密布的森林',
    strategy: [
      '先解锁3个小祭坛，再开大祭坛',
      '打完boss，选冰抗护符，精魂宝石，选择怒焰之灵'
    ]
  },
  {
    id: 'j0k1l2m3-n4o5-6789-jklm-012345678901',
    name: '欧甘村庄',
    description: '被诅咒的村庄',
    strategy: [
      '击杀惩罚者 - 打完优先激活庄园城壁传送点，再回来',
      '铁匠工具 - 五级宝石，优先给弓箭手，铁匠提供选择符文，优先选择冰抗'
    ]
  },
  {
    id: 'k1l2m3n4-o5p6-7890-klmn-123456789012',
    name: '庄园城壁',
    description: '庄园外的城墙',
    strategy: [
      '沿着直线走，拐两次弯',
      '假如第二次拐弯忘左边走，可以拿到一个辅助宝石 - 绞刑尸体那边'
    ]
  },
  {
    id: 'l2m3n4o5-p6q7-8901-lmno-234567890123',
    name: '欧甘庄园',
    description: '最终BOSS所在地',
    strategy: [
      '这个地图有3层',
      '第一层：教堂boss，加20生命道具，如果优先找到2层通道，先进去找到记忆点，再回头找',
      '第二层：找门',
      '第三层：终局boss'
    ]
  }
]

export function MapList() {
  const { selectedMapId, setSelectedMapId } = useChapterStore()
  
  const selectedMap = mapData.find(map => map.id === selectedMapId)
  
  if (selectedMap) {
    const currentIndex = mapData.findIndex(map => map.id === selectedMapId)
    const nextMap = mapData[currentIndex + 1]
    const prevMap = mapData[currentIndex - 1]
    
    return (
      <MapDetail
        mapId={selectedMap.id}
        mapName={selectedMap.name}
        mapDescription={selectedMap.description}
        strategy={selectedMap.strategy}
        onClose={() => setSelectedMapId(null)}
        onNext={nextMap ? () => setSelectedMapId(nextMap.id) : undefined}
        onPrev={prevMap ? () => setSelectedMapId(prevMap.id) : undefined}
      />
    )
  }

  return (
    <Card title="地图列表">
      <Row gutter={[16, 16]}>
        {mapData.map((map) => (
          <Col xs={24} sm={12} md={6} key={map.id}>
            <Card 
              size="small" 
              hoverable
              style={{ textAlign: 'center', cursor: 'pointer' }}
              onClick={() => setSelectedMapId(map.id)}
            >
              <div style={{ fontWeight: 'bold' }}>{map.name}</div>
              <div style={{ fontSize: 12, color: '#888' }}>{map.description}</div>
            </Card>
          </Col>
        ))}
      </Row>
    </Card>
  )
}