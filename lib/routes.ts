import { Locale } from './constants'

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
    key: 'Interoperabilità',
    label: 'Interoperabilità',
  },
  en: {
    href: '/en',
    target: '_self',
    key: 'Interoperability',
    label: 'Interoperability',
  },
}

const PROJECT_ROUTE: Route = {
  it: {
    href: '/progetto',
    target: '_self',
    key: 'Progetto',
    label: 'Progetto',
  },
  en: {
    href: '/en/project',
    target: '_self',
    key: 'Project',
    label: 'Project',
  },
}

const DOCUMENTATION_ROUTE: Route = {
  it: {
    href: 'https://docs.pagopa.it/interoperabilita-1',
    target: '_blank',
    key: 'Documentazione',
    label: 'Documentazione',
  },
  en: {
    href: 'https://docs.pagopa.it/interoperabilita-1',
    target: '_blank',
    key: 'Documentation',
    label: 'Documentation',
  },
}

const NEWS_ROUTE: Route = {
  it: {
    href: '/news',
    target: '_self',
    key: 'News',
    label: 'News',
  },
  en: {
    href: '/en/news',
    target: '_self',
    key: 'News',
    label: 'News',
  },
}

export const SINGLE_NEWS_ROUTE: Route = {
  it: {
    href: '/news/[slug]',
    target: '_self',
    key: 'News',
    label: 'News',
  },
  en: {
    href: '/en/news/[slug]',
    target: '_self',
    key: 'News',
    label: 'News',
  },
}

export const MAIN_NAV_ROUTES: Record<string, Route> = {
  PROJECT: PROJECT_ROUTE,
  DOCUMENTATION: DOCUMENTATION_ROUTE,
  NEWS: NEWS_ROUTE,
}

export const COMPARE_ROUTES: Record<string, Route> = {
  ...MAIN_NAV_ROUTES,
  HOME_ROUTE,
  SINGLE_NEWS: SINGLE_NEWS_ROUTE,
}
