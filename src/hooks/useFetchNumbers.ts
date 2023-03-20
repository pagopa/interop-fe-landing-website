import React from 'react'
import { key } from 'vega'
import { Env, InteropNumbers, InteropNumbersResponseData } from '../types/global'
import { INTEROP_NUMBERS_URL_PROD, INTEROP_NUMBERS_URL_TEST } from '../utils/constants'

export default function useFetchNumbers() {
  const [data, setData] = React.useState<null | InteropNumbers>(null)
  const [error, setError] = React.useState<boolean>(false)

  const isInitialFetching = React.useRef(false)

  const mapFetchedNumbersToData = (
    fetchedData: [InteropNumbersResponseData, InteropNumbersResponseData]
  ) => {
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

  const fetchNumbers = React.useCallback(async (retries = 3) => {
    try {
      const fetchedData = await Promise.all<
        [Promise<InteropNumbersResponseData>, Promise<InteropNumbersResponseData>]
      >([
        fetch(INTEROP_NUMBERS_URL_TEST).then((res) => res.json()),
        fetch(INTEROP_NUMBERS_URL_PROD).then((res) => res.json()),
      ])

      const mappedFetchedData = mapFetchedNumbersToData(fetchedData)
      setData(mappedFetchedData)
    } catch (err) {
      if (retries === 0) {
        setError(true)
        return
      }
      console.error(err)
      await new Promise((resolve) => setTimeout(resolve, 5000))
      // On error, retry recursively
      fetchNumbers(retries - 1)
    }
  }, [])

  React.useEffect(() => {
    if (isInitialFetching.current) return
    isInitialFetching.current = true
    fetchNumbers()
  }, [fetchNumbers])

  const isLoading = !data && !error
  const numbersData = data ? data : null

  return { numbersData, error, isLoading } as const
}
