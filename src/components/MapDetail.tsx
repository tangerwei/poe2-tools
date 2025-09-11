import { Card, Button, Space, Typography } from 'antd'
import { CloseOutlined } from '@ant-design/icons'
import { useEffect } from 'react'

const { Title, Text } = Typography

interface MapDetailProps {
  mapName: string
  mapDescription: string
  strategy?: string[]
  onClose: () => void
  onNext?: () => void
  onPrev?: () => void
}

export function MapDetail({ mapName, mapDescription, strategy, onClose, onNext, onPrev }: MapDetailProps) {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }
    
    document.addEventListener('keydown', handleEscape)
    
    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [onClose])
  return (
    <Card>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: 16 
      }}>
        <div style={{ display: 'flex', alignItems: 'center', width: '75%' }}>
          <Title level={3} style={{ margin: 0, width: '33.33%', minWidth: 0 }}>{mapName}</Title>
          <div style={{ display: 'flex', gap: 16 }}>
            {onNext && (
              <Button onClick={onNext} type="primary">
                下一个
              </Button>
            )}
            {onPrev && (
              <Button onClick={onPrev} type="primary">
                上一个
              </Button>
            )}
          </div>
        </div>
        <Button 
          type="text" 
          icon={<CloseOutlined />} 
          onClick={onClose}
          style={{ fontSize: 16 }}
        />
      </div>
      
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <div>
          <Text>{mapDescription}</Text>
        </div>
        
        <div style={{ 
          minHeight: 400, 
          background: '#1f1f1f', 
          borderRadius: 8,
          padding: 20
        }}>
          {strategy && strategy.length > 0 ? (
            <div>
              <Title level={4} style={{ color: '#fff', marginBottom: 16 }}>攻略流程</Title>
              <ul style={{ color: '#ccc', lineHeight: '1.8' }}>
                {strategy.map((step, index) => (
                  <li key={index} style={{ marginBottom: 8 }}>{step}</li>
                ))}
              </ul>
            </div>
          ) : (
            <div style={{ 
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%'
            }}>
              <Text style={{ color: '#666' }}>暂无攻略内容</Text>
            </div>
          )}
        </div>
      </Space>
    </Card>
  )
}