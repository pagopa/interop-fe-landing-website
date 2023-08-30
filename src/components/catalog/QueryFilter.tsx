import { getLocalizedValue } from '@/utils/common.utils'
import { Autocomplete, MenuItem, Paper, Stack, TextField } from '@mui/material'
import { SortBy } from '@/models/catalog.models'
import { useEServiceAutocompleteOptions } from '@/services/catalog.services'

type QueryFilterProps = {
  query: string
  onQueryChange: (query: string) => void
  sortBy: SortBy
  onSortByChange: (sortBy: SortBy) => void
}

export const QueryFilter: React.FC<QueryFilterProps> = ({
  onQueryChange,
  sortBy,
  onSortByChange,
}) => {
  const { data: eserviceAutocompleteOptions = [], isLoading } = useEServiceAutocompleteOptions()

  return (
    <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
      <Autocomplete
        disablePortal
        options={eserviceAutocompleteOptions}
        sx={{ width: { xs: '100%', md: '50%' } }}
        onInputChange={(_, value) => onQueryChange(value)}
        loading={isLoading}
        loadingText={getLocalizedValue({ it: 'Caricamento...', en: 'Loading...' })}
        noOptionsText={getLocalizedValue({
          it: 'Nessun risultato',
          en: 'No results',
        })}
        renderInput={(params) => (
          <TextField
            {...params}
            label={getLocalizedValue({
              it: 'Cerca per nome e-service o erogatore',
              en: 'Find by e-service or provider name',
            })}
          />
        )}
        PaperComponent={({ children, ...props }) => (
          <Paper elevation={8} {...props}>
            {children}
          </Paper>
        )}
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
