import { getLocalizedValue } from '@/utils/common.utils'
import { Button, Chip, Stack } from '@mui/material'
import React from 'react'

type ActiveFiltersChipsProps = {
  eserviceActiveFilter: string
  providerActiveFilters: Array<string>
  onRemoveActiveNameFilter: VoidFunction
  onRemoveActiveProducerNameFilter: (filter: string) => void
  onResetActiveFilters: VoidFunction
  rightContent?: React.ReactNode
}

export const ActiveFiltersChips: React.FC<ActiveFiltersChipsProps> = ({
  eserviceActiveFilter,
  providerActiveFilters,
  onRemoveActiveNameFilter,
  onRemoveActiveProducerNameFilter,
  onResetActiveFilters,
  rightContent,
}) => {
  if (eserviceActiveFilter.length <= 0 && providerActiveFilters.length <= 0 && !rightContent) {
    return null
  }

  const cancelFiltersLabel = getLocalizedValue({
    it: 'Annulla filtri',
    en: 'Cancel filters',
  })

  const isButtonResetFiltersShown =
    providerActiveFilters.length > 1 ||
    (providerActiveFilters.length > 0 && eserviceActiveFilter !== '')

  return (
    <Stack
      spacing={rightContent ? 2 : 0}
      direction="row"
      alignItems="center"
      justifyContent="space-between"
    >
      <Stack direction="row" flexWrap="wrap" gap={1} alignItems="center" sx={{ width: '100%' }}>
        {eserviceActiveFilter !== '' && (
          <Chip
            key={`eservice${eserviceActiveFilter}`}
            label={`${getLocalizedValue({
              it: 'e-service',
              en: 'e-service',
            })}: ${eserviceActiveFilter}`}
            onDelete={onRemoveActiveNameFilter}
          />
        )}
        {providerActiveFilters.map((filter, index) => (
          <Chip
            key={`provider${filter}${index}`}
            label={`${getLocalizedValue({ it: 'erogatore', en: 'producer' })}: ${filter}`}
            onDelete={onRemoveActiveProducerNameFilter.bind(null, filter as string)}
          />
        ))}
        {isButtonResetFiltersShown && (
          <Stack justifyContent="center">
            <Button
              sx={{ ml: 2 }}
              size="small"
              type="button"
              variant="naked"
              onClick={onResetActiveFilters}
            >
              {cancelFiltersLabel}
            </Button>
          </Stack>
        )}
      </Stack>
      {rightContent}
    </Stack>
  )
}
