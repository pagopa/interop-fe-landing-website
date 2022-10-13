import { ExampleIcon } from '../icons'
import { Link } from '@mui/material'
import {
  ICONS_PATH,
  IMAGES_PATH,
  INTEROP_INTRO_GUIDE_URL,
  SITE_URL,
} from '../../../src/utils/constants'
import { GoalsProps, LawSnippetsProps, NumberedInfoblocksProps, ProjectProps } from '../../model'
import { HeroProps } from '@pagopa/mui-italia'

/** Hero mocked data */
const hero: HeroProps = {
  type: 'text',
  title: "Un'opportunità per gli enti",
  subtitle:
    'Interoperabilità permette al personale amministrativo e tecnico degli enti di trovare la documentazione standard che li agevolerà in tutte le fasi del processo di integrazione con i servizi di altri aderenti. Dando la possibilità all’ente di accedere subito alle informazioni di cui ha bisogno.',
  inverse: false,
  background: `../${IMAGES_PATH}/hero-background.png`,
  ctaSecondary: {
    label: 'Vai alla documentazione',
    title: 'Vai alla documentazione',
    onClick: () => {
      window.open(INTEROP_INTRO_GUIDE_URL as string, '_blank')
    },
  },
}
/* ************************************** */

/** Goals mocked data */
const goals: GoalsProps = {
  title: 'Gli obiettivi del progetto',
  blocks: [
    {
      icon: (
        <img src={`/${ICONS_PATH}/goals_1_once_only.svg`} alt="Icona che rappresenta 'once only" />
      ),
      title: 'Attuare il principio del “once only”',
      subtitle:
        'Le PA non dovranno più chiedere ai cittadini le informazioni che altri enti conoscono già: con l’utilizzo di Interoperabilità potranno, con l’autorizzazione della persona interessata, condividerle tra loro in modo agevole',
    },
    {
      icon: (
        <img src={`/${ICONS_PATH}/goals_2_safety.svg`} alt="Icona che rappresenta 'sicurezza" />
      ),
      title: 'Garantire la sicurezza delle informazioni',
      subtitle:
        'Interoperabilità garantisce l’autenticazione di entrambe le parti in causa: erogatore e fruitore, stabilendo tra i due un canale sicuro per la trasmissione delle informazioni',
    },
    {
      icon: <img src={`/${ICONS_PATH}/goals_3_unique.svg`} alt="Icona che rappresenta 'unica" />,
      title: 'Fornire un catalogo unico di servizi',
      subtitle:
        'Interoperabilità presenta un catalogo unico, nel quale gli Erogatori (es. PA) pubblicano i loro E-Service e i fruitori si iscrivono per utilizzarli',
    },
    {
      icon: (
        <img src={`/${ICONS_PATH}/goals_4_history.svg`} alt="Icona che rappresenta 'riutilizzo" />
      ),
      title: 'Facilitare il riutilizzo delle istruttorie',
      subtitle:
        'Interoperabilità semplifica i processi di istruttoria e verifica per l’accesso alle informazioni, riducendo oneri e procedure amministrative',
    },
  ],
}
/* ************************************** */

/** Infoblocks mocked data */
const numberedInfoblocks: NumberedInfoblocksProps = {
  title: 'Come funziona?',
  blocks: [
    {
      title: 'L’aderente richiede l’accesso a un servizio del catalogo',
      subtitle:
        'L’aderente cerca il servizio di cui ha bisogno sul catalogo. Poi, verifica di avere i requisiti minimi di accesso necessari e invia una richiesta di fruizione.',
    },
    {
      title: 'L’erogatore approva la richiesta di fruizione',
      subtitle:
        'L’erogatore riceve la richiesta del fruitore e verifica i requisiti di accesso. Infine, abilita l’ente alla fruizione.',
    },
    {
      title: 'Il fruitore indica perché accede alle informazioni',
      subtitle:
        'Il fruitore dichiara per quale motivo intende accedere alle informazioni e la ragione per cui ne ha diritto.',
    },
    {
      title: 'Il fruitore accede alle informazioni',
      subtitle:
        'Il fruitore implementa un meccanismo di accesso sicuro. Poi, accede al servizio dell’erogatore e ottiene le informazioni di cui ha bisogno.',
    },
  ],
}
/* ************************************** */

/** LawSnippets mocked data */
const lawSnippets: LawSnippetsProps = {
  title: 'Cosa dice la legge?',
  subtitle: 'Le indicazioni del Codice dell’Amministrazione Digitale e del DL. n. 135/2018',
  snippets: [
    {
      title: 'La realizzazione',
      content: (
        <>
          L’articolo 50-ter del CAD disciplina lo sviluppo e la realizzazione di Interoperabilità,
          finalizzata alla “condivisione dei dati tra i soggetti che hanno diritto ad accedervi
          [...] e la semplificazione degli adempimenti amministrativi dei cittadini e delle
          imprese”.
        </>
      ),
    },
    {
      title: 'Un canale sicuro',
      content: (
        <>
          Interoperabilità crea un canale sicuro tra erogatori e fruitori dei servizi “mediante
          l’accreditamento, l’identificazione e la gestione dei livelli di autorizzazione dei
          soggetti abilitati ad operare sulla stessa, nonché la raccolta e conservazione delle
          informazioni relative agli accessi e alle transazioni effettuate suo tramite” (art.
          50-ter, comma 2, CAD).
        </>
      ),
    },
    {
      title: 'Una sola piattaforma',
      content: (
        <>
          La norma prevede che gli erogatori “sono tenuti ad accreditarsi alla piattaforma, a
          sviluppare le interfacce e rendere disponibili le proprie basi dati senza nuovi o maggiori
          onere per la finanza pubblica”. Interoperabilità rappresenta la principale piattaforma per
          la condivisione di informazioni da parte degli erogatori (es. PA).
        </>
      ),
    },
    {
      title: 'PagoPA e AgID',
      content: (
        <>
          La Presidenza del Consiglio si avvale di PagoPA per la progettazione, lo sviluppo, la
          gestione e l’implementazione di Interoperabilità (art. 8, comma 3, del D.L. n. 135/2018).
          Le linee guida di Interoperabilità sono redatte da AgID, con parere positivo del Garante,
          e{' '}
          <Link
            href="https://www.agid.gov.it/index.php/it/agenzia/stampa-e-comunicazione/notizie/2021/12/15/infrastruttura-interoperabilita-pdnd-agid-adotta-linee-guida"
            title="linee guida di Interoperabilità"
            target="_blank"
          >
            pubblicate nel dicembre 2021.
          </Link>
        </>
      ),
    },
  ],
}
/* ************************************** */

const title = 'Progetto | PDND Interoperabilità'

const meta = {
  title: 'Progetto | PDND Interoperabilità',
  description: 'Abilita lo scambio di informazioni tra enti',
  sitename: 'PDND Interoperabilità',
  url: `${SITE_URL}/progetto`,
  imgFb: `${SITE_URL}/${IMAGES_PATH}/social_interop_02_1200x630.jpg`,
  imgTw: `${SITE_URL}/${IMAGES_PATH}/social_interop_02_800x418.jpg`,
}

/** Application Data Mock */
export const itProjectData: ProjectProps = {
  title,
  meta,
  hero,
  numberedInfoblocks,
  goals,
  lawSnippets,
}
