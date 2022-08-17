import { createContext } from 'react'
import { Locale } from '../../lib/constants'

interface LocaleCtx {
  locale: Locale | undefined
  setLocale: (value: Locale) => void
}

const LocaleContext = createContext({} as LocaleCtx)

export default LocaleContext
