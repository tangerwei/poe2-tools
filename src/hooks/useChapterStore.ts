import { useEffect, useState } from 'react'
import { chapterStore } from '../store/chapterStore'

export function useChapterStore() {
  const [state, setState] = useState(() => chapterStore.currentState)

  useEffect(() => {
    const subscription = chapterStore.state$.subscribe(setState)
    return () => subscription.unsubscribe()
  }, [])

  return {
    ...state,
    setSelectedMapId: (mapId: string | null) => chapterStore.setSelectedMapId(mapId),
  }
}