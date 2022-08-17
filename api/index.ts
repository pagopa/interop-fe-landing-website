import { useContext } from 'react'
import LocaleContext from '../src/i18n/LocaleContext'
import { enHomeData } from './data/home/en'
import { itHomeData } from './data/home/it'
import { itCommonData } from './data/common/it'
import { enCommonData } from './data/common/en'
import { enProjectData } from './data/progetto/en'
import { itProjectData } from './data/progetto/it'

export const useGetHomeData = () => {
  const { locale } = useContext(LocaleContext)
  return locale === 'it' ? itHomeData : enHomeData
}

export const useGetProjectData = () => {
  const { locale } = useContext(LocaleContext)
  return locale === 'it' ? itProjectData : enProjectData
}

export const useGetCommonData = () => {
  const { locale } = useContext(LocaleContext)
  return locale === 'it' ? itCommonData : enCommonData
}
