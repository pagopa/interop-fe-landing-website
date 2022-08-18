import type { NextPage } from 'next'
import { useContext } from 'react'
import LocaleContext from '../../../src/utils/LocaleContext'
import { getNewsData } from '../../../api'
import { Box, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import Link from 'next/link'

const NewsPostPage: NextPage = () => {
  const router = useRouter()
  const { locale } = useContext(LocaleContext)
  const { news, titles } = getNewsData(locale)
  const { slug } = router.query
  const singleNews = news.find((n) => n.slug === slug)

  if (!singleNews) {
    return null
  }

  return (
    <>
      <Typography>{singleNews.title}</Typography>
      <Box>
        <Link href={titles.backLink.href}>{titles.backLink.label}</Link>
      </Box>
    </>
  )
}

export default NewsPostPage

export function getStaticProps({ params }: { params: { slug: string } }) {
  const { news } = getNewsData('en')
  const post = news.find(({ slug }) => slug === params.slug)
  return { props: { post } }
}

export function getStaticPaths() {
  const { news } = getNewsData('en')
  const paths = news.map(({ slug }) => ({ params: { slug } }))
  return { paths, fallback: false }
}
