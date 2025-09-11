import { Card, Row, Col } from 'antd'
import { useChapterStore } from './useChapterStore'
import { MapDetail } from '../components/MapDetail'

interface MapData {
  id: string
  name: string
  description: string
}

export function useMapList(mapData: MapData[]) {
  const { selectedMapId, setSelectedMapId } = useChapterStore()
  
  const selectedMap = mapData.find(map => map.id === selectedMapId)
  
  const renderMapList = () => {
    if (selectedMap) {
      return (
        <MapDetail
          mapName={selectedMap.name}
          mapDescription={selectedMap.description}
          onClose={() => setSelectedMapId(null)}
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

  return { renderMapList }
}