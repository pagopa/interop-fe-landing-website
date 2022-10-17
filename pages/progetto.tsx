import type { NextPage } from 'next'
import NumberedInfoblocks from '../src/components/NumberedInfoblocks'
import Goals from '../src/components/Goals'
import LawSnippets from '../src/components/LawSnippets'
import PageBottomCta from '../src/components/PageBottomCta'
import { useContext } from 'react'
import LocaleContext from '../src/utils/LocaleContext'
import { getCommonData, getProjectData } from '../api'
import { Hero } from '@pagopa/mui-italia'
import Head from 'next/head'
import Dtd from '../src/components/Dtd'

const ProjectPage: NextPage = () => {
  const { locale } = useContext(LocaleContext)
  const data = getProjectData(locale)
  const commonData = getCommonData(locale)

  return (
    <>
      <Head>
        <title>{data.title}</title>
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
      <NumberedInfoblocks {...data.numberedInfoblocks} />
      <Goals {...data.goals} />
      <LawSnippets {...data.lawSnippets} />
      <PageBottomCta {...commonData.pageBottomCta} />
      <Dtd {...commonData.dtd} />
    </>
  )
}

export default ProjectPage
