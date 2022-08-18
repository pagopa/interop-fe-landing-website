import type { NextPage } from 'next'
import { useContext } from 'react'
import LocaleContext from '../../src/utils/LocaleContext'
import { getNewsData } from '../../api'
import { Box, Typography } from '@mui/material'
import Link from 'next/link'
import { SINGLE_NEWS_ROUTE } from '../../lib/routes'

const NewsPage: NextPage = () => {
  const { locale } = useContext(LocaleContext)
  const data = getNewsData(locale)

  return (
    <>
      <Typography>{data.titles.h1}</Typography>
      <Box bgcolor="red">
        {data.news.map(({ slug, title }) => {
          return (
            <Box key={slug}>
              <Link href={SINGLE_NEWS_ROUTE[locale].href.replace('[slug]', slug)}>{title}</Link>
            </Box>
          )
        })}
      </Box>
    </>
  )
}

export default NewsPage
