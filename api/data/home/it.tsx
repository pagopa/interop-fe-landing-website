import { HomeProps, MainFaqProps } from '../../model'
import { HeroProps, InfoblockProps, ShowcaseProps } from '@pagopa/mui-italia'
import {
  IMAGES_PATH,
  INTEROP_UI_URL,
  INTEROP_ONBOARDING_GUIDE_URL,
  INTEROP_INTRO_GUIDE_URL,
  INTEROP_E_SERVICE_GUIDE_URL,
  INTEROP_DPO_FAQ_URL,
  ICONS_PATH,
} from '../../../src/utils/constants'
import { Typography } from '@mui/material'
import { ExampleIcon } from '../icons'

/** Hero mocked data */
const hero: HeroProps = {
  type: 'image',
  title: 'Interoperabilità',
  subtitle:
    'La piattaforma che abilita lo scambio di informazioni tra gli enti della pubblica amministrazione',
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
        Interoperabilità rende semplice e sicura la creazione di accordi per lo scambio di
        informazioni tra enti della Pubblica Amministrazione tramite un processo standard. Come?
        Sulla stessa infrastruttura, ogni ente può integrare i servizi che gestisce e richiedere la
        fruizione di quelli di cui ha bisogno.
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
        Tutti i servizi su Interoperabilità hanno la stessa struttura e presentano il dettaglio
        dell’API con la quale integrarsi, la documentazione e i contatti dell’erogatore del
        servizio. Così gli sviluppatori hanno tutti gli elementi per iniziare subito a lavorare alle
        integrazioni.
      </Typography>
    ),
    inverse: true,
    image: `${IMAGES_PATH}/infoblock-2.png`,
    altText: '',
    imageShadow: false,
    ctaSecondary: {
      label: 'Scopri come integrare i servizi',
      title: 'Scopri come integrare i servizi',
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
        Tutta la documentazione amministrativa, dall’accordo di adesione ai contratti di fruizione
        dei servizi, sono pensati per offrire lo stesso processo a tutti gli utenti
        dell’infrastruttura e favorire il riutilizzo di quanto messo a disposizione dagli altri.
        Garantisce Interoperabilità.
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
      icon: <img src={`${ICONS_PATH}/vantaggi_1_unica.svg`} alt="Icona che rappresenta 'unica'" />,
      title: 'Unica',
      subtitle: 'Offre un solo catalogo di servizi consultabile da tutta la PA',
    },
    {
      icon: (
        <img src={`${ICONS_PATH}/vantaggi_2_sicura.svg`} alt="Icona che rappresenta 'sicura'" />
      ),
      title: 'Sicura',
      subtitle:
        'Crea un canale sicuro per autenticare e autorizzare erogatori e fruitori dei servizi ad accedere alle informazioni delle quali hanno bisogno',
    },
    {
      icon: (
        <img src={`${ICONS_PATH}/vantaggi_3_veloce.svg`} alt="Icona che rappresenta 'veloce'" />
      ),
      title: 'Veloce',
      subtitle: 'Semplifica l’iter amministrativo e riduce i tempi di accesso alle informazioni',
    },
  ],
}
/* ************************************** */

/** MainFaq mocked data */
const mainFaq: MainFaqProps = {
  title: <>Una struttura sicura</>,
  subtitle: (
    <>
      Interoperabilità garantisce la massima sicurezza per quanto riguarda lo scambio di dati:
      infatti, questi sono sempre e solo degli enti e l’infrastruttura non è mai a loro conoscenza
    </>
  ),
}
/* ************************************** */

const title = 'Interoperabilità'

/** Application Data Mock */
export const itHomeData: HomeProps = {
  title,
  hero,
  infoblocks,
  showcase,
  mainFaq,
}
