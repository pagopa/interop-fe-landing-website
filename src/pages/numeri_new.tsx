import type { NextPage } from 'next'
import React from 'react'
import { useLocaleContext } from '@/contexts/locale.context'
import { getCommonData, getNumbersData } from '@/static'
import { PageBottomCta, Dtd } from '@/components'
import Head from 'next/head'
import { getLocalizedValue } from '@/utils/common.utils'
import { Box, Container, Link, Paper, Stack, Typography } from '@mui/material'
import LaunchIcon from '@mui/icons-material/Launch'
import NumbersPageContent from '@/components/numbers_new/NumbersPageContent'
import { INTEROP_NUMBERS_NEW } from '@/configs/constants.config'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

const NumbersPage: NextPage = () => {
  const { locale } = useLocaleContext()
  const data = getNumbersData(locale)
  const commonData = getCommonData(locale)

  return (
    <>
      <Head>
        <title>{data.meta.title}</title>
        <meta name="robots" content="noindex,nofollow" />
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
        <PageTitles />
      </Container>

      <PageAnchors />

      <NumbersPageContent />

      <PageBottomCta {...commonData.pageBottomCta} />
      <Dtd {...commonData.dtd} />
    </>
  )
}

const PageTitles = () => {
  return (
    <Stack
      direction={{ xs: 'column', md: 'row' }}
      alignItems={{ xs: 'flex-start', md: 'flex-end' }}
      spacing={{ xs: 3, md: 0 }}
      justifyContent="space-between"
      sx={{ my: 8 }}
    >
      <Box>
        <Box sx={{ maxWidth: 612 }}>
          <Typography variant="h2" component="h1">
            {getLocalizedValue({ it: 'I numeri della PDND', en: 'PDND numbers' })}
          </Typography>
          <Typography color="text.primary" sx={{ mt: 1 }}>
            Conosci la piattaforma digitale che abilita l’interoperabilità dei dati attraverso i
            numeri del suo utilizzo
          </Typography>
        </Box>
        <Box sx={{ mt: 3, maxWidth: 340 }}>
          <Typography
            component="p"
            variant="caption"
            color="text.secondary"
            sx={{ fontWeight: 600 }}
          >
            Nota bene
          </Typography>
          <Typography variant="caption" color="text.secondary">
            I dati esposti riguardano il solo ambiente di esercizio, non sono mostrati quelli
            dell’ambiente di collaudo.
          </Typography>
        </Box>
      </Box>

      <Paper
        elevation={10}
        sx={{
          border: 1,
          borderColor: 'primary.main',
          borderRadius: 4,
          px: 3,
          py: 1.5,
          maxWidth: 300,
        }}
      >
        <Typography color="text.secondary" variant="body2" sx={{ lineHeight: 1 }}>
          I dati sono disponibili come .json su{' '}
          <Link href="https://dati.gov.it" target="_blank">
            Dati.gov.it <LaunchIcon fontSize="small" sx={{ position: 'relative', top: 6 }} />
          </Link>
        </Typography>
        <Typography sx={{ mt: 1 }} component="p" color="text.secondary" variant="caption-semibold">
          ultimo aggiornamento 25/07/2023
        </Typography>
      </Paper>
    </Stack>
  )
}

const PageAnchors = () => {
  const anchors = [
    { ref: 'adesione', label: 'Adesione', descr: 'Iscrizione degli enti alla piattaforma' },
    { ref: 'pubblicazione', label: 'Pubblicazione', descr: 'Offerta di e-service a catalogo' },
    { ref: 'abilitazione', label: 'Abilitazione', descr: 'Autorizzazione all’uso degli e-service' },
    { ref: 'utilizzo', label: 'Utilizzo', descr: 'Uso degli e-service per accedere ai dati' },
  ]

  return (
    <Box
      sx={{
        backgroundColor: 'primary.dark',
        py: 4,
        position: { xs: 'static', md: 'sticky' },
        top: 0,
        zIndex: 1,
      }}
    >
      <Container>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={{ xs: 4, md: 0 }}>
          {anchors.map(({ label, ref, descr }, i) => {
            return (
              <Link href={`#${ref}`} key={i} sx={{ flexGrow: 1 }}>
                <Stack direction="column" spacing={1}>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Typography
                      component="span"
                      variant="body2"
                      sx={{ color: 'white', fontWeight: 600 }}
                    >
                      {label}
                    </Typography>
                    <ArrowForwardIcon fontSize="small" sx={{ color: 'white' }} />
                  </Stack>
                  <Typography component="span" variant="body2" sx={{ color: 'white' }}>
                    {descr}
                  </Typography>
                </Stack>
              </Link>
            )
          })}
        </Stack>
      </Container>
    </Box>
  )
}

export default NumbersPage
