import type { AppProps } from 'next/app'
import { ThemeProvider } from '@mui/material'
import Layout from '../components/Layout'
import { useRouter } from 'next/router'
import { DEFAULT_LOCALE, Locale } from '../configs/constants.config'
import { useState } from 'react'
import { LocaleContext } from '@/contexts/locale.context'
import '../styles/default.css'
import '../styles/onetrust.css'
import { theme } from '@/configs/theme.config'
import NextAdapterPages from 'next-query-params/pages'
import { QueryParamProvider } from 'use-query-params'
import { TrackingProvider } from '@/configs/tracking.config'
import { ClaimBanner } from '@/components/ClaimBanner'

function MyApp({ Component, pageProps }: AppProps) {
  const [locale, setLocale] = useState<Locale>(DEFAULT_LOCALE)
  const router = useRouter()

  const claimBannerTitle = 'Aggiornamenti sui voucher PDND'
  const claimBannerContent =
    'A partire dal 3 giugno 2025, saranno introdotti nuovi claim nei voucher PDND e controlli più rigorosi per garantire la sicurezza e la conformità delle richieste. '
  const claimBannerButtonText = 'Scopri di più'
  const claimBannerButtonLink = 'https://github.com/pagopa/pdnd-interop-frontend/issues/1300'

  return (
    <TrackingProvider>
      <LocaleContext.Provider value={{ locale, setLocale }}>
        <ThemeProvider theme={theme}>
          <Layout>
            <QueryParamProvider adapter={NextAdapterPages}>
              <Component key={router.asPath} {...pageProps} />
              <ClaimBanner
                title={claimBannerTitle}
                content={claimBannerContent}
                buttonText={claimBannerButtonText}
                buttonLink={claimBannerButtonLink}
              />
            </QueryParamProvider>
          </Layout>
        </ThemeProvider>
      </LocaleContext.Provider>
    </TrackingProvider>
  )
}

export default MyApp
