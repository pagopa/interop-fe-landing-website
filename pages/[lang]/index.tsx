import { GetStaticPaths, GetStaticProps } from 'next'
import React from 'react'
import { LOCALES } from '../../lib/constants'
import { QueryParams } from '../../src/types/global'
import { Infoblock, Showcase } from '@pagopa/mui-italia'
import { Hero } from '../../src/components/Hero'
import { useGetHomeData, useGetCommonData } from '../../api'
import MainFaq from '../../src/components/MainFaq'
import PageBottomCta from '../../src/components/PageBottomCta'

const Home = () => {
  const data = useGetHomeData()
  const commonData = useGetCommonData()

  return (
    <>
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

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: LOCALES.map((lang) => ({ params: { lang } })),
    fallback: false,
  }
}
