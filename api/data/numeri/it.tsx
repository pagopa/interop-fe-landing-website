import ArticleIcon from '@mui/icons-material/Article'
import ApiIcon from '@mui/icons-material/Api'
import TimerIcon from '@mui/icons-material/TimerOutlined'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber'
import { IMAGES_PATH, SITE_URL } from '../../../src/utils/constants'

const meta = {
  title: 'Interoperabilità in numeri | PDND Interoperabilità',
  description: 'Come sta andando PDND Interoperabilità',
  sitename: 'PDND Interoperabilità',
  url: `${SITE_URL}/numeri`,
  imgFb: `${SITE_URL}/${IMAGES_PATH}/social_interop_01_1200x630.jpg`,
  imgTw: `${SITE_URL}/${IMAGES_PATH}/social_interop_01_800x418.jpg`,
}

export const itNumbers = {
  title: 'Interoperabilità in numeri',
  meta,
  error: {
    title: 'Errore',
    desription: "C'è stato un errore nel caricamento dati. Per favore, riprova.",
  },
  descriptors: {
    title: 'Servizi in piattaforma',
    cards: [
      { Icon: ApiIcon, description: 'Versioni di e-service attive' },
      { Icon: AccountBalanceIcon, description: 'Erogatori diversi' },
    ],
    graphTitle: 'Andamento delle versioni pubblicate (cumulata)',
  },

  tenants: {
    title: 'Aderenti',
    cards: [
      { Icon: ArticleIcon, description: 'Enti che hanno aderito alla piattaforma' },
      { Icon: TimerIcon, description: 'Adesioni negli ultimi 15 giorni' },
    ],
    graphTitle: 'Andamento delle adesioni (cumulata)',
  },

  agreements: {
    title: 'Richieste di fruizione',
    cards: [
      { Icon: ArticleIcon, description: 'Richieste di fruizione attive sulla piattaforma' },
      { Icon: AccountBalanceIcon, description: 'Fruitori diversi' },
    ],
    graphTitle: 'Andamento delle richieste di fruizione (cumulata)',
  },

  purposes: {
    title: 'Finalità',
    cards: [
      { Icon: ArticleIcon, description: 'Finalità pubblicate sulla piattaforma' },
      { Icon: AccountBalanceIcon, description: 'Fruitori che hanno creato finalità' },
    ],
    graphTitle: 'Andamento delle finalità pubblicate (cumulata)',
  },

  tokens: {
    title: 'Voucher',
    cards: [
      { Icon: ConfirmationNumberIcon, description: 'Voucher staccati dalla piattaforma' },
      { Icon: ConfirmationNumberIcon, description: 'Voucher staccati negli ultimi 3 giorni' },
    ],
    graphTitle: 'Andamento dei voucher staccati (cumulata)',
  },
}
