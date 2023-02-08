import type { NextPage } from 'next'
import PageBottomCta from '../../src/components/PageBottomCta'
import React, { useContext } from 'react'
import LocaleContext from '../../src/utils/LocaleContext'
import { getCommonData, getNumbersData } from '../../api'
import Dtd from '../../src/components/Dtd'
import { Typography } from '@mui/material'
import { LineChartSection, LineChartSectionSkeleton } from '../../src/components/LineChartSection'
import Head from 'next/head'

const NumbersPage: NextPage = () => {
  const { locale } = useContext(LocaleContext)
  const data = getNumbersData(locale)
  const commonData = getCommonData(locale)

  const [dynamicData, setDynamicData] = React.useState(false)

  const { descriptors, tenants, agreements, purposes, tokens } = data

  React.useEffect(() => {
    async function fetchDynamicData() {
      await new Promise((resolve) => setTimeout(resolve, 4000))
      setDynamicData(true)
    }

    fetchDynamicData()
  }, [])

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
      <Typography sx={{ textAlign: 'center', pt: 8, pb: 7, mt: 8 }} variant="h1">
        {data.title}
      </Typography>

      {!dynamicData && (
        <>
          <LineChartSectionSkeleton />
          <LineChartSectionSkeleton withBackground />
          <LineChartSectionSkeleton />
          <LineChartSectionSkeleton withBackground />
          <LineChartSectionSkeleton />
        </>
      )}

      {dynamicData && (
        <>
          <LineChartSection
            title={descriptors.title}
            cards={[
              {
                Icon: descriptors.cards[0].Icon,
                amount: 45,
                description: descriptors.cards[0].description,
              },
              {
                Icon: descriptors.cards[1].Icon,
                amount: 20,
                description: descriptors.cards[1].description,
              },
            ]}
            graph={{
              title: descriptors.graphTitle,
              data: [
                { time: new Date(), value: 28 },
                { time: new Date(), value: 55 },
                { time: new Date(), value: 43 },
              ],
            }}
          />

          <LineChartSection
            title={tenants.title}
            cards={[
              {
                Icon: tenants.cards[0].Icon,
                amount: 45,
                description: tenants.cards[0].description,
              },
              {
                Icon: tenants.cards[1].Icon,
                amount: 20,
                description: tenants.cards[1].description,
              },
            ]}
            graph={{
              title: tenants.graphTitle,
              data: [
                { time: new Date(), value: 28 },
                { time: new Date(), value: 55 },
                { time: new Date(), value: 43 },
              ],
            }}
            withBackground
          />

          <LineChartSection
            title={agreements.title}
            cards={[
              {
                Icon: agreements.cards[0].Icon,
                amount: 45,
                description: agreements.cards[0].description,
              },
              {
                Icon: agreements.cards[1].Icon,
                amount: 20,
                description: agreements.cards[1].description,
              },
            ]}
            graph={{
              title: agreements.graphTitle,
              data: [
                { time: new Date(), value: 28 },
                { time: new Date(), value: 55 },
                { time: new Date(), value: 43 },
              ],
            }}
          />

          <LineChartSection
            title={purposes.title}
            cards={[
              {
                Icon: purposes.cards[0].Icon,
                amount: 45,
                description: purposes.cards[0].description,
              },
              {
                Icon: purposes.cards[1].Icon,
                amount: 20,
                description: purposes.cards[1].description,
              },
            ]}
            graph={{
              title: purposes.graphTitle,
              data: [
                { time: new Date(), value: 28 },
                { time: new Date(), value: 55 },
                { time: new Date(), value: 43 },
              ],
            }}
            withBackground
          />

          <LineChartSection
            title={tokens.title}
            cards={[
              {
                Icon: tokens.cards[0].Icon,
                amount: 45,
                description: tokens.cards[0].description,
              },
              {
                Icon: tokens.cards[1].Icon,
                amount: 20,
                description: tokens.cards[1].description,
              },
            ]}
            graph={{
              title: tokens.graphTitle,
              data: [
                { time: new Date(), value: 28 },
                { time: new Date(), value: 55 },
                { time: new Date(), value: 43 },
              ],
            }}
          />
        </>
      )}

      <PageBottomCta {...commonData.pageBottomCta} />
      <Dtd {...commonData.dtd} />
    </>
  )
}

export default NumbersPage
