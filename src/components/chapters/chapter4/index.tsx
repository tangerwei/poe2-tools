import { Space, Card, Badge, Row, Col } from 'antd'
import { useChapterStore } from '../../../hooks/useChapterStore'
import { MapDetail } from '../../MapDetail'
import { CopyText } from '../../CopyText'

export function Chapter4() {
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
          { id: 'o5p6q7r8-s9t0-1234-opqr-567890123456', name: '终极神殿', description: '最终决战之地' },
          { id: 'p6q7r8s9-t0u1-2345-pqrs-678901234567', name: '时空裂隙', description: '扭曲的时空' },
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