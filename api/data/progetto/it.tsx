import { ExampleIcon } from '../icons'
import { Link } from '@mui/material'
import { ICONS_PATH, IMAGES_PATH, INTEROP_INTRO_GUIDE_URL } from '../../../src/utils/constants'
import { GoalsProps, LawSnippetsProps, NumberedInfoblocksProps, ProjectProps } from '../../model'
import { HeroProps } from '@pagopa/mui-italia'

/** Hero mocked data */
const hero: HeroProps = {
  type: 'text',
  title: "Un'opportunità per le PA",
  subtitle:
    'Interoperabilità permette al personale amministrativo e tecnico degli enti di trovare la documentazione standard che li agevolerà in tutte le fasi del processo di integrazione con i servizi delle altre PA. Dando la possibilità all’ente di accedere subito alle informazioni di cui ha bisogno.',
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

/** Infoblocks mocked data */
const numberedInfoblocks: NumberedInfoblocksProps = {
  title: 'Come funziona?',
  blocks: [
    {
      title: 'L’aderente richiede l’accesso a un servizio del catalogo',
      subtitle:
        'L’aderente cerca il servizio di cui ha bisogno sul catalogo. Poi, verifica di avere i requisiti minimi di accesso richiesti e invia una richiesta di fruizione.',
    },
    {
      title: 'L’erogatore approva la richiesta di fruizione',
      subtitle:
        'L’erogatore riceve la richiesta del fruitore e verifica i requisiti di accesso. Infine, abilita l’ente alla fruizione.',
    },
    {
      title: 'Il fruitore indica perché accede alle informazioni',
      subtitle:
        'Il fruitore presenta la base giuridica per la quale intende accedere alle informazioni detenute dell’erogatore.',
    },
    {
      title: 'Il fruitore accede alle informazioni',
      subtitle:
        'Il fruitore implementa il meccanismo di accesso sicuro. Poi, accede al servizio dell’erogatore e ottiene le informazioni di cui ha bisogno.',
    },
  ],
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
      title: 'Attuare il “once only”',
      subtitle:
        'Le PA non dovranno più chiedere ai cittadini dei dati che altri enti conoscono già: con l’utilizzo della piattaforma per l’Interoperabilità potranno, con l’autorizzazione della persona interessata, condividerli tra loro in modo agevole',
    },
    {
      icon: (
        <img src={`/${ICONS_PATH}/goals_2_safety.svg`} alt="Icona che rappresenta 'sicurezza" />
      ),
      title: 'Garantire la sicurezza del dato',
      subtitle:
        'Interoperabilità garantisce l’autenticazione di entrambe le parti in causa: Erogatore e Fruitore, stabilendo tra i due un canale sicuro per la trasmissione dei dati',
    },
    {
      icon: <img src={`/${ICONS_PATH}/goals_3_unique.svg`} alt="Icona che rappresenta 'unica" />,
      title: 'Fornire un catalogo unico di servizi',
      subtitle:
        'Interoperabilità presenta un catalogo unico per tutta la PA, nel quale gli Erogatori pubblicano i loro E-Service e i Fruitori si iscrivono per utilizzarli',
    },
    {
      icon: (
        <img src={`/${ICONS_PATH}/goals_4_history.svg`} alt="Icona che rappresenta 'riutilizzo" />
      ),
      title: 'Facilitare il riutilizzo delle istruttorie',
      subtitle:
        'Interoperabilità prevede un meccanismo per il quale un ente può sfruttare l’istruttoria e le verifiche effettuate da un altro ente, riducendo oneri e procedure amministrativi con tempi di accesso alle informazioni più rapidi',
    },
  ],
}
/* ************************************** */

/** LawSnippets mocked data */
const lawSnippets: LawSnippetsProps = {
  title: 'Cosa dice la legge?',
  subtitle: "Le indicazioni del Codice dell'Amministrazione Digitale",
  snippets: [
    {
      title: 'La realizzazione',
      content: (
        <>
          L’articolo 50-ter del CAD disciplina lo sviluppo e la realizzazione di Interoperabilità. È
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
          l`accreditamento, l`identificazione e la gestione dei livelli di autorizzazione dei
          soggetti abilitati ad operare sulla stessa, nonché la raccolta e conservazione delle
          informazioni relative agli accessi e alle transazioni effettuate suo tramite” (art.
          50-ter, comma 1, CAD).
        </>
      ),
    },
    {
      title: 'Una sola piattaforma',
      content: (
        <>
          La norma indica Interoperabilità come unica piattaforma per la condivisione delle
          informazioni tra enti della PA quando si definisce che tutti coloro che possiedono dati
          critici su cittadini e altre PA “sono tenuti ad accreditarsi alla piattaforma, a
          sviluppare le interfacce e a rendere disponibili le proprie basi dati senza nuovi o
          maggiori oneri per la finanza pubblica”.
        </>
      ),
    },
    {
      title: 'PagoPA e AgID',
      content: (
        <>
          PagoPA è incaricata dalla Presidenza del Consiglio dei Ministri per la progettazione, lo
          sviluppo, la gestione e l`implementazione di Interoperabilità. Le linee guida di
          Interoperabilità sono redatte da AgID, con parere positivo del Garante, e{' '}
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

const title = 'Progetto | Interoperabilità'

/** Application Data Mock */
export const itProjectData: ProjectProps = {
  title,
  hero,
  numberedInfoblocks,
  goals,
  lawSnippets,
}
