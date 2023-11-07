import type { NextPage } from 'next'
import React from 'react'
import { useLocaleContext } from '@/contexts/locale.context'
import { getCommonData, getNumbersData } from '@/static'
import { PageBottomCta, Dtd } from '@/components'
import Head from 'next/head'
import { getLocalizedValue } from '@/utils/common.utils'
import { Box, Container, Link, Typography } from '@mui/material'
import LaunchIcon from '@mui/icons-material/Launch'
import NumbersPageContent from '@/components/numbers_new/NumbersPageContent'
import { INTEROP_NUMBERS_NEW } from '@/configs/constants.config'

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
        <meta key="og:locale" property="og:locale" content="it_IT" />
        <meta key="og:type" property="og:type" content="website" />
        <meta key="og:title" property="og:title" content={data.meta.title} />
        <meta key="og:description" property="og:description" content={data.meta.description} />
        <meta key="og:url" property="og:url" content={data.meta.url} />
        <meta key="og:site_name" property="og:site_name" content={data.meta.sitename} />
        <meta key="og:image" property="og:image" content={data.meta.imgFb} />
        <link
          rel="preload"
          href={INTEROP_NUMBERS_NEW}
          crossOrigin="anonymous"
          type="application/json"
          as="fetch"
        />
      </Head>
      <Container>
        <Box component="section" sx={{ my: 8 }}>
          <Box sx={{ textAlign: 'center', maxWidth: 612, mx: 'auto' }}>
            <Typography variant="h1">
              {getLocalizedValue({ it: 'I numeri della PDND', en: 'PDND numbers' })}
            </Typography>
            <Typography color="text.secondary">
              Conosci la piattaforma digitale che abilita l’interoperabilità dei dati attraverso i
              numeri del suo utilizzo
            </Typography>
            <Typography sx={{ mt: 3 }} color="text.secondary" variant="body2">
              I dati sono disponibili come .json su{' '}
              <Link href="https://dati.gov.it" target="_blank">
                Dati.gov.it <LaunchIcon fontSize="small" sx={{ position: 'relative', top: 6 }} />
              </Link>
            </Typography>
            <Typography
              sx={{ mt: 1 }}
              component="p"
              color="text.secondary"
              variant="caption-semibold"
            >
              ultimo aggiornamento 25/07/2023
            </Typography>
          </Box>
          <Box sx={{ mt: 6, maxWidth: 480 }}>
            <Typography component="p" variant="caption-semibold">
              Nota bene
            </Typography>
            <Typography variant="body2">
              I dati esposti riguardano il solo ambiente di esercizio, non sono mostrati quelli
              dell’ambiente di collaudo.
            </Typography>
          </Box>
        </Box>
      </Container>

      <NumbersPageContent />

      <PageBottomCta {...commonData.pageBottomCta} />
      <Dtd {...commonData.dtd} />
    </>
  )
}

export default NumbersPage
