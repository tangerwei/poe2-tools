import { BehaviorSubject } from 'rxjs'

interface ChapterState {
  selectedMapId: string | null
}

class ChapterStore {
  private stateSubject = new BehaviorSubject<ChapterState>({
    selectedMapId: null
  })

  public state$ = this.stateSubject.asObservable()

  get currentState() {
    return this.stateSubject.value
  }

  setSelectedMapId(mapId: string | null) {
    const newState = { ...this.currentState, selectedMapId: mapId }
    this.updateState(newState)
  }

  private updateState(newState: ChapterState) {
    this.stateSubject.next(newState)
  }
}

export const chapterStore = new ChapterStore()