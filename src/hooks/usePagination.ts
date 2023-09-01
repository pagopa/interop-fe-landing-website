import React from 'react'

/**
 * This hook is used to manage the pagination state keeping it in sync with the url params.
 */
export function usePagination(options: { limit: number }) {
  const [pageNum, setPageNum] = React.useState(1)

  const offset = pageNum * options.limit - options.limit
  const limit = options.limit

  const handlePageChange = React.useCallback((newPage: number) => {
    if (newPage < 1) {
      throw new Error(`Number of page ${newPage} is not valid`)
    }
    setPageNum(newPage)
  }, [])

  const resetPagination = React.useCallback(() => {
    setPageNum(1)
  }, [])

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
    resetPagination,
  }
}
