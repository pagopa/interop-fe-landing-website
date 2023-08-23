import type { EServices } from '@/models/catalog.models'

const sortingEventListener = (event: MessageEvent<EServices>) => {
  const eservices = event.data

  const workerResult = eservices.map((eservice) => eservice.name)
  postMessage(workerResult)
}

addEventListener('message', sortingEventListener)
