import type { AppProps } from 'next/app'
import { ThemeProvider } from '@mui/material'
import Layout from '../components/Layout'
import { useRouter } from 'next/router'
import { DEFAULT_LOCALE, Locale } from '../configs/constants.config'
import { useState } from 'react'
import { LocaleContext } from '@/contexts/locale.context'
import '../styles/default.css'
import { theme } from '@/configs/theme.config'
import { Titillium_Web } from 'next/font/google'

// If loading a variable font, you don't need to specify the font weight
const titilliumWeb = Titillium_Web({ subsets: ['latin'], weight: ['400', '600', '700'] })

function MyApp({ Component, pageProps }: AppProps) {
  const [locale, setLocale] = useState<Locale>(DEFAULT_LOCALE)
  const router = useRouter()

  return (
    <div className={titilliumWeb.className}>
      <LocaleContext.Provider value={{ locale, setLocale }}>
        <ThemeProvider theme={theme}>
          <Layout>
            <Component key={router.asPath} {...pageProps} />
          </Layout>
        </ThemeProvider>
      </LocaleContext.Provider>
    </div>
  )
}

export default MyApp
