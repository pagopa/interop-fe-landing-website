import React from 'react'
import { Env, InteropNumbers } from '../types/global'
import { INTEROP_NUMBERS_URL_PROD, INTEROP_NUMBERS_URL_TEST } from '../utils/constants'

export default function useFetchNumbers(env: Env) {
  const [data, setData] = React.useState<null | Record<Env, InteropNumbers>>(null)
  const [error, setError] = React.useState<boolean>(false)

  const isInitialFetching = React.useRef(false)

  const fetchNumbers = React.useCallback(async (retries = 3) => {
    try {
      const fetchedData = await Promise.all<[Promise<InteropNumbers>, Promise<InteropNumbers>]>([
        fetch(INTEROP_NUMBERS_URL_TEST).then((res) => res.json()),
        fetch(INTEROP_NUMBERS_URL_PROD).then((res) => res.json()),
      ])

      setData({
        test: fetchedData[0],
        prod: fetchedData[1],
      })
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
  const numbersData = data ? data[env] : null

  return { numbersData, error, isLoading } as const
}
