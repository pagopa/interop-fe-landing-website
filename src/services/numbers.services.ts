import { INTEROP_NUMBERS_URL_PROD, INTEROP_NUMBERS_URL_TEST } from '@/configs/constants.config'
import { InteropNumbers, InteropNumbersResponseData } from '@/models/numbers.models'
import useSWR from 'swr'

async function getInteropNumbers() {
  const fetchedData = await Promise.all<
    [Promise<InteropNumbersResponseData>, Promise<InteropNumbersResponseData>]
  >([
    fetch(INTEROP_NUMBERS_URL_TEST).then((res) => res.json()),
    fetch(INTEROP_NUMBERS_URL_PROD).then((res) => res.json()),
  ])

  return mapFetchedNumbersToInteropNumbers(fetchedData)
}

function mapFetchedNumbersToInteropNumbers(
  fetchedData: [InteropNumbersResponseData, InteropNumbersResponseData]
) {
  const dataKeys = Object.keys(fetchedData[0])

  return dataKeys.reduce((prev, key) => {
    return {
      ...prev,
      [key]: {
        test: fetchedData[0][key as keyof InteropNumbersResponseData],
        prod: fetchedData[1][key as keyof InteropNumbersResponseData],
      },
    }
  }, {} as InteropNumbers)
}

export function useGetInteropNumbers() {
  return useSWR('interopNumbers', getInteropNumbers)
}
