import React from 'react'
import { MacroCategory } from '@/models/numbers.models'
import { getLocalizedValue } from '@/utils/common.utils'
import {
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  MenuItem,
  Checkbox,
  ListItemText,
  Box,
} from '@mui/material'

type MacroCategoryMultipleSelectInputProps<T extends string[] | undefined> = {
  onChange: (value: T) => void
  values: T
}

export function MacroCategoryMultipleSelectInput<T extends string[] | undefined>({
  values,
  onChange,
}: MacroCategoryMultipleSelectInputProps<T>) {
  const options: Array<{ value: MacroCategory['id']; label: MacroCategory['name'] }> = [
    { value: '1', label: 'Altre Pubbliche Amministrazioni locali' },
    { value: '2', label: 'Aziende Ospedaliere e ASL' },
    { value: '3', label: 'Comuni' },
    { value: '4', label: 'Province e città metropolitane' },
    { value: '5', label: 'Pubbliche Amministrazioni Centrali' },
    { value: '6', label: 'Enti Nazionali di Previdenza ed Assistenza Sociale' },
    { value: '7', label: 'Regioni e Province autonome' },
    { value: '8', label: 'Consorzi e associazioni regionali' },
    { value: '9', label: 'Scuole' },
    { value: '10', label: 'Università e AFAM' },
    { value: '11', label: 'Istituti di Ricerca' },
    { value: '12', label: 'Stazioni Appaltanti e Gestori di pubblici servizi' },
    { value: '13', label: 'Privati' },
  ]

  const labelId = React.useId()
  const selectId = React.useId()

  const renderValue = (selected: Array<MacroCategory['id']>) => {
    const result = options
      .filter((opt) => selected.includes(opt.value))
      .map((sel) => sel.label)
      .join(',')

    return (
      <Box
        sx={{
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {result}
      </Box>
    )
  }

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
        {getLocalizedValue({ it: 'Categoria ente erogatore', en: 'Provider category' })}
      </InputLabel>{' '}
      <Select
        labelId={labelId}
        id={selectId}
        multiple
        // @ts-ignore-next-line
        value={values as string}
        onChange={(e) => onChange(e.target.value as T)}
        input={<OutlinedInput label="" />}
        renderValue={renderValue}
      >
        {options.map((opt) => (
          <MenuItem value={opt.value} key={opt.label}>
            <Checkbox checked={values?.includes(opt.value)} />
            <ListItemText primary={opt.label} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
