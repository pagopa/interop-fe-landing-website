import { Box, Button, Typography } from '@mui/material'
import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import Head from 'next/head'
import { Dtd } from '@/components'
import { getCommonData, getNewsData } from '@/static'
import { useLocaleContext } from '@/contexts'
import { ParsedUrlQuery } from 'querystring'
import React from 'react'
import { ExternalLink } from '@/components/ExternalLink'
import { Stack } from '@mui/system'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import NextLink from 'next/link'

export async function getStaticPaths() {
  const { news } = getNewsData('it')

  const paths = news.map((singleNews) => ({
    params: singleNews,
  }))

  return { paths, fallback: false }
}

export interface NewsItem {
  title: string
  subtitle?: string
  id: string
  date: string
  content: string
  resources?: Array<{
    link: string
    label: string
  }>
}

interface Props {
  singleNews: NewsItem
}

interface Params extends ParsedUrlQuery {
  id: string
}

export const getStaticProps: GetStaticProps<Props, Params> = ({ params }) => {
  const { news } = getNewsData('it')
  const singleNews = news.find((n) => n.id === params?.id) as NewsItem
  return { props: { singleNews } }
}

const SingleNewsPage = ({ singleNews }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { locale } = useLocaleContext()
  const commonData = getCommonData(locale)
  const data = getNewsData(locale)

  const metaDescription = `News: ${singleNews.title}`

  return (
    <>
      <Head>
        <title>{data.meta.title}</title>
        <meta key="twitter:card" name="twitter:card" content="summary_large_image" />
        <meta key="twitter:title" name="twitter:title" content={data.meta.title} />
        <meta key="twitter:description" name="twitter:description" content={metaDescription} />
        <meta key="twitter:image" name="twitter:image" content={data.meta.imgTw} />
        <meta key="og:locale" property="og:locale" content="it_IT" />
        <meta key="og:type" property="og:type" content="website" />
        <meta key="og:title" property="og:title" content={data.meta.title} />
        <meta key="og:description" property="og:description" content={metaDescription} />
        <meta key="og:url" property="og:url" content={`${data.meta.url}/news/${singleNews.id}`} />
        <meta key="og:site_name" property="og:site_name" content={data.meta.sitename} />
        <meta key="og:image" property="og:image" content={data.meta.imgFb} />
      </Head>

      <Stack alignItems="center" px={{ xs: 3, md: 16 }} py={8} bgcolor="background.default">
        <Box maxWidth={760}>
          <Typography color="text.secondary" fontSize={16} fontWeight={400} mb={2}>
            {singleNews.date}
          </Typography>
          <Typography component="h1" variant="h4" py={1}>
            {singleNews.title}
          </Typography>
          {singleNews.subtitle && (
            <Typography component="h2" variant="h6" color="text.secondary">
              {singleNews.subtitle}
            </Typography>
          )}

          <Typography py={3}>{singleNews.content}</Typography>

          {singleNews.resources && singleNews.resources.length > 0 && (
            <React.Fragment>
              <Typography component="h3" fontWeight="bold">
                Risorse correlate
              </Typography>
              {singleNews.resources.map((r, i) => {
                return (
                  <Box key={i}>
                    <ExternalLink label={r.label} href={r.link} />
                  </Box>
                )
              })}
            </React.Fragment>
          )}

          <Stack alignItems="center" sx={{ pt: 6 }}>
            <Button
              LinkComponent={NextLink}
              href="/news"
              variant="contained"
              startIcon={<ArrowBackIcon />}
            >
              Torna alle news
            </Button>
          </Stack>
        </Box>
      </Stack>

      <Dtd {...commonData.dtd} />
    </>
  )
}

export default SingleNewsPage
