import React from 'react'
import { wait } from '@/utils/common.utils'

export type UseInfiniteScrollOptions = {
  /**
   * Total items in the list
   * */
  totalItems: number
  /**
   * in milliseconds
   * @default 400
   * */
  delay?: number
  /**
   * How many items per page
   * @default 20
   * */
  itemsPerPage?: number
}

export function useInfiniteScroll(options: UseInfiniteScrollOptions) {
  const containerRef = React.useRef<HTMLDivElement>(null)

  const [page, setPage] = React.useState(1)
  const previousBottom = React.useRef(0)
  const isWaiting = React.useRef(false)

  const { totalItems, delay = 400, itemsPerPage = 20 } = options

  const resetPagination = React.useCallback(() => setPage(1), [])

  React.useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleScroll = async () => {
      const { bottom } = container.getBoundingClientRect()

      const isScrollingDown = bottom < previousBottom.current
      const hasReachedThreshold = bottom <= window.innerHeight

      if (hasReachedThreshold && isScrollingDown && !isWaiting.current) {
        isWaiting.current = true
        await wait(delay)
        setPage((prevPage) => prevPage + 1)
        isWaiting.current = false
      }

      previousBottom.current = bottom
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [containerRef, delay])

  return {
    ref: containerRef,
    itemsNumber: Math.min(page * itemsPerPage, totalItems),
    resetPagination,
  }
}
