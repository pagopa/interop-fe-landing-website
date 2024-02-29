import React from 'react'
import { MacroCategory } from '@/models/numbers.models'
import { getLocalizedValue } from '@/utils/common.utils'
import { SelectInput } from './SelectInput'

type MacroCategorySelectInputProps = {
  onChange: (value: MacroCategory['id']) => void
  value: MacroCategory['id']
  values?: Array<{ value: MacroCategory['id']; label: MacroCategory['name'] }>
  labelLocalized?: Record<'it' | 'en', string>
}

export const MacroCategorySelectInput: React.FC<MacroCategorySelectInputProps> = ({
  value,
  values,
  onChange,
  labelLocalized,
}) => {
  const options: Array<{ value: MacroCategory['id']; label: MacroCategory['name'] }> = [
    { value: '0', label: 'Tutte' },
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

  return (
    <SelectInput
      label={getLocalizedValue(
        labelLocalized || { it: 'Categoria ente fruitore', en: 'Consumer category' }
      )}
      value={value}
      onChange={onChange}
      options={values || options}
    />
  )
}
