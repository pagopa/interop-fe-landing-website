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
  // en: {
  //   href: '/en',
  //   target: '_self',
  //   key: 'PDND Interoperability',
  //   label: 'PDND Interoperability',
  // },
}

const PROJECT_ROUTE: Route = {
  it: {
    href: '/progetto',
    target: '_self',
    key: 'Progetto',
    label: 'Progetto',
  },
  // en: {
  //   href: '/en/project',
  //   target: '_self',
  //   key: 'Project',
  //   label: 'Project',
  // },
}

const DOCUMENTATION_ROUTE: Route = {
  it: {
    href: 'https://docs.pagopa.it/interoperabilita-1',
    target: '_blank',
    key: 'Documentazione',
    label: 'Documentazione',
  },
  // en: {
  //   href: 'https://docs.pagopa.it/interoperabilita-1',
  //   target: '_blank',
  //   key: 'Documentation',
  //   label: 'Documentation',
  // },
}

const NUMBERS_ROUTE: Route = {
  it: {
    href: '/numeri',
    target: '_self',
    key: "Un po' di numeri",
    label: "Un po' di numeri",
  },
  // en: {
  //   href: 'https://docs.pagopa.it/interoperabilita-1',
  //   target: '_blank',
  //   key: 'Documentation',
  //   label: 'Documentation',
  // },
}

const CATALOG_ROUTE: Route = {
  it: {
    href: '/catalogo',
    target: '_self',
    key: 'Catalogo',
    label: 'Catalogo',
  },
  // en: {
  //   href: 'https://docs.pagopa.it/interoperabilita-1',
  //   target: '_blank',
  //   key: 'Documentation',
  //   label: 'Documentation',
  // },
}

export const MAIN_NAV_ROUTES: Record<string, Route> = {
  PROJECT: PROJECT_ROUTE,
  CATALOGO: CATALOG_ROUTE,
  DOCUMENTATION: DOCUMENTATION_ROUTE,
  NUMBERS: NUMBERS_ROUTE,
}

export const COMPARE_ROUTES: Record<string, Route> = {
  ...MAIN_NAV_ROUTES,
  HOME_ROUTE,
}
