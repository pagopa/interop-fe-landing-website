import type { AppProps } from 'next/app'
import { ThemeProvider } from '@mui/material'
import { theme } from '@pagopa/mui-italia'
import Layout from '../src/components/Layout'
import { LocaleProvider } from '../src/i18n/LocaleProvider'
import { useRouter } from 'next/router'
import '../styles/default.css'

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()

  return (
    <LocaleProvider lang={pageProps.lang}>
      <ThemeProvider theme={theme}>
        <Layout>
          <Component key={router.asPath} {...pageProps} />
        </Layout>
      </ThemeProvider>
    </LocaleProvider>
  )
}

export default MyApp
