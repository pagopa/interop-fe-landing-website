import { HeadMetaProps } from '@/components'
import { DOCUMENTS_PATH, IMAGES_PATH, SITE_URL } from '@/configs/constants.config'
import { NewsItem } from '@/pages/news/[id]'

/** Titles mocked data */
const pageTitles = {
  h1: 'News',
  backLink: { label: 'Torna alle news', href: '/news' },
}
/* ************************************** */

/** Titles mocked data */
const news: Array<NewsItem> = [
  {
    date: '26-11-2025',
    title: 'Api.gov.it: disponibile il nuovo catalogo PDND',
    subtitle:
      'Online il nuovo catalogo pubblico delle API per promuovere l’interoperabilità nelle PA',
    resources: [
      {
        link: 'https://api.gov.it',
        label: 'api.gov.it',
      },
      {
        link: 'https://innovazione.gov.it/notizie/articoli/api-gov-it-il-catalogo-pdnd-rinnovato-nel-nome-e-nelle-funzionalita/',
        label: 'News del Dipartimento per la trasformazione digitale',
      },
    ],
    id: 'nuovo-catalogo-pdnd',
    content: [
      'È online api.gov.it, il nuovo catalogo pubblico istituzionale della Piattaforma Digitale Nazionale Dati (PDND), rinnovato nella grafica e nelle funzionalità.',
      'Si tratta di un rilascio che ha il duplice obiettivo di rendere più semplice l’esplorazione delle API disponibili in Piattaforma e allo stesso tempo di diffondere la conoscenza dell’interoperabilità come leva strategica della trasformazione digitale del Paese.',
      'Il risultato è un’interfaccia più chiara, navigabile anche da utenti non tecnici, che consente di comprendere più facilmente quali dati sono disponibili sulla PDND, chi li eroga e come possono essere utilizzati per creare valore pubblico.',
    ],
  },
  {
    date: '17-11-2025',
    title: 'Indicazione sul trattamento di dati personali e-service',
    subtitle: "L'erogatore deve dichiarare se il proprio e-service tratta dati personali",
    resources: [
      {
        link: `${SITE_URL}/${DOCUMENTS_PATH}/2025_11_14_Comunicazione_dati_personali.pdf`,
        label: 'Comunicazione inviata agli aderenti',
      },
      {
        link: 'https://developer.pagopa.it/pdnd-interoperabilita/guides/manuale-operativo-pdnd-interoperabilita/v1.0/tutorial/tutorial-per-lerogatore/come-adeguare-la-dichiarazione-sui-dati-personali',
        label: 'Tutorial dichiarazione',
      },
    ],
    id: 'adeguamento-trattamento-dati-eservice',
    content: [
      "A seguito dell'adeguamento alle Linee Guida AgID di maggio 2025, è stato introdotto un nuovo obbligo per gli erogatori: dichiarare esplicitamente se il proprio e-service prevede il trattamento (invio o ricezione) di dati personali.",
      "Questo requisito è fondamentale per semplificare l'analisi del rischio da parte degli aderenti. La dichiarazione dell'erogatore diventa vincolante: l'aderente non potrà, infatti, presentare una finalità la cui analisi del rischio sia in contrasto con quanto dichiarato dall'erogatore.",
      'Tutte le finalità già presentate prima del rilascio della nuova funzionalità (versione 2.8.0 del 18 novembre 2025) rimarranno valide. Non sono previsti oneri o impatti per i fruitori.',
      'Per i nuovi e-service, sarà disponibile un campo dedicato ("Eroga dati personali") da compilare in fase di definizione del servizio.',
      'Per gli e-service esistenti, sarà necessario indicare preliminarmente la natura del trattamento dei dati prima di poter pubblicare una nuova versione. Si prega di consultare il nuovo tutorial dedicato linkato sotto per le istruzioni dettagliate.',
    ],
  },
  {
    date: '08-09-2025',
    title: 'API v. 2, terzo rilascio',
    subtitle: 'Altri 25 endpoint disponibili sulle API di PDND Interoperabilità',
    resources: [
      {
        link: 'https://developer.pagopa.it/pdnd-interoperabilita/api/pdnd-core-v2#/',
        label: 'Interfaccia API aggiornata',
      },
    ],
    id: 'api-v2-terzo-rilascio',
    content: [
      'Il terzo rilascio della v. 2 delle API di PDND Interoperabilità si concentra principalmente sugli endpoint dedicati alla funzionalità dei template e-service. Vengono rilasciati un totale di 25 nuovi endpoint, più ulteriori fix e aggiornamenti.',
    ],
  },
  {
    date: '04-08-2025',
    title: 'API v. 2, secondo rilascio',
    subtitle: '29 nuovi endpoint disponibili sulle API di PDND Interoperabilità',
    resources: [
      {
        link: 'https://developer.pagopa.it/pdnd-interoperabilita/release-note/2025/04-agosto-2025',
        label: 'Release note: cosa è cambiato?',
      },
      {
        link: 'https://developer.pagopa.it/pdnd-interoperabilita/api/pdnd-core-v2#/',
        label: 'Interfaccia API aggiornata',
      },
    ],
    id: 'api-v2-secondo-rilascio',
    content: [
      "Il secondo rilascio della v. 2 delle API di PDND Interoperabilità aggiunge 29 nuovi endpoint tra lettura e scrittura e ne completa altri 3 già rilasciati in precedenza, permettendo di automatizzare le operazioni finora svolte solo attraverso la UI del back office. Seguiranno altri rilasci tra la fine del 2025 e l'inizio del 2026 fino ad esaurimento di tutte le funzionalità.",
    ],
  },
  {
    date: '23-06-2025',
    title: 'Nuove Linee Guida e funzionalità in arrivo',
    subtitle: 'AgID ha pubblicato le nuove Linee Guida per la piattaforma PDND',
    resources: [
      {
        link: `${SITE_URL}/${DOCUMENTS_PATH}/2025_06_24_pagopa_informativa_nuove_llgg.pdf`,
        label: 'Nota informativa',
      },
      {
        link: 'https://trasparenza.agid.gov.it/page/103/details/5374/adozione-delle-linee-guida-sullinfrastruttura-tecnologica-della-piattaforma-digitale-nazionale-dati-per-linteroperabilita-dei-sistemi-informativi-e-delle-basi-di-dati.html',
        label: 'Determina nuove Linee Guida AgID',
      },
      {
        link: 'https://innovazione.gov.it/notizie/articoli/nuove-linee-guida-pdnd-l-interoperabilita-si-arricchisce-di-funzionalita-evolute/',
        label: 'News nuove funzionalità',
      },
    ],
    id: 'nuove-llgg-agid-pubblicate',
    content: [
      "A seguito della pubblicazione delle nuove Linee Guida AgID, PagoPA ha aggiornato l'accordo di adesione alla piattaforma.",
      'Le nuove Linee Guida prevedono diverse nuove funzionalità a vantaggio degli aderenti, tra le quali il sistema di delega, i template e-service e la notifica delle variazioni dei dati. È possibile avere maggiori dettagli dai link in calce.',
    ],

    // "Pubblicate le nuove Linee Guida PDND. L'accordo di adesione è stato aggiornato per recepire le novità, tra cui Sistema di Deleghe, Template e-service e la funzionalità per la notifica delle variazioni dei dati. Una comunicazione via PEC sarà inviata a tutti gli Aderenti.",
  },
  {
    title: 'Aggiornamenti sui voucher PDND',
    id: 'aggiornamenti-voucher',
    date: '16-04-2025',
    content:
      "A partire dal 3 giugno 2025, saranno introdotti nuovi claim nei voucher PDND e controlli più rigorosi per garantire la sicurezza e la conformità delle richieste. Le date di riferimento per l'adeguamento sono il 3 giugno 2025 per Collaudo e Attestazione, e l'1 luglio 2025 per Produzione. Maggiori informazioni nel link di approfondimento.",
    resources: [
      {
        link: 'https://github.com/pagopa/pdnd-interop-frontend/issues/1300',
        label: 'Indicazioni di dettaglio',
      },
    ],
  },
  {
    title: 'Obbligo accreditamenti soggetti art. 2.2 del CAD',
    id: 'obbligo-accreditamento',
    date: '07-11-2024',
    content:
      'L’adesione alla PDND e l’esposizione delle proprie basi dati tramite API è un obbligo per i soggetti di cui all’articolo 2, comma 2, del CAD, ovvero per le pubbliche amministrazioni, i gestori di pubblici servizi, le società a controllo pubblico, secondo le tempistiche indicate nel DECRETO 22 settembre 2022 del Ministro per l’innovazione tecnologica e la transizione digitale “Obblighi e termini di accreditamento alla Piattaforma digitale nazionale dati” e ribadito nella Direttiva concernente “Misure per l’attuazione dell’articolo 50-ter del decreto legislativo 7 marzo 2005, n. 82” del 28 febbraio 2024.',
    resources: [
      {
        link: 'https://www.normattiva.it/atto/caricaDettaglioAtto?atto.dataPubblicazioneGazzetta=2005-05-16&atto.codiceRedazionale=005G0104&atto.articolo.numero=0&atto.articolo.sottoArticolo=1&atto.articolo.sottoArticolo1=10&qId=5614860b-4769-478e-bf22-a8a76a04159a&tabID=0.5538263478162919&title=lbl.dettaglioAtto',
        label: 'C.A.D.',
      },
      {
        link: 'https://developer.pagopa.it/pdnd-interoperabilita/guides/pdnd-manuale-operativo/normativa-e-approfondimenti',
        label: 'Manuale tecnico PDND',
      },
    ],
  },
]
/* ************************************** */

const title = 'News | PDND Interoperabilità'

const meta: HeadMetaProps = {
  title: 'News | PDND Interoperabilità',
  description: 'Abilita lo scambio di informazioni tra enti',
  sitename: 'PDND Interoperabilità',
  url: `${SITE_URL}/news`,
  imgFb: `${SITE_URL}/${IMAGES_PATH}/social_interop_02_1200x630.jpg`,
  imgTw: `${SITE_URL}/${IMAGES_PATH}/social_interop_02_800x418.jpg`,
}

/** Application Data Mock */
export const itNewsData = {
  title,
  meta,
  pageTitles,
  news,
}
