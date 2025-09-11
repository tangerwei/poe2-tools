import { Space, Card, Badge, Row, Col } from 'antd'
import { useChapterStore } from '../../../hooks/useChapterStore'
import { MapDetail } from '../../MapDetail'
import { CopyText } from '../../CopyText'

export function Chapter3() {
  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Badge.Ribbon text="重要提示">
        <Card>
          <ul>
            <li>升级之后回程，看商店，鞋子+武器+戒指+项链</li>
            <li><CopyText text="抗性|召唤|移|生" style={{ color: '#1677ff' }}>抗性|召唤|移|生</CopyText></li>
          </ul>
        </Card>
      </Badge.Ribbon>
      
      {(() => {
        const { selectedMapId, setSelectedMapId } = useChapterStore()
        const mapData = [
          { id: 'k1l2m3n4-o5p6-7890-klmn-123456789012', name: '火山要塞', description: '炽热的火山地带' },
          { id: 'l2m3n4o5-p6q7-8901-lmno-234567890123', name: '深渊裂谷', description: '无底的深渊' },
          { id: 'm3n4o5p6-q7r8-9012-mnop-345678901234', name: '龙骨墓地', description: '古龙的安息地' },
          { id: 'n4o5p6q7-r8s9-0123-nopq-456789012345', name: '恶魔城堡', description: '邪恶力量的堡垒' },
        ]
        
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
      })()}
    </Space>
  )
}