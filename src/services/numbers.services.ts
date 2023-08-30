import { INTEROP_NUMBERS_URL_PROD, INTEROP_NUMBERS_URL_TEST } from '@/configs/constants.config'
import { InteropNumbers } from '@/models/numbers.models'
import useSWRImmutable from 'swr/immutable'
import { fetcher } from './swr.services'
import { SWRConfiguration } from 'swr'

export function useGetInteropTestNumbers(config?: SWRConfiguration<InteropNumbers>) {
  return useSWRImmutable<InteropNumbers>(INTEROP_NUMBERS_URL_TEST, fetcher, config)
}

export function useGetInteropProdNumbers(config?: SWRConfiguration<InteropNumbers>) {
  return useSWRImmutable<InteropNumbers>(INTEROP_NUMBERS_URL_PROD, fetcher, config)
}
