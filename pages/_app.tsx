import type { AppProps } from 'next/app'
import { ThemeProvider } from '@mui/material'
import { theme } from '@pagopa/mui-italia'
import Layout from '../src/components/Layout'
import { LocaleProvider } from '../src/i18n/LocaleProvider'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <LocaleProvider lang={pageProps.lang}>
      <ThemeProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </LocaleProvider>
  )
}

export default MyApp
