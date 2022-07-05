import { DEFAULT_LOCALE, Locale, LOCALES, ROUTES, Route } from '../../lib/constants'

export const isLocale = (str: string): str is Locale => LOCALES.includes(str as Locale)

export const getInitialLocale = (): Locale => {
  const [browserSetting] = navigator.language.split('-')
  return isLocale(browserSetting) ? browserSetting : DEFAULT_LOCALE
}
