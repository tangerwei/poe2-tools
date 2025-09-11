import { useEffect, useState } from 'react'
import { navigationStore } from '../store/navigationStore'
import { NavigationState } from '../store/types'

export function useNavigationStore() {
  const [state, setState] = useState<NavigationState>(() => navigationStore.currentState)

  useEffect(() => {
    const subscription = navigationStore.state$.subscribe(setState)
    return () => subscription.unsubscribe()
  }, [])

  return {
    ...state,
    setSelectedKey: (key: string) => navigationStore.setSelectedKey(key),
    setOpenKeys: (keys: string[]) => navigationStore.setOpenKeys(keys),
    setCollapsed: (collapsed: boolean) => navigationStore.setCollapsed(collapsed),
    goToNextChapter: () => navigationStore.goToNextChapter(),
    goToPreviousChapter: () => navigationStore.goToPreviousChapter(),
    getNextChapter: () => navigationStore.getNextChapter(),
    getPreviousChapter: () => navigationStore.getPreviousChapter(),
    setSelectedMapId: (mapId: string | null) => navigationStore.setSelectedMapId(mapId),
  }
}