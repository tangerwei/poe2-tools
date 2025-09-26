import { 
  Layout, 
  Menu, 
  Typography, 
  ConfigProvider, 
  theme,
  Space,
  Button
} from 'antd'
import {
  ReadOutlined,
  CalculatorOutlined,
  TeamOutlined,
  ShoppingOutlined,
  BarChartOutlined,
  SettingOutlined,
  ExperimentOutlined
} from '@ant-design/icons'
import { useNavigationStore } from './hooks/useNavigationStore'
import { StoryOverview } from './components/StoryOverview'
import { Chapter1 } from './components/chapters/chapter1'
import { Chapter2 } from './components/chapters/chapter2'
import { Chapter3 } from './components/chapters/chapter3'
import { Chapter4 } from './components/chapters/chapter4'
import { Interlude } from './components/chapters/interlude'
import { PlaceholderPage } from './components/PlaceholderPage'
import { MovementPenalty } from './components/game-mechanics/movement-penalty'
import { Sanctum } from './components/game-mechanics/sanctum'
import { GameMechanics } from './components/game-mechanics'

const { Sider, Content, Footer } = Layout
const { Title } = Typography

function App() {
  const {
    selectedKey,
    openKeys,
    collapsed,
    setSelectedKey,
    setOpenKeys,
    setCollapsed,
    goToNextChapter,
    goToPreviousChapter,
    getNextChapter,
    getPreviousChapter
  } = useNavigationStore()

  const menuItems = [
    {
      key: 'story',
      icon: <ReadOutlined />,
      label: '剧情流程',
      children: [
        {
          key: 'chapter1',
          label: '第一章',
        },
        {
          key: 'chapter2',
          label: '第二章',
        },
        {
          key: 'chapter3',
          label: '第三章',
        },
        {
          key: 'chapter4',
          label: '第四章',
        },
        {
          key: 'interlude',
          label: '间章',
        },
      ],
    },
    {
      key: 'game-mechanics',
      icon: <ExperimentOutlined />,
      label: '游戏机制',
      children: [
        {
          key: 'movement-penalty',
          label: '移速惩罚',
        },
        {
          key: 'sanctum',
          label: '圣化',
        },
      ],
    },
    {
      key: 'build-planner',
      icon: <CalculatorOutlined />,
      label: 'Build Planner',
    },
    {
      key: 'skill-tree',
      icon: <TeamOutlined />,
      label: 'Skill Tree',
    },
    {
      key: 'trade',
      icon: <ShoppingOutlined />,
      label: 'Trade Tools',
    },
    {
      key: 'stats',
      icon: <BarChartOutlined />,
      label: 'Stats Calculator',
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'Settings',
    },
  ]

  const renderChapterTitle = (title: string) => {
    const nextChapter = getNextChapter()
    const prevChapter = getPreviousChapter()

    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
        <Title level={2} style={{ margin: 0 }}>{title}</Title>
        <Space size="large">
          {nextChapter && (
            <Button 
              type="primary" 
              onClick={goToNextChapter}
            >
              下一章
            </Button>
          )}
          {prevChapter && (
            <Button 
              type="link" 
              onClick={goToPreviousChapter}
              style={{ padding: '4px 0' }}
            >
              上一章
            </Button>
          )}
        </Space>
      </div>
    )
  }

  const renderContent = () => {
    switch (selectedKey) {
      case 'story':
        return <StoryOverview />
      case 'chapter1':
        return (
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            {renderChapterTitle('第一章 - 流程攻略')}
            <Chapter1 />
          </Space>
        )
      case 'chapter2':
        return (
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            {renderChapterTitle('第二章 - 流程攻略')}
            <Chapter2 />
          </Space>
        )
      case 'chapter3':
        return (
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            {renderChapterTitle('第三章 - 流程攻略')}
            <Chapter3 />
          </Space>
        )
      case 'chapter4':
        return (
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            {renderChapterTitle('第四章 - 流程攻略')}
            <Chapter4 />
          </Space>
        )
      case 'interlude':
        return (
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            {renderChapterTitle('间章 - 额外内容')}
            <Interlude />
          </Space>
        )
      case 'game-mechanics':
        return <GameMechanics />
      case 'movement-penalty':
        return <MovementPenalty />
      case 'sanctum':
        return <Sanctum />
      case 'build-planner':
        return <PlaceholderPage title="Build Planner - Coming Soon" />
      case 'skill-tree':
        return <PlaceholderPage title="Skill Tree Calculator - Coming Soon" />
      case 'trade':
        return <PlaceholderPage title="Trade Tools - Coming Soon" />
      case 'stats':
        return <PlaceholderPage title="Stats Calculator - Coming Soon" />
      case 'settings':
        return <PlaceholderPage title="Settings - Coming Soon" />
      default:
        return <PlaceholderPage title="Select a tool from the menu" />
    }
  }

  return (
    <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider 
          collapsible 
          collapsed={collapsed} 
          onCollapse={setCollapsed}
          style={{
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0,
            top: 0,
            bottom: 0,
          }}
        >
          <div style={{ 
            height: 64, 
            margin: 16,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Title level={4} style={{ margin: 0, color: '#fff' }}>
              {collapsed ? 'POE2' : 'POE2 Tools'}
            </Title>
          </div>
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={[selectedKey]}
            openKeys={openKeys}
            items={menuItems}
            onClick={({ key }) => setSelectedKey(key)}
            onOpenChange={setOpenKeys}
          />
        </Sider>
        
        <Layout style={{ marginLeft: collapsed ? 80 : 200 }}>
          <Content style={{ 
            margin: '24px 24px 0',
            overflow: 'initial',
            minHeight: 'calc(100vh - 70px)'
          }}>
            <div style={{ 
              padding: 24, 
              background: '#141414',
              borderRadius: 8
            }}>
              {renderContent()}
            </div>
          </Content>
          
          <Footer style={{ textAlign: 'center', background: '#141414' }}>
            POE2 Tools ©{new Date().getFullYear()} | Not affiliated with Grinding Gear Games
          </Footer>
        </Layout>
      </Layout>
    </ConfigProvider>
  )
}

export default App