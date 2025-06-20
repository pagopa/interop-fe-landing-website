import Head from 'next/head'
import React from 'react'
import type { InferGetStaticPropsType } from 'next'
import { getCatalogData, getCommonData, getNewsData } from '@/static'
import { useLocaleContext } from '@/contexts'
import { Dtd, PageBottomCta } from '@/components'
import { Link } from '@mui/material'
import { getLocalizedValue } from '@/utils/common.utils'

export async function getStaticProps() {
  const news = getNewsData('it')

  return { props: { news } }
}

const NewsPage = ({ news }: InferGetStaticPropsType<typeof getStaticProps>) => {
  console.log({ news })
  const { locale } = useLocaleContext()
  const commonData = getCommonData(locale)
  const data = getCatalogData(locale)

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

      <div>
        {news.news.map((n, i) => {
          return (
            <div key={i}>
              {n.id} - {n.title}
              <Link href={`/news/${n.id}`} underline="always" variant="body2">
                {getLocalizedValue({
                  it: 'Leggi di più',
                  en: 'Read more',
                })}
              </Link>
            </div>
          )
        })}
      </div>

      <PageBottomCta {...data.pageBottomCta} direction="horizontal" />
      <Dtd {...commonData.dtd} />
    </>
  )
}

export default NewsPage
