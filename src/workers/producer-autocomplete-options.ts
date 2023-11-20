import type { EServices } from '@/models/catalog.models'

const sortingEventListener = (event: MessageEvent<EServices>) => {
  const eservices = event.data

  const workerResult = Array.from(
    new Set(eservices.map((eservice) => eservice.producerName))
  ).sort()
  postMessage(workerResult)
}

addEventListener('message', sortingEventListener)
