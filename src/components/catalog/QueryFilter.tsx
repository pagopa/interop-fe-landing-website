import { getLocalizedValue } from '@/utils/common.utils'
import { IconButton, InputAdornment, MenuItem, Stack, TextField } from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear'
import SearchIcon from '@mui/icons-material/Search'
import { SortBy } from '@/models/catalog.models'

type QueryFilterProps = {
  query: string
  onQueryChange: (query: string) => void
  sortBy: SortBy
  onSortByChange: (sortBy: SortBy) => void
}

export const QueryFilter: React.FC<QueryFilterProps> = ({
  query,
  onQueryChange,
  sortBy,
  onSortByChange,
}) => {
  return (
    <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
      <TextField
        label={getLocalizedValue({
          it: 'Cerca per nome e-service o erogatore',
          en: 'Find by e-service or provider name',
        })}
        value={query}
        sx={{ width: { xs: '100%', md: '50%' } }}
        onChange={(e) => onQueryChange(e.target.value)}
        InputProps={{
          endAdornment: (
            <>
              {query && (
                <InputAdornment position="end">
                  <IconButton
                    aria-label={getLocalizedValue({ it: 'Pulisci ricerca', en: 'Clear search' })}
                    onClick={() => onQueryChange('')}
                    size="small"
                  >
                    <ClearIcon />
                  </IconButton>
                </InputAdornment>
              )}

              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            </>
          ),
        }}
      />
      <TextField
        sx={{ width: { xs: '100%', md: '25%' } }}
        value={sortBy}
        onChange={(e) => onSortByChange(e.target.value as SortBy)}
        select
        label={getLocalizedValue({ it: 'Ordina per', en: 'Order by' })}
      >
        <MenuItem value="recent-asc">
          {getLocalizedValue({ en: 'Most recent (asc)', it: 'Più recenti (ascendente)' })}
        </MenuItem>
        <MenuItem value="recent-desc">
          {getLocalizedValue({ en: 'Most recent (desc)', it: 'Più recenti (discendente)' })}
        </MenuItem>
        <MenuItem value="name-asc">
          {getLocalizedValue({ en: 'Name (asc)', it: 'Nome (ascendente)' })}
        </MenuItem>
        <MenuItem value="name-desc">
          {getLocalizedValue({ en: 'Name (desc)', it: 'Nome (discendente)' })}
        </MenuItem>
      </TextField>
    </Stack>
  )
}
