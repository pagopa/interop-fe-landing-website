import { Link } from '@mui/material'
import {
  ICONS_PATH,
  PAGOPA_HELP_EMAIL,
  SELF_CARE_ONBOARDING_INTEROP_URL,
} from '../../../src/utils/constants'
import { CommonProps, PageBottomCtaProps } from '../../model'

const assistance = {
  label: 'Assistenza',
  ariaLabel: 'assistenza',
  href: `mailto:${PAGOPA_HELP_EMAIL}`,
}

/** PageBottomCta mocked data */
const pageBottomCta: PageBottomCtaProps = {
  // icon: <ExampleIcon style={{ width: 48, height: 48, color: 'white' }} />,
  icon: <img width={56} src={`${ICONS_PATH}/login.svg`} alt="Icona che rappresenta il login" />,
  title: 'Da dove si inizia?',
  subtitle:
    'Inserisci i dati richiesti, invia il documento di adesione firmato dal Legale Rappresentante e inizia subito a usare Interoperabilità',
  ctaLink: {
    label: 'Scopri come aderire',
    ariaLabel: 'Scopri come aderire',
    href: SELF_CARE_ONBOARDING_INTEROP_URL as string,
  },
}
/* ************************************** */

/** Dtd logo */
const dtd = {
  description: <>Progetto realizzato e gestito da PagoPA S.p.A. per</>,
  logo: (
    <Link
      href="http://innovazione.gov.it/dipartimento"
      title="Vai al sito: Dipartimento per la Trasformazione Digitale"
      target="_blank"
      rel="noreferrer"
      sx={{ display: 'block' }}
    >
      <img
        width={280}
        src={`${ICONS_PATH}/dtd_blue-nofill-text-right.svg`}
        alt="Logo Dipartimento per la Trasformazione Digitale"
      />
    </Link>
  ),
}
/* ************************************** */

/** Application Data Mock */
export const enCommonData: CommonProps = {
  assistance,
  dtd,
  pageBottomCta,
}
