import { GetStaticProps } from 'next'
import React, { useContext } from 'react'
import { QueryParams } from '../src/types/global'
import { Hero, Infoblock, Showcase } from '@pagopa/mui-italia'
import MainFaq from '../src/components/MainFaq'
import PageBottomCta from '../src/components/PageBottomCta'
import LocaleContext from '../src/utils/LocaleContext'
import { getCommonData, getHomeData } from '../api'
import Head from 'next/head'
import Dtd from '../src/components/Dtd'

const Home = () => {
  const { locale } = useContext(LocaleContext)
  const data = getHomeData(locale)
  const commonData = getCommonData(locale)

  return (
    <>
      <Head>
        <title>{data.title}</title>
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
        {/* <HeadMeta {...data.meta} /> */}
      </Head>
      <Hero {...data.hero} />
      <Infoblock {...data.infoblocks[0]} />
      <Infoblock {...data.infoblocks[1]} />
      <Infoblock {...data.infoblocks[2]} />
      <MainFaq {...data.mainFaq} />
      <Showcase {...data.showcase} />
      <PageBottomCta {...commonData.pageBottomCta} />
      <Dtd {...commonData.dtd} />
    </>
  )
}

export default Home

export const getStaticProps: GetStaticProps<{}, QueryParams> = async () => {
  return { props: {} }
}
