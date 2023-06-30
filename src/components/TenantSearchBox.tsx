import { Autocomplete, Paper, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { getLocalizedValue } from '../utils/localization'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'

export type TenantOption = {
  id: string
  label: string
  hasPDND: boolean
}

type TenantSerachBoxProps = {
  withBackground: boolean | undefined
  options: Array<TenantOption>
}

export const TenantSerachBox: React.FC<TenantSerachBoxProps> = ({ withBackground, options }) => {
  const [selectedOption, setSelectedOption] = useState<TenantOption>()

  return (
    <Stack spacing={3} alignItems="center">
      <Stack>
        <Typography
          color={withBackground ? 'text.primary' : 'text.secondary'}
          variant="h5"
          textAlign="center"
        >
          {getLocalizedValue({ it: 'Cerca tra gli aderenti', en: 'Search between tenants' })}
        </Typography>
        <Typography
          color={withBackground ? 'text.primary' : 'text.secondary'}
          variant="body2"
          textAlign="center"
        >
          {getLocalizedValue({
            it: 'Devi verificare se un ente ha aderito a PDND interoperabilità? Cercalo qui',
            en: 'Do you need to verify which tenant has agreed to PDND Interoperabilità? Search here',
          })}
        </Typography>
      </Stack>
      <Stack spacing={1}>
        <Autocomplete
          id="tenants-searchBox"
          options={options}
          sx={{ width: 300 }}
          value={selectedOption}
          noOptionsText={getLocalizedValue({
            it: "L'ente non ha aderito",
            en: 'The tenant has not agreed',
          })}
          isOptionEqualToValue={(option, { id }) => option.id === id}
          renderInput={(params) => (
            <TextField
              variant="outlined"
              {...params}
              label={getLocalizedValue({ it: 'Cerca aderente', en: 'Search tenant' })}
            />
          )}
          renderOption={(props, value) => {
            const label = value.label
            if (!label) return null

            return (
              <li {...props}>
                <div>
                  <Typography component="span" key={value.id}>
                    {label}
                  </Typography>
                </div>
              </li>
            )
          }}
          renderTags={() => null}
          PaperComponent={({ children }) => <Paper elevation={4}>{children}</Paper>}
          size="small"
          onChange={(_, value) => {
            setSelectedOption(value ?? undefined)
          }}
        />
        {selectedOption?.hasPDND && (
          <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
            <CheckCircleIcon fontSize="small" color="primary" />
            <Typography variant="caption-semibold" color={'primary'}>
              {getLocalizedValue({
                it: "L' ente ha aderito a PDND Interoperabilità",
                en: 'The tenant has agreed to PDND Interoperabilità',
              })}
            </Typography>
          </Stack>
        )}
      </Stack>
    </Stack>
  )
}
