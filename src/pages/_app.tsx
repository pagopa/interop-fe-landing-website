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
import { BannerText } from '../configs/constants.config'

function MyApp({ Component, pageProps }: AppProps) {
  const [locale, setLocale] = useState<Locale>(DEFAULT_LOCALE)
  const router = useRouter()
  const voucherBanner = BannerText.voucherBanner

  return (
    <TrackingProvider>
      <LocaleContext.Provider value={{ locale, setLocale }}>
        <ThemeProvider theme={theme}>
          <Layout>
            <QueryParamProvider adapter={NextAdapterPages}>
              <Component key={router.asPath} {...pageProps} />
              <ClaimBanner
                title={voucherBanner.title}
                content={voucherBanner.content}
                buttonText={voucherBanner.buttonText}
                buttonLink={voucherBanner.buttonLInk}
              />
            </QueryParamProvider>
          </Layout>
        </ThemeProvider>
      </LocaleContext.Provider>
    </TrackingProvider>
  )
}

export default MyApp
