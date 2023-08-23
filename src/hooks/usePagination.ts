import React, { useCallback } from 'react'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'

/**
 * This hook is used to manage the pagination state keeping it in sync with the url params.
 */
export function usePagination(options: { limit: number }) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  const offset = Number(searchParams.get('offset') ?? '0')
  const limit = options.limit

  const pageNum = Math.ceil(offset / limit) + 1

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )

  const removeQueryString = useCallback(
    (name: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.delete(name)

      return params.toString()
    },
    [searchParams]
  )

  const handlePageChange = React.useCallback(
    (newPage: number) => {
      if (newPage < 1) {
        throw new Error(`Number of page ${newPage} is not valid`)
      }
      const newOffset = (newPage - 1) * limit

      // Syncs the new offset to the "offset" search param
      if (newOffset > 0) {
        router.push(pathname + '?' + createQueryString('offset', newOffset.toString()))
        return
      }

      // Removes the search param "offset" if the offset is 0 (page == 1)
      router.push(pathname + '?' + removeQueryString('offset'))
    },
    [limit, pathname, router, createQueryString, removeQueryString]
  )

  const getTotalPageCount = React.useCallback(
    (totalCount: number | undefined) => {
      return Math.ceil((totalCount ?? 0) / limit)
    },
    [limit]
  )

  return {
    pageNum,
    handlePageChange,
    limit,
    offset,
    getTotalPageCount,
  }
}
