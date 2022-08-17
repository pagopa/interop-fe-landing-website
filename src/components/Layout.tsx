import React, { ReactNode, useContext } from 'react'
import { Box, Stack } from '@mui/material'
import { HeaderAccount, Footer } from '@pagopa/mui-italia'
import { useRouter } from 'next/router'
import {
  companyLegalInfo,
  Locale,
  LANGUAGES,
  pagoPALink,
  postLoginLinks,
  preLoginLinks,
  LOCALES,
} from '../../lib/constants'
import LocaleContext from '../i18n/LocaleContext'
import NavigationBar from './NavigationBar'

interface Props {
  children?: ReactNode
}

const Layout = ({ children }: Props) => {
  const { locale } = useContext(LocaleContext)
  const router = useRouter()

  const homeLink = {
    label: 'PagoPA S.p.A.',
    href: 'https://www.pagopa.it',
    ariaLabel: 'Vai al sito di PagoPA S.p.A.',
    title: 'PagoPA S.p.A.',
  }

  const handleAssistanceClick = () => {
    console.log('go to assistance')
  }

  const onLanguageChanged = (newLang: Locale) => {
    // Split route into bits
    const routeBits = router.asPath.split('/').filter((b) => b)
    // Remove current language
    const bitsWithoutLang = routeBits.filter((b) => !LOCALES.includes(b))
    // Build new route
    const newRoute =
      bitsWithoutLang.length > 0 ? `/${newLang}/${bitsWithoutLang.join('/')}` : `/${newLang}`
    // Push it
    router.push(newRoute)
  }

  return (
    <Box sx={{ height: '100vh' }}>
      <Stack
        direction="column"
        sx={{ minHeight: '100vh' }} // 100vh per sticky footer
      >
        <HeaderAccount
          enableLogin={false}
          rootLink={homeLink}
          onAssistanceClick={handleAssistanceClick}
        />
        <NavigationBar />
        <Box sx={{ flexGrow: 1 }} component="main">
          {children}
        </Box>

        <Footer
          loggedUser={false}
          companyLink={{ ...pagoPALink, onClick: () => window.open(pagoPALink.href, '_blank') }}
          legalInfo={companyLegalInfo}
          postLoginLinks={postLoginLinks}
          preLoginLinks={preLoginLinks}
          currentLangCode={locale}
          onLanguageChanged={onLanguageChanged}
          languages={LANGUAGES}
        />
      </Stack>
    </Box>
  )
}

export default Layout
