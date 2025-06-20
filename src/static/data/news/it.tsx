import { HeadMetaProps } from '@/components'
import { IMAGES_PATH, SITE_URL } from '@/configs/constants.config'
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
    date: '20-06-2025',
    title: 'Pubblicazione nuove Linee Guida AgID',
    subtitle: 'AgID ha pubblicato le nuove Linee Guida per la piattaforma PDND',
    resources: [
      {
        link: 'https://example.com',
        label: 'dsd',
      },
      {
        link: 'https://example.com',
        label: 'dsd',
      },
    ],
    id: 'messa-in-esercizio',
    content:
      'AgID ha pubblicato le nuove linee guida blablablablablablaba blablablablablablaba blablablablablablaba blablablablablablaba blablablablablablaba',
  },
  {
    title: 'Seconda news',
    id: 'seconda-news',
    date: 'rosso',
    content: 's',
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
