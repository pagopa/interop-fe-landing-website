import React from 'react'
import { NumberParam, useQueryParam, withDefault } from 'use-query-params'

/**
 * This hook is used to manage the pagination state keeping it in sync with the url params.
 */
export function usePagination(options: { limit: number }) {
  const [pageNum, setPageNum] = useQueryParam('pageNum', withDefault(NumberParam, 1), {
    updateType: 'replaceIn',
    // removeDefaultsFromUrl: true,
    // TODO risolve il problema del reset ma ne crea uno identico nel caso opposto in cui io abbia dei params e li vada a rimuovere
  })

  const offset = pageNum * options.limit - options.limit
  const limit = options.limit

  const handlePageChange = React.useCallback(
    (newPage: number) => {
      if (newPage < 1) {
        throw new Error(`Number of page ${newPage} is not valid`)
      }
      setPageNum(newPage)
    },
    [setPageNum]
  )

  const resetPagination = React.useCallback(() => {
    setPageNum(1)
  }, [setPageNum])

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
