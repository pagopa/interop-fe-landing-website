import React from 'react'
import { MacroCategory } from '@/models/numbers.models'
import { getLocalizedValue } from '@/utils/common.utils'
import { SelectInput } from './SelectInput'

type MacroCategorySelectInputProps = {
  onChange: (value: MacroCategory['id']) => void
  value: MacroCategory['id']
}

export const MacroCategorySelectInput: React.FC<MacroCategorySelectInputProps> = ({
  value,
  onChange,
}) => {
  const options: Array<{ value: MacroCategory['id']; label: MacroCategory['name'] }> = [
    { value: '0', label: 'Tutte' },
    { value: '1', label: 'Altre Pubbliche Amministrazioni locali' },
    { value: '2', label: 'Aziende Ospedaliere e ASL' },
    { value: '3', label: 'Comuni e città metropolitane' },
    { value: '4', label: 'Province' },
    { value: '5', label: 'Pubbliche Amministrazioni Centrali' },
    { value: '6', label: 'Regioni' },
    { value: '7', label: 'Scuole' },
    { value: '8', label: 'Università e AFAM' },
    { value: '9', label: 'Istituti di Ricerca' },
    { value: '10', label: 'Stazioni Appaltanti' },
  ]

  return (
    <SelectInput
      label={getLocalizedValue({ it: 'Categoria ente fruitore', en: 'Consumer category' })}
      value={value}
      onChange={onChange}
      options={options}
    />
  )
}
