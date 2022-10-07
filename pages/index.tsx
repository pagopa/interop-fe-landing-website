import { GetStaticProps } from 'next'
import React, { useContext } from 'react'
import { QueryParams } from '../src/types/global'
import { Hero, Infoblock, Showcase } from '@pagopa/mui-italia'
import MainFaq from '../src/components/MainFaq'
import PageBottomCta from '../src/components/PageBottomCta'
import LocaleContext from '../src/utils/LocaleContext'
import { getCommonData, getHomeData } from '../api'
import Head from 'next/head'
import { HeadMeta } from '../src/components/HeadMeta'

const Home = () => {
  const { locale } = useContext(LocaleContext)
  const data = getHomeData(locale)
  const commonData = getCommonData(locale)

  return (
    <>
      <Head>
        <title>{data.title}</title>
        <HeadMeta {...data.meta} />
      </Head>
      <Hero {...data.hero} />
      <Infoblock {...data.infoblocks[0]} />
      <Infoblock {...data.infoblocks[1]} />
      <Infoblock {...data.infoblocks[2]} />
      <MainFaq {...data.mainFaq} />
      <Showcase {...data.showcase} />
      <PageBottomCta {...commonData.pageBottomCta} />
    </>
  )
}

export default Home

export const getStaticProps: GetStaticProps<{}, QueryParams> = async () => {
  return { props: {} }
}
