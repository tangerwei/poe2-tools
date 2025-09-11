import { Space, Card, Badge, Row, Col } from 'antd'
import { useChapterStore } from '../../../hooks/useChapterStore'
import { MapDetail } from '../../MapDetail'
import { CopyText } from '../../CopyText'

export function Interlude() {
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
          { id: 'q8r9s0t1-u2v3-4567-qrst-123456789012', name: '隐秘花园', description: '神秘的花园' },
          { id: 'r9s0t1u2-v3w4-5678-rstu-234567890123', name: '遗忘图书馆', description: '失落的知识宝库' },
          { id: 's0t1u2v3-w4x5-6789-stuv-345678901234', name: '星空观测台', description: '观察星辰的高塔' },
          { id: 't1u2v3w4-x5y6-7890-tuvw-456789012345', name: '梦境迷宫', description: '诡异的梦境世界' },
        ]
        
        const selectedMap = mapData.find(map => map.id === selectedMapId)
        
        if (selectedMap) {
          const currentIndex = mapData.findIndex(map => map.id === selectedMapId)
          const nextMap = mapData[currentIndex + 1]
          const prevMap = mapData[currentIndex - 1]
          
          return (
            <MapDetail
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