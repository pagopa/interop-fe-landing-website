import { ExampleIcon } from '../icons'
import { Link } from '@mui/material'
import { IMAGES_PATH, INTEROP_INTRO_GUIDE_URL } from '../../../src/utils/constants'
import { GoalsProps, LawSnippetsProps, NumberedInfoblocksProps, ProjectProps } from '../../model'
import { HeroProps } from '@pagopa/mui-italia'

/** Hero mocked data */
const hero: HeroProps = {
  type: 'text',
  title: "Un'opportunità per le PA",
  subtitle:
    'Interoperabilità è un’opportunità per il tuo ente. I tuoi amministrativi e tecnici troveranno documentazione standard che li agevolerà in tutte le fasi del processo. E accedi subito alle informazioni di cui hai bisogno.',
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
      title: 'Un aderente si iscrive a un servizio del catalogo',
      subtitle:
        'L’aderente cerca il servizio di cui ha bisogno sul catalogo, verifica di avere i requisiti minimi di accesso richiesti e inoltra una richiesta di fruizione.',
    },
    {
      title: 'L’erogatore approva la richiesta di fruizione',
      subtitle:
        'L’erogatore trova la richiesta di fruizione del fruitore, e dove necessario verifica i requisiti di accesso. Infine, la attiva.',
    },
    {
      title: 'Il fruitore dichiara perché accede al dato',
      subtitle:
        'Per ogni finalità, il fruitore dichiara perché ha diritto ad accedere al dato, e le misure prese a protezione dei dati personali. Infine, indica il carico che intende porre sull’infrastruttura dell’erogatore con le proprie richieste.',
    },
    {
      title: 'Il fruitore accede alle informazioni',
      subtitle:
        'Il fruitore implementa il meccanismo di accesso sicuro attraverso i voucher emessi da Interoperabilità, e accede al servizio dell’erogatore, ottenendo le informazioni di cui ha bisogno.',
    },
  ],
}
/* ************************************** */

/** Goals mocked data */
const goals: GoalsProps = {
  title: 'Quali sono gli obiettivi?',
  blocks: [
    {
      icon: <ExampleIcon />,
      title: 'Attuare il “once only”',
      subtitle:
        'Le PA non dovranno più chiedere ai cittadini dei dati che altri enti conoscono già: con l’utilizzo della piattaforma per l’Interoperabilità potranno, con l’autorizzazione della persona interessata, condividerli tra loro in modo agevole',
    },
    {
      icon: <ExampleIcon />,
      title: 'Garantire la sicurezza del dato',
      subtitle:
        'Interoperabilità garantisce l’autenticazione di entrambe le parti in causa: Erogatore e Fruitore, stabilendo tra i due un canale sicuro per la trasmissione dei dati',
    },
    {
      icon: <ExampleIcon />,
      title: 'Fornire un catalogo unico',
      subtitle:
        'Interoperabilità presenta un catalogo unico per tutta la PA, nel quale gli Erogatori pubblicano i loro E-Service e i Fruitori si iscrivono per utilizzarli',
    },
    {
      icon: <ExampleIcon />,
      title: 'Facilitare il riutilizzo delle istruttorie',
      subtitle:
        "È un meccanismo per il quale un ente può sfruttare l’istruttoria e le verifiche effettuate da un altro ente. Permette di ridurre l'onere amministrativo a carico degli aderenti, snellisce le procedure amministrative e riduce i tempi di accesso al dato",
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
          finalizzata alla{' '}
          <em>
            “condivisione dei dati tra i soggetti che hanno diritto ad accedervi [...] e la
            semplificazione degli adempimenti amministrativi dei cittadini e delle imprese”
          </em>
          .
        </>
      ),
    },
    {
      title: 'Un canale sicuro',
      content: (
        <>
          Interoperabilità crea un canale sicuro tra Erogatori e Fruitori dei servizi{' '}
          <em>
            ”mediante l`accreditamento, l`identificazione e la gestione dei livelli di
            autorizzazione dei soggetti abilitati ad operare sulla stessa, nonché la raccolta e
            conservazione delle informazioni relative agli accessi e alle transazioni effettuate suo
            tramite”
          </em>
          .
        </>
      ),
    },
    {
      title: 'Una sola piattaforma',
      content: (
        <>
          La norma indica Interoperabilità come unica piattaforma per la condivisione delle
          informazioni tra enti della PA quando si definisce che tutti coloro che possiedono dati
          critici su cittadini ed altre PA{' '}
          <em>
            “sono tenuti ad accreditarsi alla piattaforma, a sviluppare le interfacce e a rendere
            disponibili le proprie basi dati senza nuovi o maggiori oneri per la finanza pubblica”
          </em>
          .
        </>
      ),
    },
    {
      title: 'PagoPA e AgID',
      content: (
        <>
          PagoPA è individuata dalla Presidenza del Consiglio dei Ministri per la progettazione, lo
          sviluppo, la gestione e l`implementazione di Interoperabilità. Le{' '}
          <Link
            href="https://www.agid.gov.it/index.php/it/agenzia/stampa-e-comunicazione/notizie/2021/12/15/infrastruttura-interoperabilita-pdnd-agid-adotta-linee-guida"
            title="linee guida di Interoperabilità"
            target="_blank"
          >
            linee guida di Interoperabilità
          </Link>{' '}
          sono redatte da AgID, con parere positivo del Garante, pubblicate nel dicembre 2021.
        </>
      ),
    },
  ],
}
/* ************************************** */

const title = 'About | Interoperability'

/** Application Data Mock */
export const enProjectData: ProjectProps = {
  title,
  hero,
  numberedInfoblocks,
  goals,
  lawSnippets,
}
