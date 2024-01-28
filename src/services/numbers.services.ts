import useSWRImmutable from 'swr/immutable'
import { fetcher } from './swr.services'
import { SWRConfiguration } from 'swr'
import { INTEROP_NUMBERS_NEW } from '@/configs/constants.config'
import { Metrics } from '@/models/numbers.models'

export function useGetInteropNumbersNew(config?: SWRConfiguration) {
  return useSWRImmutable<Metrics>(INTEROP_NUMBERS_NEW, fetcher, config)
}
