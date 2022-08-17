import { HeroProps } from '../../../src/components/Hero'
import { HomeProps, MainFaqProps } from '../../model'
import { InfoblockProps, ShowcaseProps } from '@pagopa/mui-italia'
import {
  IMAGES_PATH,
  INTEROP_UI_URL,
  SELF_CARE_ONBOARDING_INTEROP_URL,
  INTEROP_ONBOARDING_GUIDE_URL,
  INTEROP_INTRO_GUIDE_URL,
  INTEROP_E_SERVICE_GUIDE_URL,
  INTEROP_DPO_FAQ_URL,
} from '../../../src/utils/constants'
import { Typography } from '@mui/material'
import { ExampleIcon } from '../icons'

/** Hero mocked data */
const hero: HeroProps = {
  type: 'image',
  title: 'Interoperabilità',
  subtitle:
    'La piattaforma che abilita lo scambio di informazioni tramite servizi tra gli enti della pubblica amministrazione',
  inverse: false,
  image: `${IMAGES_PATH}/hero-foreground.png`,
  altText: '',
  background: `${IMAGES_PATH}/hero-background.png`,
  ctaPrimary: {
    label: 'Scopri come aderire',
    title: 'Scopri come aderire',
    onClick: () => {
      window.open(INTEROP_ONBOARDING_GUIDE_URL as string, '_blank')
    },
  },
  ctaSecondary: {
    label: 'Accedi',
    title: 'Accedi',
    onClick: () => {
      window.open(INTEROP_UI_URL as string, '_blank')
    },
  },
}
/* ************************************** */

/** Infoblocks mocked data */
const infoblocks: Array<InfoblockProps> = [
  {
    overline: 'Per gli enti',
    title: 'Scambia informazioni con le altre PA',
    content: (
      <Typography variant="body2">
        Integri i servizi che gestisci su Interoperabilità, e ti iscrivi alla fruizione di quelli di
        cui hai bisogno. L’infrastruttura rende semplice, sicura e standard la creazione di accordi
        tra enti della Pubblica Amministrazione.
      </Typography>
    ),
    inverse: false,
    image: `${IMAGES_PATH}/infoblock-1.png`,
    altText: '',
    imageShadow: true,
    ctaSecondary: {
      label: 'Scopri come scambiare informazioni',
      title: 'Scopri come scambiare informazioni',
      onClick: () => {
        window.open(INTEROP_INTRO_GUIDE_URL as string, '_blank')
      },
    },
  },
  {
    overline: 'Per gli sviluppatori',
    title: 'Integrare i servizi è diventato più semplice',
    content: (
      <Typography variant="body2">
        Tutti i servizi su Interoperabilità hanno la stessa struttura, presentando il dettaglio
        dell’API, la documentazione e i contatti dell’erogatore del servizio. Così puoi iniziare
        subito a sviluppare.
      </Typography>
    ),
    inverse: true,
    image: `${IMAGES_PATH}/infoblock-2.png`,
    altText: '',
    imageShadow: false,
    ctaSecondary: {
      label: 'Come funziona l’integrazione dei servizi',
      title: 'Come funziona l’integrazione dei servizi',
      onClick: () => {
        window.open(INTEROP_E_SERVICE_GUIDE_URL as string, '_blank')
      },
    },
  },
  {
    overline: 'Per i DPO',
    title: 'Procedure standard, per qualunque servizio',
    content: (
      <Typography variant="body2">
        Tutta la documentazione amministrativa, dall’accordo di adesione agli accordi di fruizione
        dei servizi sono pensati per dare un solo processo per tutti, e favorire il riutilizzo di
        quanto messo a disposizione dagli altri. Garantisce Interoperabilità.
      </Typography>
    ),
    inverse: false,
    image: `${IMAGES_PATH}/infoblock-3.png`,
    altText: '',
    imageShadow: false,
    ctaSecondary: {
      label: 'Vai alla documentazione',
      title: 'Vai alla documentazione',
      onClick: () => {
        window.open(INTEROP_DPO_FAQ_URL as string, '_blank')
      },
    },
  },
]
/* ************************************** */

/** Showcase mocked data */
const showcase: ShowcaseProps = {
  title: 'Perché usarla',
  items: [
    {
      icon: (
        <>
          <ExampleIcon />
        </>
      ),
      title: 'Unica',
      subtitle: 'Offre un solo catalogo di servizi consultabile da tutta la PA',
    },
    {
      icon: (
        <>
          <ExampleIcon />
        </>
      ),
      title: 'Sicura',
      subtitle:
        'Crea un canale sicuro per autenticare e autorizzare erogatori e fruitori dei servizi',
    },
    {
      icon: (
        <>
          <ExampleIcon />
        </>
      ),
      title: 'Veloce',
      subtitle: 'Semplifica l’iter amministrativo e riduce i tempi di accesso al dato',
    },
  ],
}
/* ************************************** */

/** MainFaq mocked data */
const mainFaq: MainFaqProps = {
  title: (
    <>
      Perché Interoperabilità
      <br />
      ha accesso ai dati dei cittadini?
    </>
  ),
  subtitle: (
    <>
      Ottima domanda, è un dubbio comune! La realtà è che Interoperabilità autentica e autorizza gli
      enti ma <strong>non è mai a conoscenza dei dati che questi si scambiano</strong>
    </>
  ),
}
/* ************************************** */

/** Application Data Mock */
export const itHomeData: HomeProps = {
  hero,
  infoblocks,
  showcase,
  mainFaq,
}
