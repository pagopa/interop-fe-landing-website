import { getLocalizedValue } from '@/utils/common.utils'
import { Button, Chip, Stack } from '@mui/material'
import React from 'react'

type ActiveFiltersChipsProps = {
  eserviceActiveFilters: Array<(string | null) | never>
  providerActiveFilters: Array<(string | null) | never>
  onRemoveActiveNameFilter: (filter: string) => void
  onRemoveActiveProducerNameFilter: (filter: string) => void
  onResetActiveFilters: VoidFunction
  rightContent?: React.ReactNode
}

export const ActiveFiltersChips: React.FC<ActiveFiltersChipsProps> = ({
  eserviceActiveFilters,
  providerActiveFilters,
  onRemoveActiveNameFilter,
  onRemoveActiveProducerNameFilter,
  onResetActiveFilters,
  rightContent,
}) => {
  if (eserviceActiveFilters.length <= 0 && providerActiveFilters.length <= 0 && !rightContent) {
    return null
  }

  const cancelFiltersLabel = getLocalizedValue({
    it: 'Annulla filtri',
    en: 'Cancel filters',
  })

  return (
    <Stack
      spacing={rightContent ? 2 : 0}
      direction="row"
      alignItems="center"
      justifyContent="space-between"
    >
      <Stack direction="row" flexWrap="wrap" gap={1} alignItems="center" sx={{ width: '100%' }}>
        {eserviceActiveFilters.map((filter, index) => (
          <Chip
            key={`eservice${filter}${index}`}
            label={`${getLocalizedValue({ it: 'e-service', en: 'e-service' })}: ${filter}`}
            onDelete={onRemoveActiveNameFilter.bind(null, filter as string)}
          />
        ))}
        {providerActiveFilters.map((filter, index) => (
          <Chip
            key={`provider${filter}${index}`}
            label={`${getLocalizedValue({ it: 'erogatore', en: 'producer' })}: ${filter}`}
            onDelete={onRemoveActiveProducerNameFilter.bind(null, filter as string)}
          />
        ))}
        {eserviceActiveFilters.length + providerActiveFilters.length > 1 && (
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
