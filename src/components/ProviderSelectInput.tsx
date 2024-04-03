import React from 'react'
import { getLocalizedValue } from '@/utils/common.utils'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'

type ProviderSelectInputProps = {
  options: Array<string>
  value: string
  onChange: (provider: string) => void
}

export const ProviderSelectInput: React.FC<ProviderSelectInputProps> = ({
  options,
  value,
  onChange,
}) => {
  const labelId = React.useId()
  const selectId = React.useId()

  return (
    <FormControl fullWidth sx={{ maxWidth: { md: 320 } }} size="small">
      <InputLabel
        sx={{
          transform: 'none',
          position: 'static',
          mb: 1,
          fontSize: 16,
          fontWeight: 400,
          color: 'text.primary',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: 'block',
        }}
        id={labelId}
      >
        {getLocalizedValue({ it: 'ente erogatore', en: 'provider' })}
      </InputLabel>
      <Select
        value={value}
        onChange={(e) => onChange(e.target.value as string)}
        labelId={labelId}
        id={selectId}
        sx={{}}
        SelectDisplayProps={{
          style: {
            display: 'inline-block',
          },
        }}
        MenuProps={{ sx: { maxHeight: 340 } }}
      >
        {options.map((option) => (
          <MenuItem value={option} key={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
