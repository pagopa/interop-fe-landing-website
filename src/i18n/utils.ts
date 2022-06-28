import { DEFAULT_LOCALE, Locale, LOCALES, ROUTES, Route } from '../../lib/constants'

export const isLocale = (str: string): str is Locale => LOCALES.includes(str as Locale)

export const getInitialLocale = (): Locale => {
  const [browserSetting] = navigator.language.split('-')
  return isLocale(browserSetting) ? browserSetting : DEFAULT_LOCALE
}

export const getCurrentRoute = (
  currentRoutePath: string,
  lang: Locale
): { key: string; route: Route } => {
  const RouteKeys = Object.keys(ROUTES)
  const routeKey = RouteKeys.find((k) => {
    const href = ROUTES[k].PATH[lang]
    if (href === currentRoutePath) {
      return true
    }

    return false
  }) as string

  return { key: routeKey, route: ROUTES[routeKey] }
}
