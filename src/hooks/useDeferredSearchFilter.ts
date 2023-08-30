import React from 'react'
import Fuse from 'fuse.js'

export type FilterResult<T = unknown> = {
  item: T
  matches?: ReadonlyArray<Fuse.FuseResultMatch>
}

export type FilterResults<T = unknown> = ReadonlyArray<FilterResult<T>>

/**
 * This hook is a wrapper around Fuse.js.
 * It allows you to search through a list of items and get back the results.
 * The search is deferred using React concurrency features.
 *
 * @param items The items to search through
 * @param options The Fuse.js options, see https://fusejs.io/api/options.html. The options will not be re-computed when they change for performance reasons.
 */
export function useDeferredSearchFilter<T = unknown>(
  items: T[] = [],
  options: Fuse.IFuseOptions<T> = {}
) {
  const [query, setQuery] = React.useState('')

  const deferredQuery = React.useDeferredValue(query)

  const fuse = React.useMemo(
    () => new Fuse(items, options),
    /**
     * `options` is not in the dependency array because we don't want to
     * recompute the results when the options change. Mainly because the
     * options is an object and we don't want to deep compare it, or maybe we should?
     */
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
    [items]
  )

  const results = React.useMemo<FilterResults<T>>(() => {
    if (!deferredQuery) return items.map((item) => ({ item }))
    return fuse.search(deferredQuery)
  }, [deferredQuery, items, fuse])

  return { query, setQuery, results }
}
