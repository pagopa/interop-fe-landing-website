import { getLocalizedValue } from '@/utils/common.utils'
import { IconButton, InputAdornment, MenuItem, Stack, TextField } from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear'
import SearchIcon from '@mui/icons-material/Search'
import { OrderBy } from '@/models/catalog.models'

type QueryFilterProps = {
  query: string
  onQueryChange: (query: string) => void
  orderBy: OrderBy
  onOrderByChange: (orderBy: OrderBy) => void
}

export const QueryFilter: React.FC<QueryFilterProps> = ({
  query,
  onQueryChange,
  orderBy,
  onOrderByChange,
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
        value={orderBy}
        onChange={(e) => onOrderByChange(e.target.value as OrderBy)}
        select
        label={getLocalizedValue({ it: 'Ordina per', en: 'Order by' })}
      >
        <MenuItem value="recent">
          {getLocalizedValue({ en: 'Most recent', it: 'Più recenti' })}
        </MenuItem>
        <MenuItem value="name">{getLocalizedValue({ en: 'Name', it: 'Per nome' })}</MenuItem>
      </TextField>
    </Stack>
  )
}
