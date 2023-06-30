import { createContext, useContext } from 'react'
import { Locale } from '../config/constants'

interface LocaleCtx {
  locale: Locale
  setLocale: (value: Locale) => void
}

export const useLocaleContext = () => useContext(LocaleContext)
export const LocaleContext = createContext({} as LocaleCtx)
