import Head from 'next/head'
import React from 'react'
import type { InferGetStaticPropsType } from 'next'
import { getCommonData, getNewsData } from '@/static'
import { useLocaleContext } from '@/contexts'
import { Dtd, SingleNewsBlockProps } from '@/components'
import { Box, Grid, Link, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt'
import { NewsItem } from './[id]'

export async function getStaticProps() {
  const { news } = getNewsData('it')

  return { props: { news } }
}

const NewsPage = ({ news }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { locale } = useLocaleContext()
  const commonData = getCommonData(locale)
  const data = getNewsData(locale)

  return (
    <>
      <Head>
        <title>{data.meta.title}</title>
        <meta key="twitter:card" name="twitter:card" content="summary_large_image" />
        <meta key="twitter:title" name="twitter:title" content={data.meta.title} />
        <meta
          key="twitter:description"
          name="twitter:description"
          content={data.meta.description}
        />
        <meta key="twitter:image" name="twitter:image" content={data.meta.imgTw} />
        <meta key="og:locale" property="og:locale" content="it_IT" />
        <meta key="og:type" property="og:type" content="website" />
        <meta key="og:title" property="og:title" content={data.meta.title} />
        <meta key="og:description" property="og:description" content={data.meta.description} />
        <meta key="og:url" property="og:url" content={data.meta.url} />
        <meta key="og:site_name" property="og:site_name" content={data.meta.sitename} />
        <meta key="og:image" property="og:image" content={data.meta.imgFb} />
      </Head>

      <Box bgcolor="background.default" py={8} px={{ xs: 2, md: 14 }}>
        <Typography variant="h4" component="h3" textAlign="center" pb={4}>
          Aggiornamenti
        </Typography>
        <Grid item md={9}>
          <Grid container spacing={3}>
            {news.map((n, i) => (
              <SingleNewsPreview key={i} {...n} />
            ))}
          </Grid>
        </Grid>
      </Box>

      <Dtd {...commonData.dtd} />
    </>
  )
}

export const SingleNewsPreview = ({ title, date, id }: NewsItem) => {
  return (
    <Grid item md={4} my={2}>
      <Typography color="text.secondary" fontSize={16} fontWeight={400} mb={2}>
        {date}
      </Typography>
      <Typography variant="h6">{title}</Typography>
      <Stack mt={2} direction="row" alignItems="center" color="primary.main">
        <Link
          color="primary.main"
          underline="none"
          textTransform="capitalize"
          href={`news/${id}`}
          title="Leggi la news"
          fontSize={14}
          fontWeight={400}
        >
          Leggi
        </Link>
        <ArrowRightAltIcon sx={{ color: 'inherit', fontSize: 18 }} />
      </Stack>
    </Grid>
  )
}

export default NewsPage
