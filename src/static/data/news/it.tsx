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
      "Il secondo rilascio della v. 2 delle API di PDND Interoperabilità aggiunge 29 nuovi endpoint tra lettura e scrittura e ne completa altri 3 già rilasciati in precedenza, permettendo di automatizzare le operazioni finora svolte solo attraverso la UI del back office. Seguiranno altri rilasci tra la fine del 2024 e l'inizio del 2025 fino ad esaurimento di tutte le funzionalità.",
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
