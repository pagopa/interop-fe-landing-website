import React, { ReactNode } from 'react'
import { Box, Stack } from '@mui/material'
import { HeaderAccount, Footer } from '@pagopa/mui-italia'
import languageDetector from '../../lib/languageDetector'
import { useRouter } from 'next/router'
import {
  companyLegalInfo,
  LangCode,
  LANGUAGES,
  pagoPALink,
  postLoginLinks,
  preLoginLinks,
} from '../../lib/constants'
import nextI18nextConfig from '../../next-i18next.config'

interface Props {
  children?: ReactNode
}

const Layout = ({ children }: Props) => {
  const router = useRouter()
  const locale = (router.query.locale || nextI18nextConfig.i18n.defaultLocale) as LangCode

  const homeLink = {
    label: 'PagoPA S.p.A.',
    href: 'https://www.pagopa.it',
    ariaLabel: 'Vai al sito di PagoPA S.p.A.',
    title: 'PagoPA S.p.A.',
  }

  const handleAssistanceClick = () => {
    console.log('go to assistance')
  }

  const onLanguageChanged = (newLang: string) => {
    languageDetector.cache && languageDetector.cache(newLang)
    const newRoute = router.pathname.replace('[locale]', newLang)
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
