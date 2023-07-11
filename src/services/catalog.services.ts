import { INTEROP_CATALOG_URL } from '@/configs/constants.config'
import { EServices } from '@/models/catalog.models'
import { SWRConfiguration } from 'swr'
import useSWRImmutable from 'swr/immutable'
import { fetcher } from './swr.services'

export function useGetEServicesList(config?: SWRConfiguration<EServices>) {
  return useSWRImmutable<EServices>(INTEROP_CATALOG_URL, fetcher, config)
}

export function useGetEService(id: string) {
  const { data, ...rest } = useGetEServicesList()
  return {
    data: data?.find((eservice) => eservice.id === id),
    ...rest,
  }
}
