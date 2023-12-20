import {
  ICONS_PATH,
  IMAGES_PATH,
  SELF_CARE_ONBOARDING_INTEROP_URL,
  SITE_URL,
} from '@/configs/constants.config'
import { HeadMetaProps, PageBottomCtaProps } from '@/components'

const meta: HeadMetaProps = {
  title: 'E-Service Catalog | PDND Interoperabilità',
  description: 'The list of e-services available on PDND Interoperabilità',
  sitename: 'PDND Interoperabilità',
  url: `${SITE_URL}/catalogo`,
  imgFb: `${SITE_URL}/${IMAGES_PATH}/social_interop_01_1200x630.jpg`,
  imgTw: `${SITE_URL}/${IMAGES_PATH}/social_interop_01_800x418.jpg`,
}

/** PageBottomCta mocked data */
const pageBottomCta: PageBottomCtaProps = {
  // icon: <ExampleIcon style={{ width: 48, height: 48, color: 'white' }} />,
  icon: (
    <img
      width={120}
      height={120}
      src={`/${ICONS_PATH}/login.svg`}
      alt="Icona che rappresenta il login"
    />
  ),
  title: 'Da dove si inizia?',
  subtitle:
    'Inserisci i dati richiesti, invia il documento di adesione firmato dal Legale Rappresentante e inizia subito a usare Interoperabilità',
  ctaLink: {
    label: 'Aderire',
    ariaLabel: 'Aderire',
    href: SELF_CARE_ONBOARDING_INTEROP_URL,
  },
}
/* ************************************** */

/** Application Data Mock */
export const enCatalogData = {
  meta,
  pageBottomCta,
}
