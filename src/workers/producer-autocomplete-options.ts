import type { EServices } from '@/models/catalog.models'
import sortBy from 'lodash/sortBy'

const sortingEventListener = (event: MessageEvent<EServices>) => {
  const eservices = event.data

  const dataEservices = Array.from(
    new Set(eservices.map((eservice) => ({ name: eservice.producerName, id: eservice.producerId })))
  )

  const workerResult = sortBy(dataEservices, 'name')
  postMessage(workerResult)
}

addEventListener('message', sortingEventListener)
