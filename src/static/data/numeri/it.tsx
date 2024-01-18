import ArticleIcon from '@mui/icons-material/Article'
import ApiIcon from '@mui/icons-material/Api'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber'
import LoginIcon from '@mui/icons-material/Login'
import { IMAGES_PATH, SITE_URL } from '@/configs/constants.config'
import { HeadMetaProps } from '@/components'

const meta: HeadMetaProps = {
  title: 'I numeri della PDND | PDND Interoperabilità',
  description: 'Come sta andando PDND Interoperabilità',
  sitename: 'PDND Interoperabilità',
  url: `${SITE_URL}/numeri`,
  imgFb: `${SITE_URL}/${IMAGES_PATH}/social_interop_01_1200x630.jpg`,
  imgTw: `${SITE_URL}/${IMAGES_PATH}/social_interop_01_800x418.jpg`,
}

export const itNumbers = {
  title: "Un po' di numeri",
  meta,
  tabs: {
    ariaLabel: 'Scegli i dati di quale ambiente visualizzare',
    test: 'Ambiente di collaudo',
    prod: 'Ambiente di esercizio',
  },
  error: {
    title: 'Errore',
    description: "C'è stato un errore nel caricamento dati. Per favore, riprova.",
  },
  descriptors: {
    title: 'Servizi in piattaforma',
    cards: [
      { Icon: ApiIcon, description: 'Versioni di e-service attive' },
      { Icon: AccountBalanceIcon, description: 'Aderenti che erogano e-service' },
    ],
    graphTitle: 'Andamento delle versioni pubblicate',
    graphDescription: 'Il valore rappresenta una cumulata',
  },

  tenants: {
    title: 'Aderenti',
    cards: [
      { Icon: ArticleIcon, description: 'Enti che hanno aderito alla piattaforma' },
      { Icon: LoginIcon, description: 'Enti che hanno effettuato il primo accesso' },
    ],
    graphTitle: 'Andamento dei primi accessi',
    graphDescription: 'Il valore rappresenta una cumulata',
  },

  agreements: {
    title: 'Richieste di fruizione',
    cards: [
      { Icon: ArticleIcon, description: 'Richieste di fruizione attive sulla piattaforma' },
      { Icon: AccountBalanceIcon, description: 'Aderenti che hanno richieste di fruizione attive' },
    ],
    graphTitle: 'Andamento delle richieste di fruizione',
    graphDescription: 'Il valore rappresenta una cumulata',
  },

  purposes: {
    title: 'Finalità',
    cards: [
      { Icon: ArticleIcon, description: 'Finalità pubblicate sulla piattaforma' },
      {
        Icon: AccountBalanceIcon,
        description: 'Aderenti che hanno pubblicato finalità di fruizione',
      },
    ],
    graphTitle: 'Andamento delle finalità pubblicate',
    graphDescription: 'Il valore rappresenta una cumulata',
  },

  tokens: {
    title: 'Voucher',
    cards: [
      {
        Icon: ConfirmationNumberIcon,
        description: 'Voucher staccati da quando la piattaforma è operativa',
      },
      { Icon: ConfirmationNumberIcon, description: 'Voucher staccati negli ultimi 3 giorni' },
    ],
    graphTitle: 'Andamento dei voucher staccati',
    graphDescription: 'Il valore rappresenta una cumulata',
  },
}
