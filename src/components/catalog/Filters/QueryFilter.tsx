import { useEServiceAutocompleteOptions } from '@/services/catalog.services'
import { getLocalizedValue } from '@/utils/common.utils'
import { Autocomplete, Box, Button, Checkbox, Paper, Stack, TextField } from '@mui/material'
import React from 'react'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import CheckBoxIcon from '@mui/icons-material/CheckBox'

type QueryFilterProps = {
  producerNameActiveFilters: Array<string>
  onQueryChange: ({
    nameQuery,
    producerNameQuery,
  }: {
    nameQuery: string
    producerNameQuery: string[]
  }) => void
}

export const QueryFilter: React.FC<QueryFilterProps> = ({
  producerNameActiveFilters,
  onQueryChange,
}) => {
  const [nameQuery, setNameQuery] = React.useState<string>('')
  const [producerNameQuery, setProducerNameQuery] = React.useState<Array<string>>([])

  const debounceRef = React.useRef<NodeJS.Timeout>()

  /**
   * TODO
   * - risolvere il problema dell'autocomplete lentissimo
   * - risolvere il problema della perdita di cambio di stato quando chiamo il resetPagination
   */
  const { data: eserviceAllAutocompleteOptions = [], isLoading } = useEServiceAutocompleteOptions()

  const eserviceAutocompleteOptions = eserviceAllAutocompleteOptions.filter(
    (option) => !producerNameActiveFilters.includes(option)
  )

  const handleNameQueryChange = (query: string) => {
    setNameQuery(query)
  }

  const handleProducerNameQueryChange = (queries: Array<string>) => {
    clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => setProducerNameQuery(queries), 300)
  }

  const handleSubmit = (e: React.SyntheticEvent) => {
    // done to prevent the page reload when submitting
    e.preventDefault()

    onQueryChange({
      nameQuery: nameQuery,
      producerNameQuery: producerNameQuery,
    })

    setNameQuery('')
  }

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems="center">
        <TextField
          size="small"
          sx={{ width: { xs: '100%', md: '25%' } }}
          value={nameQuery}
          onChange={(e) => handleNameQueryChange(e.target.value)}
          label={getLocalizedValue({
            it: 'Cerca per nome e-service',
            en: 'Find by e-service name',
          })}
        />
        <Autocomplete
          multiple
          disablePortal
          size="small"
          options={eserviceAutocompleteOptions}
          sx={{ width: { xs: '100%', md: '25%' } }}
          loading={isLoading}
          loadingText={getLocalizedValue({ it: 'Caricamento...', en: 'Loading...' })}
          noOptionsText={getLocalizedValue({
            it: 'Nessun risultato',
            en: 'No results',
          })}
          disableCloseOnSelect
          getOptionLabel={(option) => option}
          onChange={(_, data) => {
            handleProducerNameQueryChange(data)
          }}
          renderOption={(props, option, { selected }) => (
            <li {...props}>
              <Checkbox
                icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                checkedIcon={<CheckBoxIcon fontSize="small" />}
                style={{ marginRight: 8 }}
                checked={selected}
              />
              {option}
            </li>
          )}
          PaperComponent={({ children, ...props }) => (
            <Paper elevation={8} {...props}>
              {children}
            </Paper>
          )}
          disableClearable
          renderTags={() => null}
          renderInput={(params) => (
            <TextField
              {...params}
              label={getLocalizedValue({
                it: 'Cerca per nome erogatore',
                en: 'Find by provider name',
              })}
              placeholder={getLocalizedValue({
                it: `${producerNameQuery.length} erogatori selezionati`,
                en: `${producerNameQuery.length} provider selected`,
              })}
            />
          )}
        />
        <Button variant="contained" color="primary" type="submit">
          {getLocalizedValue({
            it: 'Cerca',
            en: 'Search',
          })}
        </Button>
      </Stack>
    </Box>
  )
}
