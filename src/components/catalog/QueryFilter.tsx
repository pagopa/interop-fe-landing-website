import { getLocalizedValue } from '@/utils/common.utils'
import { IconButton, InputAdornment, TextField } from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear'
import SearchIcon from '@mui/icons-material/Search'

export const QueryFilter: React.FC<{ query: string; onQueryChange: (query: string) => void }> = ({
  query,
  onQueryChange,
}) => {
  return (
    <TextField
      label={getLocalizedValue({
        it: 'Cerca per nome e-service o erogatore',
        en: 'Find by e-service or provider name',
      })}
      value={query}
      fullWidth
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
  )
}
