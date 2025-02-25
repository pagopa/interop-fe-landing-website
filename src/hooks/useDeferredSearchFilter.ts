import React from 'react'
import Fuse from 'fuse.js'
import { QueryParamConfig, useQueryParams } from 'use-query-params'

export type FilterResult<T = unknown> = {
  item: T
}

export type FilterResults<T = unknown> = ReadonlyArray<FilterResult<T>>

export type UseQueryParamsConfig<TKey extends string> = Record<
  TKey,
  | QueryParamConfig<(string | null)[] | null | undefined, (string | null)[] | never[]>
  | QueryParamConfig<string | null | undefined, string>
>

export type FilterSearchMode = 'AND' | 'OR' | undefined
export type FilterSearchConfig<TKey extends string> = Record<TKey, FilterSearchMode>

/**
 * This hook is a wrapper around Fuse.js.
 * It allows you to search through a list of items and get back the results.
 * The search is deferred using React concurrency features.
 *
 * @param items The items to search through
 * @param options The Fuse.js options, see https://fusejs.io/api/options.html. The options will not be re-computed when they change for performance reasons.
 */
export function useDeferredSearchFilter<TKey extends string, T = unknown>(
  items: T[] = [],
  useQueryParamsConfig: UseQueryParamsConfig<TKey>,
  filterSearchConfig: FilterSearchConfig<TKey>,
  options: Fuse.IFuseOptions<T> = {}
) {
  const [queries, setQueries] = useQueryParams(useQueryParamsConfig, {
    enableBatching: true,
    updateType: 'pushIn',
  })

  const deferredQueries = React.useDeferredValue(queries)

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

  const formatFilterQueryString = (
    filterMode: FilterSearchMode,
    filters: Array<string> | string
  ) => {
    let query = ''
    const queryStringMode = filterMode && filterMode === 'AND' ? ' ' : '|'
    if (Array.isArray(filters)) {
      filters.forEach((filter) => {
        query = query.length === 0 ? "'" + filter : (query += ' ' + queryStringMode + "'" + filter)
      })
    }

    if (typeof filters === 'string') {
      query = `'"${filters}"`
    }

    return query
  }

  const results = React.useMemo<FilterResults<T>>(() => {
    const searchQueries = Object.entries(deferredQueries).reduce<Array<Record<string, string>>>(
      (prev, [key, query]) => {
        if (Array.isArray(query) && query.length === 0) return prev

        if (typeof query === 'string' && query === '') return prev

        return [
          ...prev,
          {
            [key]: formatFilterQueryString(
              filterSearchConfig[key as TKey],
              query as string | string[]
            ),
          },
        ]
      },
      []
    )

    if (searchQueries.length === 0) return items.map((item) => ({ item }))

    return fuse.search({ $and: searchQueries })
  }, [deferredQueries, filterSearchConfig, fuse, items])

  return { queries, setQueries, results }
}
