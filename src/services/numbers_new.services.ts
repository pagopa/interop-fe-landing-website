import useSWRImmutable from 'swr/immutable'
import { fetcher } from './swr.services'
import { SWRConfiguration } from 'swr'
import { INTEROP_NUMBERS_NEW } from '@/configs/constants.config'

export function useGetInteropNumbersNew(config?: SWRConfiguration) {
  return useSWRImmutable(INTEROP_NUMBERS_NEW, fetcher, config)
}
