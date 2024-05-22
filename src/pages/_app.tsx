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

function MyApp({ Component, pageProps }: AppProps) {
  const [locale, setLocale] = useState<Locale>(DEFAULT_LOCALE)
  const router = useRouter()

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      <ThemeProvider theme={theme}>
        <Layout>
          <QueryParamProvider adapter={NextAdapterPages}>
            <Component key={router.asPath} {...pageProps} />
          </QueryParamProvider>
        </Layout>
      </ThemeProvider>
    </LocaleContext.Provider>
  )
}

export default MyApp
