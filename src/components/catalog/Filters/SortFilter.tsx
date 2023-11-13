import { SortBy } from '@/models/catalog.models'
import { getLocalizedValue } from '@/utils/common.utils'
import { MenuItem, TextField } from '@mui/material'
import React from 'react'

type SortFilterProps = {
  sortBy: SortBy
  onSortByChange: (sortBy: SortBy) => void
}

export const SortFilter: React.FC<SortFilterProps> = ({ sortBy, onSortByChange }) => {
  return (
    <TextField
      size="small"
      sx={{ width: { xs: '100%', md: '32%' } }}
      value={sortBy}
      onChange={(e) => onSortByChange(e.target.value as SortBy)}
      select
      label={getLocalizedValue({ it: 'Ordina risultati per', en: 'Order results by' })}
    >
      <MenuItem value="recent-asc">
        {getLocalizedValue({ en: 'Most recent (asc)', it: 'Più recenti (ascendente)' })}
      </MenuItem>
      <MenuItem value="recent-desc">
        {getLocalizedValue({ en: 'Most recent (desc)', it: 'Più recenti (discendente)' })}
      </MenuItem>
      <MenuItem value="name-asc">
        {getLocalizedValue({ en: 'E-service name (asc)', it: 'Nome e-service (ascendente)' })}
      </MenuItem>
      <MenuItem value="name-desc">
        {getLocalizedValue({ en: 'E-service name (desc)', it: 'Nome e-service (discendente)' })}
      </MenuItem>
    </TextField>
  )
}
