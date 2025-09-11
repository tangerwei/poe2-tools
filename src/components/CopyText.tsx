import { useState } from 'react'
import { message } from 'antd'

interface CopyTextProps {
  text: string
  children: React.ReactNode
  style?: React.CSSProperties
  className?: string
}

export function CopyText({ text, children, style, className }: CopyTextProps) {
  const [isHovering, setIsHovering] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      message.success('已复制到剪切板')
    } catch (error) {
      console.error('复制失败:', error)
      message.error('复制失败')
    }
  }

  return (
    <span
      onClick={handleCopy}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      style={{
        cursor: 'pointer',
        userSelect: 'none',
        opacity: isHovering ? 0.8 : 1,
        transition: 'opacity 0.2s',
        ...style
      }}
      className={className}
      title="点击复制"
    >
      {children}
    </span>
  )
}