import React from 'react'

export type UseFetchOptions = {
  retries?: number
  retryDelay?: number
}

export function useFetch<T>(
  service: () => Promise<T>,
  { retries = 3, retryDelay = 1000 }: UseFetchOptions = {}
) {
  const [data, setData] = React.useState<undefined | T>()
  const [error, setError] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(true)

  const isFetching = React.useRef<boolean>(false)

  const fetchData = React.useCallback(
    async (retries: number) => {
      try {
        const fetchedData = await service()
        setData(fetchedData)
        setIsLoading(false)
      } catch (err) {
        // If we run out of retries, set error to true and stop
        if (retries === 0) {
          setError(true)
          setIsLoading(false)
          return
        }
        console.error(err)
        // Wait for retryDelay milliseconds before retrying
        await new Promise((resolve) => setTimeout(resolve, retryDelay))
        // On error, retry recursively until we run out of retries
        fetchData(retries - 1)
      }
    },
    [service, retryDelay]
  )

  React.useEffect(() => {
    if (isFetching.current) return
    isFetching.current = true
    fetchData(retries)
  }, [fetchData, retries])

  return { data, error, isLoading } as const
}
