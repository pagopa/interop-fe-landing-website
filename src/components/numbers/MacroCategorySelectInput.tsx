import { MacroCategory } from '@/models/numbers.models'
import { getLocalizedValue } from '@/utils/common.utils'
import React from 'react'
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
    { label: 'Altre Pubbliche Amministrazioni locali', value: '1' },
    { label: 'Aziende sanitarie locali e Strutture di ricovero', value: '2' },
    { label: 'Comuni', value: '3' },
    { label: 'Enti Nazionali di Previdenza ed Assistenza Sociale', value: '4' },
    { label: 'Province e Citt\u00e0 Metropolitane', value: '5' },
    { label: 'Pubbliche Amministrazioni Centrali', value: '6' },
    { label: 'Regioni e Province autonome', value: '7' },
    { label: 'Scuole', value: '8' },
    { label: 'Stazioni Appaltanti e Gestori di pubblici servizi', value: '9' },
    { label: 'Universit\u00e0 e AFAM', value: '10' },
    { label: 'Enti privati', value: '11' },
    { label: 'Non definito', value: '12' },
    // { value: '1', label: 'Altre Pubbliche Amministrazioni locali' },
    // { value: '2', label: 'Aziende Ospedaliere e ASL' },
    // { value: '3', label: 'Comuni' },
    // { value: '4', label: 'Province e città metropolitane' },
    // { value: '5', label: 'Pubbliche Amministrazioni Centrali' },
    // { value: '6', label: 'Enti Nazionali di Previdenza ed Assistenza Sociale' },
    // { value: '7', label: 'Regioni e Province autonome' },
    // { value: '8', label: 'Consorzi e associazioni regionali' },
    // { value: '9', label: 'Scuole' },
    // { value: '10', label: 'Università e AFAM' },
    // { value: '11', label: 'Istituti di Ricerca' },
    // { value: '12', label: 'Stazioni Appaltanti e Gestori di pubblici servizi' },
    // { value: '13', label: 'Enti privati' },
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
