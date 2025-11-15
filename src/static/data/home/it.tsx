import { HeroProps, ShowcaseProps } from '@pagopa/mui-italia'
import { Typography } from '@mui/material'
import {
  ICONS_PATH,
  IMAGES_PATH,
  INTEROP_DPO_FAQ_URL,
  INTEROP_E_SERVICE_GUIDE_URL,
  INTEROP_INTRO_GUIDE_URL,
  INTEROP_ONBOARDING_GUIDE_URL,
  INTEROP_UI_URL,
  SITE_URL,
} from '@/configs/constants.config'
import { HeadMetaProps, MainFaqProps, SingleNewsBlockProps } from '@/components'

/** Hero mocked data */
const hero: HeroProps = {
  type: 'image',
  title: 'PDND Interoperabilità',
  subtitle: 'La piattaforma che abilita lo scambio di informazioni tra gli enti',
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
const infoblocks = [
  {
    overline: 'Per gli enti',
    title: 'Scambia informazioni con gli altri enti',
    content: (
      <Typography variant="body2">
        Interoperabiltà rende semplice e sicuro lo scambio di informazioni tramite un processo
        standard. Come? Su Interoperabilità, ogni erogatore può integrare i servizi che gestisce e
        richiedere la fruizione di quelli di cui ha bisogno.
      </Typography>
    ),
    inverse: false,
    image: `${IMAGES_PATH}/infoblock_01.jpg`,
    altText: 'Una persona al computer che usa la web app di Interoperabilità',
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
    image: `${IMAGES_PATH}/infoblock_02.jpg`,
    altText: 'Un`altra persona al computer che usa la web app di Interoperabilità',
    aspectRatio: '9/16',
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
        Tutta la documentazione amministrativa è pensata per offrire lo stesso processo per tutti
        gli aderenti a Interoperabilità e favorire il riutilizzo di quanto messo a disposizione
        dagli altri. Garantisce Interoperabilità.
      </Typography>
    ),
    inverse: false,
    image: `${IMAGES_PATH}/infoblock_03.png`,
    altText: 'Un collage di schermate di Interoperabilità',
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

/** News data */

const newsblock: Array<SingleNewsBlockProps> = [
  {
    title: 'Indicazione sul trattamento di dati personali e-service',
    date: {
      date: '17-11-2025',
    },
    href: {
      label: 'Leggi',
      link: 'adeguamento-trattamento-dati-eservice',
    },
  },
  {
    title: 'Nuove Linee Guida e funzionalità in arrivo',
    date: {
      date: '23-06-2025',
    },
    href: {
      label: 'Leggi',
      link: 'nuove-llgg-agid-pubblicate',
    },
  },
  {
    title: 'Aggiornamenti sui voucher PDND',
    date: {
      date: '16-04-2025',
    },
    href: {
      label: 'Leggi',
      link: 'aggiornamenti-voucher',
    },
  },
  {
    title: 'Obbligo accreditamenti soggetti art. 2.2 del CAD',
    date: {
      date: '07-11-2024',
    },
    href: {
      label: 'Leggi',
      link: 'obbligo-accreditamento',
    },
  },
]

/* ************************************** */
/** MainFaq mocked data */
const mainFaq: MainFaqProps = {
  title: <>Una struttura sicura</>,
  subtitle: (
    <>
      Interoperabilità garantisce la massima sicurezza per quanto riguarda lo scambio di
      informazioni: possono accedervi solo gli aderenti
    </>
  ),
}
/* ************************************** */

/** Showcase mocked data */
const showcase: ShowcaseProps = {
  title: 'Perché usarla',
  items: [
    {
      icon: (
        <img
          height={60}
          width={60}
          src={`${ICONS_PATH}/vantaggi_1_unica.svg`}
          alt="Icona che rappresenta 'unica'"
        />
      ),
      title: 'Unica',
      subtitle: 'Offre un solo catalogo di servizi consultabile da tutti gli aderenti',
    },
    {
      icon: (
        <img
          height={60}
          width={60}
          src={`${ICONS_PATH}/vantaggi_2_sicura.svg`}
          alt="Icona che rappresenta 'sicura'"
        />
      ),
      title: 'Sicura',
      subtitle:
        'Crea un canale sicuro per autenticare e autorizzare erogatori e fruitori dei servizi ad accedere alle informazioni delle quali hanno bisogno',
    },
    {
      icon: (
        <img
          height={60}
          width={60}
          src={`${ICONS_PATH}/vantaggi_3_veloce.svg`}
          alt="Icona che rappresenta 'veloce'"
        />
      ),
      title: 'Veloce',
      subtitle: 'Semplifica l’iter amministrativo e riduce i tempi di accesso alle informazioni',
    },
  ],
}
/* ************************************** */

const title = 'PDND Interoperabilità'

const meta: HeadMetaProps = {
  title: 'PDND Interoperabilità',
  description: 'Abilita lo scambio di informazioni tra enti',
  sitename: 'PDND Interoperabilità',
  url: SITE_URL,
  imgFb: `${SITE_URL}/${IMAGES_PATH}/social_interop_01_1200x630.jpg`,
  imgTw: `${SITE_URL}/${IMAGES_PATH}/social_interop_01_800x418.jpg`,
}

/** Application Data Mock */
export const itHomeData = {
  title,
  meta,
  hero,
  newsblock,
  infoblocks,
  showcase,
  mainFaq,
}
