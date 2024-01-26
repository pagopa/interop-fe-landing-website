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

export const INTEROP_LEGISLATION_GUIDE_URL = `${INTEROP_GUIDE_BASE_URL}/normativa-e-approfondimenti`
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

export const DATI_GOV_IT_DATASET_HREF = 'https://dati.gov.it/view-dataset'
export const PRIMARY_BLUE = '#0062C3'
export const BAR_CHART_NUMERIC_LABEL_COLOR = '#555555'

export const MACROCATEGORIES = [
  'Tutte',
  'Altre Pubbliche Amministrazioni locali',
  'Aziende Ospedaliere e ASL',
  'Comuni',
  'Province e Città Metropolitane',
  'Pubbliche Amministrazioni Centrali',
  'Enti Nazionali di Previdenza ed Assistenza Sociale',
  'Regioni e Province autonome',
  'Consorzi e associazioni regionali',
  'Scuole',
  'Università e AFAM',
  'Istituti di Ricerca',
  'Stazioni Appaltanti e Gestori di pubblici servizi',
  'Privati',
]

export const MACROCATEGORIES_COLORS = {
  1: '#0073E6', // Altre Pubbliche Amministrazioni locali
  2: '#008A76', // Aziende Ospedaliere e ASL
  3: '#125C00', // Comuni
  4: '#437A35', // Province e Città Metropolitane
  5: '#005CB8', // Pubbliche Amministrazioni Centrali
  6: '#338FEB', // Enti Nazionali di Previdenza ed Assistenza Sociale
  7: '#24B800', // Regioni e Province autonome
  8: '#092E00', // Consorzi e associazioni regionali
  9: '#EB3F33', // Scuole
  10: '#B80090', // Università e AFAM
  11: '#005C4F', // Istituti di Ricerca
  12: '#E69000', // Stazioni Appaltanti e Gestori di pubblici servizi,
  13: '#444444', // Privati
} as const

export const MACROCATEGORIES_COLORS_MAP = new Map<string, string>([
  ['Altre Pubbliche Amministrazioni locali', MACROCATEGORIES_COLORS[1]],
  ['Aziende Ospedaliere e ASL', MACROCATEGORIES_COLORS[2]],
  ['Comuni', MACROCATEGORIES_COLORS[3]],
  ['Province e Città Metropolitane', MACROCATEGORIES_COLORS[4]],
  ['Pubbliche Amministrazioni Centrali', MACROCATEGORIES_COLORS[5]],
  ['Enti Nazionali di Previdenza ed Assistenza Sociale', MACROCATEGORIES_COLORS[6]],
  ['Regioni e Province autonome', MACROCATEGORIES_COLORS[7]],
  ['Consorzi e associazioni regionali', MACROCATEGORIES_COLORS[8]],
  ['Scuole', MACROCATEGORIES_COLORS[9]],
  ['Università e AFAM', MACROCATEGORIES_COLORS[10]],
  ['Istituti di Ricerca', MACROCATEGORIES_COLORS[11]],
  ['Stazioni Appaltanti e Gestori di pubblici servizi', MACROCATEGORIES_COLORS[12]],
  ['Privati', MACROCATEGORIES_COLORS[13]],
  ['E-service pubblicati', PRIMARY_BLUE],
  ['Totale', PRIMARY_BLUE],
  ['Solo fruitore', MACROCATEGORIES_COLORS[10]],
  ['Solo erogatore', MACROCATEGORIES_COLORS[8]],
  ['Sia fruitore che erogatore', MACROCATEGORIES_COLORS[12]],
  ['Solo accesso', MACROCATEGORIES_COLORS[9]],
])

export const MACROCATEGORIES_LINK_HREF =
  'https://github.com/italia/pdnd-opendata/tree/main/constants/macrocategories.md'

export const GOV_IT_DATASETS_IDS = {
  totaleEnti: '392525e9-6052-4e3b-a13a-4b34702784a5',
  andamentoDelleAdesioni: '4861f6b2-efcc-4aa1-956c-71e1e639f814',
  statoDiCompletamentoAdesioni: {
    lastSixMonths: '3d03c811-f64d-4bd0-91d0-1775e57f52ef',
    lastTwelveMonths: '3bcb78dd-8304-4a26-a63c-89a5efb1cc92',
    fromTheBeginning: 'fbb17cbf-2b1c-4d59-9c9d-0ce43f50a6c6',
  },
  distribuzioneDegliEntiPerAttivita: '02b74757-fe4b-4ca6-a9e2-3d155429e5c0',
  eservicePubblicati: '0f84c53b-fd71-4429-a77f-7dc6079834f3',
  entiErogatoriDiEService: '04898a6a-0080-4300-9f8e-22160dafe440',
  entiChePubblicanoPiuEService: {
    lastSixMonths: '2d7258d6-9aa4-4227-8792-af258f06ac89',
    lastTwelveMonths: '3e72a8cb-a984-43e1-93a2-58069af8e270',
    fromTheBeginning: 'bd04fbf1-cabd-4042-92f8-581ce2a15956',
  },
  entiErogatoriEdEntiAbilitatiAllaFruizione: {
    lastSixMonths: '868cf7c4-1e43-4dca-a53b-b626be1d3648',
    lastTwelveMonths: 'ed1ee35f-7d4d-452e-ad09-e2a3479d86b3',
    fromTheBeginning: '5fa24205-a7a9-4145-aa27-544cde409f8e',
  },
  eServiceConPiuEntiAbilitati: {
    lastSixMonths: '7e7ef233-13fa-4fa3-b0a8-950e506d143c',
    lastTwelveMonths: '5574dff0-aaaa-4542-ba2e-8a6e88d5ae4f',
    fromTheBeginning: '5245a08c-b210-4754-abae-de01e4a80aa6',
  },
  // flussiDiRichiesteFraEnti
  // eServicePiuRichiesti
} as const
