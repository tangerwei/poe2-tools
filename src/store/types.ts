export interface NavigationState {
  selectedKey: string
  openKeys: string[]
  collapsed: boolean
  selectedMapId: string | null
}

export interface StoryChapter {
  key: string
  label: string
  order: number
}

export const STORY_CHAPTERS: StoryChapter[] = [
  { key: 'chapter1', label: '第一章', order: 1 },
  { key: 'chapter2', label: '第二章', order: 2 },
  { key: 'chapter3', label: '第三章', order: 3 },
  { key: 'chapter4', label: '第四章', order: 4 },
  { key: 'interlude', label: '间章', order: 5 },
]