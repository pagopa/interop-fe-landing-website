import { SortBy } from '@/models/catalog.models'
import { useQueryParam, withDefault, createEnumParam } from 'use-query-params'

export function useSort() {
  const SortByParam = createEnumParam<SortBy>([
    'recent-asc',
    'name-asc',
    'name-desc',
    'recent-desc',
  ])

  const [sortBy, setSortBy] = useQueryParam('order', withDefault(SortByParam, 'recent-asc'), {
    enableBatching: true,
  })

  return { sortBy, setSortBy }
}
