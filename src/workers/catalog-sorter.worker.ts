import type { EServices, SortBy } from '@/models/catalog.models'

const sortingEventListener = (event: MessageEvent<EServices>) => {
  const eservices = event.data

  const nameAsc = [...eservices].sort((a, b) => a.name.localeCompare(b.name))
  const nameDesc = [...nameAsc].reverse()
  const recentAsc = eservices
  const recentDesc = [...eservices].reverse()

  const workerResult: Record<SortBy, EServices> = {
    'name-asc': nameAsc,
    'name-desc': nameDesc,
    'recent-asc': recentAsc,
    'recent-desc': recentDesc,
  }

  postMessage(workerResult)
}

addEventListener('message', sortingEventListener)
