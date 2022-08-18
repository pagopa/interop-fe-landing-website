import { NewsProps } from '../../model'

/** Titles mocked data */
const titles = {
  h1: 'News',
  backLink: { label: 'Back to news page', href: '/en/news' },
}
/* ************************************** */

/** Titles mocked data */
const news = [
  {
    id: 1,
    slug: 'gone-to-production',
    title: 'Gone to production',
  },
  {
    id: 2,
    slug: 'second-news',
    title: 'Second news',
  },
]
/* ************************************** */

/** Application Data Mock */
export const enNewsData: NewsProps = {
  titles,
  news,
}
