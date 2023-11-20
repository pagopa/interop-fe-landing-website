import type { NextPage } from 'next'
import React from 'react'
import { useLocaleContext } from '@/contexts/locale.context'
import { getCommonData, getNumbersData } from '@/static'
import { PageBottomCta, Dtd } from '@/components'
import Head from 'next/head'
import { INTEROP_NUMBERS_URL_PROD, INTEROP_NUMBERS_URL_TEST } from '@/configs/constants.config'
import { PageTitle } from '@/components/PageTitle'

const NumbersPage: NextPage = () => {
  const { locale } = useLocaleContext()
  const data = getNumbersData(locale)
  const commonData = getCommonData(locale)

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
        <meta key="og:locale" property="og:locale" content="en_EN" />
        <meta key="og:type" property="og:type" content="website" />
        <meta key="og:title" property="og:title" content={data.meta.title} />
        <meta key="og:description" property="og:description" content={data.meta.description} />
        <meta key="og:url" property="og:url" content={data.meta.url} />
        <meta key="og:site_name" property="og:site_name" content={data.meta.sitename} />
        <meta key="og:image" property="og:image" content={data.meta.imgFb} />
        <link
          rel="preload"
          href={INTEROP_NUMBERS_URL_TEST}
          crossOrigin="anonymous"
          type="application/json"
          as="fetch"
        />
        <link
          rel="preload"
          href={INTEROP_NUMBERS_URL_PROD}
          crossOrigin="anonymous"
          type="application/json"
          as="fetch"
        />
      </Head>

      <PageTitle>{data.title}</PageTitle>
      <NumbersPageContent />

      <PageBottomCta {...commonData.pageBottomCta} />
      <Dtd {...commonData.dtd} />
    </>
  )
}

const NumbersPageContent: React.FC = () => {
  // const { locale } = useLocaleContext()
  // const data = getNumbersData(locale)

  return <></>
}

// const NumbersPageContentSkeleton: React.FC = () => {
//   return <></>
// }

export default NumbersPage
