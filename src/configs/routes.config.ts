import { Locale } from './constants.config'

type Link = {
  href: string
  target: '_self' | '_blank'
  key: string
  label: string
}

type Route = Record<Locale, Link>

export const HOME_ROUTE: Route = {
  it: {
    href: '/',
    target: '_self',
    key: 'PDND Interoperabilità',
    label: 'PDND Interoperabilità',
  },
}

const PROJECT_ROUTE: Route = {
  it: {
    href: '/progetto',
    target: '_self',
    key: 'Progetto',
    label: 'Progetto',
  },
}

const DOCUMENTATION_ROUTE: Route = {
  it: {
    href: 'https://docs.pagopa.it/interoperabilita-1',
    target: '_blank',
    key: 'Documentazione',
    label: 'Documentazione',
  },
}

const NUMBERS_ROUTE: Route = {
  it: {
    href: '/numeri',
    target: '_self',
    key: 'I numeri della PDND',
    label: 'I numeri della PDND',
  },
}

const CATALOG_ROUTE: Route = {
  it: {
    href: 'https://api.gov.it',
    target: '_blank',
    key: 'Catalogo',
    label: 'Catalogo',
  },
}

const NEWS_ROUTE: Route = {
  it: {
    href: '/news',
    target: '_self',
    key: 'Aggiornamenti',
    label: 'Aggiornamenti',
  },
}

export const MAIN_NAV_ROUTES: Record<string, Route> = {
  PROJECT: PROJECT_ROUTE,
  CATALOGO: CATALOG_ROUTE,
  NUMBERS: NUMBERS_ROUTE,
  NEWS: NEWS_ROUTE,
  DOCUMENTATION: DOCUMENTATION_ROUTE,
}

export const COMPARE_ROUTES: Record<string, Route> = {
  ...MAIN_NAV_ROUTES,
  HOME_ROUTE,
}
