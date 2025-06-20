import { NewsItem } from '@/pages/news/[id]'

/** Titles mocked data */
const titles = {
  h1: 'News',
  backLink: { label: 'Back to news page', href: '/en/news' },
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
    id: 'messa-in-esercizio',
    title: 'Messa in esercizio',
    cammello: 'blu',
  },
]
/* ************************************** */

/** Application Data Mock */
export const enNewsData = {
  titles,
  news,
}
