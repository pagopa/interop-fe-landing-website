import { ReactNode, useState, useEffect } from 'react'
import LocaleContext from './LocaleContext'
import { LOCALES, Locale } from '../../lib/constants'
import { useRouter } from 'next/router'

interface Props {
  lang: Locale
  children: ReactNode
}

export const LocaleProvider = ({ lang, children }: Props) => {
  const [locale, setLocale] = useState(lang)
  const router = useRouter()
  const { query } = router

  // Sync context with router on load
  useEffect(() => {
    if (LOCALES.includes(query.lang as Locale)) {
      setLocale(query.lang as Locale)
    }
  }, [query.lang]) // eslint-disable-line react-hooks/exhaustive-deps

  return <LocaleContext.Provider value={{ locale, setLocale }}>{children}</LocaleContext.Provider>
}
