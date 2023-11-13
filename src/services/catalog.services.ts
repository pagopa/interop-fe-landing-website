import { INTEROP_CATALOG_URL } from '@/configs/constants.config'
import { EServices, SortBy, SortedEServices } from '@/models/catalog.models'
import { SWRConfiguration } from 'swr'
import useSWRImmutable from 'swr/immutable'
import { fetcher } from './swr.services'

export function useGetEServicesList(config?: SWRConfiguration<EServices>) {
  return useSWRImmutable<EServices>(
    INTEROP_CATALOG_URL,
    // Uncomment this to test performance with a larger dataset
    // async (url: string) => {
    //   const data = await fetcher<EServices>(url)

    //   // Mulriply data
    //   for (let i = 0; i < 5; i++) {
    //     data.push(...data.map((eservice, j) => ({ ...eservice, id: `${eservice.id}-${i}-${j}` })))
    //   }

    //   return data
    // },
    fetcher,
    config
  )
}

export function useGetEService(id: string) {
  const { data, ...rest } = useGetEServicesList()
  return {
    data: data?.find((eservice) => eservice.id === id),
    ...rest,
  }
}

/**
 * Uses a web worker to compute the sorted e-services, in every possible sort order.
 */
export function getSortedEServices(eservices: EServices) {
  const worker = new Worker(new URL('../workers/catalog-sorter.worker.ts', import.meta.url))

  return new Promise<SortedEServices>((resolve, reject) => {
    worker.onmessage = (event: MessageEvent<SortedEServices>) => {
      resolve(event.data)
    }

    worker.onerror = (error) => {
      reject(error)
    }

    worker.postMessage(eservices)
  })
}

export function useGetSortedEServices(sortBy: SortBy) {
  const { data: eservices, isLoading } = useGetEServicesList()
  const { data: sortedEServices, ...rest } = useSWRImmutable(
    eservices ? ['SORTED_E_SERVICES'] : null,
    () => eservices && getSortedEServices(eservices),
    {
      /*
       * To avoid swr to internally hashing a large object, which could be slow, we
       * compare the old/new values by reference, which is enough for our use case.
       */
      compare(a, b) {
        return a === b
      },
    }
  )

  return {
    // If the worker is still computing the sorted e-services, return the unsorted e-services.
    data: sortedEServices?.[sortBy] ?? eservices,
    ...rest,
    isLoading,
  }
}

/**
 * Uses a web worker to compute the sorted e-services, in every possible sort order.
 */
export function getProducerAutocompleteOptions(eservices: EServices) {
  const worker = new Worker(new URL('../workers/producer-autocomplete-options.ts', import.meta.url))

  return new Promise<Array<string>>((resolve, reject) => {
    worker.onmessage = (event: MessageEvent<Array<string>>) => {
      resolve(event.data)
    }

    worker.onerror = (error) => {
      reject(error)
    }

    worker.postMessage(eservices)
  })
}

export function useProducerAutocompleteOptions() {
  const { data: eservices, isLoading } = useGetEServicesList()
  return {
    ...useSWRImmutable(
      eservices ? ['PRODUCER_AUTOCOMPLETE_OPTIONS'] : null,
      () => eservices && getProducerAutocompleteOptions(eservices)
    ),
    isLoading,
  }
}
