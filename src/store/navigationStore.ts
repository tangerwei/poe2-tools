import { BehaviorSubject } from 'rxjs'
import { NavigationState, STORY_CHAPTERS } from './types'

class NavigationStore {
  private stateSubject = new BehaviorSubject<NavigationState>({
    selectedKey: this.getFromLocalStorage('activeMenu', 'chapter1'),
    openKeys: this.getFromLocalStorage('openMenuKeys', ['story']),
    collapsed: this.getFromLocalStorage('siderCollapsed', false),
    selectedMapId: null
  })

  public state$ = this.stateSubject.asObservable()

  get currentState() {
    return this.stateSubject.value
  }

  setSelectedKey(key: string) {
    const newState = { ...this.currentState, selectedKey: key }
    
    // Auto expand story menu if selecting a chapter
    if (STORY_CHAPTERS.some(chapter => chapter.key === key)) {
      if (!newState.openKeys.includes('story')) {
        newState.openKeys = [...newState.openKeys, 'story']
      }
    }
    
    this.updateState(newState)
    this.setToLocalStorage('activeMenu', key)
    this.setToLocalStorage('openMenuKeys', newState.openKeys)
  }

  setOpenKeys(keys: string[]) {
    const newState = { ...this.currentState, openKeys: keys }
    this.updateState(newState)
    this.setToLocalStorage('openMenuKeys', keys)
  }

  setCollapsed(collapsed: boolean) {
    const newState = { ...this.currentState, collapsed }
    this.updateState(newState)
    this.setToLocalStorage('siderCollapsed', collapsed)
  }

  getNextChapter(): string | null {
    const current = this.currentState.selectedKey
    const currentChapter = STORY_CHAPTERS.find(chapter => chapter.key === current)
    
    if (!currentChapter) return null
    
    const nextChapter = STORY_CHAPTERS.find(chapter => chapter.order === currentChapter.order + 1)
    return nextChapter?.key || null
  }

  getPreviousChapter(): string | null {
    const current = this.currentState.selectedKey
    const currentChapter = STORY_CHAPTERS.find(chapter => chapter.key === current)
    
    if (!currentChapter) return null
    
    const prevChapter = STORY_CHAPTERS.find(chapter => chapter.order === currentChapter.order - 1)
    return prevChapter?.key || null
  }

  goToNextChapter() {
    const nextChapter = this.getNextChapter()
    if (nextChapter) {
      this.setSelectedKey(nextChapter)
    }
  }

  goToPreviousChapter() {
    const prevChapter = this.getPreviousChapter()
    if (prevChapter) {
      this.setSelectedKey(prevChapter)
    }
  }

  setSelectedMapId(mapId: string | null) {
    const newState = { ...this.currentState, selectedMapId: mapId }
    this.updateState(newState)
  }


  private updateState(newState: NavigationState) {
    this.stateSubject.next(newState)
  }

  private getFromLocalStorage<T>(key: string, defaultValue: T): T {
    if (typeof window === 'undefined') return defaultValue
    
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : defaultValue
    } catch {
      return defaultValue
    }
  }

  private setToLocalStorage<T>(key: string, value: T) {
    if (typeof window === 'undefined') return
    
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.warn(`Failed to save to localStorage:`, error)
    }
  }
}

export const navigationStore = new NavigationStore()