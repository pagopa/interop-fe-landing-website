import { PAGOPA_HELP_EMAIL, SELF_CARE_ONBOARDING_INTEROP_URL } from '../../../src/utils/constants'
import { CommonProps, PageBottomCtaProps } from '../../model'
import { ExampleIcon } from '../icons'

const assistance = {
  label: 'Assistenza',
  ariaLabel: 'assistenza',
  href: `mailto:${PAGOPA_HELP_EMAIL}`,
}

/** PageBottomCta mocked data */
const pageBottomCta: PageBottomCtaProps = {
  icon: <ExampleIcon style={{ width: 48, height: 48, color: 'white' }} />,
  title: 'Mi avete convinto. Da dove inizio?',
  subtitle:
    'Il Legale Rappresentante del tuo ente firma l’adesione, e accedi subito a Interoperabilità',
  ctaLink: {
    label: 'Aderisci',
    ariaLabel: 'Aderisci',
    href: SELF_CARE_ONBOARDING_INTEROP_URL as string,
  },
}
/* ************************************** */

/** Application Data Mock */
export const enCommonData: CommonProps = {
  assistance,
  pageBottomCta,
}
