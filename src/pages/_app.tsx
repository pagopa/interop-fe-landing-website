import type { AppProps } from 'next/app'
import { ThemeProvider } from '@mui/material'
import { theme } from '@pagopa/mui-italia'
import Layout from '../components/Layout'
import { useRouter } from 'next/router'
import '../styles/default.css'
import { DEFAULT_LOCALE, Locale } from '../configs/constants.config'
import { useState } from 'react'
import { LocaleContext } from '@/contexts/locale.context'

function MyApp({ Component, pageProps }: AppProps) {
  const [locale, setLocale] = useState<Locale>(DEFAULT_LOCALE)
  const router = useRouter()

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      <ThemeProvider theme={theme}>
        <Layout>
          <Component key={router.asPath} {...pageProps} />
        </Layout>
      </ThemeProvider>
    </LocaleContext.Provider>
  )
}

export default MyApp
