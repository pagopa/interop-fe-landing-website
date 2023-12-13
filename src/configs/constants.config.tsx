import React from 'react'
import { FooterLinksType, PreLoginFooterLinksType } from '@pagopa/mui-italia'
const isDevelopment = process.env.NODE_ENV === 'development'

export type Locale = 'it'
export const DEFAULT_LOCALE = 'it'
export const LOCALES = [DEFAULT_LOCALE, 'en']

export const IMAGES_PATH = 'static/images'
export const ICONS_PATH = 'static/icons'

export const PAGOPA_HOME = 'https://pagopa.it'
export const PAGOPA_HELP_EMAIL = ''

export const INTEROP_UI_URL = 'https://selfcare.pagopa.it'
export const SELF_CARE_ONBOARDING_INTEROP_URL =
  'https://selfcare.pagopa.it/auth/login?onSuccess=/onboarding/prod-interop'
export const INTEROP_GUIDE_BASE_URL = 'https://docs.pagopa.it/interoperabilita-1'

export const INTEROP_ONBOARDING_GUIDE_URL = `${INTEROP_GUIDE_BASE_URL}/manuale-operativo/guida-alladesione`
export const INTEROP_INTRO_GUIDE_URL = `${INTEROP_GUIDE_BASE_URL}/funzionamento-generale`
export const INTEROP_E_SERVICE_GUIDE_URL = `${INTEROP_GUIDE_BASE_URL}/come-integrare-i-propri-servizi-su-pdnd-interoperabilita`
export const INTEROP_DPO_FAQ_URL = `${INTEROP_GUIDE_BASE_URL}/manuale-operativo/guida-alladesione`

// export const ONETRUST_DOMAIN_SCRIPT_ID = '77e6a813-8aa7-4091-8cc7-624b5dc60ebc'

export const SITE_URL = 'https://www.interop.pagopa.it'
export const INTEROP_NUMBERS_URL_PROD = `${SITE_URL}/kpis-dashboard.json`
export const INTEROP_NUMBERS_URL_TEST = `https://uat.interop.pagopa.it/kpis-dashboard.json`
export const INTEROP_CATALOG_URL = `${
  isDevelopment ? 'http://localhost:3000' : SITE_URL
}/catalog.json`
export const INTEROP_NUMBERS_NEW = `${SITE_URL}/metrics.json`

export const LANGUAGES: Record<Locale, Record<Locale, string>> = {
  it: { it: 'Italiano' },
}

export const documentationLink = 'https://docs.pagopa.it/interoperabilita-1'
const attributesHelpLink = `${documentationLink}/manuale-operativo/attributi`
export const certifiedAttributesHelpLink = `${attributesHelpLink}#attributi-certificati`
export const verifiedAttributesHelpLink = `${attributesHelpLink}#attributi-verificati`
export const declaredAttributesHelpLink = `${attributesHelpLink}#attributi-dichiarati`

export const pagoPALink: { label: string; href: string; ariaLabel: string; title: string } = {
  label: 'PagoPA S.p.A.',
  href: 'https://www.pagopa.it/it',
  ariaLabel: 'Link: vai al sito di PagoPA S.p.A.',
  title: 'PagoPA S.p.A.',
}

export const companyLegalInfo = (
  <>
    <strong>PagoPA S.p.A.</strong> — società per azioni con socio unico - capitale sociale di euro
    1,000,000 interamente versato - sede legale in Roma, Piazza Colonna 370,
    <br />
    CAP 00187 - n. di iscrizione a Registro Imprese di Roma, CF e P.IVA 15376371009
  </>
)

export const preLoginLinks: PreLoginFooterLinksType = {
  // First column
  aboutUs: {
    title: undefined,
    links: [
      {
        label: 'Chi siamo',
        href: 'https://www.pagopa.it/it/societa/chi-siamo',
        ariaLabel: 'Vai al link: Chi siamo',
        linkType: 'external',
      },
      {
        label: 'PNRR',
        href: 'https://www.pagopa.it/it/opportunita/pnrr/progetti',
        ariaLabel: 'Vai al link: PNRR',
        linkType: 'external',
      },
      {
        label: 'Media',
        href: 'https://www.pagopa.it/it/media',
        ariaLabel: 'Vai al link: Media',
        linkType: 'external',
      },
      {
        label: 'Lavora con noi',
        href: 'https://www.pagopa.it/it/lavora-con-noi',
        ariaLabel: 'Vai al link: Lavora con noi',
        linkType: 'external',
      },
    ],
  },
  // Third column
  resources: {
    title: 'Risorse',
    links: [
      {
        label: 'Privacy Policy',
        href: 'https://www.pagopa.it/it/privacy-policy',
        ariaLabel: 'Vai al link: Privacy Policy',
        linkType: 'external',
      },
      {
        label: 'Certificazioni',
        href: 'https://www.pagopa.it/static/307f84e95cb44e962922833037b8ef2d/Certificazione-ISO-27001.pdf',
        ariaLabel: 'Vai al link: Certificazioni',
        linkType: 'external',
      },
      {
        label: 'Sicurezza delle informazioni',
        href: 'https://www.pagopa.it/static/781646994f1f8ddad2d95af3aaedac3d/Sicurezza-delle-informazioni_PagoPA-S.p.A..pdf',
        ariaLabel: 'Vai al link: Sicurezza delle informazioni',
        linkType: 'external',
      },
      {
        label: 'Diritto alla protezione dei dati personali',
        href: 'https://privacyportal-de.onetrust.com/webform/77f17844-04c3-4969-a11d-462ee77acbe1/9ab6533d-be4a-482e-929a-0d8d2ab29df8',
        ariaLabel: 'Vai al link: Diritto alla protezione dei dati personali',
        linkType: 'external',
      },
      {
        label: 'Termini e Condizioni',
        href: 'https://www.pagopa.it/it/termini-e-condizioni-di-utilizzo-del-sito',
        ariaLabel: 'Vai al link: Termini e Condizioni',
        linkType: 'external',
      },
      {
        label: 'Società trasparente',
        href: 'https://pagopa.portaleamministrazionetrasparente.it/pagina746_altri-contenuti.html',
        ariaLabel: 'Vai al link: Società trasparente',
        linkType: 'external',
      },
      {
        label: 'Responsible Disclosure Policy',
        href: 'https://www.pagopa.it/it/responsible-disclosure-policy/',
        ariaLabel: 'Vai al link: Responsible Disclosure Policy',
        linkType: 'external',
      },
      {
        label: 'Modello 231',
        href: 'https://pagopa.portaleamministrazionetrasparente.it/pagina746_altri-contenuti.htmls',
        ariaLabel: 'Vai al link: Modello 231',
        linkType: 'external',
      },
    ],
  },
  // Fourth column
  followUs: {
    title: 'Seguici su',
    socialLinks: [
      {
        title: 'LinkedIn',
        icon: 'linkedin',
        href: 'https://www.linkedin.com/company/pagopa',
        ariaLabel: 'Link: vai al sito LinkedIn di PagoPA S.p.A.',
      },
      {
        title: 'Twitter',
        icon: 'twitter',
        href: 'https://twitter.com/pagopa',
        ariaLabel: 'Link: vai al sito Twitter di PagoPA S.p.A.',
      },
      {
        title: 'Instagram',
        icon: 'instagram',
        href: 'https://www.instagram.com/pagopaspa',
        ariaLabel: 'Link: vai al sito Instagram di PagoPA S.p.A.',
      },
      {
        title: 'Medium',
        icon: 'medium',
        href: 'https://medium.com/pagopa-spa',
        ariaLabel: 'Link: vai al sito Medium di PagoPA S.p.A.',
      },
    ],
    links: [
      {
        label: 'Accessibilità',
        href: 'https://form.agid.gov.it/view/eca3487c-f3cb-40be-a590-212eafc70058',
        ariaLabel: 'Vai al link: Dichiarazione di accessibilità',
        linkType: 'external',
      },
    ],
  },
}

export const postLoginLinks: Array<FooterLinksType> = []

export const CHART_BASE_COLOR = '#67ABF0'

export const MACROCATEGORIES_COLORS = {
  1: '#6780F0', // Amministrazioni locali
  2: '#66F0DC', // Aziende Ospedaliere e ASL
  3: '#82F067', // Comuni
  4: '#437A35', // Province e Città Metropolitane
  5: '#67ABF0', // Pubbliche Amministrazioni Centrali
  6: '#67D7F0', // Enti Nazionali di Previdenza ed Assistenza Sociale
  7: '#6FCC58', // Regioni
  8: '#7A67F0', // Consorzi e associazioni regionali
  9: '#F067EC', // Scuole
  10: '#F07067', // Scuole
  11: '#46A395', // Istituti di Ricerca
  12: '#E1F066', // Stazioni Appaltanti e Gestori di pubblici servizi
} as const

export const MACROCATEGORIES_COLORS_MAP = new Map<string, string>([
  ['Amministrazioni locali', '#6780F0'],
  ['Aziende Ospedaliere e ASL', '#66F0DC'],
  ['Comuni', '#82F067'],
  ['Province e Città Metropolitane', '#437A35'],
  ['Pubbliche Amministrazioni Centrali', '#67ABF0'],
  ['Enti Nazionali di Previdenza ed Assistenza Sociale', '#67D7F0'],
  ['Regioni', '#6FCC58'],
  ['Consorzi e associazioni regionali', '#7A67F0'],
  ['Scuole', '#F067EC'],
  ['Scuole_', '#F07067'],
  ['Istituti di Ricerca', '#46A395'],
  ['Stazioni Appaltanti e Gestori di pubblici servizi', '#E1F066'],
  ['E-service pubblicati', '#0062C3'],
  ['Totale', '#0062C3'],
  ['Università e AFAM', '#F07067'],
  ['Solo fruitore', '#F07067'],
  ['Solo erogatore', '#7A67F0'],
  ['Sia fruitore che erogatore', '#E1F066'],
  ['Solo accesso', '#F067EC'],
  ['Altre Pubbliche Amministrazioni locali', '#6780F0'],
])

export const MACROCATEGORIES_LINK_HREF =
  'https://github.com/italia/pdnd-opendata/tree/main/contants/macrocategories.md'
