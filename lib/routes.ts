import { Locale } from './constants'

type Link = {
  href: string
  target: '_self' | '_blank'
  key: string
  label: string
}

export const ROUTES: Record<string, Record<Locale, Link>> = {
  HOME: {
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
  },
  PROJECT: {
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
  },
  DOCUMENTATION: {
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
  },
  NEWS: {
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
  },
}
