import { Card, Row, Col } from 'antd'
import { useChapterStore } from '../../../hooks/useChapterStore'
import { MapDetail } from '../../MapDetail'

const mapData = [
  { 
    id: 'e5f6g7h8-i9j0-1234-efgh-567890123456', 
    name: '郊区', 
    description: '冒险的下一站',
    strategy: [
      '拦路盗贼，击杀boss，打完回程，跟扎卡对话',
      '激活车队'
    ]
  },
  { 
    id: 'f6g7h8i9-j0k1-2345-fghi-678901234567', 
    name: '采石场合集', 
    description: '矿坑区域',
    strategy: [
      '挖石场 - 找到莫顿矿坑的入口',
      '莫顿矿坑的boss区域，击杀工程师，打完和旁边笼子里的npc对话'
    ]
  },
  { 
    id: 'g7h8i9j0-k1l2-3456-ghij-789012345678', 
    name: '叛徒之路', 
    description: '危险的道路',
    strategy: [
      '车队进入叛徒之路',
      '图里看到路开始变窄，就说明正确，会提示六位姐妹',
      '看到监禁之令-表示芭芭拉在附近，岔路看墙壁，出现黄色符纸，表示芭芭拉方向',
      '反向是哈拉尼关口 - 直接打到boss，打完回程'
    ]
  },
  { 
    id: 'h8i9j0k1-l2m3-4567-hijk-890123456789', 
    name: '号角 - 凯斯城', 
    description: '古老的城市',
    strategy: [
      '找大坑，打蛇女boss - 2点天赋，记得先找传送点，找完再回头打蛇女',
      '通往凯斯城地底 - 失落之城',
      '凯斯城会出圣物碎片，如果没出，那么失落之城也会出'
    ]
  },
  { 
    id: 'i9j0k1l2-m3n4-5678-ijkl-901234567890', 
    name: '失落之城', 
    description: '被遗忘的城市',
    strategy: [
      '碎片',
      '屎壳郎小boss',
      '耀金墓室（棺材） - 6-7精魂宝石',
      '进入掩埋神殿'
    ]
  },
  { 
    id: 'j0k1l2m3-n4o5-6789-jklm-012345678901', 
    name: '掩埋神殿', 
    description: '神圣的遗迹',
    strategy: [
      '击杀boss赛恩，烧女神，拿到水滴回程',
      '路上可能会有奉献 - 奖励抗性戒指 - 第二章闪电+火焰'
    ]
  },
  {
    id: 'k1l2m3n4-o5p6-7890-klmn-123456789012',
    name: '乳齿象恶地',
    description: '荒芜的土地',
    strategy: [
      '赛季任务：深渊井 - 无光通道 - 灵魂之井 可以先不找，回头找人帮忙开下传送点',
      '进入骨坑，击杀双boss',
      '会出太阳部落圣物 - 右边碎片',
      '纪念品雕像，点击出技能宝石',
      '这里出8级精魂，比较贵'
    ]
  },
  {
    id: 'l2m3n4o5-p6q7-8901-lmno-234567890123',
    name: '泰坦之谷',
    description: '巨人的遗迹',
    strategy: [
      '踩井盖 - 一共3个',
      '传送点附近 - 圣物碎片',
      '找到泰坦石窟入口'
    ]
  },
  {
    id: 'm3n4o5p6-q7r8-9012-mnop-345678901234',
    name: '泰坦石窟',
    description: '深邃的洞窟',
    strategy: [
      'Boss，记得躲自爆怪',
      '头上一把剑，点了奖励符石'
    ]
  },
  {
    id: 'n4o5p6q7-r8s9-0123-nopq-456789012345',
    name: '车队 - 戴哈斯',
    description: '战场遗迹',
    strategy: [
      '车头-吹号角',
      '尸体（头顶有忘却字样）-巧匠石（打孔）',
      '地图跑到中长，需要找到战死的部下拿到遗书',
      '进入悼念之路',
      '双子boss - 可以不打，跟芭芭拉给的都是试炼币'
    ]
  },
  {
    id: 'o5p6q7r8-s9t0-1234-opqr-567890123456',
    name: '戴哈斯尖塔',
    description: '高耸的塔楼',
    strategy: [
      '卡洛翰的姐妹 - +10闪电抗，大概是地图中间',
      '打完boss回程'
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