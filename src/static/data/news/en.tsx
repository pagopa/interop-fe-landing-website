import { HeadMetaProps } from '@/components'
import { IMAGES_PATH, SITE_URL } from '@/configs/constants.config'
import { NewsItem } from '@/pages/news/[id]'

/** Titles mocked data */
const pageTitles = {
  h1: 'News',
  backLink: { label: 'Back to news page', href: '/en/news' },
}
/* ************************************** */

/** Titles mocked data */
const news: Array<NewsItem> = [
  {
    title: 'Messa in esercizio',
    id: 'messa-in-esercizio',
    date: 'blu',
    content: '',
  },
  {
    title: 'Messa in esercizio',
    id: 'messa-in-esercizio',
    date: 'blu',
    content: '',
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
export const enNewsData = {
  title,
  meta,
  pageTitles,
  news,
}
