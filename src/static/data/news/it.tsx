import { NewsItem } from '@/pages/news/[id]'

/** Titles mocked data */
const titles = {
  h1: 'News',
  backLink: { label: 'Torna alle news', href: '/news' },
}
/* ************************************** */

/** Titles mocked data */
const news: Array<NewsItem> = [
  {
    id: 'messa-in-esercizio',
    title: 'Messa in esercizio',
    cammello: 'blu',
  },
  {
    id: 'seconda-news',
    title: 'Seconda news',
    cammello: 'rosso',
  },
]
/* ************************************** */

/** Application Data Mock */
export const itNewsData = {
  titles,
  news,
}
