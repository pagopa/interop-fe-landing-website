import { Button, Stack } from '@mui/material'
import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import Head from 'next/head'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import NextLink from 'next/link'
import { Dtd, PageBottomCta } from '@/components'
import { getCatalogData, getCommonData, getNewsData } from '@/static'
import { useLocaleContext } from '@/contexts'
import { ParsedUrlQuery } from 'querystring'

export async function getStaticPaths() {
  const { news } = getNewsData('it')

  const paths = news.map((singleNews) => ({
    params: singleNews,
  }))

  return { paths, fallback: false }
}

export interface NewsItem {
  id: string
  title: string
  cammello: string
}

interface Props {
  singleNews: NewsItem
}

interface Params extends ParsedUrlQuery, NewsItem {}

export const getStaticProps: GetStaticProps<Props, Params> = ({ params }) => {
  const { news } = getNewsData('it')
  const singleNews = news.find((n) => n.id === params?.id) as NewsItem
  return { props: { singleNews } }
}

const SingleNewsPage = ({ singleNews }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { locale } = useLocaleContext()
  const commonData = getCommonData(locale)
  const data = getCatalogData(locale)

  // const metaDescription = `Dettaglio dell'e-service: ${eservice?.name}`
  const metaDescription = ''

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
        {/* <meta key="og:url" property="og:url" content={`${data.meta.url}/${eserviceId}`} /> */}
        <meta key="og:site_name" property="og:site_name" content={data.meta.sitename} />
        <meta key="og:image" property="og:image" content={data.meta.imgFb} />
      </Head>

      <div>{singleNews.title}</div>

      <Stack alignItems="center" sx={{ pb: 6, bgcolor: '#FAFAFA' }}>
        <Button
          LinkComponent={NextLink}
          href="/news"
          variant="contained"
          startIcon={<ArrowBackIcon />}
        >
          Torna alle news
        </Button>
      </Stack>

      <PageBottomCta {...data.pageBottomCta} direction="horizontal" />
      <Dtd {...commonData.dtd} />
    </>
  )
}

export default SingleNewsPage
