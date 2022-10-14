import React from 'react'
import { FooterLinksType, PreLoginFooterLinksType } from '@pagopa/mui-italia'

export type Locale = 'it'
export const DEFAULT_LOCALE = 'it'
export const LOCALES = [DEFAULT_LOCALE, 'en']

export const LANGUAGES: Record<Locale, Record<Locale, string>> = {
  it: { it: 'Italiano' },
}

export const documentationLink = 'https://docs.pagopa.it/interoperabilita-1'

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
        href: 'https://www.pagopa.it/static/10ffe3b3d90ecad83d1bbebea0512188/Certificato-SGSI-PagoPA-2020.pdf',
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
        label: 'Modello 321',
        href: 'https://pagopa.portaleamministrazionetrasparente.it/pagina746_altri-contenuti.htmls',
        ariaLabel: 'Vai al link: Modello 321',
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
        href: 'https://www.instagram.com/pagopa',
        ariaLabel: 'Link: vai al sito Instagram di PagoPA S.p.A.',
      },
      {
        title: 'Medium',
        icon: 'medium',
        href: 'https://medium.com/pagopa',
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
